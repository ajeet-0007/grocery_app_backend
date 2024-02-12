ALTER PROCEDURE GetSubcategoriesForShopAndCategory
    @shop_id VARCHAR(255),
    @category_id INT
AS
BEGIN
    SELECT s.*
    FROM Subcategories s
    INNER JOIN ShopWithProductId sp ON s.category_id = sp.category_id
    WHERE sp.shop_id = @shop_id
    AND s.category_id = @category_id;
END;


EXEC GetSubcategoriesForShopAndCategory 'Bar-bhetle@mail.com', 1;

GO;
ALTER PROCEDURE GetProductsForSubcategoryAndShop
    @sub_id INT,
    @shop_id VARCHAR(255)
AS
BEGIN
    SELECT p.*
    FROM Products p
    INNER JOIN Subcategories s ON p.subcategory_id = s.id
    INNER JOIN ShopWithProductId sp ON s.category_id = sp.category_id
    WHERE p.subcategory_id = @sub_id
    AND sp.shop_id = @shop_id;
END;

EXEC GetProductsForSubcategoryAndShop  3, 'Bar-bhetle@mail.com';


EXEC GetCategoriesForShop 'Bar-bhetle@mail.com';