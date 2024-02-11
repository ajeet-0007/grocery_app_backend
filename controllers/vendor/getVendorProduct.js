const db = require('../../config/index')

exports.getVendorProducts = async (req, res, next) => {
    try {
        const { vendor_shop_id } = req.params

        const data = await db.sequelize.query(
            'EXEC GetProductsByShopID :ShopID',
            {
                replacements: {
                    ShopID: vendor_shop_id,
                },
            }
        )

        if(data[0].length !== 0){
         
        const groupedProducts = data[0].reduce((acc, product) => {
            const existingProduct = acc.find(p => p.ProductID === product.ProductID);
            if (existingProduct) {
              existingProduct.variants.push({
                VariantID: product.VariantID,
                VariantName: product.VariantName,
                VariantPrice: product.VariantPrice,
                VariantImage: product.VariantImage
              });
            } else {
              acc.push({
                ProductID: product.ProductID,
                ProductName: product.ProductName,
                ProductDescription: product.ProductDescription,
                ProductCategory: product.ProductCategory,
                ProductBrand: product.ProductBrand,
                ProductImageUrls: product.ProductImageUrls,
                ProductAvailability: product.ProductAvailability,
                variants: [{
                  VariantID: product.VariantID,
                  VariantName: product.VariantName,
                  VariantPrice: product.VariantPrice,
                  VariantImage: product.VariantImage
                }]
              });
            }
            return acc;
          }, []);
    
        return res.status(200).json({
            groupedProducts,
            error: false,
            success: true
            
        })
    }else{
        return res.status(200).json({
            message: "No products exist",
            error: false,
            success: true
        })
    }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        })
    }
}
