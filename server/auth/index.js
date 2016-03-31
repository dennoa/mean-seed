'use strict';

var express = require('express');
var googleController = require('./google/google.controller.js');
var router = express.Router();

router.get('/google/discoveryDocument', googleController.discoveryDocument);
router.post('/google', googleController.auth);

module.exports = router;
