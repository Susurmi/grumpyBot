const  { getChannelData } = require('../../database/utils/getTwitch.js');
const Streamer = require('../../database/models/streamer.js');

module.exports = {
    run: async(client, message, args) => {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send("Du hast nicht das Recht diesen Befehl auszuführen.");
        }else{
            const twitchData = await getChannelData(args);
            const broadcaster = twitchData.data;
            const match = broadcaster.forEach( async (element, index) => {
                const name = element.display_name.toLowerCase();
                if( name === args.toLowerCase()){
                    const newStreamer = await Streamer.create({
                        name: element.broadcaster_login,
                        msgID: "false"
                    })
                    return element;
                }else{

                    return;
                }
            });
        }
    },
    aliases: ['newStreamer', 'addStream', 'addstreamer'],
    description: 'Neuen streamer hinzufügen'
}