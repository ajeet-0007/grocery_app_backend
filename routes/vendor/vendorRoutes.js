const express = require('express')

const router = express.Router()

const {
    vendorRegistration,
} = require('../../controllers/vendor/vendorRegistration')

const { vendorSignUp } = require('../../controllers/vendor/vendorSignUp')

const { vendorLogIn } = require('../../controllers/vendor/vendorLogIn')

const { authorize } = require('../../middlewares/agent/authorize')

const { vendorAuthorize } = require('../../middlewares/vendor/authorize')

const {
    getVendorProducts,
} = require('../../controllers/vendor/getVendorProduct')

const {
    getVendorProductsByCategory,
} = require('../../controllers/vendor/getVendorProductsByCategory')

const {
    getVendorProductsCategory,
} = require('../../controllers/vendor/getVendorProductsCategory')

const {
    getVendorProductSubCategory,
} = require('../../controllers/vendor/getVendorProductSubCategory')

const {
    getVendorProductBySubcategory,
} = require('../../controllers/vendor/getVendorProductBySubcategory')
const {
    addProductsToParticularShop,
} = require('../../controllers/vendor/addProductToParticularShop')
const {
    vendorDeleteProduct,
} = require('../../controllers/vendor/vendorDeleteProduct')
const {
    vendorUpdateProduct,
} = require('../../controllers/vendor/vendorUpdateProduct')
const {
    getVariantsOfProduct,
} = require('../../controllers/vendor/getVariantsOfProduct')

router.post('/registration', authorize, vendorRegistration)

router.post('/sign-up', vendorSignUp)

router.post('/log-in', vendorLogIn)

router.post(
    '/get-vendor-products/:vendor_shop_id',
    vendorAuthorize,
    getVendorProducts
)

router.post(
    '/get-vendor-products-by-category',
    vendorAuthorize,
    getVendorProductsByCategory
)

router.post(
    '/get-products-categories/:vendor_shop_id',
    vendorAuthorize,
    getVendorProductsCategory
)

router.post(
    '/get-product-subcategory',
    vendorAuthorize,
    getVendorProductSubCategory
)

router.post(
    '/get-vendor-product-by-subcategory',
    vendorAuthorize,
    getVendorProductBySubcategory
)

router.post(
    '/add-product/:shop_id',
    vendorAuthorize,
    addProductsToParticularShop
)

router.post(
    '/delete-product-from-shop/:variant_id',
    vendorAuthorize,
    vendorDeleteProduct
)

router.get('/get-variants-of-product/:product_id', vendorAuthorize, getVariantsOfProduct)

router.post('/update-product', vendorAuthorize, vendorUpdateProduct)

module.exports = router
