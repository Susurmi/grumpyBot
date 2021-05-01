const discord = require('discord.js')
const fetch = require('node-fetch');
const owmToken = process.env.OWM_TOKEN;
const { degToDirection} = require('../utils/direction');
const { unixToHMS } = require('../utils/timeCalc');

const getWeather = async (city, args) => {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=de&appid=${owmToken}`)
        .then(response => response.json());
    
    if(data.cod === 200){
        const temp = (Math.floor(data.main.temp));
        const icon = (data.weather[0].icon);

        const weatherMessage = new discord.MessageEmbed()
        .setColor('#FF9800')
        .setTitle(`Wetterbericht für ${data.name}`)
        .setDescription("Temperatureinheiten können manchmal abweichen")
        .addFields(
            { name: 'Temperatur', value:`${temp}° Celsius`,inline: true },
            { name: 'Wetter', value: `${data.weather[0].description}`, inline: true },
            { name: 'Luftfeuchtgikeit', value: `${data.main.humidity}`, inline: true },
        )
        .addFields(
            { name: 'Windgeschwindigkeit', value:`${Math.floor(data.wind.speed)} km/h`,inline: true },
            { name: 'Windrichtung', value: `${degToDirection(data.wind.deg)}`, inline: true },
            { name: 'Gemessen', value: `${unixToHMS(data.dt)}`, inline: true },
        )
        .setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`)
        .setTimestamp()
        .setFooter('grumpyBot by Susurmi');
        
        return weatherMessage;
    }
    else{
        const status = data.cod;
        return status;
    }
}

module.exports = { getWeather };