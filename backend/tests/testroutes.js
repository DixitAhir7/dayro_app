const express = require('express');
const router = express.Router();
const file = require('./controler.js');

router.get('/', file.readFile);
router.get('/test', file.getData);

module.exports = router;use stricuse strictuse strict'use strict'