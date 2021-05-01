# grumpyBot by Susurmi

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Credits](#credits)

## General info

I started this bot project for my discord server "Grumpy's".
All command responses are in german, so you might have to translate them to you're preferd language.
The commands themselves are using aliases, which are mostly german and english.

### Current features:

- help - Shows all commands and what they are doing
- wetter/weather [Stadt/city] - Shows the current weather for the served city
- würfeln/rollDice - generate a number between 1 and 6
- random - generate a number betweeen 1 and 10
- rolle/addrole - lets the user add a role to them selves (roles with certain persmissions are not working (admin/moderator))

## Technologies

Project is created with:

- Discord.JS
- NodeJS
- dotenv
- node-fetch
- table
- ansi-colors

## Setup

First create a .env file with :

```
BOT_TOKEN=<DISCORD-BOT-TOKEN>
PREFIX=<COMMAND-PREFIX>
OWMTOKEN=<OPEN-WEATHERMAP-TOKEN>
```

To run this project, install it locally using npm:

```
$ npm i
$ npm start
```

## Credits

Credits and special thanks to

- Anson the Developer - who's videos taught me how to work with discord.js
