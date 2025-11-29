const Razorpay = require('razorpay');
const app = require('express')();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
});

app.post('/order', async (req, res) => {

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: "any unique id for every order",
        payment_capture: 1
    };

    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount,
        })
    } catch (err) {
        res.status(400).send('Not able to create order. Please try again!', err);
    }
});


const crypto = require('crypto')

const secret_key = process.env.RAZORPAY_SECRETWEBHOOK

app.post('/paymentCapture', (req, res) => {
    const data = crypto.createHmac('sha256', secret_key)

    data.update(JSON.stringify(req.body))

    const digest = data.digest('hex')

    if (digest === req.headers['x-razorpay-signature']) {
        res.json({
            status: 'ok'
        })
    } else {
        res.status(400).send('Invalid signature');
    }
})use stricuse strictuse strict'use strict'