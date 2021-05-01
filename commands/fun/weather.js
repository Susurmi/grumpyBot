const { getWeather } = require('../../utils/weatherfn');
const { deUmlaut } = require('../../utils/deUmlaut');

module.exports = {
    run: async(client, message) => {let rawCity = message.content.toLowerCase().substring(message.content.indexOf(' ') +1);
    let city = deUmlaut(rawCity);
    let weatherMessage = await getWeather(city, rawCity);
    if(weatherMessage != 404){
      message.channel.send(weatherMessage);
    }else{
      message.delete({ timeout: 7000 })
      message.channel.send(`Die Stadt ${args} wurde nicht gefunden`)    
      .then(msg => {
        msg.delete({ timeout: 7000 });
      });
  }
    },
    aliases: ['wetter'],
    description: 'Wetter in [Stadt]'
}