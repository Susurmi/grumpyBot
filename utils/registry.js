const c = require('ansi-colors');
const fs = require('fs').promises;
const path = require('path');
const { checkCommandModule , checkProperties } = require('./validate');

const commandStatus = [
    [`${c.bold('Befehl')}`, `${c.bold('Status')}`, `${c.bold('Beschreibung')}`]
], eventStatus = [
    [`${c.bold('Event')}`, `${c.bold('Status')}`, `${c.bold('Beschreibung')}`]
];

async function registerCommands(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerCommands(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                try {
                    let cmdModule = require(path.join(__dirname, dir, file));
                    if(checkCommandModule(cmdName, cmdModule)) {
                        if(checkProperties(cmdName, cmdModule)) {
                            let { aliases } = cmdModule;
                            client.commands.set(cmdName, cmdModule.run);
                            if(aliases.length !== 0)
                                aliases.forEach(alias => client.commands.set(alias, cmdModule.run));
                            commandStatus.push(
                                [`${c.cyan(`${cmdName}`)}`, `${c.bgGreenBright('Befehl registriert')}`, `${cmdModule.description}`]
                            )
                        }
                    }
                }
                catch(err) {
                    console.log(err);
                    commandStatus.push(
                        [`${c.white(`${cmdName}`)}`, `${c.bgRedBright('Fehler')}`, '']
                    );
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    let files = await fs.readdir(path.join(__dirname, dir));
    // Loop through each file.
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory()) // If file is a directory, recursive call recurDir
            registerEvents(client, path.join(dir, file));
        else {
            // Check if file is a .js file.
            if(file.endsWith(".js")) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                    eventStatus.push(
                        [`${c.cyan(`${eventName}`)}`, `${c.bgGreenBright('Event registriert')}`, `${eventModule.description}`]
                    )
                }
                catch(err) {
                    console.log(err);
                    eventStatus.push(
                        [`${c.white(`${eventName}`)}`, `${c.bgRedBright('Fehler')}`, '']
                    );
                }
            }
        }
    }
}

module.exports = { 
    commandStatus, 
    eventStatus, 
    registerEvents, 
    registerCommands 
};