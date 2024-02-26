exports.getCategoryForShop = async (req, res, next) =>{
    try {
        const {vendor_shop_id} = req.params;
        const productCategoryData = await db.sequelize.query('EXEC GetCategoriesForShop :shop_id', {
        replacements: {
            shop_id : vendor_shop_id
        }
        })
        if(productCategoryData[0].length !== 0){
            return res.status(200).json({
                productCategoryData,
                error: false,
                success: true
            })
        }else{
            return res.status(404).json({
                message: "No products found for Shop",
                error : false,
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