import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";

import { CharacterService } from ".";
import { IEvent } from "../types/Event";

const path = require("path");
const fs = require("fs");

const events: IEvent[] = [];

/**
 * This function will scan the `/database/evets` directory for all .json files and attempt to create an event from them.
 * The events are then stored in the events array, and can be retrieved by using the `getEvent()` method
 */
export async function loadEvents() {
	const dirPath = path.join(__dirname, "../database/events");
	console.log(`\nScanning for events at ${dirPath}..`);

	let eventCount = 0;

	const eventFiles = fs.readdirSync(dirPath);
	await eventFiles.map(async (file) => {
		const data = await fs.readFileSync(path.join(dirPath, file));
		const event = JSON.parse(data) as IEvent;

		eventCount++;
		console.log(`${event.eventName} was added to the event list.`);

		return events.push(event);
	});

	console.log(`\n${eventCount} events were added.\n`);
}

/**
 * Returns the event object matching the eventName property.
 * If no eventName is provided, it will return a random event.
 * @param eventName The name of the event to collect. Matches on the eventName property in the root event.
 */
export function getEvent(eventName?: string): IEvent {
	if (!eventName) {
		const event = events[Math.floor(Math.random() * events.length)];
		console.log(`${event.eventName} event was randomly selected.`);
		return event;
	} else {
		const event = events.find((e) => e.eventName == eventName);
		if (event) {
			console.log(`${event.eventName} event was selected.`);
			return event;
		} else {
			console.log(`No event could be found matching the title ${eventName}.`);
			return null;
		}
	}
}

/**
 * Called to process an entire event. Works for top/root level events, as well as any of the nested events.
 *  Calls multiple functions to construct the embed, add teh reaction options, and select any subsequent events.
 * @param event The event to fire. Can be the root event, or one of the events nested events
 * @param channel The channel to process the message in
 * @param user The user who has reacted to the event. Used only for the nested events
 */
export async function fireEvent(event: IEvent, channel: TextChannel, user?: User): Promise<IEvent> {
	//Build the embed for this event and send it
	const embed = getEventEmbed(event);
	const message = await channel.send(embed);

	//Check if this event should make any changes for the user. If yes, process them
	if (event.result) {
		message.edit(await processEventResults(user, event, embed));
	}

	//Check if this event should fire any events after it
	if (event.eventLinks?.length > 0) {
		//Add reactions
		const allowedReactions = addReactionOptions(event, message);
		embed.setFooter("Make a selection to continue this event.");
		message.edit(embed);

		//Wait for a reaction to be added by user
		const collectedReaction = await collectReaction(event, allowedReactions, message);

		if (collectedReaction) {
			const reactedByUser = collectedReaction.users.cache.last();
			console.log(`${reactedByUser.username} was the first to react.`);

			//Resolve this reaction to one of the eventLinks
			const nextEvent = getEventForReaction(event, collectedReaction);
			if (nextEvent) {
				//Delete the original message.
				message.delete();

				//Call this same method, using the new action that was resolved above
				return fireEvent(nextEvent, channel, reactedByUser);
			}
		}
	} else {
		//No more events to process.
		embed.setFooter("The event is now complete.");
		message.edit(embed);
		return event;
	}
}

/**
 * Creates the visual display of the embed.
 * @param event The event to use to construct the embed
 */
export function getEventEmbed(event: IEvent): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setTitle(event.embedOptions.title);
	embed.setColor(event.embedOptions.color);
	embed.setDescription(event.embedOptions.description);

	embed.setThumbnail(event.embedOptions.thumbnail);
	embed.setImage(event.embedOptions.image);
	embed.setAuthor(event.embedOptions.author, event.embedOptions.authorAvatar);

	embed.setFooter(event.embedOptions.image);

	//Go through the options and add each one
	if (event.eventLinks?.length > 0) {
		event.eventLinks.map((link) => {
			embed.addField(`[${link.reaction}] - ${link.title}`, link.description);
		});
	}

	return embed;
}

/**
 * Adds the reaction emojis spcified in the passed in event.
 * @param event The event to add the options for
 * @param message The message to add the reactions to
 */
function addReactionOptions(event: IEvent, message: Message): string[] {
	const reactions = event.eventLinks.map((option) => {
		message.react(option.reaction);
		return option.reaction;
	});

	return reactions;
}

/**
 * Waits for an appropriate reaction to be added to the targeted message
 * @param event The event that we're waiting for an action on
 * @param allowedReactions string[] of the emojis that are allowed. See `addReactionOptions`
 * @param message The message that is being listened to for any reactions.
 */
async function collectReaction(event: IEvent, allowedReactions: string[], message: Message): Promise<MessageReaction> {
	try {
		//Will only process reactions that are allowed for the event (from addReactionOptions). Ignroes the bot as this counts as one reaction.
		const filter = (reaction: MessageReaction, user: User) => {
			return allowedReactions.includes(reaction.emoji.name) && !user.bot;
		};

		//Wait for 30 seconds to get a reaction. Only one reaction will be required to process
		const collectedReactions = await message.awaitReactions(filter, { max: 1, time: 30000, errors: ["time"] });
		const reaction = collectedReactions.last();

		return reaction;
	} catch (err) {
		console.log(`Timeout trying to react to event ${event.embedOptions.title}`);
		return null;
	}
}

/**
 * Will search the event using the reaction, and return the event that should fire from that reaction. If multiple events exist, it will select one at random from that reaction.
 * @param event The event to search for event links
 * @param reaction The reaction to use for the search
 */
function getEventForReaction(event: IEvent, reaction: MessageReaction): IEvent {
	//Search the event to match the reaction to the linked event.
	const match = event.eventLinks.find((event) => {
		return event.reaction == reaction.emoji.name;
	});

	//If we have a match, return a random event from this array, as it could be one of many.
	if (match) {
		const nextEvent = match.event[Math.floor(Math.random() * match.event.length)];
		return nextEvent;
	} else {
		return null;
	}
}

/**
 * Processes (add or remove) any reward items for an event.
 * @param user The user to apply the rewards to
 * @param event The event with the rewards enabled
 * @param embed The embed to add the reward text to
 */
async function processEventResults(user: User, event: IEvent, embed: MessageEmbed): Promise<MessageEmbed> {
	const character = await CharacterService.getCharacterForUser(user);

	//Process any XP related reward
	if (event.result.experience) {
		//Is this gaining or losing XP?
		const gainOrLose = event.result.experience > 0 ? "Gained" : "Lost";

		console.log(`${user.tag} ${gainOrLose} ${event.result.experience} XP.`);

		//Update the character object to add this XP to them.
		character.xp += event.result.experience;
		character.save();

		//Update the embed to show this having been done
		embed.addField(user.tag, `${gainOrLose} ${event.result.experience} experience.`);
	}
	return embed;
}
