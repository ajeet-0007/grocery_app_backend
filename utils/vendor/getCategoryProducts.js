function getCategoryProducts(obj){
    const { subcategory_id, brand, id,shop_id, ...rest } = obj[0];
    obj = {
        subcategory_id,
        brand,
        id,
        shop_id,
        variants: obj.map(({ subcategory_id, brand, id,shop_id, ...rest }) => rest)
      };
    return obj;
}

module.exports = {getCategoryProducts};