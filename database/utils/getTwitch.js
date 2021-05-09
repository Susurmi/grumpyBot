const fetch = require('node-fetch');
const Token = require('../models/token.js');
const ID = process.env.TWITCH_CLIENT_ID;
const secret = process.env.TWITCH_CLIENT_SECRET;

const getOAuthToken = async () => {
    const data = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${ID}&client_secret=${secret}&grant_type=client_credentials`, {
        method: 'POST'
    })
        .then(res => res.json())
    const OAuthToken = data.access_token;
    return OAuthToken;
}

const checkTwitchToken = async () => {
    const token = await Token.findOne({ type: 'OAuthToken'}, async (err, docs) => {
        if(err){
            console.log(err);
            return;
        }});

    if(token === null){
        const newToken = await Token.create({
            token: await getOAuthToken(),
            type: 'OAuthToken'
       });
        return newToken._id;
    }
    return token._id;
};

const getStreamerID = async (name) => {
    const tokenID = await checkTwitchToken();
    const currentToken = await Token.findById(tokenID);
    const data = await fetch(`https://api.twitch.tv/helix/search/channels?query=${name}`, { 
        method: 'GET',
        headers: {
            'Client-ID' : ID,
            'Authorization' : 'Bearer ' + currentToken.token
        }
     })
     .then(res => res.json())
     .catch(err => console.log(err))
     return data;
}

const searchDB = async () => {
    const streamerDB = await Streamer.findOne({ description: 'Streamerliste' }, async (err, docs) => {
        if(err){
            console.log(err);
            return;
        }
    })

    if(streamerDB === null){
        const newDB = await Streamer.create({       
        description: 'Streamerliste',
        streamer:[]
        })
        return newDB._id;
    }
    return streamerDB._id;
}

module.exports = { checkTwitchToken, getOAuthToken, getStreamerID, searchDB  };