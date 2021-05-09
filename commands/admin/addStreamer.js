const  {getStreamerID, searchDB } = require('../../database/utils/getTwitch.js');
const Streamer = require('../../database/models/streamer.js');

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("Du hast nicht das Recht diesen Befehl auszuführen.");
        }else{
            const twitchData = await getStreamerID(args);
            const id = twitchData.data[0].id;
            const streamerDB = await searchDB();
            const display_name = twitchData.data[0].display_name;
            const newStreamer = { display_name, id } ;
            await Streamer.findByIdAndUpdate(streamerDB, {
                $push: {
                    streamer: newStreamer
                }
            })
        }
    },
    aliases: ['newStreamer', 'addStream', 'addstreamer'],
    description: 'Neuen streamer hinzufügen'
}