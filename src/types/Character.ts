import mongoose, { Document, Schema } from "mongoose";

import { IWand } from "./Wand";

export interface ICharacter extends Document {
	userId: string;
	xp: number;
	wand: IWand;
}

export const CharacterSchema: Schema = new Schema({
	userId: String,
	xp: Number,
	wand: {},
});

export const Character = mongoose.model<ICharacter>("character", CharacterSchema);
