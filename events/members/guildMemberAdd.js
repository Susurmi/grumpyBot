module.exports = (client, message) => {
        console.log("+ " + member.user.tag + "ist dem Server beigetreten.");
        let { cache } = member.guild.roles;
        let role = cache.find(role => role.name === "Mitglied");
        member.roles.add(role); // Adds the default role to members
    
        const welcomeMessage = new discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Willkommen ' + member.user.username + "!")
            .setDescription('Viel Spaß auf unserem Discord! 😁🎮')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter('grumpyBot by Susurmi');
    
        member.guild.channels.cache.find(i => i.name.toLowerCase() === 'willkommen').send(welcomeMessage);
    };
    
    module.exports.description = "Neues Server Mitglied" ;