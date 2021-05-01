const { rollDice } = require('../../utils/dicefn');

module.exports = {
    run: async(client, message) => {
        message.reply("du hast eine " + rollDice() + " gewürfelt!");
    },
    aliases: ['dice', 'rolldice', 'würfeln', 'würfel'],
    description: 'Einen 6 seitigen würfel werfen'
}