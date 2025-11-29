const express = require('express');
const app = express();
const addStrict = require('../try.js')

// this is important for frontEnd for client side rendering

app.use(express.static('./../frontEnd/public'));

app.get('/', (req, res) => {
    res.sendFile('about.html', {root : __dirname})
    // addStrict();
});

app.get('/artist/bookartist', (req, res) => {
    return 'selected artist for booking and send that data to profile if user conformed payment.    '
})

app.listen(9090, () => console.log('server has started'))use stricuse strictuse strict'use strict'