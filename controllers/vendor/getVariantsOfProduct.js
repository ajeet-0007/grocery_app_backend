exports.getVariantsOfProduct = async (req, res, next) => {
    try {
        const { vendor_shop_id } = req.vendor;
        const {product_id} = req.params;

        const result = await db.sequelize.query('EXEC GetProductVariantsForShop :product_id, :shop_id', {
            replacements: {
                product_id: product_id,
                shop_id: vendor_shop_id
            }
        })
        if(result[0].length !== 0){
        return res.status(200).json({
            variants: result[0],
            error: false,
            success: true
        });
        }else{
            return res.status(200).json({
                message: "No products found",
                error: false,
                success: true
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
