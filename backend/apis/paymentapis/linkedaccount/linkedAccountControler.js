const razorpay = require("../../../config/razorpayConfig");
const asyncHandler = require('express-async-handler');
const Beartist = require("../../artists/beartists/beartistmodel");
const fs = require('fs');

// https://razorpay.com/docs/api/payments/route/update-product-config

const createAccArtist = asyncHandler(async (req, res) => {

    const userid = req.user.id;

    const {
        email,
        name,
        panno,
        business_name,
        gstin,
        category,
        subcategory,
        phoneNo,
        city,
        postal_code,
        street1,
        street2,
        state,
        notes
    } = req.body;
    const { artistid } = req.params;

    const findartist = await Beartist.findById(artistid);

    const linkedAccount = razorpay.accounts.create({
        business_type: "not_yet_registered",
        contact_name: name,
        email: email,
        type: "route",
        phone: phoneNo,
        legal_business_name: business_name || "dayro",
        profile: {
            category: category,
            subcategory: subcategory,
            addresses: {
                registered: {
                    city: city,
                    country: "IN",
                    postal_code: postal_code,
                    state: state,
                    street1: street1,
                    street2: street2
                },
            }
        },
        reference_id: findartist._id,
        legal_info: {
            pan: panno,
            gst: gstin
        },
        notes: notes
        // contact_info: {
        //     refund: {
        //         email: email,
        //         phone: phoneNo
        //     },
        //     support: {
        //         email: email,
        //         phone: phoneNo
        //     },
        //     chargeback: {

        //     }
        // }
    }, (err, res) => {
        if (err) console.log("linkedaccount error:", err);
        console.log("linkedaccount response:", res);
    });

    // const getAccountid = linkedAccount.then(a => a.id);

    // await Beartist.findByIdAndUpdate(artistid, {
    //     $set: { linkedAccountId: getAccountid }
    // });

    return res.success(linkedAccount, "your account created sucefully it'll take time to get activated", 201);
});



// gemini: it's for transfering payments to sub-merchants
const createStakeholder = asyncHandler(async (req, res) => {

    // account_id of parent linked_account
    const { artistid, name, email, panno, phoneNo, city, street, postal_code, state, notes } = req.body;
    const { account_id } = req.params;

    // other request parameters get from db
    razorpay.stakeholders.create(account_id, {
        name: name,
        email: email,
        kyc: {
            pan: panno
        },
        relationship: {
            director: false,
            executive: false
        },
        phone: {
            primary: phoneNo
        },
        addresses: {
            residential: {
                city: city,
                country: "IN",
                postal_code: postal_code,
                state: state,
                street: street
            }
        },
        notes: notes,
        percentage_ownership: 0
    });
});


// send request to razorpay to conform product configuration for payments
const reqProductConfig = asyncHandler(async (req, res) => {

    const { account_id } = req.params;

    razorpay.products.requestProductConfiguration(account_id, {
        product_name: "route",
        tnc_accepted: true,
    });

    return res.status(200).json({ message: "your created account details has sent to razorpay they'll review it and if everything is ok then you'll be asked to fill details of your bank account to handle payments" })
});


// have to write another api for card,netbanking

// after requst product config accpeted then send account details
const updateProductConfig = asyncHandler(async (req, res) => {
    const { account_id, product_id } = req.params;
    const { branchIfscCode, account_number, beneficiary_name, tnc_accepted, usePrev, email } = req.body;

    razorpay.products.edit(account_id, product_id, {
        settlements: {
            account_number: account_number,
            beneficiary_name: beneficiary_name,
            ifsc_code: branchIfscCode
        },
        payment_methods: {
            upi: {
                enabled: true,
                instrument: "upi"
            }
        },
        notifications: {
            email: email
        },
        refund: {
            default_refund_speed: "optimum"
        },
        tnc_accepted: true
    });
});

/**
 * @readonly
 * fetch artist's linked account in account 
*/

const fetchLinkedAccount = asyncHandler(async (req, res) => {
    const { account_id } = req.params;

    const fetchAccount = razorpay.accounts.fetch(account_id);

    return res.success(fetchAccount, "account fetched sucefully", 200);
});


// let artist edit account
const editAccount = asyncHandler(async (req, res) => {

    const { account_id } = req.body;

    razorpay.accounts.edit(account_id)
});


// idk if razorpay will make it or not

const deleteAccount = asyncHandler(async (req, res) => {
    const { account_id } = req.body;

    razorpay.accounts.delete(account_id);
});


module.exports = {
    createAccArtist,
    editAccount,
    deleteAccount,
    createStakeholder,
    reqProductConfig,
    updateProductConfig,
    fetchLinkedAccount
};