# discordjs-ts-template

Discord bot using discord.js and discord-akairo.
This repo is to be used as a template for quickly getting a Discord.JS Bot setup, enhanced with typescript.

The bot is able to maintain a connection to MongoDB Atlas.

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

## Mongo Atlas Setup

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

1. Run `tsc`
2. copy the `config/env.example` file into the generated `dist` directory
3. Populate the environment variables accordingly
4. Move your terminal into the `dist` folder and run `node bot.js`.

## Heroku

1. Refer to the Heroku Setup above.

### Suggestions

Allow Heroku to deploy from a github branch.
Maintain a separate branch for Production and Dev. Commit (And test) regularly with your dev branch, and merge your dev branch into the branch selected to build with heroku
Have a separate bot running in Discord, and provide it a different token - so that you can maintin a dev version locally, and prod version on Heroku. The same may apply to Mongo.
