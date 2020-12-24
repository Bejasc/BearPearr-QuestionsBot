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

## Heroku Setup

1. Create a new Heroku App. Provide the app name and region. Match the app name to the value in your `package.json` as closely as possible
2. Select GitHub as the deployment method. Search for and connect to your target repository.
3. Select the branch to use. Enable Automatic deploys.
4. In the `Settings` tab, Select `Reveal Config Vars`, and provide your environment variables here. Refer to `src/config/env.example` for what keys are expected.
5. Press `Add buildpack` and provide the URL `https://github.com/zidizei/heroku-buildpack-tsc#v2.0`. This will enable Heroku to build and deploy the typescript contained in the `src/` directory.

# Deploy/Run the Bot

## Locally

1. Copy the env.example file
2. Add your own values to your new .env file. (The .env file is not stored in GitHub to protect your tokens and keep them secure)
3. In the terminal, run `npm run dev`

## Heroku

1. Refer to the Heroku Setup above.

### Suggestions

Allow Heroku to deploy from a github branch.
Maintain a separate branch for Production and Dev. Commit (And test) regularly with your dev branch, and merge your dev branch into the branch selected to build with heroku
Have a separate bot running in Discord, and provide it a different token - so that you can maintin a dev version locally, and prod version on Heroku. The same may apply to Mongo.
