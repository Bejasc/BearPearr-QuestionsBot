import { EmbedCarousel, HouseService } from "../../services";
import { getPatronusEmbed, getRandomPatronus } from "../../services/PatronusService";

import { Command } from "discord-akairo";
import { Message } from "discord.js";
import { TextChannel } from "discord.js";

export default class HouseInfoCommand extends Command {
	public constructor() {
		super("house", {
			aliases: ["house", "houses", "h", "houseinfo"],
			category: "Public commands",
			description: {
				content: "Displays information on a given house. Use without a parameter to display all houses. ",
				usage: "patronus",
				examples: ["patronus"],
			},
			args: [
				{
					id: "searchTerm",
					type: "string",
					match: "rest",
				},
			],
			ratelimit: 3,
		});
	}

	public exec(message: Message, { searchTerm }: { searchTerm: string }): Promise<Message> {
		if (searchTerm) {
			const house = HouseService.getHouseWithName(searchTerm);
			if (house) {
				const houseEmbed = HouseService.getHouseEmbed(house);
				return message.util.send(houseEmbed);
			} else {
				return message.util.send(`A house was not found matching ${searchTerm}.`);
			}
		} else {
			const houses = HouseService.getHouses();
			const embeds = houses.map((house) => {
				return HouseService.getHouseEmbed(house);
			});

			const embedCarousel = EmbedCarousel.showEmbedCarousel(message.channel as TextChannel, message.member, embeds);
			return embedCarousel;
		}
	}
}
