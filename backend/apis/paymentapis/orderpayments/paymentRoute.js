const paymentRoute = require('express').Router();
const { refundpayment } = require('../refunds/refunds');
const {
    fetchallpayments,
    fetchOrder,
    creatOrder,
    occasionTicket,
    capturePayment,
    createOrderpip,
    capturePaymentpip,
    refundPayment,
    fetchPayment
} = require('./paymentControler');


// route to create booked artist payment request
// paymentRoute.route('/pay/:bookformid').get(creatOrder);
// paymentRoute.post('/verify', capturePayment);
paymentRoute.get('/orders', fetchallpayments);
// paymentRoute.post('/refund/:paymentId', refundpayment);
// paymentRoute.get('/order/:id', fetchOrder);
paymentRoute.get('/payment/:order_id', fetchPayment);
// paymentRoute.get('/occasionrecipt', occasionTicket);
paymentRoute.get('/pay/pip', createOrderpip);
paymentRoute.post('/pay/pip/capture', capturePaymentpip);
paymentRoute.post('/pay/refund/:id', refundPayment);

module.exports = paymentRoute;