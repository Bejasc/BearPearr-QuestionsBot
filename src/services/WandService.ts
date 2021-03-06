import { CoreTypes, FormTypes, IWand, WandLength, WoodTypes } from "../types";
import { MessageEmbed, User } from "discord.js";

/**
 * Generate a wand with a randomly selected wood, form, length, and core.
 * Returns IWand
 */
export function generateWand(): IWand {
	const wand: IWand = {
		wood: WoodTypes[Math.floor(Math.random() * WoodTypes.length)],
		form: FormTypes[Math.floor(Math.random() * FormTypes.length)],
		length: WandLength[Math.floor(Math.random() * WandLength.length)],
		core: CoreTypes[Math.floor(Math.random() * CoreTypes.length)],
	};

	console.log(`Generated a ${wand.length} ${wand.wood} wand. It is ${wand.form} with a ${wand.core} core.`);

	return wand;
}

/**
 * Builds the embed to display info about a wand.
 * @param wand
 * @param member
 */
export function getWandEmbed(wand: IWand, member: User): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setTitle("Wand");
	embed.setColor("#330000");

	embed.setDescription("This wand has been randomly generated.");
	embed.setAuthor(member.username, member.avatarURL());
	embed.setImage("https://pa1.narvii.com/5897/fada5e07108b5800cfa43fe894e6d6007d27129c_00.gif");

	embed.setDescription(
		`**It appears that the wand has found its Master, <@!${member.id}>.**
        Your wand is ${describeWand(wand)}.`
	);

	embed.addField("Length", wand.length, true);
	embed.addField("Wood", wand.wood, true);
	embed.addField("Form", wand.form, true);
	embed.addField("Core", wand.core, true);

	return embed;
}

/**
 * Produces a string description of a wand.
 * @param wand The wand to describe
 */
export function describeWand(wand: IWand): string {
	return `**${wand.length}es** long, with a **${wand.core}** core. It's made of **${wand.wood}** wood, with a **${wand.form}** build.`;
}
