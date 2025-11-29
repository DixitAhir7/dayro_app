const fs = require('fs');
const EventEmitter = require('events');
const reusablecode = require('../reusablecode/postrequests');

const events = new EventEmitter();

events.on('bakajiki', () => {
    // you can write logic here
    console.log('bakajiki event started')
})

events.emit('bakajiki'); /* event is fired */

const readFile = (req, res) => {
    const response = `this data recived on: ${new Date()}\n`
    fs.appendFile('file.txt',response, () => {
        res.json({
            name : 'express backend',
        })
    })
};

const data = (req,res) => {
    res.status(200).json({
        name : 'rajveePithva',
        email: 'rajvee@gmail.com',
        favSong: ['untill i found you', 'you were good to me'],
        bestFriend : 'dixit -> just kidding'
})};

const createData = (req, res) => {
   const productName = req.body;

   res.status(200).json({
    prName : productName
   })
};

module.exports = {data, readFile, createData};

// all logic in this fileuse stricuse strictuse strict'use strict'