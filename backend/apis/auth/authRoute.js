const authRoute = require('express').Router();
const passport = require('passport');
const { verifytoken, tokenrefresh } = require('../../middlewares/verifytoken');
const {
    registerUser,
    logout,
    sendOTPfp,
    login,
    deleteAccount,
    verifyOtp,
    resetPassword,
    userinfo,
    resetPasswordacc,
    checkrole,
    verifyOtps
} = require('../auth/authcontroler');
const User = require('../user/Usermodel');


authRoute.post('/signin', registerUser);
authRoute.route('/login').post(login);
authRoute.get('/getuser', verifytoken, userinfo);
authRoute.get('/refresh', tokenrefresh);
authRoute.post('/sendotp', sendOTPfp);
authRoute.post('/verifyotp', verifyOtp);
authRoute.patch('/resetpassword', verifytoken, resetPassword);
authRoute.patch('/accountesetpassword', verifytoken, resetPasswordacc);
authRoute.post('/logout', verifytoken, logout);
authRoute.post("/verifysotp", verifyOtps);
authRoute.delete('/deluser/:username', async (req, res) => {
    const {username} = req.params;
    console.log("nnewgn")
    await User.findOneAndDelete({username: username});
})
authRoute.delete('/deleteaccount', verifytoken, deleteAccount);
// authRoute.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
// authRoute.get("/google/callback", passport.authenticate("google", { session: false }), callback);
// authRoute.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// authRoute.get("/facebook/callback", passport.authenticate("facebook", { session: false }), callback);


module.exports = authRoute;

// all user authentication routes