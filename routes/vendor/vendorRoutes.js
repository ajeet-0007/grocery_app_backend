const express = require('express');

const router = express.Router();

const {vendorRegistration} = require('../../controllers/vendor/vendorRegistration')


router.post('/registration', vendorRegistration);


module.exports = router;