module.exports = {
    run: async(client, message, args) => {
        let roleNames = args.split(", ");
        let roleSet = new Set(roleNames);
        let { cache } = message.guild.roles;
        roleSet.forEach(roleName => {
            let role = cache.find(role => role.name.toLowerCase() === roleName.toLowerCase());
            if(role) {
                if(message.member.roles.cache.has(role.id)) {
                    message.member.roles.remove(role)
                        .then(member => message.channel.send("Die Rolle(n) wurde entfernt!"))
                        .catch(err => {
                            console.log(err);
                            message.channel.send("Irgendwas ist schief gelaufen...");
                        });
                }
            }
            else {
                message.channel.send("Rolle nicht gefunden!");
            }
        });
    },
    aliases: ['deleterole', 'roledelete', 'derole'],
    description: 'Entfernt eine Rolle'
}