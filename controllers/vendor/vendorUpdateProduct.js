const db = require('../../config/index')

exports.vendorUpdateProduct = async (req, res, next) =>{
    try {
        const {vendor_shop_id, product_id} = req.query;
        const {name, price} = req.body;
        const updates = Object.keys(req.body)
            .map(key => `${key} = '${req.body[key]}'`)
            .join(', ');

        const result = await db.sequelize.query('EXEC UpdateProductColumn :product_id , :shop_id, @updates = :updates', {
            replacements: { product_id: product_id, shop_id: vendor_shop_id, updates },
        });

        return res.json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message,
            error: true,
            success: false
        })
    }
}