const nodeemail = require('nodemailer');
const {
    USER_EMAIL,
    SMTP_PORT,
    USER_PASSWORD,
    GOOGLE_CLIENTID,
    GOOGLECLIENT_SECRET
} = process.env;


const emailtransporter = nodeemail.createTransport(
    {
        host: USER_EMAIL,
        port: SMTP_PORT,
        secure: true,
        service: 'gmail',
        auth: {
            user: USER_EMAIL,
            pass: USER_PASSWORD,
            clientId: GOOGLE_CLIENTID,
            clientSecret: GOOGLECLIENT_SECRET
        }
    }
);

emailtransporter.addListener('error', (err) => {
    console.log("err in email transporter", err.stack);
});

// from my email to whoever is trying to login/signin

const getotp = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

const sendEmail = async (useremail, otp) => {
    try {
        const sendotptoemail = await emailtransporter.sendMail({
            from: USER_EMAIL,
            to: useremail,
            subject: "otp",
            text: `your otp is ${otp} it expires in 2 minutes
                enter this otp into otp field
                please do not share this otp
                thank you
            `
        })
        return sendotptoemail;
    } catch (error) {
        console.error("error in ")
    }
};

module.exports = { sendEmail, emailtransporter,getotp };