const db = require('../../config/index')

exports.getVendorProductSubCategory = async (req, res, next) => {
    try {
        const {vendor_shop_id, category_id} = req.query;
        const subcategoryData = await db.sequelize.query('EXEC GetSubcategoriesForShopAndCategory :shop_id, :category_id', {
            replacements: {
                shop_id: vendor_shop_id,
                category_id: category_id
            }
        })
        if(subcategoryData[0].length !==0){
            return res.status(200).json({
                subcategoryData,
                error: false,
                success: true
            })
        }else{
            return res.status(404).json({
                message: "No subcategories found for category",
                error: false,
                success: true
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true
        })
    }
}