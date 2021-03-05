//This Code was written by Falk Bosse in 2020 and may not be used without permission
//(c)2020-2021 Falk Bosse

const Discord = require(`discord.js`);
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client();
const path = require("path");
const fs = require(`fs`);
var tk = null;
if(fs.existsSync("./tokens.json")) {tk = require("./tokens.json");};
const tokens = tk;
const { spawn } = require("child_process");
const config = require("./package.json");
const { exit } = require("process");
var ignore = false;

client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  botlog(`Start beendet\nAngemeldet als ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'idle' });
  botlog(`Status gesetzt!`);
  if(process.argv[2] == "--test") {exit(0);};
});

client.on(`message`,message => msg(message));

function msg(message) {
    if(message.channel.type == "dm" && message.author.id == `447736081409114113` && message.content == 'start') {
        message.channel.send(`Starte`);
        client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'idle' });
        ignore = false;
        console.log("Starte!");
    } else {
    if(ignore != true) {
        client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'idle' });
    if(message.author.bot) {
    } else {
    if(message.channel.type == "dm" && message.author.bot == false) {
        message.channel.send(`Bitte schreibe nicht den Bot, sondern seinen Entwickler an, wenn du Fehler gefunden hast oder Hilfe brauchst! \n Entwickler: Computerfreak14#2709`);
    } else {
        if(message.channel.id == "741951462413828168" || message.channel.id == "741948876839321631" || message.channel.id == "741947643583922176" || message.channel.id == `751805985429127178`) {
            message.delete();
        } else {
    console.log(`Recieved a message from ${message.author.username} in #${message.channel.name} auf dem Server ${message.channel.guild.name}: \n${message.content} \n`);
    if(message.channel.name == "memes") {
        var url = AvatarURL(message.author);
        client.channels.fetch('741948876839321631')
        .then(channel => channel.send(``, {
            embed: {
                title : "Neues Meme",
                description : "Von " + message.author.username,
            thumbnail: {
                 url: url,
              }
           },
        }));
        botlog(`Neues Meme von ${message.author.username}`);
    } else {
    var con = message.content;
    if(con.substring( 0, 1) == `!`) {
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
        } else {
        var cons = con.split(' ');
        if(cons.length >= 50) {} else {
        for(i = 0; i != cons.length && (ignore == false); i++) {
            sessraw = cons[i];
            var sess = sessraw.toLowerCase();
            switch(sess) {
                case `lol` :
                    message.channel.send(`LOL, in <#${message.channel.id}> wird es wohl Lustig`);
                break;
                case `moin` :
                    message.channel.send(`Moin, ${message.author.username}`);
                break;
                case `max` :
                    message.channel.send(`<@535696286016339969>`);
                break;
                case `falk` :
                    message.channel.send(`<@${message.author.id}> spricht wohl von dem weisen Schöpfer meiner selbst.`);
                break;
                case `eddy` :
                    message.channel.send(`<@${message.author.id}>, wer ist dieser Eddy? \n Ich habe noch nie von ihm gehört.`);
                break;
                case `nice` :
                    message.channel.send(`<@390167445798912001> ist wohl mal wieder beeindruckt.`);
                break;
                case `präsident` :
                    message.channel.send(`<@${message.author.id}> wird wohl politisch.`);
                break;
                case "schacka" :
                    message.channel.send(`<@${message.author.id}> ist offenbar sehr glücklich.`);
                break;
                case `party` :
                    message.channel.send(`:tada: :tada: :tada: :tada:`);
                break;
            }
        }}
    }
}}
}}}}}

client.on(`error`, err => {
    console.log(err);
    fs.writeFileSync(path.join(__dirname, "errorlog.txt"), err);
    restart();    
});

function botlog(log) {
    client.channels.fetch('751805985429127178')
                    .then(channel => channel.send(`Event:\n${log}`));
}

function wikisearch(search, msg) {
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && this.status == 200) {
       var res = JSON.parse(xhttp.responseText);
       console.log(res[3][0]);
       botlog(`Artikel gefunden! ${res[3][0]}`);
       msg.channel.send(`Suchergebniss auf Wikipedia\n${msg.author}`);
       msg.channel.send(res[3][0]);
    }
};
var baseurl = "https://de.wikipedia.org/w/api.php?origin=*&action=opensearch&format=json&search=";
var requrl = baseurl + search;
console.log(requrl);
xhttp.open("GET", requrl, true);
xhttp.responseType = "JSON";
xhttp.send();
}

function AvatarURL(u) {
    var url = u.displayAvatarURL();
    var most = url.substr(0, url.length - 4);
    var ret = url;
    var urlg = most + `gif`;
    console.log(urlg);
    var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && this.status != 415) {
       ret = urlg;
    }
    console.log(ret);
    console.log("Anfragezyklus zu ende");
    
}
xhttp.open("GET", urlg, false);
xhttp.send();
return ret;
}

function restart() {
    const subprocess = spawn(`bash`, [`/home/pi/restart.sh`], {
        detached: true,
        stdio: 'ignore'
      });
      subprocess.on("error", error => {console.log(error); subprocess.kill();});
      
      subprocess.unref();
}

function verify(ver, u, goon, arg) {
    u.createDM()
    .then(ch => {ch.send(`Bitte Bestätigen:\n${ver}`)
.then(msg =>{
    console.log("Erfrage Bestatigung des Stopps");
    msg.react(`✔️`);
    const filter = (reaction, user) => reaction.emoji.name === '✔️' && user.id === '447736081409114113'
   msg.awaitReactions(filter, {"maxEmojis":1})
    .then(collected => {
        console.log(`Bestätigung erhalten!\n${ver}`);
        goon(arg);
    })
    .catch(console.error);
});

});}

function stop() {
    botlog("Bot wird gestoppt!");
    client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'invisible' });
    ignore = true;
}

function demoji(message) {
    var name = `bot_` + message.author.username;
                    console.log(name);
                    var emjs = Array.from(message.guild.emojis.cache.values());
                    emjs.forEach(emj => {
                        if(emj.name == name) {
                            emj.delete();
                            message.channel.send("Emoji gelöscht!");
                        }
                        console.log(`Durchlauf beendet\n${emj.name}`);
                    });
                    botlog(`Emoji von ${message.author.name} gelöscht!`);
}

if(process.argv[2] == "--test") {client.login(process.argv[3])} else {client.login(tokens.run);}