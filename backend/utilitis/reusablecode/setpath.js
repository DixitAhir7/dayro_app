const fs = require('fs');
const path = require('path');

const setPath = (fspath) => {

    fspath = path.join(__dirname, fspath);

    if (fspath && !fs.existsSync(fspath)) {
        fs.mkdirSync(fspath)
    };
    return fspath;
};


// const detectdateobj = (dateobj) => {
//     if (dateobj === new Date()) {
//         dateobj.toISOString().split("T")[0]
//     } else console.log("couldn't run the operation on date object");
// };

module.exports = { setPath };