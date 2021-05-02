const { getTwitch } = require("../../utils/getTwitch")

module.exports = {
    run: async(client, message, args) => {
        if(args === 'shuffle' || 'daniel'){
            const status = await getTwitch("ShuFFI_e");
            if(status.data[0].is_live === false ){
            message.channel.send('Daniel ist offline');
            }else{
            message.channel.send("Daniel ist online")
            }
        }else{
            message.channel.send("Nicht gefunden")
        }
    },
    aliases: ['live'],
    description: 'Twitch live check'
}