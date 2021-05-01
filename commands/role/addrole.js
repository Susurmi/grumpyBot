const checkPermissionRole = (role) => role.permissions.has('ADMINISTRATOR') || role.permissions.has('KICK_MEMBERS') || role.permissions.has('BAN_MEMBERS') || role.permissions.has('MANAGE_GUILD') || role.permissions.has('MANAGE_CHANNELS');

module.exports = {
    run: async(client, message, args) => {
        let roleNames = args.split(", ");
        let roleSet = new Set(roleNames);
        let { cache } = message.guild.roles;
        roleSet.forEach(roleName => {
            let role = cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
            if(role) {
                if(message.member.roles.cache.has(role.id)) {
                    message.channel.send("Du hast diese Rolle bereits!");
                    return;
                }
                if(checkPermissionRole(role)) {
                    message.channel.send("Du kannst dir diese Rolle nicht geben.");
                }
                else {
                    message.member.roles.add(role)
                        .then(member => message.channel.send("Die Rollle wurde hinzugefügt!"))
                        .catch(err => {
                            console.log(err);
                            message.channel.send("Etwas ist schief gelaufen...");
                        });
                }
            }
            else {
                message.channel.send("Rolle nicht gefunden!");
            }
        });
    },
    aliases: ['roleadd', 'role', 'rolle'],
    description: 'Fügt eine Rolle hinzu'
}