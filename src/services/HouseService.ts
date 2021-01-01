import { MessageEmbed, User } from "discord.js";

import { IHouse } from "../types";
import houseesConfig from "../database/houses.json";

/**
 * Get a random House.
 * House options are stored in database/houses.json.
 * There are not stored in the DB as it is unlikely they have properties that will change *while* the bot is running.
 */
export function getRandomHouse(): IHouse {
	//Read the houses from the config file
	const houses: IHouse[] = houseesConfig as IHouse[];

	const house = houses[Math.floor(Math.random() * houses.length)];
	console.log(`${house.name} was randomly selected.`);

	return house;
}

/**
 * Finds a house using a provided value. Returns null if house not found.
 * @param name Name of the house to search for. You could introduce an alias here and find them based on that, too.
 */
export function getHouseWithName(name: string): IHouse {
	const houses: IHouse[] = houseesConfig as IHouse[];

	const house = houses.find((h) => h.name.toLowerCase() == name.toLowerCase());

	return house;
}

/**
 * Returns all houses from the housesConfig as an object implementing IHouse
 */
export function getHouses(): IHouse[] {
	const houses: IHouse[] = houseesConfig as IHouse[];
	return houses;
}

/**
 * Builds the embed to display the information on a particular House.
 * @param house
 */
export function getHouseEmbed(house: IHouse): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setTitle(house.name);
	embed.setColor(house.color);
	embed.setThumbnail(house.crest);

	embed.addField("Core Values", house.values.join(", "));
	embed.addField("Founder", house.founder);

	return embed;
}
