let msg = {
    "title": `🔴 ${StreamData.user_name} ist jetzt live`,
    "description": StreamData.title,
    "url": `https://www.twitch.tv/${StreamData.user_login}`,
    "color": 6570404,
    "fields": [
        {
            "name": "Spielt:",
            "value": StreamData.game_name,
            "inline": true
        },
        {
            "name": "Zuschauer:",
            "value": StreamData.viewer_count,
            "inline": true
        },
        {
            "name": "Twitch:",
            "value": `(https://www.twitch.tv/${StreamData.user_login})`
        },
    ],
    "footer": {
        "text": 'grumpyBot by Susurmi'
    },
    "image": {
        "url": `https://static-cdn.jtvnw.net/previews-ttv/live_user_${StreamData.user_login}-640x360.jpg?cacheBypass=${(Math.random()).toString()}`
    },
    "thumbnail": {
        "url": `${StreamData.thumbnail_url}`
    }
}; 