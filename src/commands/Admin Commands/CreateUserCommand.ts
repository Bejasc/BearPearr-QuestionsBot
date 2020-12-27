import { GuildMember, Message, TextChannel } from "discord.js";

import { CharacterService } from "../../services";
import { Command } from "discord-akairo";

export default class CreateUserCommand extends Command {
	public constructor() {
		super("!createUser", {
			aliases: ["!createUser"],
			category: "Admin",
			ratelimit: 3,
			args: [
				{
					id: "member",
					type: "member",
					match: "rest",
					default: (msg: Message) => msg.member,
				},
			],
			userPermissions: ["ADMINISTRATOR"],
		});
	}

	public async exec(message: Message, { member }: { member: GuildMember }): Promise<Message> {
		console.log(`Creating a character for ${member.user.tag}...`);
		const existingUser = await CharacterService.getCharacterForUser(member);
		if (!existingUser) {
			const newCharacter = await CharacterService.createCharacter(member);

			if (newCharacter) {
				return message.util.send(`A character was created for ${member}.`);
			}
		} else {
			return message.util.send(`A character for ${member} already exists! Please delete the character first to continue.`);
		}
	}
}
