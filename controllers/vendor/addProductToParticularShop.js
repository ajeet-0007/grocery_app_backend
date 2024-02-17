const dn = require('../../config/index')

exports.addProductToParticularShop = async (req, res, next) => {
    try {
        const {
            subcategory_id,
            name,
            price,
            description,
            unit_amount,
            unit_measure,
            brand,
            availability,
            product_image,
        } = req.body
        const { shop_id } = req.params

        const productAddedToShop = await db.sequelize.query(
            'DECLARE @is_new_product INT; EXEC AddProductToShop :subcategory_id, :name, :price, :description, :unit_amount, :unit_measure, :brand, :availability, :product_image, :shop_id, @is_new_product OUTPUT',
            {
                replacements: {
                    subcategory_id: subcategory_id,
                    name: name,
                    price: price,
                    description: description,
                    unit_amount: unit_amount,
                    unit_measure: unit_measure,
                    brand: brand,
                    availability: availability,
                    product_image: product_image,
                    shop_id: shop_id
                },
            }
        )
        if(productAddedToShop[0][0].is_new_product){
            return res.status(201).json({
                message: "product added successfully",
                error: false,
                success: true
            })
        }else{
            return res.status(200).json({
                message: "product already exist",
                error: false,
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error.message,
            error: true,
            success: false
        })
    }
}
