exports.vendorDeleteProduct = async (req, res, next) => {
    try {
        const { vendor_shop_id } = req.vendor
        const { variant_id } = req.params
        const productDeleted = await db.sequelize.query(
            'DECLARE @success BIT; EXEC DeleteProductFromShop :variant_id, :shop_id, @success OUTPUT; Select @success as success',
            {
                replacements: {
                    variant_id: variant_id,
                    shop_id: vendor_shop_id,
                },
            }
        )
        if (productDeleted[0][0].success) {
            return res.status(200).json({
                message: 'product deleted successfully',
                success: true,
                error: false,
            })
        } else {
            return res.status(200).json({
                message: 'product does not exist',
                success: true,
                error: false,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false,
        })
    }
}
