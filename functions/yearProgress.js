// Importing Modules


// Code

// Setting Env Variables Here instead
const LENGTH = 20;

// Converted BASH Code
// Percentage Function
function GET_PERCENTAGE() {
    const CURRENT_YEAR = new Date().getFullYear();
    const TOTAL_DAYS = days_of_a_year(CURRENT_YEAR);
    const CURRENT_DAY = GET_DAY_OF_YEAR();
    return(CURRENT_DAY*100/TOTAL_DAYS);
}

// Display Function
function DISPLAY(){
    const PERCENTAGE = Math.trunc(GET_PERCENTAGE());
    const FILLED = LENGTH*PERCENTAGE/100;
    const BLANK = LENGTH-FILLED;
    let BAR = "";
    for (i=0;i<FILLED;i++){
        BAR=`${BAR}▓`;
    }
    for (i=0;i<BLANK;i++){
        BAR=`${BAR}░`;
    }
    return(`${BAR} ${PERCENTAGE}%`);
}


// My Code
// Days Functions
function days_of_a_year(year) 
{
  return isLeapYear(year) ? 366 : 365;
}
function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}
function GET_DAY_OF_YEAR() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    return day;
}

// Exports
module.exports = { DISPLAY };