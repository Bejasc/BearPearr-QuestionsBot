import { MessageEmbed, User } from "discord.js";

const WoodTypes = [
	"Apple",
	"Alder",
	"Acacia",
	"Ash",
	"Aspen",
	"Beech",
	"Blackthorn",
	"Black Walnut",
	"Cedar",
	"Cheery",
	"Chestnut",
	"Cypress",
	"Dogwood",
	"Ebony",
	"Elder",
	"Elm",
	"English Oak",
	"Fir",
	"Hawthorn",
	"Hazel",
	"Hooly",
	"Hornbeam",
	"Larch",
	"Laurel",
	"Maple",
	"Pear",
	"Pine",
	"Poplar",
	"Red Oak",
	"Redwood",
	"Rowan",
	"Silver Lime",
	"Spruce",
	"Sycamore",
	"Vine",
	"Walnut",
	"Willow",
	"Yew",
];
function getRandomWood() {
	return WoodTypes[Math.floor(Math.random() * WoodTypes.length)];
}

const FormTypes = ["Very Flexible", "Quite Bendy", "Quite Flexible", "Fairly Bendy", "Slightly Springy", "Whippy", "Brittle", "Solid", "Hard", "Rigid", "Unbending", "Unyielding"];
function getRandomForm() {
	return FormTypes[Math.floor(Math.random() * FormTypes.length)];
}

const WandLength = ["9 Inch", "11 Inch", "12 Inch", "12.5 Inch", "13 Inch"];
function getRandomLength() {
	return WandLength[Math.floor(Math.random() * WandLength.length)];
}

const CoreTypes = ["Dragon heartstring", "Phoenix feather", "Unicorn hair"];
function getRandomCore() {
	return CoreTypes[Math.floor(Math.random() * CoreTypes.length)];
}

export interface IWand {
	wood: string;
	form: string;
	length: string;
	core: string;
}

export function generateWand(): IWand {
	const wand: IWand = {
		wood: getRandomWood(),
		form: getRandomForm(),
		length: getRandomLength(),
		core: getRandomCore(),
	};

	console.log(`Generated a ${wand.length} ${wand.wood} wand. It is ${wand.form} with a ${wand.core} core.`);

	return wand;
}

export function getWandEmbed(wand: IWand, member: User): MessageEmbed {
	const embed = new MessageEmbed();

	embed.setTitle("Wand");
	embed.setColor("#3b5998");

	embed.setDescription("This wand has been randomly generated.");
	embed.setAuthor(member.username, member.avatarURL());
	embed.setImage("https://pa1.narvii.com/5897/fada5e07108b5800cfa43fe894e6d6007d27129c_00.gif");

	embed.setDescription(
		`**It appears that the wand has found its Master, <@!${member.id}>.**
        You've obtained a **${wand.length}** wand, with a **${wand.core}** core.
        It's made out of the finest **${wand.wood}** Wood.
        Its build is **${wand.form}**. Good Job.`
	);

	embed.addField("Length", wand.length, true);
	embed.addField("Wood", wand.wood, true);
	embed.addField("Form", wand.form, true);
	embed.addField("Core", wand.core, true);

	return embed;
}
