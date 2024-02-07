const express = require('express');

const router = express.Router();

const {vendorRegistration} = require('../../controllers/vendor/vendorRegistration');

const {authorize} = require('../../middlewares/agent/authorize')


router.post('/registration',authorize, vendorRegistration);


module.exports = router;