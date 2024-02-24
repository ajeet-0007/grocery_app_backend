const express = require('express');
const { userFetchShop } = require('../../controllers/user/userFetchShop');

const router = express.Router();



router.get('/get-nearest-shop', userFetchShop);


module.exports = router;