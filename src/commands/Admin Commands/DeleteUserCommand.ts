import { GuildMember, Message, TextChannel } from "discord.js";

import { CharacterService } from "../../services";
import { Command } from "discord-akairo";

export default class DeleteUserCommand extends Command {
	public constructor() {
		super("!deleteUser", {
			aliases: ["!deleteUser"],
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
		console.log(`Deleting character for ${member.user.tag}...`);

		const existingCharacter = await CharacterService.getCharacterForUser(member);

		if (existingCharacter) {
			await CharacterService.deleteCharacter(existingCharacter);
			return message.util.send(`The character belonging to ${member} was deleted..`);
		} else {
			return message.util.send(`No character found for ${member}.`);
		}
	}
}
