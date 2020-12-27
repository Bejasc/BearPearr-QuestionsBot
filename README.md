# Bejasc - Discord Bot and Event System Sample

---

Discord bot using discord.js and discord-akairo.
This repo is to serve as an educational project for creating a Discord.JS Bot setup, enhanced with typescript.

The bot is able to maintain a connection to MongoDB Atlas, and features a robust event system, a character system, and various randomly generated embeds.
The bot is inpsired by BearPearr-QuestionsBot, and is provided with a Harry Potter inspired theme.

<p align="center">
  <br/>
  <br/>
  <a href= 'https://discord.gg/aqYHAH5GE5'><img src ="https://cdn.discordapp.com/attachments/744519449696141312/792729324423217182/drpg_shield.png"/> </a>
  <br/>
  Created by Bejasc of the <a href= 'https://discord.gg/aqYHAH5GE5'>Discord RPG Developers Community</a>.
</p>

---

# Bot Information

## Commands

`^!createuser <optional user tag>` - creates a user for you in mongo. Defaults to your own user. Administrator only. Will randomly generate a wand for the user also
`^!deleteuser <optional user tag>` - deletes the user. Defaults to your own user. Administrator only

`^wand` - Generates a random wand
`^patronus` - Generates a random patronus

`^!event <optional event name> <optional channel>` - triggers an event in a channel. Event will be chosen at random, unless specified. Channel defaults to the current channel. Administrator only.

`^char / ^flex` - Shows your wand and stats.

## Notes

### Structure

- The command files themselves are automatically registered. They intentionally do hardly anything at all.
- Most heavy lifting happens in the service. Some of the services talk to each other.
- Almost anything that happens should happen at a service level, and a service should not process anything outside of its own scope.
- Not normally part of JS, the interfaces (IEvent, IWand etc) exist to give you better intellisense and autocompletion when working with them, as well as type safety when working across functions.

### Event System

- The Event System could exist as one large function, but it's broken up into many smaller functions to be more readable and maintainable.
- The Event System will read all .json files in a particular directory. This happens on Startup. If you create or modify any events, you will need to restart node.
- If it can be parsed to an IEvent, it will be available to be randomly selected by the ^!event command.
- The Event System does not cover randomly sending an event to a channel, although this shouldn't be too hard to implement. (Timer, select channel, select event, call fireEvent(), repeat)

## Areas of Interest

### Event System (JSON)

- types/Event.ts
- services/EventService.ts
- database/events/\*.json
- commands/Admin Commands/FireEventCommand.ts

### XP System (MongoDB / Event System)

- types/Character.ts
- services/CharacterService.ts
- commands/PublicCommands/CharacterCommand.ts
  -types/Event.ts/result
- services/EventService.ts/processEventResults

### Character System (MongoDB)

- types/Character.ts
- services/CharacterService.ts
- types/Wand.ts
- services/WandService.ts

### Patronus System (JSON)

- types/Patronus.ts
- services/PatronusService.ts
- database/patronuses.json

---

# Environment Variables

The bot is configured to work through a number of envinroment variables that must be provided.

## Keys

- `BOT_TOKEN` - Bot token provided by Discord
- `BOT_OWNERS`- Discord ID (not tag) of the owner of the bot
- `BOT_PREFIX` - The key before all commands, e.g `!`
- `MONGO_URI` - Your Mongo URI as provided to you directly from MongoDB
- `MONGO_PASSWORD` - Password for the Mongo user you have created for the database provided above
- `MONGO_DBNAME` - Name of the database to be used

# Setup

1. Fork or clone the project
2. Adjust the values in `package.json`
3. Run 'npm install` to download dependencies

Refer to additional setup values below.

## Discord Setup

1. Navigate to `https://discord.com/developers/applications`
2. Create a New Application. Match the name to the value in your `package.json` as closely as possible
3. Navigate to the `Bot` tab, select `Add Bot`
4. Press `Copy` to take your Discord Token. Use this value as the `BOT_TOKEN` environment variable.
5. Navigate to the `OAuth2` tab. Select the `bot` scope.
6. Copy the URL generated, and navigate to it in your browser. Select the server to invite the bot into.

## Mongo DB Setup

1. Create a new Project in MongoDB
2. Create a free Cluster in that project
3. Select the appropriate region, and give the cluster a meaningful name
4. Create a mongo user for your cluster.
5. Find your mongo connection string, should appear similar to `mongodb+srv://bejasc:<password>@<cluster>.u6fxo.mongodb.net/<database>?retryWrites=true&w=majority`. Use this value as the `MONGO_URI` environment variable. Do not change this URI. `<password>` and `<dbname>` are provided by environment variables.

## Heroku Setup

1. Create a new Heroku App. Provide the app name and region. Match the app name to the value in your `package.json` as closely as possible
2. Select GitHub as the deployment method. Search for and connect to your target repository.
3. Select the branch to use. Enable Automatic deploys.
4. In the `Settings` tab, Select `Reveal Config Vars`, and provide your environment variables here. Refer to `src/config/env.example` for what keys are expected.
5. Press `Add buildpack` and provide the URL `https://github.com/zidizei/heroku-buildpack-tsc#v2.0`. This will enable Heroku to build and deploy the typescript contained in the `src/` directory.

# Deploy/Run the Bot

## Locally

1. Copy the env.example file and rename it to just .env
2. Add your own values to your new .env file. (The .env file is not stored in GitHub to protect your tokens and keep them secure)
3. In the terminal, run `npm run dev`

## Heroku

1. Refer to the Heroku Setup above.

### Suggestions

Allow Heroku to deploy from a github branch.
Maintain a separate branch for Production and Dev. Commit (And test) regularly with your dev branch, and merge your dev branch into the branch selected to build with heroku
Have a separate bot running in Discord, and provide it a different token - so that you can maintin a dev version locally, and prod version on Heroku. The same may apply to Mongo.
