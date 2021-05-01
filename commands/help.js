const info = "```Diese Befehle sind in der aktuellen Version verfügbar: \n\n?wetter [Stadt] - Zeigt einen Wetter Bericht für die angegebene Stadt\n?würfeln - Würfel einen normalen 6 seitigen Würfel \n?random - Generiert eine zufällige Zahl zwischen 1 und 10 \n?role [Rolle] - füge dich einer Rolle hinzu. \n?delrole [Rolle] - Entferne eine deiner Rollen. \n\n(Diese Nachricht löscht sich nach 30 Sekunden.)```";

module.exports = {
    run: async(client, message) => {
        message.delete({ timeout: 500 })
        message.channel.send(info)
        .then(msg => {
          msg.delete({ timeout: 30000 });
      })
    },
    aliases: ['hilfe', 'info'],
    description: 'Befehl Informationen'
}