import { CharacterService } from "../../services";
import { Command } from "discord-akairo";
import { GuildMember } from "discord.js";
import { Message } from "discord.js";

export default class CharacterCommand extends Command {
	public constructor() {
		super("character", {
			aliases: ["character", "char", "flex"],
			category: "Public commands",
			description: {
				content: "Check the stats of the current character",
				usage: "char",
				examples: ["char"],
			},
			args: [
				{
					id: "member",
					type: "member",
					match: "rest",
					default: (msg: Message) => msg.member,
				},
			],
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
		const existingCharacter = await CharacterService.getCharacterForUser(member);
		console.log(member.id);

		if (existingCharacter) {
			const characterEmbed = CharacterService.getCharacterEmbed(existingCharacter, member);
			return message.util.send(characterEmbed);
		} else {
			return message.util.send(`A character was not found for ${member}.`);
		}
	}
}
