const db = require('../../config/index')

exports.getVendorProductBySubcategory = async (req, res, next)=>{
    try {
        const {subcategory_id,vendor_shop_id} = req.query;
        const productOfSubcategory = await db.sequelize.query('EXEC GetProductsForSubcategoryAndShop :sub_id, :shop_id', {
            replacements: {
                sub_id : subcategory_id,
                shop_id : vendor_shop_id
            }
        });

        if(productOfSubcategory[0].length !== 0){
            return res.status(200).json({
                productOfSubcategory,
                error: false,
                success: true
            })
        }else{
            return res.status(404).json({
                message: "No product found",
                error: false,
                success: true
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}