const { createStream } = require('table');
const tableConfig = require('../../utils/tableConfig');
const { commandStatus, eventStatus } = require('../../utils/registry');

module.exports = async (client) => {
    console.log(`${client.user.tag} ist eingeloggt.\n`);
    await loadTable(commandStatus, 50);
    console.log("\n");
    await loadTable(eventStatus, 50);
    console.log("\n");

    client.user.setPresence({
        status: 'online',
        activity: {
          name: "?help",
          type: "LISTENING"
        }
      });
}

module.exports.description = "Erfolgreicher Login" ;

function loadTable(arr, interval) {
    let fn, i = 0, stream = createStream(tableConfig);
    return new Promise((resolve, reject) => {
        fn = setInterval(() => {
            if(i === arr.length)
            {
                clearInterval(fn);
                resolve();
            }
            else {
                stream.write(arr[i]);
                i++;
            }
        }, interval); 
    })
}