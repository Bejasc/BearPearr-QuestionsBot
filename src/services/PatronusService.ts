import { MessageEmbed, User } from "discord.js";

import { IPatronus } from "../types";
import patronusConfig from "../config/patronusConfig.json";

/**
 * Get a random Patronus.
 * Patronus options are stored in config/patronusConfig.
 * There are not stored in the DB as it is unlikely they have properties that will change *while* the bot is running.
 */
export function getRandomPatronus(): IPatronus {
	//Read the patronuses from the config file
	const patronuses: IPatronus[] = patronusConfig as IPatronus[];

	const patronus = patronuses[Math.floor(Math.random() * patronuses.length)];
	console.log(`The ${patronus.name} patronus was randomly selected.`);

	return patronus;
}

/**
 * Builds the embed to display the information on a particular Patronus.
 * @param patronus
 * @param member
 */
export function getPatronusEmbed(patronus: IPatronus, member: User): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setTitle("Congratulations! I see your Patronus appearing!");
	embed.setColor("#00a4ef");

	embed.setDescription("Your patronus has found you..");
	embed.setAuthor(member.username, member.avatarURL());
	embed.setImage("https://pa1.narvii.com/5897/fada5e07108b5800cfa43fe894e6d6007d27129c_00.gif");

	embed.setDescription("Patronus are");
	embed.addField("Your Patronus is...", `**${patronus.name}**`);

	embed.setImage("https://data.whicdn.com/images/265435184/original.gif");

	if (patronus.image) embed.setThumbnail(patronus.image);

	return embed;
}
