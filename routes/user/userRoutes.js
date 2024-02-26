const express = require('express');
const { userFetchShop } = require('../../controllers/user/userFetchShop');
const { getCategoryForShop } = require('../../controllers/user/getCategoryForShop');
const { getSubcategoriesForCategories } = require('../../controllers/user/getSubcategoriesForCategories');

const router = express.Router();



router.get('/get-nearest-shop', userFetchShop);

router.get('/get-product-category/:vendor_shop_id', getCategoryForShop)

router.get('/get-subcategory-of-categories', getSubcategoriesForCategories);


module.exports = router;