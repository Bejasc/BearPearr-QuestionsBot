import * as Mongoose from "mongoose";

export interface MongoOptions {
	uri: string;
	password: string;
	dbname: string;
	options?: Mongoose.ConnectionOptions;
}

export interface BotOptions {
	token: string;
	owners?: string | string[];
	prefix: string;
}
