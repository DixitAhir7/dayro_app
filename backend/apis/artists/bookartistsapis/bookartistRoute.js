const bookartistRoute = require('express').Router();

const {
    getArtists,
    createbookedartist,
    removeartistinitially,
    getallartistnomatterwhathappens,
    getArtist,
    getbookedArtists
} = require('./bookartistControler');
const { verifytoken } = require('../../../middlewares/verifytoken');
const { keepanEye } = require('../../../utilitis/redisjobs/taskqueues');

// routes for just getting artists from beartist db
bookartistRoute.get('/getartists', getallartistnomatterwhathappens);
bookartistRoute.get('/bookartist', getArtists);
bookartistRoute.get('/getartist/:id', getArtist);

// this api will call when user will select artist
bookartistRoute.patch('/bookartist', verifytoken, createbookedartist);
bookartistRoute.get('/getbookedartists', verifytoken, getbookedArtists);
bookartistRoute.patch('/removeartist', verifytoken, removeartistinitially);
bookartistRoute.patch("/scheduledrefund", verifytoken, keepanEye);

module.exports = bookartistRoute;