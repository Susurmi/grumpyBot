const { random10 } = require('../../utils/dicefn');

module.exports = {
    run: async(client, message) => {
        message.reply("du hast eine " + random10() + " gewürfelt!");
    },
    aliases: ['zufall'],
    description: 'Zufällige Zahl von 1 bis 10'
};
