const multer = require('multer');
const fs = require('fs');
const { setPath } = require('../utilitis/reusablecode/setpath');

/*
if req comes form blah.. function than as per request,
 change the folders to store images
*/

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir)
        }
        cb(null, dir)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage: storage });

module.exports = upload;