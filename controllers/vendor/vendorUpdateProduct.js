const db = require('../../config/index')

exports.vendorUpdateProduct = async (req, res, next) =>{
    try {
        const {vendor_shop_id} = req.vendor;
        const {product_id} = req.query;
        const {name, price} = req.body;
        const updates = Object.keys(req.body)
            .map(key => `${key} = '${req.body[key]}'`)
            .join(', ');

        const result = await db.sequelize.query('DECLARE @success BIT;EXEC UpdateProductColumn :product_id , :shop_id, @updates = :updates, @success = @success OUTPUT; Select @success as success', {
            replacements: { product_id: product_id, shop_id: vendor_shop_id, updates },
            type: db.Sequelize.QueryTypes.SELECT
        });

        if(result[0].success){
            return res.status(201).json({
                message: "product updated successfully",
                error: false,
                success: true
            })
        }
        else{
            return res.status(200).json({
                message: "product updatation failed",
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