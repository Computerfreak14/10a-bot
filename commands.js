const Discord = require('discord.js');

function engine(message) {
    if(!(message instanceof Discord.message)) return(null);
message.typeof(Discord.message);
var con = message.content; //Extract the message content

    var cons = con.split(' ');
    if(cons.length >= 2) {
    for(i = 2; i != cons.length; i++) {
        cons[1] += " ";
        cons[1] += cons[i];
    }
}
    var comm = cons[0].substring(1).toLowerCase();
    console.log(cons) + `\n`;
    switch(comm) {
        case `ping` :
            message.channel.send(``, {
                embed: {
                    title : "Pong",
                    description : message.author.username,
                thumbnail: {
                     url: AvatarURL(message.author),
                  }
               },
            });
            botlog(`Ping von ${message.author.username}`);
        break;
        case `tts` : 
        case `announce`:
            var m = cons[1];
            client.channels.fetch('741947643583922176')
                .then(channel => channel.send(`Ankündigung von ${message.author.username}: \n${m} \n @everyone`, {"tts" : true}));
                botlog(`Ankündigung von ${message.author.username}`);
        break;
        case `logo` :
            message.channel.send(`${message.channel.guild.iconURL()}`);
            botlog(`Logo von ${message.author.name} angefordert!`);
        break;
        case "cloud" :
            message.channel.send(``, {
                embed: {
                    url : "https://wolke.gymsob.info",
                    title : "GymSob Wolke",
                    description : "Schulcloud",
                  image : {
                      url : "https://portal.gymsob.info/gsip/img_iscreen/logo-gymsob.png"
                  },
                  provider : {
                      name : "GymSob Infoportal",
                      url : "https://portal.gymsob.info"
                  },
                  type : "rich"
               }
            });
            botlog(`Cloudlink von ${message.author.name} ausgegeben!`);
        break;
        case "av" :
            var user;
            var users = message.mentions.users.array();
            console.log(users);
            if(users[0] == null) {
                user = message.author;
            } else {
                user = users[0];
            }
            var url = AvatarURL(user);
            console.log(`URL:\n${url}`);
            message.channel.send(``, {
                embed: {
                    title : user.username,
                image: {
                     url: url,
                     height : 256,
                     width : 256
                  }
               },
               type: "image"
            });
            botlog(`Avatar von ${message.author.name} abgefragt`);
        break;
        case "addemoji" :
            message.channel.guild.emojis.create(AvatarURL(message.author), `bot_` + message.author.username);
            message.channel.send(`Emoji erstellt!`);
            botlog(`Emoji erstellt von ${message.author.username}`);
        break;
        case "wiki" :
            wikisearch(cons[1], message);
            botlog(`${message.author.name} hat auf Wikipedia nach ${cons[1]} gesucht!`);
        break;
        case "credits" :
            case "credit" :
                message.channel.send(``, {
                    embed: {
                        title : "Credits 9A Bot",
                        description : "Geschrieben von\nFalk Bosse\naka. Computerfreak_14\n\nAbhängigkeiten:\n Discord.js by DiscrdJS\nXMLHTTPRequest for NodeJS by npm"
                   }
                });
                botlog(`Credits von ${message.author.name} abgefragt!`);
            break;
            case "help" :
            case "hilfe":
                    var help = "\`\`!credits : Zeige die Credits\n!wiki : Suche etwas auf Wikipedia\n!addemoji : mache deinen Avatar zu einem Server-Emoji\n!av : lass dir den Avartar von dir oder einem anderen Nutzer zeigen\n!cloud : Lass den Cloud-Link in den Chat schreiben\n!deleteemoji: Lass den aktuellen Emoji deines Avatars löschen!\n!logo :  Lass das Serverlogo in den Chat schicken\n!ping : Pinge den Bot\`\`";
                message.channel.send(help);
                botlog(`Hilfe von ${message.author.name} ausgegeben!`);
            break;
            case "würfeln" :
            case "random" :
                var random = Math.round((Math.random() * 10));
                message.channel.send(``, {
                    embed: {
                        title : `Ergebniss für ${message.author.username}`,
                        description : `${random}`
                   }
                });
                botlog(`${message.author.name} hat einen Würfel geworfen!`);
            break;
            case "v":
            case "version":
                message.channel.send(`9A Bot V.${config.version}`);
                botlog(`${message.author.name} hat die version abgefragt`);
                break;
            case "reload":
                if(message.author.id == `447736081409114113`) {
                    message.author.createDM()
                     .then(ch => {ch.send("Starte Skript neu!");
                     console.log("Starte Bot neu!");
                     botlog("Bot wird neu gestartet!");
                    restart();
                })}
            break;
            case "stop":
                if(message.author.id == `447736081409114113`) {
                    verify("Bot stoppen", message.author, stop);
                }
            break;
            case `deleteemoji`:
                verify("Emoji löschen", message.author, demoji, message);
            break;
      }
    }

module.exports = {engine};