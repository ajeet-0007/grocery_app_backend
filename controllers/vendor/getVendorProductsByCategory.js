const db = require('../../config/index');

exports.getVendorProductsByCategory = async (req, res, next) => {
    try {
        const {vendor_shop_id, product_category} = req.query;
        const shopProductByCategory = await db.sequelize.query('EXEC GetProductsByShopIDAndCategory :ShopID, :Category', {
            replacements: {
                ShopID : vendor_shop_id,
                Category: product_category
            }
        })
        if(shopProductByCategory[0].length!==0){
            return res.status(200).json({
                shopProductByCategory,
                error: false,
                success: true
            })
        }else{
            return res.status(200).json({
                message: "No products found of this category",
                error: false,
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error!",
            error: false,
            success:  true
        })
    }
}