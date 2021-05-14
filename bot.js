require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ partials: ['MESSAGE', "REACTION"]});
const { registerCommands, registerEvents } = require('./utils/registry');
const { startSchedule } = require('./schedules/schedule.js');
const { mongoDB } = require('./database/database.js');
 
(async () => {
    await mongoDB();
    await startSchedule(client);
    client.login(process.env.TEST_TOKEN);
    client.commands = new Map();
    client.cachedMessageReactions = new Map();
    await registerEvents(client, '../events');
    await registerCommands(client, '../commands');
})();