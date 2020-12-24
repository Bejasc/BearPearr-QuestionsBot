import { Command } from "discord-akairo";
import { Message } from "discord.js";

export default class PingCommand extends Command {
	public constructor() {
		super("ping", {
			aliases: ["ping"],
			category: "Public commands",
			description: {
				content: "Check ping to the Discord API",
				usage: "ping",
				examples: ["ping"],
			},
			ratelimit: 3,
		});
	}

	public exec(message: Message): Promise<Message> {
		return message.util.send(`Ping to Discord API is \`${this.client.ws.ping}ms\``);
	}
}
