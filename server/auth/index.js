'use strict';

var express = require('express');
var authController = require('./auth.controller.js');
var github = require('./github');
var google = require('./google');
var router = express.Router();

router.get('/google/discoveryDocument', google.discoveryDocument);

router.post('/github', authController(github));
router.post('/google', authController(google.auth));

module.exports = router;
