// const db = require('../../config/index')

// exports.addProductsToParticularShop = async (req, res, next) => {
//     try {
//         const {shop_id} = req.params;
//         let productList = req.body.map(product => {
//             return {
//                 subcategory_id: product.subcategory_id,
//                 name: product.name,
//                 price: product.price,
//                 description: product.description,
//                 unit_amount: product.unit_amount,
//                 unit_measure: product.unit_measure,
//                 brand: product.brand,
//                 availability: product.availability ? 1 : 0,
//                 product_image: product.product_image,
//                 shop_id: shop_id
//             };
//         });

//         const result = await db.sequelize.query('DECLARE @success BIT; EXEC InsertProductsFromJSON @json=:productList, @success = @success OUTPUT; SET @success = @success; Select @success as success', {
//             replacements: { productList: JSON.stringify(productList), success: null },
//             type: db.Sequelize.QueryTypes.SELECT
//         });

//         if(result[0].success){
//         return res.status(200).json({
//             message: "Product Inserted Successfully",
//             error: false,
//             success: true
//         })
//         }else{
//             return res.status(400).json({
//                 message: "Some problem!",
//                 error: false,
//                 success: true
//             })
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             error: error.message,
//             error: true,
//             success: false
//         })
//     }
// }

const db = require('../../config/index')

exports.addProductsToParticularShop = async (req, res, next) => {
    try {
        const { shop_id } = req.params
        let productList = req.body
        productList.shop_id = shop_id

        const result = await db.sequelize.query(
            'DECLARE @success INT; EXEC C @json=:productList, @success = @success OUTPUT; SET @success = @success;',
            {
                replacements: { productList: JSON.stringify(productList) },
                type: db.Sequelize.QueryTypes.SELECT,
            }
        )
        if (result[0].success === 1) {
            return res.status(200).json({
                message: 'Product Inserted Successfully',
                error: false,
                success: true, 
            })
        } else if (result[0].success === 2) {
            return res.status(200).json({
                message: 'Product Inserted Successfully',
                error: false,
                success: true, 
            })
        } else {
            return res.status(200).json({
                message: 'Product already exist in Shop',
                error: false,
                success: true,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message,
            error: true,
            success: false,
        })
    }
}
