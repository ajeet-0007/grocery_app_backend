const bcrypt = require('bcrypt')
const db = require('../../config/index')
const fs = require('fs')
const path = require('path')

exports.vendorSignUp = async (req, res, next) => {
    try {
        const { vendor_shop_id, vendor_password } = req.body

        const checkVendorExistOrNot = await db.sequelize.query(
            'EXEC GetVendorPassword :vendor_shop_id',
            {
                replacements: {
                    vendor_shop_id: vendor_shop_id,
                },
                type: db.sequelize.QueryTypes.SELECT,
            }
        )
        if (checkVendorExistOrNot[0].vendor_password === null) {
            const data = await db.sequelize.query(
                'DECLARE @result INT; EXEC CheckVendorShopId :vendor_shop_id, @result OUTPUT; SELECT @result as result;',
                {
                    replacements: {
                        vendor_shop_id: vendor_shop_id,
                    },
                    type: db.sequelize.QueryTypes.SELECT,
                } 
            )

            if (data[0].result === 1) {
                const hashedPasswordOfVendor = await bcrypt.hash(
                    vendor_password,
                    10
                )
                const passwordUpdationforVendor = await db.sequelize.query(
                    'EXEC InsertVendorPassword :vendor_shop_id, :vendor_password',
                    {
                        replacements: {
                            vendor_shop_id: vendor_shop_id,
                            vendor_password: hashedPasswordOfVendor,
                        },
                    }
                )

                const getAllProductId = await db.sequelize.query('EXEC GetAllProductIDs');

                

                getAllProductId[0].forEach(async (category)=>{
                            
                            await db.sequelize.query("EXEC InsertShopProduct :ProductID, :ShopID", {
                                replacements: {
                                    ProductID: category.id,
                                    ShopID: vendor_shop_id,
                                    
                                } 
                            }) 
                })

               
 
                if(passwordUpdationforVendor[1]===1){
                    return res.status(200).json({
                        message: "Vendor SignUp SuccessFull",
                        error: false,
                        success: true
                    })
                }
            }
        } else {
            return res.status(200).json({
                message: 'Vendor Already Exist',
                error: false,
                success: true,
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
        })
    }
}
