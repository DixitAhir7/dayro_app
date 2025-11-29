const { default: mongoose } = require("mongoose");

const otpSchema = new mongoose.Schema({

    email: {type: String},
    otp: {
        type: Number
    },

    expiresAt: {
        type: Date
    }
});

const otpModel = mongoose.model('otpmodel', otpSchema);

module.exports = otpModel;