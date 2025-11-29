const AsyncHandler = require("express-async-handler");
const User = require("../models/Usermodel");
const app = require('express')();

// middleware to find user
app.param('userid', (req, res, next, userid) => {

    User.findById(userid, (err, user) => {
        if (err) return next(err);

        if (!user) return next(new Error('user not found'));
        req.user = user;
        next();
    });
});