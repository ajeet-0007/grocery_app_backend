const getVendorProducts = (products) =>{
    const groupedProducts = products.reduce((acc, product) => {
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
      return groupedProducts;
}

module.exports = getVendorProducts;