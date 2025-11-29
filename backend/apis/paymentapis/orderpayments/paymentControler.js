const asyncHandler = require('express-async-handler');
const { RAZORPAYKEYSECRET, RAZORPAY_WEBHOOKSECRET } = process.env;
const crypto = require('crypto');
const { validateWebhookSignature, validatePaymentVerification, } = require('razorpay/dist/utils/razorpay-utils');
const Beartist = require('../../artists/beartists/beartistmodel');
const notificationmodel = require('../../../utilitis/notifications/notificationmodel');
const bookForm = require('../../artists/bookartistformbyuser/bookFormModel');
const razorpay = require('../../../config/razorpayConfig');
const Pdfkit = require('pdfkit');
const fs = require('fs');
const { ObjectId } = require('mongodb');
const { v4 } = require('uuid');


/**
 * @example
 * https://razorpay.com/docs/api/payments/recurring-payments/upi/create-authorization-transaction/#112-create-an-order
 * https://docs.pagos.ai/getting-started/getting-started-with-pagos
*/


/**
 * @description
 * bookformid and artistid who selected request from booked artist
 * amount from artist's model who accepted
 * Create Transfers From Payments,
transfer amount from user to selected artist's razorpay account
*/


const creatOrder = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { bookformid } = req.params;

    const findbookedartist = await bookForm.findById(bookformid).populate('artistInfo');

    const paywhoselected = await notificationmodel.findOne({ artist: new ObjectId(findbookedartist.artistInfo._id) }).populate('artist');

    // add 2% in every transaction, vary based on artist's price after🧞‍♀️
    const calculatedAmount = paywhoselected.artist.price * 0.02 * 100

    // hold transfers until payment is done or maybe payment is transfered into my account

    // when all artits that user booked has selected or declined then ask user to pay amount
    if (findbookedartist.allSelected) {
        const order = await razorpay.orders.create({
            amount: 500 * 100,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            partial_payment: false,
            // transfers: [
            //     {
            //         account: paywhoselected.artist.linkedAccountId,
            //         amount: paywhoselected.artist.price,
            //         currency: "INR",
            //         on_hold: 0
            //     }
            // ]
        });

        return res.success(order, "payment box has been created with params", 201);
    };
});


/**
 * @ignore
 * user should pay combined price
 * then it should directly send to artist as per price
 */

const capturePayment = asyncHandler(async (req, res) => {

    const userid = req.user.id;

    const { bookformid, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generated_signature = crypto
        .createHmac('sha256', RAZORPAYKEYSECRET)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // console.log(razorpay_payment_id);
    // console.log(generated_signature);
    // console.log(razorpay_signature);

    // 🧞‍♀️
    validatePaymentVerification({
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
    }, razorpay_signature, RAZORPAYKEYSECRET);

    if (generated_signature == razorpay_signature) {
        await bookForm.findByIdAndUpdate(bookformid, {
            $set: { isPayment: true }
        });

        // to show bookedform's data in artist's profile 🧞‍♀️
        await Beartist.findByIdAndUpdate(findArtist, {
            $addToSet: {
                bookedby: bookformid
            }
        });
        res.json({ success: true, message: 'Payment verified successfully' });
    } else {
        res.fail(400, "Invalid signature");
    };
});



const fetchallpayments = asyncHandler(async (req, res) => {
    // const { payment_id, from, to } = req.body;

    const getpayments = await razorpay.orders.all();
    // console.log(getpayments);

    return res.success(getpayments, "paymnents data recived sucefully", 200);
});


// getpayment of user in profile`
const fetchOrder = asyncHandler(async (req, res) => {

    const userid = req.user.id;
    const { order_id } = req.params;

    const paymentdetail = await razorpay.orders.fetch(order_id);
    console.log(paymentdetail);

    return res.success(paymentdetail, "payment data recived sucefully", 200);
});

// fetches payment for given order_id
// https://razorpay.com/docs/api/payments/route/fetch-transfer-order

const fetchTrasnfer = asyncHandler(async (req, res) => {
    const { order_id, bookformid } = req.body;


    // fetch transfers for given order_id in bookformid
    razorpay.orders.fetchTransferOrder(order_id, (err, data) => {
        data.transfers = {
            items: [
                {
                    status: "created",
                    entity: "transfer",
                    source: order_id,
                }
            ]
        }
    });
});


// when all payments are done for given bookformid then let user download recipt
const occasionTicket = asyncHandler(async (req, res) => {
    const { bookformid } = req.body;
    const doc = new Pdfkit();

    const findbookForm = await bookForm.findById(bookformid).populate('artistinfo', 'name price artistimg');

    const pdfStream = fs.createWriteStream("output.pdf");
    doc.pipe(pdfStream);

    return res.success(findbookForm, "download it", 200);
});


// send to user when occasion is completed excluding fees of razorpay

const createOrderpip = asyncHandler(async (req, res) => {
    // const userid = req.user.id;
    // console.log("oder creation api called")

    // const { bookformid } = req.body;

    const createdOrder = razorpay.orders.create({
        amount: 500 * 100,
        currency: "INR",
        partial_payment: false,
        receipt: v4(),
        // customer_details: {

        // }
    });

    // console.log("order_id:", (await createdOrder).id);

    // await bookForm.findByIdAndUpdate(bookformid, {
    //     $set: {
    //         order_id: (await createdOrder).id
    //     }
    // })

    const ordertoSennd = await createdOrder;

    return res.success(ordertoSennd, "order created pip", 201)
});

const capturePaymentpip = asyncHandler(async (req, res) => {
    console.log("payment capture api call")

    const { razorpay_payment_id, bookformid, razorpay_order_id, razorpay_signature } = req.body;

    // const razorpay_signature = req.get('X-Razorpay-Signature');

    // console.log("body:", req.body);
    // get oder id refrenced as id
    // const order_id = await bookForm.findById(bookformid);


    // as per razorpay server shold generate order_id and don't retrive it from checkout from req.body

    const generated_signature = crypto
        .createHmac('sha256', RAZORPAYKEYSECRET)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');

    // console.log(generated_signature)
    // console.log(razorpay_signature)

    if (generated_signature === razorpay_signature) {
        await bookForm.findByIdAndUpdate(bookformid, {
            $set: { payment_id: razorpay_payment_id }
        });

        // validatePaymentVerification({
        //     order_id: razorpay_order_id,
        //     payment_id: razorpay_payment_id
        // }, razorpay_signature, RAZORPAYKEYSECRET);

        return res.status(200).json({ success: true, message: "payment is sucesful" });
    } else {
        return res.status(400).json({ success: true, message: "payment failed" })
    };

});


const fetchPayment = asyncHandler(async (req, res) => {
    const { order_id } = req.params;

    razorpay.orders.fetchPayments(order_id, (err, data) => {
        // console.log(data);
        if (err) {
            return res.fail(400, "razorpay failed to fetch payment")
        } else if (data) {
            return res.success(data, "fetched payment sucefully", 200)
        }
    });
});



const refundPayment = asyncHandler(async (req, res) => {

    const userid = req.user.id;
    const { bookformid } = req.body;

    const paymentid = await bookForm.findById(bookformid);

    const refundEntity = razorpay.payments.refund(paymentid, {
        amount: 500 * 100,
        speed: "optimum",
        receipt: userid
    });

    return res.success(refundEntity, "refund has begin processed", 200);
});


const createvpa = asyncHandler(async (req, res) => {
    razorpay.virtualAccounts.create({
        receivers: {
            types: [
                "bank_account"
            ]
        },
    })
})

module.exports = {
    creatOrder,
    capturePayment,
    fetchOrder,
    fetchPayment,
    fetchallpayments,
    occasionTicket,
    createOrderpip,
    capturePaymentpip,
    refundPayment,
    fetchTrasnfer
};