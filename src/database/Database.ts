import Mongoose = require("mongoose");

import { MongoOptions } from "../types/Config";
import { getCharacterForUser } from "../services/CharacterService";

export default class Database {
	public database: Mongoose.Connection;

	public constructor(public config: MongoOptions) {}

	public connect(): Mongoose.Connection {
		if (this.database) {
			console.error("Database connection is already active");
			return;
		}

		/*
		THE MONGO URI FOR CONNECTION IS GENERATED.
		Use the Mongo URI provided from Atlas AS IS. 
		Password and DBName are provided by config / environment variables
		*/

		const mongoUri = this.buildMongoUri();
		Mongoose.connect(mongoUri, this.config.options);

		this.database = Mongoose.connection;

		this.database.once("open", async () => {
			console.log(`Sucessfully connected to MongoDB (${this.config.dbname})`);
		});

		this.database.on("error", () => {
			console.log("Error connecting to MongoDB. Use the Mongo URI *AS IS* from Atlas, and provide your password and DB name as separate environment variables.");
		});
		return this.database;
	}

	public disconnect(): void {
		if (!this.database) {
			console.error("No database connection to disconnect from");
			return;
		}

		Mongoose.disconnect();
		console.log("Sucessfully disconnected from MongoDB");
	}

	public buildMongoUri(): string {
		let uri = this.config.uri;

		if (!uri) {
			console.error("ERR: Mongo URI has not been provided!");
			return;
		}

		uri = uri.replace("<password>", this.config.password).replace("<dbname>", this.config.dbname);

		return uri;
	}
}
