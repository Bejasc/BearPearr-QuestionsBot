export const WoodTypes = [
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

export const FormTypes = [
	"Very Flexible",
	"Quite Bendy",
	"Quite Flexible",
	"Fairly Bendy",
	"Slightly Springy",
	"Whippy",
	"Brittle",
	"Solid",
	"Hard",
	"Rigid",
	"Unbending",
	"Unyielding",
];

export const WandLength = ["9 Inch", "11 Inch", "12 Inch", "12.5 Inch", "13 Inch"];

export const CoreTypes = ["Dragon heartstring", "Phoenix feather", "Unicorn hair"];

export interface IWand {
	wood: string;
	form: string;
	length: string;
	core: string;
}
