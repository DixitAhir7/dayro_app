const ms = require("ms");

function calculateHours(startDate, endDate) {
    const start = startDate;
    const end = endDate;
    const milliseconds = Math.abs(end - start);
    const hours = milliseconds / (1000 * 60 * 60);
    return hours;
};



// count gap between from,to
function calculateDays(from, to) {
    const Day = ms("1d");

    const days = from - to;
    const roundedDate = Math.floor(days / Day);
    const delay = roundedDate * Day;
    return delay;
};

module.exports = { calculateHours, calculateDays };