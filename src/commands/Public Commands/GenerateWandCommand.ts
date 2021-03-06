import { generateWand, getWandEmbed } from "../../services/WandService";

import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class WandCommand extends Command {
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
