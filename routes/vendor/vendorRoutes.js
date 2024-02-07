const express = require('express');

const router = express.Router();

const {vendorRegistration} = require('../../controllers/vendor/vendorRegistration');

const {vendorSignUp} = require('../../controllers/vendor/vendorSignUp')

const {vendorLogIn} = require('../../controllers/vendor/vendorLogIn')

const {authorize} = require('../../middlewares/agent/authorize')


router.post('/registration',authorize, vendorRegistration);

router.post('/sign-up', vendorSignUp)

router.post('/log-in', vendorLogIn)


module.exports = router;