// Importing Axios for API requests
const axios = require('axios');

// Code
async function getHols() {
    const date = new Date();
    var holidays = [];
    const context = await axios.get('https://www.gov.uk/bank-holidays.json');
    for await(let number of context.data["england-and-wales"]["events"]){
        var check = Date.parse(number["date"]);
        if(check > date){
            holidays.push(` ${number.title}: ${number.date}`);
        }
    }
    return holidays;
}

// Exports
module.exports = { getHols };