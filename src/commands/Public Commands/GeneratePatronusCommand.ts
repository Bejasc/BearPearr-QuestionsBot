import { getPatronusEmbed, getRandomPatronus } from "../../services/PatronusService";

import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PatronusCommand extends Command {
	public constructor() {
		super("patronus", {
			aliases: ["patronus"],
			category: "Public commands",
			description: {
				content: "Generates a random patronus",
				usage: "patronus",
				examples: ["patronus"],
			},
			ratelimit: 3,
		});
	}

	public exec(message: Message): Promise<Message> {
		const patronus = getRandomPatronus();
		const patronusEmbed = getPatronusEmbed(patronus, message.author);
		return message.util.send(patronusEmbed);
	}
}
