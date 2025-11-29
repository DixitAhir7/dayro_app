const crypto = require('crypto');
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// functions for encrypt data when recive and send to user by decrypting it 
const iv = crypto.randomBytes(16);

function encrypt(data) {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", "783a189afb0daa31d7680d5cac91a3db", iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf-8");
    return decrypted;
};

// const messsage = "when this will be out in public and they'll try it?"
// const encrypted = encrypt(messsage);
// const decrypted = decrypt(encrypted);

// console.log({ encrypted, decrypted });

module.exports = { encrypt, decrypt };