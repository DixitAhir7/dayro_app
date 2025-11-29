const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function uploadpics(req, res, { user }) {

    const inputPath = path.join("uploads", req.file.filename);

    const outputPath = path.join(
        "uploads",
        `${path.parse(req.file.filename).name}_resized.jpg`
    );

    const imagePath = outputPath.replace(/\\/g, "/");

    await sharp(inputPath)
        .resize(300, 300)
        .jpeg({ quality: 99 })
        .toFile(outputPath);

    return user(imagePath);
};

export default uploadpics;