const askasiRoute = require('express').Router();
const { verifytoken } = require('../../middlewares/verifytoken');
const { createquerry, getquerry } = require('./askasiControler');

askasiRoute.post('/askai', verifytoken, createquerry);
askasiRoute.get('/querry/:id', getquerry);


module.exports = askasiRoute;