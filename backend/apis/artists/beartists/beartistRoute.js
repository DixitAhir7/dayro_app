const express = require('express');
const beartistRoute = express.Router();
const { verifytoken, restrictto } = require('../../../middlewares/verifytoken');
const upload = require('../../../middlewares/multer');
const {
    createArtist,
    deleteArtist,
    Artistupdateinfo,
    uploadMultiple,
    getArtist,
    getBookeddataonDates,
    reciveuserSuggestion,
    verifyAadhar
} = require('../beartists/beartistControler');
const {
    createAccArtist,
    reqProductConfig,
    updateProductConfig,
    fetchLinkedAccount,
    createStakeholder
} = require('../../paymentapis/linkedaccount/linkedAccountControler');
const { whentoEnd, startJobFrom } = require('../../../utilitis/redisjobs/taskqueues');

/*
router.route().get().delete().put().patch().post()
perform multiple operation on 1 endpoint
*/


// accounts refered as linkedaccounts of artists in razropay

beartistRoute.post('/beartist', verifytoken, upload.single('artistimg'), upload.array("artvideos", 2), createArtist);
beartistRoute.get('/getartist', verifytoken, getArtist);
beartistRoute.post('/recivesuggestion', reciveuserSuggestion);
beartistRoute.get('/getbookeddates', verifytoken, getBookeddataonDates);
beartistRoute.patch('/updateartist', verifytoken, restrictto('user'), Artistupdateinfo);
beartistRoute.patch("/sscheduledwork", verifytoken, startJobFrom);
beartistRoute.patch("/escheduledwork", verifytoken, whentoEnd);
beartistRoute.patch('/uploadmultiple', verifytoken, upload.array("artistimages", 5), uploadMultiple);
beartistRoute.delete("/deleteartist", verifytoken, deleteArtist);
beartistRoute.post('/accounts', verifytoken, createAccArtist);
beartistRoute.post('/accounts/:account_id/products', verifytoken, reqProductConfig);
beartistRoute.post('/linkedaccount/:account_id/products/:product_id', verifytoken, updateProductConfig);
beartistRoute.get('/accounts/:account_id', fetchLinkedAccount);
beartistRoute.post('/accounts/:account_id/stakeholders', verifytoken, createStakeholder);
// beartistRoute.post('/https://api.cashfree.com/verification/aadhaar', verifyAadhar);

module.exports = beartistRoute;