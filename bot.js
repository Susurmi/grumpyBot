require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', "REACTION"]});
const { registerCommands, registerEvents } = require('./utils/registry');
const { mongoDB } = require('./database/database.js');
const { renewOAuth, checkTwitch } = require('./database/utils/twitchCron.js');
 
(async () => {
    await mongoDB();
    await renewOAuth();
    checkTwitch();
    client.login(process.env.TEST_TOKEN);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');
})();