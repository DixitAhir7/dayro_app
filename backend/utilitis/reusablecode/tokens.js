const jwt = require('jsonwebtoken');
const ms = require('ms');

const accessToken = (user) => {
    const accessToken = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.AUTH_SECRETKEY,
        { expiresIn: ms("60m") });

    // console.log("decoded token:",jwt.decode(accessToken))

    return accessToken;
};

const refreshToken = (user) => {
    const refreshtoken = jwt.sign({
        id: user._id,
        role: user.role,
    }, process.env.REFRESH_TOKENSECRET,
        { expiresIn: ms("60d") });

    return refreshtoken;
};

module.exports = { accessToken, refreshToken };