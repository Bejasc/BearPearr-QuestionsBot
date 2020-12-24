import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";

export default class AvatarCommand extends Command {
	public constructor() {
		super("avatar", {
			aliases: ["avatar", "av"],
			category: "Public Commands",
			description: {
				content: "Display the avatar of a member",
				usage: "avatar [member]",
				examples: ["avatar", "avatar @Bejasc#7140", "avatar Ben"],
			},
			ratelimit: 3,
			args: [
				{
					id: "member",
					type: "member",
					match: "rest",
					default: (msg: Message) => msg.member,
				},
				{
					id: "size",
					type: (_: Message, str: string): null | Number => {
						if (str && !isNaN(Number(str)) && [32, 64, 128, 512, 1024].includes(Number(str))) return Number(str);
						return null;
					},
					match: "option",
					flag: ["-size="], //avatar @Bejasc#7140 -size=512
					default: 512,
				},
			],
		});
	}

	public exec(message: Message, { member, size }: { member: GuildMember; size: Number }): Promise<Message> {
		return message.util.send(
			new MessageEmbed()
				.setTitle("Avatar")
				.setColor("RANDOM")
				.setImage(member.user.displayAvatarURL({ size: size as ImageSize }))
		);
	}
}
