//This Code was written by Falk Bosse in 2020 and may not be used without permission
//(c)2020-2022 Falk Bosse

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
const tr = require("./triggers.json").triggers;
var ignore = false;

const COMMAND = require('./commands');
const cmd = new COMMAND(client);
//const { botlog } = require('./essentials');

client.on(`ready`, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  botlog(`Start beendet\nAngemeldet als ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'idle' });
  botlog(`Status gesetzt!`);
  //if(process.argv[2] == "--test") {exit(0);};
});

client.on(`message`,message => msg(message, client));

function msg(message) {
    ignore = cmd.getignore();
    if(message.channel.type == "dm" && message.author.id == `447736081409114113` && message.content == 'start') {
        message.channel.send(`Starte`);
        client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'idle' });
        ignore = false;
        cmd.setignore(ignore);
        console.log("Starte!");
    } else {
    if(ignore != true) {
        client.user.setPresence({ activity: { name: 'dem Server zu', type : "WATCHING" }, status: 'idle' });
    if(message.author.bot) {
    } else {
    if(message.channel.type == "dm" && message.author.bot == false) {
        message.channel.send(`Bitte schreibe nicht den Bot, sondern seinen Entwickler an, wenn du Fehler gefunden hast oder Hilfe brauchst! \n Entwickler: Computerfreak14#0014`);
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
    var con = message.content; //Extract the message content
    if(con.substring( 0, 1) == `!`) {cmd.engine(message)} else {
        var cons = con.split(' ');
        if(cons.length >= 50) {} else {
        for(i = 0; i < cons.length && (ignore == false); i++) {
            conis = cons[i].split("\n");
            console.log(conis);
            for(k = 0; k < conis.length && (ignore == false); k++) {
                if(conis[k] !== null && conis[k] !== "") { sessraw = conis[k];
                console.log(sessraw);
            var sess = sessraw.toLowerCase();
            console.log(sess);
            for(j = 0; j != tr.length; j++) {
                if(sess == tr[j].key) {
                    message.channel.send(tr[j].react)
                }
            };
        }
            /*switch(sess) {
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
            }*/
        }}}
    }
}}
}}}}}

client.on(`error`, err => {
    console.log(err);
    fs.writeFileSync(path.join(__dirname, "errorlog.txt"), err);
    restart();    
});

if(process.argv[2] == "--test") {client.login(process.argv[3])} else {client.login(tokens.run);}

function botlog(log) {
    client.channels.fetch('751805985429127178')
                    .then(channel => channel.send(`Event:\n${log}`));
}
function restart() {
    const subprocess = spawn(`bash`, [`/bot/restart.sh`], {
        detached: true,
        stdio: 'ignore'
      });
      subprocess.on("error", error => {console.log(error); subprocess.kill();});
      
      subprocess.unref();
}
module.export = { client };