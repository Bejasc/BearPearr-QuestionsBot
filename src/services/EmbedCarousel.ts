import { GuildMember, MessageReaction, TextChannel } from "discord.js";
import { Message, MessageEmbed } from "discord.js";

/**
 * Returns a message (this function will *send* it also) with bot-reacted reactions, and allow you to page through the embeds that are passed through.
 * This is useful instead of a user running a command over each object and clogging up the channel.
 * Will only allow the user who ran the command to react, and will stop listening for reactions after 2 mins.
 * @param targetChannel The channel the embed will be sent in to. You should have access to this when you call the command.
 * @param member Used to filter reactions in reactFilter.
 * If you want all members to be able to page through it, instead of just the member who ran the command, you could remove this param, and the code from reactFilter.
 * @param embeds An array of the Embeds you want to show. These should be retreived from whatever service you have to create your embeds.
 * This is the only thing you will need to change to scale. and you're gonna need it anyway
 */
export async function showEmbedCarousel(targetChannel: TextChannel, member: GuildMember, embeds: MessageEmbed[]): Promise<Message> {
	let currentPage = 0;
	const current = embeds[currentPage];

	addFooterInfo(embeds, currentPage);

	const sentEmbed = await targetChannel.send(current);
	sentEmbed.react("⏪");
	sentEmbed.react("⏩");

	const reactFilter = (reaction, user) => ["⏪", "⏩"].includes(reaction.emoji.name) && user.id === member.user.id;
	const collector = sentEmbed.createReactionCollector(reactFilter, { time: 120000 });

	try {
		collector.on("collect", async (reaction: MessageReaction) => {
			switch (reaction.emoji.name) {
				case "⏪":
					if (currentPage == 0) currentPage = embeds.length - 1;
					else currentPage--;
					break;
				case "⏩":
					if (currentPage == embeds.length - 1) currentPage = 0;
					else currentPage++;
					break;
			}

			addFooterInfo(embeds, currentPage);

			sentEmbed.edit(embeds[currentPage]);
			reaction.users.remove(member);
		});
	} catch (err) {
		console.log("oops");
	}

	return sentEmbed;
}

/**
 * Will add the page number of the embed to the footer. Could also add other information in here that is *not* part of the original service getEmbed function.
 * @param embeds Used to get the coutn of the embed, as well as any other information you may potentially want
 * @param currentPage What page we're currently up to
 */
function addFooterInfo(embeds: MessageEmbed[], currentPage: number) {
	embeds[currentPage].setFooter(`${currentPage + 1} of ${embeds.length}`);
}
