import mongoose, { Schema, Document } from "mongoose";

export interface IThing extends Document {
	name: string;
	description: string;
	image: string;
}

export const ThingSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	image: { type: String },
});

const Thing = mongoose.model<IThing>("Thing", ThingSchema);
export default Thing;
