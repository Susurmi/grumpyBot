const discord = require('discord.js'); /* Importieren von Discord.JS */
const client = new discord.Client(); /* Erstellen eines neuen Discord Client */
const config = require('./config/config'); /* Laden der Config Datei */
const help = require('./config/help'); /* Laden der help Datei (info texte) */
const token = config.DISCORD_BOT.TOKEN; /* Laden des Bot Tokens auß der config Datei */
const cmdHelp = help.CMD.cmdDescription; /* Laden des Textes für den help Befehl */
const { isValidCommand, checkPermissionRole, rollDice, rollDice10} = require("./src/functions.js"); /* Importiere die Funktionen aus dem src Ordner */

/* Discord Bot Login mit dem angegebenen Token */
client.login(token);

/* Nach erfolgreichem Login */
client.on('ready', () => {
    console.log(`${client.user.tag} ist eingeloggt`)

    client.user.setPresence({
      status: 'online',
      activity: {
        name: "?help",
        type: "LISTENING"
      }
    });
});

/* Wenn ein User etwas schreibt */
client.on('message', (message) => {
  if(message.author.bot) return; /* */
  /* Der help Befehl (lädt den Text aus der help.json), löscht die Befehl Nachricht nach 0,5sek und löscht die cmdListe nach 30Sek */
  if(isValidCommand(message, "help")){
    message.delete({ timeout: 500 })
    message.channel.send(cmdHelp)
    .then(msg => {
      msg.delete({ timeout: 30000 });
  })
  }
  /* Führt beim würfeln Befehl die rollDice() Funktion aus (1-6) */
  else if(isValidCommand(message, "würfeln")) {
    message.reply("du hast eine " + rollDice() + " gewürfelt!");
  } 
  /* führt die rollDice10() Funktion aus (1-10) */
  else if(isValidCommand(message, "random")) {
    message.reply("du hast eine " + rollDice10() + " gewürfelt!");
  }
  /* Nutzer können sich mit diesem Befehl selber Rollen geben (außer diese Beinhalten administrative Rechte) */
  else if(isValidCommand(message, "role")){
    let args = message.content.toLowerCase().substring(6);
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() === args);
    if (role){ /* checkt ob der Nutzer die Rolle bereits hat und löscht die nachricht nach 5sek */
      if(message.member.roles.cache.has(role.id)){
        message.delete({ timeout: 1000 })
        message.channel.send("Du hast diese Rolle bereits.")
          .then(msg => {msg.delete({ timeout: 5000 });})
        return;
      }
      if(checkPermissionRole(role)){ /* Kontrolliert ob diese Rolle administrative Rechte hat */
          message.delete({ timeout: 1000 })
          message.channel.send("Du kannst dir diese Rolle nicht selber geben ;).")
          .then(msg => {msg.delete({ timeout: 5000 });})
        }
        else { /* fügt die Rolle hinzu */
          message.delete({ timeout: 1000 })
          message.member.roles.add(role)
            .then(member => message.channel.send(`Die Rolle ${role.name} wurde ${message.member.user.username} hinzugefügt`))           
            .then(msg => {msg.delete({ timeout: 5000 });})
            .catch(err => {
              console.log(err);
              message.channel.send("Etwas ist schiefgelaufen...");
            });
        }
    }
    else { /* Wenn es die Rolle nicht gibt / löscht die nachricht wieder */
      message.delete({ timeout: 1000 })
      message.channel.send("Rolle nicht gefunden.")
      .then(msg => {
        msg.delete({ timeout: 5000 });
    })
    }
  }
  /* Nutzer können mit diesem Befehl eine Rolle ablegen */
  else if(isValidCommand(message, "delrole")){
    let args = message.content.toLowerCase().substring(9);
    let { cache } = message.guild.roles;
    let role = cache.find(role => role.name.toLowerCase() === args);
    if (role){
      if(message.member.roles.cache.has(role.id)){
        message.delete({ timeout: 1000 })
        message.member.roles.remove(role)
            .then(member => message.channel.send(`${message.member.user.username} hat die Rolle ${role.name} abgelegt`))
            .then(msg => {msg.delete({ timeout: 5000 });})
            .catch(err => {
              console.log(err);
              message.channel.send("Etwas ist schiefgelaufen...");
            });
      }
    }
    else { /* Wenn es die Rolle nicht gibt / löscht die nachricht wieder */
      message.delete({ timeout: 1000 })
      message.channel.send("Rolle nicht gefunden.")
      .then(msg => {
        msg.delete({ timeout: 5000 });
    })
  }
}});