import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { User, Message } from "discord.js";
import { join } from "path";
import { Command } from "discord-akairo";
import { BotOptions } from "../types/Config";

declare module "discord-akairo" {
	interface AkairoClient {
		commandHandler: CommandHandler;
		listenerHandler: ListenerHandler;
	}
}

export default class BotClient extends AkairoClient {
	public config: BotOptions = {
		token: process.env.BOT_TOKEN,
		owners: process.env.BOT_OWNER,
		prefix: process.env.BOT_PREFIX,
	};

	public constructor(cfg: BotOptions) {
		super({
			ownerID: cfg.owners,
		});
	}

	public listenerHandler: ListenerHandler = new ListenerHandler(this, {
		directory: join(__dirname, "..", "listeners"),
	});

	public commandHandler: CommandHandler = new CommandHandler(this, {
		directory: join(__dirname, "..", "commands"),
		prefix: this.config.prefix, //undefined when compiled
		allowMention: true,
		handleEdits: true,
		commandUtil: true,
		commandUtilLifetime: 3e5,
		defaultCooldown: 6e4,
		argumentDefaults: {
			prompt: {
				modifyStart: (_: Message, str: string): string => `${str}\n\nType cancel to cancel the command`,
				modifyRetry: (_: Message, str: string): string => `${str}\n\nType cancel to cancel the command`,
				timeout: "Command timed out.",
				ended: "Command failed.",
				cancel: "Command cancelled",
				retries: 3,
				time: 3e4,
			},
			otherwise: "",
		},
		ignorePermissions: this.config.owners,
	});

	private async _init(): Promise<void> {
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.setEmitters({
			commandHandler: this.commandHandler,
			listenerHandler: this.listenerHandler,
			process,
		});

		this.commandHandler.loadAll();
		this.listenerHandler.loadAll();
	}

	public async start(): Promise<string> {
		await this._init();
		return this.login(this.config.token);
	}
}
