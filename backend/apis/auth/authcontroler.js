const asyncHandler = require('express-async-handler');
const argon2 = require('argon2');
const { accessToken, refreshToken } = require('../../utilitis/reusablecode/tokens');
const User = require('../user/Usermodel');
const { sendEmail, getotp } = require('../../utilitis/notifications/emailconfig');
const notificationmodel = require('../../utilitis/notifications/notificationmodel');
const Beartist = require('../artists/beartists/beartistmodel');
const { encrypt, decrypt } = require('../../utilitis/encryptdecrypt');
const otpModel = require('./otpModel');
const bookForm = require('../artists/bookartistformbyuser/bookFormModel');
const geoip = require('geoip-lite');


const callback = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
    };

    const refreshtoken = refreshToken(user);
    const accesstoken = accessToken(user);

    res.cookie("accessToken", accesstoken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 15 * 60 * 1000 });
    res.cookie("refreshtoken", refreshtoken, { httpOnly: true, sameSite: "None", secure: true, maxAge: 15 * 24 * 60 * 60 * 1000 });
    res.redirect(`${process.env.JS_ORIGIN}`);
};

const registerUser = asyncHandler(async (req, res) => {
    const { useremail, username, userpassword } = req.body;

    if (!useremail || !username || !userpassword) {
        res.fail(400, "email,username, password is required")
    }

    // it checks with existsing emails that entered email is not matched 
    const isUser = await User.findOne({ useremail: useremail });

    if (isUser) {
        return res.fail(409, "user already exists");
    };

    const usernameFormat = /^[a-zA-Z0-9_]{2,16}$/;

    if (!usernameFormat.test(username)) {
        return res.fail(406, "not valid username format");
    }

    const hashedPs = await argon2.hash(userpassword);

    const isUsername = await User.findOne({ username: username });

    if (isUsername) {
        return res.fail(409, 'username is taken');
    };

    const otp = getotp();
    const encrypted = encrypt(otp);

    // when user fills out form it creates data in mongo compass throught this controler
    const user = new User({
        useremail: useremail,
        username: username,
        userpassword: hashedPs,
        role: "user",
        createdAt: new Date(),
        otp: encrypted
    });

    // const userip = req.ip;
    // const geo = geoip.lookup(userip);

    await user.save();

    try {
        await sendEmail(useremail, otp);
        return res.redirect("/verifyotp");
    } catch (error) {
        console.log(`error while sending otp`, error);
    }
    // const howmnayuser = await User.countDocuments();
});


const verifyOtps = async (req, res) => {
    try {
        const { email, votp } = req.body;

        const user = await User.findOne({ useremail: email });
        if (!user) return res.status(404).json({ msg: "User not found" });

        const decrypted = decrypt(user.otp);

        if (decrypted !== votp || user.expiresat < Date.now()) {
            await User.findOneAndDelete({ useremail: email });
            return res.status(400).json({ msg: "Invalid or expired OTP" });
        };

        user.otp = null;
        user.otpExpires = null;

        await user.save();

        const accesstoken = accessToken(user);
        const refreshtoken = refreshToken(user);

        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: false,
        });

        const userdata = { user, accesstoken };
        return res.success(userdata, "user registered", 201);
    } catch (err) {
        res.status(500).json({ msg: "Server error", err });
    }
};


const takeLocation = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { lat, lon } = req.query;

    await User.findByIdAndUpdate(userid, {
        $addToSet: {
            userlocation: {
                lat: lat,
                lon: lon
            }
        }
    })
})


/*
if artist loggedout, and when logging in check in db isArtist?,
*/

const login = asyncHandler(async (req, res) => {
    const { identifier, userpassword } = req.body;

    console.log("login api called")

    const user = await User.findOne({
        $or: [{ username: identifier }, { useremail: identifier }]
    });

    if (!user) res.fail(404, 'user does not exists');

    const matchedUserPassword = await argon2.verify(user.userpassword, userpassword);

    if (!matchedUserPassword) res.fail(422, 'password is not valid');

    /*
    when login, it generates new token,
    when token expires it should automatically assign refreshtoken to thaat user
    */

    const accesstoken = accessToken(user);
    const refreshtoken = refreshToken(user);

    // this'll stroe in cookies in browser
    res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 24 * 60 * 60 * 1000
    });

    const userdata = {
        id: user._id, username: user.username, role: user.role, accesstoken
    }

    return res.success(userdata, "Login successful", 200);
});

// temporory to fetch userinfo
const userinfo = asyncHandler(async (req, res) => {
    try {
        const userid = req.user.id;
        // console.log(userid);
        // console.log("get user api called")

        const findUser = await User.findById(userid);
        // console.log(findUser);

        return res.success(findUser, "user recived sucefully", 200);
    } catch (error) {
        return res.fail(`try again ${error}`, 400);
    }
});


// just logout form application keep data as it is
const logout = asyncHandler(async (req, res) => {
    res.clearCookie('refreshtoken');

    return res.success('logged out sucefully', 200);
});


// send otp when forgotpassword
const sendOTPfp = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) return res.fail(422, 'email is required');
    const user = await User.findOne({ useremail: email });

    if (!user) return res.fail(404, "user does not exist sign in");

    const otp = getotp();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);


    // save encrypt otp and send decrypt

    const hashedotp = encrypt(otp);
    const decryptotp = decrypt(hashedotp);

    /*
    upsert: If no document matches the query,it inserts new document using the update object
    */

    await user.updateOne({
        useremail: user.useremail, $push: {
            otpobj: {
                otp: hashedotp,
                expiresat: expiresAt
            }
        }
    });


    const sendEmailtoUser = await sendEmail(user.useremail, decryptotp);

    if (!sendEmailtoUser) return res.fail(502, "i couldn't send otp try again");

    return res.success({ ok: true }, 'email verified sucefully otp sent to email');
});

/*
don't save it to db,
deleteemail individually after sent to user and it expires
*/


const verifyOtp = asyncHandler(async (req, res, { usermethod }) => {
    const { otp, useremail } = req.body;

    if (usermethod === "signin".toLowerCase()) {
        await otpModel.findOne({ email: useremail });


    } else {
        const user = await User.findOne({ useremail: useremail });

        const isExpired = user.otpobj.expiresat;
        const storedotp = user.otpobj.otp;
        const decryptotp = decrypt(storedotp);

        const Expiretime = isExpired < new Date();

        // after expired delete from db
        if (Expiretime) {
            await User.findOneAndDelete({ otpobj: Expiretime });
        };

        if (otp !== decryptotp) {
            return res.fail(422, "otp is wrong")
        };

        const accesstoken = accessToken(user);
        const refreshtoken = refreshToken(user);

        res.cookie("refreshtoken", refreshtoken, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
            maxAge: 60 * 60 * 1000
        });

        return res.success({ accesstoken, id: user._id, username: user.username }, "Login successful", 200)
    };
});


const deleteAccount = asyncHandler(async (req, res) => {
    const userid = req.user.id;

    const { userpassword } = req.body;
    console.log(userpassword);

    const user = await User.findById(userid);

    console.log("delete account api called");

    const isMatched = await argon2.verify(user.userpassword, userpassword);

    res.clearCookie("refreshToken")

    if (!user || !isMatched) {
        res.fail(400, 'please provide username and password to ensure that it is you');
    };

    if (user.role === "artist") {
        await Beartist.findOneAndDelete({ user: userid });
    };

    // delete all data related to user
    await bookForm.deleteMany({ user: userid });
    await notificationmodel.deleteMany({ user: userid });
    await User.findByIdAndDelete(userid);

    res.clearCookie('refreshtoken');

    return res.success("account deleted sucefully", 410);
});

// if otp is verified then let user conform new password
const resetPassword = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { userpassword } = req.body;

    const hashed = await argon2.hash(userpassword);

    const updatePassword = await User.findByIdAndUpdate(userid,
        { $set: { userpassword: hashed } }
    );

    return res.success(updatePassword, "password updated sucefully");
});


// if user wants to change password sometimes then this api call
const resetPasswordacc = asyncHandler(async (req, res) => {
    const { currentps, userpassword } = req.body;
    const userid = req.user.id;

    const finduser = await User.findById(userid);

    const checkpassword = await argon2.verify(finduser.userpassword, currentps);
    const hashedps = await argon2.hash(userpassword);

    if (!checkpassword) return res.fail(401, "password is invalid");

    await User.findByIdAndUpdate(userid,
        { $set: { userpassword: hashedps } }
    );

    return res.success(200, "password reset succefully");
});


// set private account in this if needed authinfo except password
const updateAccount = asyncHandler(async (req, res) => {
    const userid = req.user.id;
    const { useremail, username } = req.body;

    const userData = await User.findByIdAndUpdate(userid,
        { $set: { useremail: useremail, username: username } },
        { new: true, runValidators: true }
    );

    return res.success(userData, "user account updated succefully");
});


module.exports = {
    registerUser,
    login,
    userinfo,
    resetPassword,
    sendOTPfp,
    verifyOtp,
    logout,
    deleteAccount,
    updateAccount,
    resetPasswordacc,
    takeLocation,
    verifyOtps
};