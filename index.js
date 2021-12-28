// Importing Modules
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require('dotenv').config();

// Custom Functions - To keep main file clean
const BankHols = require('./functions/bankHolidays');
const yearProgress = require('./functions/yearProgress');

// Designating User Prefix
const prefix = "!";

// Adding CLI Output
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Adding a Function
client.on("messageCreate", async function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    // Which commands are currently implemented
    const commands = ("The current commands implemented within the bot are as follows: Ping, Members, Bankhols, Bankhol, Yearprogress, Help | Note that to use these commands prefix your message with a !");

    // Commands
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "members") {
        message.reply(`There are ${message.guild.memberCount} members in this discord!`);
    } else if (command === "bankhols") {
        const holidays = await BankHols.getHols();
        message.reply(`The Future Bank Holidays are:${holidays}`);
    } else if (command === "bankhol") {
        const holiday = await BankHols.getHols();
        message.reply(`The Next Bank Holiday is:${holiday[0]}`)
    } else if (command === "yearprogress") {
        const progress = yearProgress.DISPLAY();
        message.reply(`We are ${progress} through this year!`);
    } else if (command === "help"){
        message.reply(commands);
    }
});

// Logging in the Discord bot
client.login(process.env.TOKEN);