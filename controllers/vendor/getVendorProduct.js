const db = require('../../config/index')
const getVendorProducts = require('../../utils/vendor/getVendorProducts')

exports.getVendorProducts = async (req, res, next) => {
    try {
        const { vendor_shop_id } = req.params

        const data = await db.sequelize.query(
            'EXEC GetProductsByShopID :ShopID',
            {
                replacements: {
                    ShopID: vendor_shop_id,
                },
            }
        )

        if (data[0].length !== 0) {
            const groupedProducts = getVendorProducts(data[0])

            return res.status(200).json({
                groupedProducts,
                error: false,
                success: true,
            })
        } else {
            return res.status(200).json({
                message: 'No products exist',
                error: false,
                success: true,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        })
    }
}
