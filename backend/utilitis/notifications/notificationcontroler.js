const twillo = require('twilio');
const asynchandler = require('express-async-handler');
const { emailtransporter } = require('./emailconfig');
const notificationmodel = require('./notificationmodel');
const { TWILLO_ACCSSID, TWILLO_AUTHTOKEN } = process.env;
const { PUBLIC_KEY, PRIVATE_KEY } = process.env;
const { setVapidDetails, sendNotification } = require('web-push');

setVapidDetails("mailto:gamingcode9696@gmail.com",
    PUBLIC_KEY, PRIVATE_KEY
);

const vapidkeys = { publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY };
setVapidDetails("mailto:dixitahirforwork96@gmail.com", vapidkeys.publicKey, vapidkeys.privateKey);

const twilioclient = twillo(TWILLO_ACCSSID, TWILLO_AUTHTOKEN);


// notification msg for artist from user of book request
const sendnotificationtoemail = async (user, msg) => {
    const sendmsgtoemail = await emailtransporter.sendMail({
        from: process.env.USER_EMAIL,
        to: user,
        subject: "email",
        text: `${user, msg}`
    });
    return sendmsgtoemail;
};


const configuretwillo = asynchandler(async (user, msg) => {
    try {

        const messages = await twilioclient.messages.create({
            contentSid: process.env.TWILLO_APISID,
            from: "whatsapp: +1 415-523-8886",
            to: `whatsapp: ${user}`,
            body: msg,
        });

        if (messages) {
            await notificationmodel.create({
                notification: messages,
                createdAt: new Date()
            })
        };

        const msgdata = messages.sid;
        return msgdata;
    } catch (error) {
        console.log(`while sending msg to user through twillo${error}`)
    }
});


// const pushnotify = asynchandler(async (req, res) => {
//     const user = req.user.id;
//     const { subscription } = req.body;

//     const notificationdata = await notificationmodel.findOneAndUpdate({ user: user }, {
//         $push: { subscription: subscription }
//     });

//     return res.success(notificationdata, "notification subscribed sucefully", 201);
// });

const sendpushnotification = asynchandler(async (req, res) => {

    const user = req.user.id;
    const { payload } = req.body;

    const getsubscription = await notificationmodel.findOne({ user: user });

    try {
        await sendNotification(getsubscription, JSON.stringify(payload), {
            TTL: 60 * 60
        });

        return res.success({ ok: true }, "push notification sent sucefully", 200);
    } catch (err) {
        console.error("push error", err);
        res.fail(500, err.message);
    }
});


module.exports = { configuretwillo, sendnotificationtoemail };