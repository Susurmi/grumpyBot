const { renewOAuth, checkTwitch } = require('../database/utils/twitchCron.js');

const startSchedule = async (client) => {
    const bot = client;
    renewOAuth.start();
    await checkTwitch(bot);
};

module.exports = { startSchedule };