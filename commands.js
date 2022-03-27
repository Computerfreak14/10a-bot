const { spawn } = require("child_process");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { exit } = require("process");
const Discord = require('discord.js');
var ignore = false;
const ffmpeg = require('ffmpeg-static');
const path = require("path");
const fs = require(`fs`);
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
//the class HAMILTON is found in hamilton.js
// set the constant "hamilton" to the class HAMILTON
let HAMILTON = require(path.join(__dirname, 'hamilton.js'));
const hamilton = new HAMILTON();
//console.log(hamilton);

//let temp = require('./essentials');
//const { this.botlog } = new temp(client)

class CMD {


    //Define variables "config" and "client"
    //config is the config file
    //client is the bot
    constructor(c, t) {this.client = c; this.config = require("./package.json"); this.test = t;}

engine(message) {
var con = message.content; //Extract the message content
console.log(message);

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
                     url: this.AvatarURL(message.author),
                  }
               },
            });
            this.botlog(`Ping von ${message.author.username}`);
        break;
        case `tts` : 
        case `announce`:
            var m = cons[1];
            this.client.channels.fetch('741947643583922176')
                .then(channel => channel.send(`Ankündigung von ${message.author.username}: \n${m} \n @everyone`, {"tts" : true}));
                this.botlog(`Ankündigung von ${message.author.username}`);
        break;
        case `logo` :
            message.channel.send(`${message.channel.guild.iconURL()}`);
            this.botlog(`Logo von ${message.author.name} angefordert!`);
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
            this.botlog(`Cloudlink von ${message.author.name} ausgegeben!`);
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
            var url = this.AvatarURL(user);
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
            this.botlog(`Avatar von ${message.author.name} abgefragt`);
        break;
        case "addemoji" :
            message.channel.guild.emojis.create(this.AvatarURL(message.author), `bot_` + message.author.username);
            message.channel.send(`Emoji erstellt!`);
            this.botlog(`Emoji erstellt von ${message.author.username}`);
        break;
        case "wiki" :
            this.wikisearch(cons[1], message);
            this.botlog(`${message.author.name} hat auf Wikipedia nach ${cons[1]} gesucht!`);
        break;
        case "credits" :
            case "credit" :
                message.channel.send(``, {
                    embed: {
                        title : "Credits 9A Bot",
                        description : "Geschrieben von\nFalk Bosse\naka. Computerfreak_14\n\nAbhängigkeiten:\n Discord.js by DiscrdJS\nXMLHTTPRequest for NodeJS by npm"
                   }
                });
                this.botlog(`Credits von ${message.author.name} abgefragt!`);
            break;
            case "help" :
            case "hilfe":
                    var help = "\`\`!credits : Zeige die Credits\n!wiki : Suche etwas auf Wikipedia\n!addemoji : mache deinen Avatar zu einem Server-Emoji\n!av : lass dir den Avartar von dir oder einem anderen Nutzer zeigen\n!cloud : Lass den Cloud-Link in den Chat schreiben\n!deleteemoji: Lass den aktuellen Emoji deines Avatars löschen!\n!logo :  Lass das Serverlogo in den Chat schicken\n!ping : Pinge den Bot\`\`";
                message.channel.send(help);
                this.botlog(`Hilfe von ${message.author.name} ausgegeben!`);
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
                this.botlog(`${message.author.name} hat einen Würfel geworfen!`);
            break;
            case "v":
            case "version":
                message.channel.send(`9A Bot V.${config.version}`);
                this.botlog(`${message.author.name} hat die version abgefragt`);
                break;
            case "reload":
                if(message.author.id == `447736081409114113`) {
                    message.author.createDM()
                     .then(ch => {ch.send("Starte Skript neu!");
                     console.log("Starte Bot neu!");
                     this.botlog("Bot wird neu gestartet!");
                    this.restart();
                })}
            break;
            case "stop":
                if(message.author.id == `447736081409114113`) {
                    this.verify("Bot stoppen", message.author, this.stop);
                }
            break;
            case `deleteemoji`:
                this.verify("Emoji löschen", message.author, demoji, message);
            break;
            case `play`:
                this.songcmd(message);
                this.botlog(`${message.author.name} hat eine Wiedergabe gestartet!`);
            break;
            //option "hamquote"
            case `hamquote`:
                this.hamquote(message);
                this.botlog(`${message.author.name} hat ein Hamiltonzitat abgefragt!`);
            break;
      }
    }

    wikisearch(search, msg) {
        var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && this.status == 200) {
           var res = JSON.parse(xhttp.responseText);
           console.log(res[3][0]);
           this.botlog(`Artikel gefunden! ${res[3][0]}`);
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
    
    AvatarURL(u) {
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
    
    verify(ver, u, goon, arg) {
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
    
    stop() {
        this.botlog("Bot wird gestoppt!");
        this.client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'invisible' });
        ignore = true;
    }
    
    demoji(message) {
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
                        this.botlog(`Emoji von ${message.author.name} gelöscht!`);
    }
    botlog(log) {
        if(this.test) {return} else {
        this.client.channels.fetch('751805985429127178')
                        .then(channel => channel.send(`Event:\n${log}`));
        }
    }
    getignore() {return(ignore);}
    setignore(i) {ignore = i;}

    //Function to connect to a given voicechannel vc and play a given file file
    play(message, file) {
        var vc = message.member.voice.channel;
        if(vc != null) {
            vc.join()
            .then(connection => {
                const dispatcher = connection.play(file);
                dispatcher.on("finish", () => {
                    //check if messages author is still in voicechannel
                    if(message.member.voice.channel != null) {
                        this.songcmd(message);
                    } else {
                    console.log("Stream beendet");
                    this.botlog(`Wiedergabe für ${message.author.name} beendet!`);
                    vc.leave(); 
                    }
                });
            })
            .catch(console.error);
        }
    }

    //Function to connect to a given voicechannel vc and play a given file file
    /*play(vc, file) {
        vc.join()
        .then(connection => {
            const dispatcher = connection.play(file);
            dispatcher.on('finish', () => {
                vc.leave();
            });
        })
        .catch(console.error);
    }*/

    hamquote(message) {
        //quote is the returned value of the function getrandomquote from the class HAMILTON
        var quote = hamilton.getrandomquote();
        //Send quote to channel
        message.channel.send(`${quote}`);
    }

    sleep(ms) {
        return new Promise((resolve) => {
          setTimeout(resolve, ms);
        });
      }

    async songcmd(message) {
        var songs = [];
                fs.readdir('./music', function(err, files) {
                    if(err) {console.log(err);} else {
                        console.log(files);
                        songs = files;
                    }
                });
                await this.sleep(1000);
                //file is a random objetc of the "songs" array
                let file = "./music/" + songs[Math.floor(Math.random() * songs.length)];
                console.log(file);
                //vc is the voicechannel the messages author is in
                //in vc play file
                this.play(message, file);
    }
}

module.exports = CMD;

function restart() {
    const subprocess = spawn(`bash`, [`/bot/restart.sh`], {
        detached: true,
        stdio: 'ignore'
      });
      subprocess.on("error", error => {console.log(error); subprocess.kill();});
      
      subprocess.unref();
}