const express = require('express');
const cors = require('cors');
const upload = require('../middlewares/multer');
const sharp = require('sharp');
const Fs = require('fs');
const path = require('path');
const app = express();
const os = require('os');
const Crypto = require('crypto');
const Process = require('child_process');
const Stream = require('stream');
const Pdfkit = require('pdfkit');
const url = require('url');
const ms = require('ms');
const { calculateDays } = require('../utilitis/calculatetime');
const User = require('../apis/user/Usermodel');

console.log(ms("8h"));

// to identify user's system
// console.log("os:",os.version());

app.use(cors());

// console.log("days gap:", calculateDays("1954-12-31", "1954-15-34"))

app.get('/', async (req, res) => {
    res.send("dayro backend api tests");

    if (url === "/") {
        res.redirect('/')
    }
});

app.get('/test', async (req, res) => {
    res.send("testing")
});


app.post('/demo', async (req, res) => {
    const doc = req.body; // validate in real code
    // const r = await coll.insertOne(doc);
    // res.status(201).json({ id: r.insertedId });
});


app.post('/upload', upload.single('image'), (req, res) => {
    try {
        const imageUrl = `uploads/${req.file.filename}`;
        res.status(200).json({ message: 'Uploaded successfully', imageUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// write strict in all js file
exports.writeStrcit = () => {
    Fs.readdir('.', (err, files) => {
        console.log("files:", files);
        files.forEach(file => {
            if (path.extname(file) === ".js") {
                Fs.appendFile(file, "'use strict'", () => {
                    return "ok"
                });
            };
        })
    });
};


app.get('/downloadpdf', async (req, res) => {
    const pdfPath = path.join(__dirname, "./dixit bariya.pdf");
    res.sendFile(pdfPath, (err) => {
        if (err) {
            console.log(err);
        }
    })
});

// Process.spawn("com");

// Fs.stat("/uploads", (err, stat) => {
//     console.log("stat:", stat);
// });

// console.log(path.extname(__filename));


// const makeinlowercase = async () => {
//     fs.readFile("/info/backendideasandissues.md", (err, data) => {
//         if(err) return err;
//         console.log(data);
//     })
// }

function newIcons() {
    console.log("new icons updated by microsoft")
};


app.listen(5000);