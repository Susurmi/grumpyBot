const cron = require('node-cron');
const fetch = require('node-fetch');
const { checkTwitchToken,  getOAuthToken} = require('./getTwitch.js');
const Token = require('../models/token.js');
const ID = process.env.TWITCH_CLIENT_ID;


const renewOAuth = async () => {
    cron.schedule('*/30 * * * *', async () => {
        const newToken = await getOAuthToken();
        const tokenID = await checkTwitchToken();

        await Token.findByIdAndUpdate(tokenID, {token: newToken}, (error, data) => {
            if(error){
                console.log(error)
            }
        });

        console.log('*** Neuen Token in die Datenbank gespeichert ***')
      }); 
};

const checkTwitch = async () => {
    cron.schedule('*/10 * * * *', async () => {
    const tokenID = await checkTwitchToken();
    const currentToken = await Token.findById(tokenID);
    const data = await fetch("https://api.twitch.tv/helix/search/channels?query=ShuFFI_e", { 
        method: 'GET',
        headers: {
            'Client-ID' : ID,
            'Authorization' : 'Bearer ' + currentToken.token
        }
     })
        .then(res => res.json())
        .catch(err => console.log(err))
    return console.log(data);
    })
}

module.exports = { renewOAuth, checkTwitch };