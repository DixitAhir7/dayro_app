const userRoute = require('express').Router();
const { getUser, imguploadofuser } = require('../user/usercontroler');
const { userSetting } = require('../user/usersettingcontroler');
const upload = require('../../middlewares/multer');
const { updateAccount } = require('../auth/authcontroler');

userRoute.route('/:username').get(getUser).patch(updateAccount);
userRoute.put('/imgupload', upload.single('userimg'), imguploadofuser);
userRoute.post('/:username/editaccount', userSetting);

module.exports = userRoute;