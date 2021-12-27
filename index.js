// Importing Modules
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require('dotenv').config();

// Designating User Prefix
const prefix = "!";

// Adding CLI Output
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Adding a Function
client.on("messageCreate", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // Ping Command
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } else if (command === "members") {
        message.reply(`There are ${message.guild.memberCount} members in this discord!`);
    }
});

// Logging in the Discord bot
client.login(process.env.TOKEN);