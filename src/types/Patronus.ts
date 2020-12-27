import mongoose, { Document, Schema } from "mongoose";

export interface IPatronus {
	name: string;
	image?: string;
	description?: string;
}
