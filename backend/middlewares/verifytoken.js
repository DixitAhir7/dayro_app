const jwt = require("jsonwebtoken");
const User = require("../apis/user/Usermodel");
const { AUTH_SECRETKEY, REFRESH_TOKENSECRET } = process.env;


// if token is provided then it'll run otherwise err

const verifytoken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        // console.log("token:", token);

        // refreshtoken in cookies
        // console.log("cookies", req.cookies);

        if (!token) return res.fail(401, 'token is not found');

        const decoded = jwt.verify(token, AUTH_SECRETKEY);
        // console.log("decoded user:", decoded);
        req.user = decoded;
        next();

    } catch (error) {
        return res.fail(403, "jwt expired");
    }
};


const tokenrefresh = (req, res, next) => {

    const refreshtoken = req.cookies.refreshtoken;

    // if (!refreshtoken) return res.sendStatus(401);

    jwt.verify(refreshtoken, REFRESH_TOKENSECRET, (err, user) => {
        if (err) {
            console.log(err);
            // console.log('error in refresh token');
            return res.sendStatus(403);
        };

        const accesstoken = jwt.sign(
            {
                id: user.id,
                role: user.role
            },
            AUTH_SECRETKEY,
            { expiresIn: "60d" }
        );

        // console.log("accesstoken:", accesstoken);

        res.success({ accesstoken, user });
    });
    next();
};

// i think this'll work let's see
const restrictto = (role) => async (req, res, next) => {
    const user = await User.findById(req.user.id);
    console.log("restriction api called")

    if (user.role === role) {
        return res.fail(403, 'you are not allowed')
    };

    next();
};

module.exports = { verifytoken, tokenrefresh, restrictto };