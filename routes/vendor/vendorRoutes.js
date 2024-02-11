const express = require('express');

const router = express.Router();

const {vendorRegistration} = require('../../controllers/vendor/vendorRegistration');

const {vendorSignUp} = require('../../controllers/vendor/vendorSignUp')

const {vendorLogIn} = require('../../controllers/vendor/vendorLogIn')

const {authorize} = require('../../middlewares/agent/authorize')

const {vendorAuthorize} = require('../../middlewares/vendor/authorize');

const {getVendorProducts} = require('../../controllers/vendor/getVendorProduct')


router.post('/registration',authorize, vendorRegistration);

router.post('/sign-up', vendorSignUp)

router.post('/log-in', vendorLogIn)

router.post('/get-vendor-products/:vendor_shop_id',vendorAuthorize, getVendorProducts );

module.exports = router;