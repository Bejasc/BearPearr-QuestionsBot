import { Command } from "discord-akairo";
import { Message, GuildMember, MessageEmbed, ImageSize } from "discord.js";
import Thing, { IThing } from "../../types/Thing";

export default class AvatarCommand extends Command {
	public constructor() {
		super("put thing", {
			aliases: ["putthing", "put"],
			category: "Public Commands",
			description: {
				content: "Put an item in the DB",
				usage: "put --name --description --image",
				examples: ["put --name=orange", "put --name=orange --description=fruit", "put --n=cucumber --d=vegetable --i=[url]"],
			},
			ratelimit: 3,
			args: [
				{
					id: "name",
					type: "name",
					match: "phrase",
				},
				{
					id: "description",
					type: (_: Message, str: string): null | String => {
						if (str) return str;
						return null;
					},
					match: "option",
					flag: ["-d=", "-description=", "-desc="],
				},
				{
					id: "image",
					type: (_: Message, str: string): null | String => {
						if (str) return str;
						return null;
					},
					match: "option",
					flag: ["-i=", "-image=", "-img="],
				},
			],
		});
	}

	public exec(message: Message, { name, description, image }: { name: string; description: string; image: string }): Promise<Message> {
		message.util.send("Item added to database");

		var msg = new MessageEmbed();
		msg.setTitle(name);
		msg.setColor("#00FF00");

		if (description) msg.setDescription(description);
		if (image) msg.setImage(image);

		const thing = new Thing();
		thing.name = name;
		thing.description = description;
		thing.image = image;

		thing.save();

		return message.util.send(msg);
	}
}
