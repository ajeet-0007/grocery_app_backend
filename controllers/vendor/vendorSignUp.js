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

                if (passwordUpdationforVendor[1] === 1) {
                    const productDataPath = path.join(
                        __dirname,
                        '..',
                        '..',
                        'public',
                        'productsJson.json'
                    )
                    let productDataJson = fs.readFileSync(
                        productDataPath,
                        'utf-8'
                    )
                    productDataJson = JSON.parse(productDataJson)
                    productDataJson = JSON.stringify(productDataJson)
                    console.log(productDataJson)
                    const result = await db.sequelize.query(
                        'DECLARE @Success INT;EXEC BulkInsertProducts :JsonData, :ShopID, @Success OUTPUT; Select @Success as Success',
                        {
                            replacements: {
                                JsonData: productDataJson,
                                ShopID: vendor_shop_id,
                            },
                        }
                    )
                    console.log('eeee', result, result[0][0].Success)
                    if (result[0][0].Success === 1) {
                        console.log('hiii')
                        const productVariantPath = path.join(
                            __dirname,
                            '..',
                            '..',
                            'public',
                            'productVariantsJson.json'
                        )
                        let productVariantJsonData = fs.readFileSync(
                            productVariantPath,
                            'utf-8'
                        )
                        productVariantJsonData = JSON.parse(
                            productVariantJsonData
                        )
                        productVariantJsonData = JSON.stringify(
                            productVariantJsonData
                        )

                        const productVariantUploadData =
                            await db.sequelize.query(
                                'DECLARE @Success INT;EXEC BulkInsertProductVariants :JsonData, @Success OUTPUT; Select @Success as Success',
                                {
                                    replacements: {
                                        JsonData: productVariantJsonData,
                                    },
                                }
                            )
                        if (productVariantUploadData[0][0].Success === 1) {
                            return res.status(201).json({
                                message: 'Vendor Sign-Up Successfull',
                                error: false,
                                success: true,
                            })
                        }
                    }
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
