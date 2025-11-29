const Razorpay = require("razorpay");

const { RAZORPAYKEYID, RAZORPAYKEYSECRET } = process.env;

const razorpay = new Razorpay({
    key_id: RAZORPAYKEYID,
    key_secret: RAZORPAYKEYSECRET
});

module.exports = razorpay;