// Importing Axios for API requests
const axios = require('axios');

// Code
async function getHols() {
    // Defining the Date and Holidays array to be pushed to
    const date = new Date();
    var holidays = [];
    // Make a get request against the bankholidays api using axios
    const context = await axios.get('https://www.gov.uk/bank-holidays.json');
    // Await the for loop while it goes through each piece of data in the englan-and-wales events section
    for await(let number of context.data["england-and-wales"]["events"]){
        // Parse the date in the json object
        var check = Date.parse(number["date"]);
        // Check the date is greater than today
        if(check > date){
            // If so push the title & date to the array
            holidays.push(` ${number.title}: ${number.date}`);
        }
    }
    // Return the upcoming holidays
    return holidays;
}

// Exports
module.exports = { getHols };