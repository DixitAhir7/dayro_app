const asyncHandler = require("express-async-handler");
const razorpay = require("../../../config/razorpayConfig");


const refundpayment = asyncHandler(async (req, res) => {
    async (payment_id) => {
        const refund = await razorpay.payments.refund(payment_id, {
            amount: 500 * 100,
            speed: "optimum"
        });

        return refund;
    }
});

module.exports = {
    refundpayment
};