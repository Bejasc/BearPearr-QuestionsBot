import { Character, ICharacter } from "../types/Character";
import { GuildMember, User } from "discord.js";

import { GuildService } from ".";

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
			console.log(`Found one user in house ${character.house} matching belonging to ${guildMember.user.tag}`);
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
		await Character.deleteOne(character);
		console.warn(`Character for user ${guildMember.user.tag} was deleted`);
	} catch (err) {
		console.warn(`Unable to delete character belonging to user ${guildMember.user.tag}`);
		console.error(err);
	}
}
