const bookedArtistRoute = require('express').Router();
const { verifytoken, restrictto } = require('../../../middlewares/verifytoken');
const { remindArtist } = require('../../../utilitis/redisjobs/taskqueues');
const {
    createBookFormData,
    cancelartist,
    sendBookFormdata,
    editbookartistform,
    reqRefund,
    bookcancel
} = require('./bookFormControler');
const { selectedOrdecline } = require('./bookFormnotifyControler');

// form where user fills up form after bookingartist

bookedArtistRoute.post('/bookartistsform', verifytoken, createBookFormData);
bookedArtistRoute.post("/reminder",verifytoken, remindArtist);
bookedArtistRoute.get('/sendbookform/:bookformid', verifytoken, sendBookFormdata);
bookedArtistRoute.patch('/cancelartist', verifytoken, cancelartist);
bookedArtistRoute.patch('/updatebookform', verifytoken, editbookartistform);
bookedArtistRoute.post("/cancelbooking/:id", bookcancel);
bookedArtistRoute.post('/sendresponse', verifytoken, selectedOrdecline);
bookedArtistRoute.post('/reqrefund', verifytoken, reqRefund);

module.exports = bookedArtistRoute;