import { Character, ICharacter } from "../types/Character";
import { GuildMember, User } from "discord.js";
import { GuildService, WandService } from ".";

import { IWand } from "../types";
import { MessageEmbed } from "discord.js";
import { describeWand } from "./WandService";

/**
 * Queries the Characters collection on Mongo, and tries to find a matching Character object that uses the provided ID.
 * It is possible that no match is found.
 * @param user Pass either a string (user ID), or a GuildMember or User object.
 */
export async function getCharacterForUser(user: string | GuildMember | User): Promise<ICharacter> {
	try {
		if (typeof user !== "string") user = user.id;

		const guildMember = GuildService.getGuildMember(user);
		const character = await Character.findOne({ userId: user });

		if (character) {
			console.log(`Found one character belonging to ${guildMember.user.tag}`);
			return character;
		} else {
			console.warn(`Unable to find a character for ${guildMember.user.tag}. Perhaps they are not yet created?`);
			return null;
		}
	} catch (err) {
		console.error(err);
	}
}

/**
 * Deletes the character for a user. You may want to use this for testing purposes.
 * @param character The character object to delete the user for. Can be found with `CharacterService.getCharacterForUser(userId)` if it is unknown.
 */
export async function deleteCharacter(character: ICharacter) {
	const guildMember = GuildService.getGuildMember(character.userId);

	try {
		await Character.deleteOne({ userId: character.userId });
		console.warn(`Character for user ${guildMember.user.tag} was deleted`);
	} catch (err) {
		console.warn(`Unable to delete character belonging to user ${guildMember.user.tag}`);
		console.error(err);
	}
}

/**
 * Creates the user and stores them in the database to be used in future commands.
 * @param user The user the character is being created for.
 * @param wand If a value is provided, it will use that wand. If not, one will be selected at random.
 */
export async function createCharacter(user: GuildMember, wand?: IWand): Promise<ICharacter> {
	try {
		const character = new Character();
		character.userId = user.id;

		if (!wand) character.wand = WandService.generateWand();
		character.save();

		return character;
	} catch (err) {
		console.warn(`Unable to create character for ${user.id}`);
		console.error(err);

		return null;
	}
}

/**
 * Produces an embed that lists details of a character.
 * @param character The character to describe
 * @param user The user this character belongs to
 */
export function getCharacterEmbed(character: ICharacter, user: GuildMember): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setAuthor(user.user.tag, user.user.avatarURL());
	embed.setTitle(`Character Stats for ${user.user.tag}`);

	embed.addField("Experience", character.xp);
	embed.addField("Wand", describeWand(character.wand));
	return embed;
}
