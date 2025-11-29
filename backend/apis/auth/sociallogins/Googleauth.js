const passport = require('passport');
const User = require('../../Usermodel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// signin/login with google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENTID,
    clientSecret: process.env.GOOGLECLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL,
    passReqToCallback: true,
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const userid = req.user.id;
        const email = profile.emails && profile.emails[0].value;
        
        let user = await User.findOne({
            $or: [{ googleId: profile.id }, { provider: 'google' }, { email: email }]
        });

        if (user) {
            user.provider = "google"
            user.googleId = profile.id
            await user.save()
        };

        const username = profile.displayName;

        if (!user) {
            user = await User.findByIdAndUpdate(userid, {
                $setOnInsert: {
                    googleId: profile.id,
                    provider: "google",
                    useremail: email,
                    username: username,
                    profileimg: profile.photos?.[0].value
                }
            })
        };
        console.log(user);
        req.user = user;
        return done(null, user);

    } catch (err) { console.log(`while google auth error: ${err}`) }
}));