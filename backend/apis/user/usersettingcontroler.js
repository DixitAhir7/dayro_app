const asyncHandler = require('express-async-handler');

// it creates boolean state for user A
const userSetting = asyncHandler(async (req, res) => {
    const { hiddetail } = req.body;
    res.success(hiddetail, 'state recived', 200)
})

module.exports = { userSetting };

// profile public of private default: public