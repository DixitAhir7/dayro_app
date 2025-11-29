const sharp = require("sharp");
const path = require('path');

const modifiedimg = async (filename, buffer, imgfilespath) => {

    filename = `resized-${Date.now()}-${path.parse(filename).name}.jpg`;
    const idk = await sharp(buffer)
        .resize(500, 500)
        .jpeg({ quality: 99 })
        .toFile(imgfilespath, filename);
        console.log("sharp:", idk);
};

module.exports = { modifiedimg };