const discord = require('discord.js');

module.exports = (client, member) => {
        console.log("+ " + member.user.tag + "ist dem Server beigetreten.");
        let { cache } = member.guild.roles;
        let role = cache.find(process.env.BASE_ROLE_ID);
        member.roles.add(role); // Adds the default role to members
    
        const welcomeMessage = new discord.MessageEmbed()
            .setColor('#FFFFFF')
            .setTitle('Willkommen ' + member.user.username + "!")
            .setDescription('Viel Spaß auf unserem Discord! 😁🎮')
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp()
            .setFooter('grumpyBot by Susurmi');
    
        member.guild.channels.cache.find(process.env.WELCOME_CHANNEL_ID).send(welcomeMessage);
    };
    
    module.exports.description = "Neues Server Mitglied" ;