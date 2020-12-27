import { CharacterService, EventService } from "../../services";
import { GuildMember, Message, TextChannel } from "discord.js";

import { Channel } from "discord.js";
import { Command } from "discord-akairo";
import { IEvent } from "../../types/Event";
import { client } from "../../Bot";

export default class CreateUserCommand extends Command {
	public constructor() {
		super("!event", {
			aliases: ["!event"],
			category: "Admin",
			ratelimit: 3,
			args: [
				{
					id: "eventName",
					type: "string",
					match: "phrase",
				},
				{
					id: "channel",
					type: "string",
					match: "phrase",
					default: (msg: Message) => msg.channel.id,
				},
			],
			userPermissions: ["ADMINISTRATOR"],
		});
	}

	public async exec(message: Message, { eventName, channel }: { eventName: string; channel: string }) {
		const event = EventService.getEvent(eventName);
		const targetChannel: Channel = client.channels.cache.get(channel);

		if (event) {
			EventService.fireEvent(event, targetChannel as TextChannel);
		} else {
			console.log("Unable to find event with name " + eventName);
		}
	}
}
