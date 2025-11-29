const fs = require('fs');
const path = require('path');

// const readFile = (req, res) => {
//     const filePath = path.join(__dirname, 'test.json');
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return res.status(500).send('Error reading file');
//         }
//         res.json({data});
//     });
// };


const readFile = (req, res) => {
    res.status(200).json({
        name : 'rajveePithva',
        email: 'rajvee@gmail.com',
        favSong: ['untill i found you', 'you were good to me'],
        bestFriend : 'dixit -> just kidding'
    })
}

// const createdata = (req, res) => {
//     const {name} = req.body;
//     console.log(name)
//     res.status(200).json({
//         success: true,
//         data: { name }
//     });
// };

const getData = (req, res) => { 
     res.status(200).json({
        name : 'dixitahir',
        email: 'dixit@gmail.com',
    })   
}


module.exports = {readFile, getData}use stricuse strictuse strict'use strict'