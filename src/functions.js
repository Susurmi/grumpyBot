const config = require('../config/config.json'); /* Laden der Config Datei */
const prefix = config.DISCORD_BOT.PREFIX; /* Laden des Prefix für alle Botbefehle (in der Datei ändern um den prefix global zu ändern) */


/* Kontrolle ob der eingegebene Befehl ein Bot Befehl ist (checken des prefixes) */
const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(prefix + cmdName);
/* Kontrolle ob eine Rolle bestimmte "Administrative" Rechte hat */
const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');
/* Einfache zufalls Zahlen Funktionen (1-6 und 1-10) */
const rollDice = () => Math.floor(Math.random() * 6) +1;
const rollDice10 = () => Math.floor(Math.random() * 10) +1;

module.exports = { isValidCommand, checkPermissionRole, rollDice10, rollDice };