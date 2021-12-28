// Importing Modules
const fs = require('fs');
const path = require('path');

// Code
// Read the text file
function GenerateDiff() {
    try {
        const data = fs.readFileSync(path.resolve(__dirname, '../', 'data', 'diffLines.txt'), 'utf-8');
        const split = data.split(/\r\n/);
        const randomNumber = RandomNumber(split.length);
        return(split[randomNumber]);
    } catch(err){
        console.error(err);
    }
}

// Math Function
function RandomNumber(max) { 
    return Math.floor(Math.random() * max);
}

// Exports
module.exports = { GenerateDiff };