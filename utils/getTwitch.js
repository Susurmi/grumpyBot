const fetch = require('node-fetch');
const ID = process.env.CLIENT_ID;
const secret = process.env.CLIENT_SECRET;

const getOAuth = async () => {
    const token = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${ID}&client_secret=${secret}&grant_type=client_credentials`, {
        method: 'POST'
    })
        .then(response => response.json())
    const accToken = token.access_token;
    return accToken;
};


const getTwitch = async (streamer) => {
    const OAuth = await getOAuth();
    const data = await fetch(`https://api.twitch.tv/helix/search/channels?query=${streamer}`, { 
        method: 'GET',
        headers: {
            'Client-ID' : 'zg1kz2ir7apltl1e289c2lq8b88mob',
            'Authorization' : 'Bearer ' + OAuth
        }
     })
        .then(response => response.json())
    return data;
};

module.exports = { getTwitch };