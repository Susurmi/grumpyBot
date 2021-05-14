const CronJob = require('cron').CronJob;
const { checkTwitchToken,  getOAuthToken} = require('./getTwitch.js');
const Token = require('../models/token.js');
const livestream_channelID = process.env.LIVESTREAM_CHANNEL_ID;
const Streamer = require('../models/streamer.js');
const { getStreamData } = require('./getTwitch');

const renewOAuth = new CronJob('*/30 * * * *', async () => {
        const newToken = await getOAuthToken();
        const tokenID = await checkTwitchToken();

        await Token.findByIdAndUpdate(tokenID, {token: newToken}, (error, data) => {
            if(error){
                console.log(error)
            }
        });

        console.log('*** Neuen Token in die Datenbank gespeichert ***')
      }); 

const checkTwitch = async (client) => {
    const discord = client;
    const streamCheck = new CronJob('* * * * *', async (client = discord) => {

        const broadcastList = await Streamer.find({broadcaster: String});
            broadcastList.forEach(async (element, index) => {
            const streamer = element.name;
            const data = await getStreamData(streamer);
            const StreamData = data.data[0];
            if(StreamData === undefined){
                await Streamer.findByIdAndUpdate(element._id,
                    {
                        msgID: "false"
                    })
                    return;
            };
            let live = {
                "title": `🔴 ${StreamData.user_name} ist jetzt live`,
                "description": StreamData.title,
                "url": `https://www.twitch.tv/${StreamData.user_login}`,
                "color": 6570404,
                "fields": [
                    {
                        "name": "Spielt:",
                        "value": StreamData.game_name,
                        "inline": true
                    },
                    {
                        "name": "Zuschauer:",
                        "value": StreamData.viewer_count,
                        "inline": true
                    },
                    {
                        "name": "Twitch:",
                        "value": `(https://www.twitch.tv/${StreamData.user_login})`
                    },
                ],
                "footer": {
                    "text": 'grumpyBot by Susurmi'
                },
                "image": {
                    "url": `https://static-cdn.jtvnw.net/previews-ttv/live_user_${StreamData.user_login}-640x360.jpg?cacheBypass=${(Math.random()).toString()}`
                },
                "thumbnail": {
                    "url": element.pic
                }
            }; 
            const msgCheck = await Streamer.findById(element._id)
            if(msgCheck.msgID === "false"){ 
                await client.channels.cache.get(livestream_channelID).send({embed: live})
                .then(msg = async (msg) => {
                    await Streamer.findByIdAndUpdate(element._id,
                        {
                            msgID: msg.id
                        })})
                return;
            }else{
                await client.channels.cache.get(livestream_channelID).messages.fetch(msgCheck.msgID)
                    .then(m => {
                        const fetchedMsg = m;
                        fetchedMsg.edit({embed: live});
                    });
                    return;
            }});
        })
    streamCheck.start();
};

module.exports = { renewOAuth, checkTwitch };