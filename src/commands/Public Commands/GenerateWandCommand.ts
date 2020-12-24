import { generateWand, getWandEmbed } from "../../types/Wand";

import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
	public constructor() {
		super("wand", {
			aliases: ["wand"],
			category: "Public commands",
			description: {
				content: "Generates a random wand",
				usage: "wand",
				examples: ["wand"],
			},
			ratelimit: 3,
		});
	}

	public exec(message: Message): Promise<Message> {
		const wand = generateWand();
		const wandEmbed = getWandEmbed(wand, message.author);
		return message.util.send(wandEmbed);
	}
}
