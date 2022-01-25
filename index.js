// Importing Modules
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require('dotenv').config();

// Custom Functions - To keep main file clean
const BankHols = require('./functions/bankHolidays');
const yearProgress = require('./functions/yearProgress');
const diff = require('./functions/diffLines');
const league = require('./functions/league');

// Designating User Prefix
const prefix = "!";

// Adding CLI Output
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// Adding a Function
client.on("messageCreate", async function(message) {
    // If the bot sends a message, do nothing
    if (message.author.bot) return;
    // If the user sends a message without the prefix, do nothing | Unless the word contains diff then reply with diff reply
    if (!message.content.startsWith(prefix) & ((message.content).toLowerCase()).includes("diff")){
        // Uses the GenerateDiff function to read a random line from the text file and replys to the message with the random line
        message.reply(diff.GenerateDiff());
    }

    // Grabs the message, Removes the prefix, splits by space and then shifts the string to lowercase
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.trim().split(' ');
    const command = args.shift().toLowerCase();
    
    // Which commands are currently implemented
    const commands = ("The current commands implemented within the bot are as follows: Ping, Members, Bankhols, Bankhol, Yearprogress, Sourcecode, Help | Note that to use these commands prefix your message with a !");

    // Commands
    // Simple Ping Command
    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp;
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    } 
    // Members Command - When used the Bot will reply to your message with the member count of the server
    else if (command === "members") {
        message.reply(`There are ${message.guild.memberCount} members in this discord!`);
    } 
    // Bankhols Command - When used the bot will use the getHols Functions to reply with all the future bank holidays in England and Wales
    else if (command === "bankhols") {
        const holidays = await BankHols.getHols();
        message.reply(`The Future Bank Holidays are:${holidays}`);
    } 
    // Bankhol Command - When used it will act in the same way the Bankhols command does however only returns the next Bank Holiday
    else if (command === "bankhol") {
        const holiday = await BankHols.getHols();
        message.reply(`The Next Bank Holiday is:${holiday[0]}`)
    } 
    // Yearprogress Command - When used the command will use the DISPLAY function to return a status bar and percentage of how far through the year we are
    else if (command === "yearprogress") {
        const progress = yearProgress.DISPLAY();
        message.reply(`We are ${progress} through this year!`);
    } 
    // Simple Help Command - Returns all the availble commands in the bot | The variable in which this command lives is located on line 28 - commands variable
    else if (command === "help"){
        message.reply(commands);
    } 
    // Sourcecode Command - This command returns the github project location for the code
    else if (command === "sourcecode"){
        message.reply("The source code for this project can be found at: https://github.com/harryvince/discord-bot-node")
    }
    // League Runes
    else if (command === "runes"){
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        const options = args.toString().toLowerCase();
        await league.runes(options);
        const attachment = new Discord.MessageAttachment("screenshot.jpg");

        message.channel.send(`Runes for ${args}:`)
        message.channel.send({files: [attachment] });
    }
});

// Logging in the Discord bot
client.login(process.env.TOKEN);