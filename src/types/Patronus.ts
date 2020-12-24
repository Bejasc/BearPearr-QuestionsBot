import { MessageEmbed, User } from "discord.js";

export interface IPatronus {
	name: string;
	image?: string;
}

export const patronuses: IPatronus[] = [
	{
		name: "Mouse",
		image:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55e85c93-d59c-4387-b61f-ca369586a100/d8txuh2-37561fb2-e6fc-4df3-9ed0-9a10e5e7b47b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTVlODVjOTMtZDU5Yy00Mzg3LWI2MWYtY2EzNjk1ODZhMTAwXC9kOHR4dWgyLTM3NTYxZmIyLWU2ZmMtNGRmMy05ZWQwLTlhMTBlNWU3YjQ3Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.h0RRD2KnvlvUvuA2eIWyBD74gK4gV8ilJ9Fh8LTWb7Q",
	},
	{
		name: "Swan",
		image:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/55e85c93-d59c-4387-b61f-ca369586a100/d8scitw-43d64e12-986f-40dd-ac56-69cfec8d94ef.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNTVlODVjOTMtZDU5Yy00Mzg3LWI2MWYtY2EzNjk1ODZhMTAwXC9kOHNjaXR3LTQzZDY0ZTEyLTk4NmYtNDBkZC1hYzU2LTY5Y2ZlYzhkOTRlZi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.UPVXbqAEtlyCHNuU7GU1ng1W9lVdx5jk4RC11JxEJ9s",
	},
	{
		name: "Goat",
		image: "https://static.wikia.nocookie.net/harrypotter/images/2/2a/Aberforth_Dumbledore_Goat_Patronus.png/revision/latest?cb=20170414021443",
	},
	{
		name: "Phoenix",
		image: "https://pm1.narvii.com/6637/37427aae588a0a37bf1181de39c1f263c3e8f212_00.jpg",
	},
	{
		name: "Fox",
		image: "https://pm1.narvii.com/6034/44211f30f906edf55d4f35706f87ed409d302137_00.jpg",
	},
	{
		name: "Otter",
		image: "https://static.wikia.nocookie.net/harrypotter/images/f/f3/Hermione_Otter_Patronus.png/revision/latest?cb=20170109003508",
	},
];

export function getRandomPatronus(): IPatronus {
	return patronuses[Math.floor(Math.random() * patronuses.length)];
}

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
