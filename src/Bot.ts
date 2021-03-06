import { BotOptions, MongoOptions } from "./types/Config";

import BotClient from "./client/BotClient";
import Database from "./database/database";
import { EventService } from "./services";

//import Database from "./database/Database";

require("dotenv-flow").config();

const botConfig: BotOptions = {
	token: process.env.BOT_TOKEN,
	owners: process.env.BOT_OWNER,
	prefix: process.env.BOT_PREFIX,
};

const dbConfig: MongoOptions = {
	uri: process.env.MONGO_URI,
	password: process.env.MONGO_PASSWORD,
	dbname: process.env.MONGO_DBNAME,
	options: {
		useNewUrlParser: true,
		useFindAndModify: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
};

export const client: BotClient = new BotClient(botConfig);
const database: Database = new Database(dbConfig);

client
	.start()
	.then(() => {
		database.connect();
		return console.log("Ready to go!");
	})
	.then(() => {
		EventService.loadEvents();
	})
	.catch((err) => {
		console.error(err);
	});
