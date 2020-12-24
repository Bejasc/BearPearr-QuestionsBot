import { MessageEmbed } from "discord.js";
import { MessageAttachment } from "discord.js";

export default function localImage(message: MessageEmbed, imageName: string): string {
	const attachment = new MessageAttachment(`./assets/${imageName}`, imageName);
	message.attachFiles([attachment]);
	return `attachment://${imageName}`;
}
