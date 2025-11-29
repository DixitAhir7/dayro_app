const passport = require('passport');
const User = require('../../Usermodel');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.META_CLIENTID,
    clientSecret: process.env.META_CLIENTSECRET,
    callbackURL: process.env.META_CALLBACKURL,
    passReqToCallback: true,
    profileFields: ['id', 'emails', 'name', 'displayName', 'photos']
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails && profile.emails[0]?.value;
        let user = await User.findOne({ facebookid: profile.id });
        if (!user && email) {
            user = await User.findOne({ email });
            if (user) {
                user.facebookid = profile.id;
                await user.save();
            }
        }
        if (!user) {
            user = await User.create({
                email,
                username: profile.displayName || [profile.name?.givenName, profile.name?.familyName].filter(Boolean).join(' '),
                facebookid: profile.id,
                userimage: profile.photos?.[0]?.value,
                provider: "facebook"
            });
        };
        return done(null, user);
    } catch (err) {
        console.log(`while loggin through facebook ${err}`)
    }
}));