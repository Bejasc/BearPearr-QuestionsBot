import { GuildMember, Message, MessageEmbed, MessageReaction, TextChannel, User } from "discord.js";

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
	const embed = getEventEmbed(event);
	const message = await channel.send(embed);

	if (event.eventLinks?.length > 0) {
		const allowedReactions = addReactionOptions(event, message);
		embed.setFooter("Make a selection to continue this event.");
		message.edit(embed);

		const collectedReaction = await collectReaction(event, allowedReactions, message);

		if (collectedReaction) {
			const reactedByUser = collectedReaction.users.cache.last();
			console.log(`${reactedByUser.username} was the first to react.`);

			const nextEvent = getEventForReaction(event, collectedReaction);
			if (nextEvent) {
				message.delete();

				return fireEvent(nextEvent, channel, reactedByUser);
			}
		}
	} else {
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
		const filter = (reaction: MessageReaction, user: User) => {
			return allowedReactions.includes(reaction.emoji.name) && !user.bot;
		};

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
	const match = event.eventLinks.find((event) => {
		return event.reaction == reaction.emoji.name;
	});

	if (match) {
		const nextEvent = match.event[Math.floor(Math.random() * match.event.length)];
		return nextEvent;
	} else {
		return null;
	}
}
