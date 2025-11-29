const EventEmitter = require('events');
const customEvent = new EventEmitter();

customEvent.on('attempt', (data) => {
    return data;
});

const retry = (attempt = 0, data) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(attempt) && attempt <= 5) {
            resolve('ok i can retry', { ...data })
        };
        return reject('sorry maximum attempt reached')
    })
};

module.exports = { retry };



// retry to fetch apis automatically if failed