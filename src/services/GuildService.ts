import { ClientUser, Guild, GuildMember } from "discord.js";

import { client } from "../Bot";

/**
 * Get the guild object for your server.
 * NOTE: This only works if your bot is only in one server.
 * Possible extensions would be providing a guild ID as a string param here, and possibly reading from the .env file
 * You could then maintain a separate environment file for a test/production environment, and resolve guilds properly.
 * But for now, this will only work with one single server that your bot is in.
 */
export function guild(): Guild {
	return client.guilds.cache.first();
}

/**
 * Will return the GuildMember object of a user with a provided ID
 * @param id The ID of the user to find
 */
export function getGuildMember(id: string): GuildMember {
	return guild().members.resolve(id);
}
