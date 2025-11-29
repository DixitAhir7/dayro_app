const path = require('path');
const fs = require('fs');

// check extension of curent file if .js? then at 1 add the line

const enableeslint = async () => {
    const checkext = path.extname(__filename);

    if (checkext === ".js") {
        fs.writeFile(checkext, "/* eslint-disable no-undef */", "utf8", (err) => {
            if (err) console.log(err)
        })
    };
};

module.exports = { enableeslint };

// const fsdir = await fs.opendir("/", (err, dir) => {
//     if (err) console.log(err);
//     return console.log(dir)
// })

// fs.realpath("/backend", (err, fpath) => {
//     if (err) console.log(err);

//     return console.log(fpath);
// });