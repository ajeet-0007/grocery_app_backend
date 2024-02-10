const db = require('../../config/index')

exports.vendorRegistration = async (req, res, next) => {
    try {
        const {
            vendor_name,
            vendor_mobile_number,
            vendor_email,
            vendor_address,
            vendor_city,
            vendor_pincode,
            vendor_state,
            vendor_country,
            shop_address,
            shop_city,
            shop_pincode,
            shop_state,
            shop_country,
            shop_gst_number,
            shop_pic,
            shop_mobile_number,
        } = req.body

        const { agent_id } = req.user

        const data = await db.sequelize.query(
            'DECLARE @unique_vendor_shop_id VARCHAR(255); EXEC InsertVendor  :vendor_name, :vendor_mobile_number, :vendor_email, :vendor_address, :vendor_city, :vendor_pincode, :vendor_state, :vendor_country, :agent_id, @unique_vendor_shop_id OUTPUT; SELECT @unique_vendor_shop_id as unique_vendor_shop_id;',
            {
                replacements: {
                    vendor_name: vendor_name,
                    vendor_mobile_number: vendor_mobile_number,
                    vendor_email: vendor_email,
                    vendor_address: vendor_address,
                    vendor_city: vendor_city,
                    vendor_pincode: vendor_pincode,
                    vendor_state: vendor_state,
                    vendor_country: vendor_country,
                    agent_id: agent_id,
                },
                type: db.sequelize.QueryTypes.SELECT,
            }
        )

        const vendorSuccessfullDataInserted = await db.sequelize.query(
            'EXEC InsertVendorShopId :vendor_email, :vendor_shop_id',
            {
                replacements: {
                    vendor_email: vendor_email,
                    vendor_shop_id: data[0].unique_vendor_shop_id,
                },
            }
        )

        if (vendorSuccessfullDataInserted[1] === 1) {
            const cityInsertedSuccesfully = await db.sequelize.query(
                'DECLARE @result INT;EXEC InsertCity :CityName, @result OUTPUT; SELECT @result as result;',
                {
                    replacements: {
                        CityName: vendor_city,
                    },
                }
            )

            if (
                cityInsertedSuccesfully[0][0].result === 0 ||
                cityInsertedSuccesfully[0][0].result === 1
            ) {
                const shopRegisteredSuccess = await db.sequelize.query(
                    'DECLARE @Success INT; EXEC AddShopData @ShopID = :ShopID, @ShopAddress = :ShopAddress, @ShopCity = :ShopCity, @ShopPincode = :ShopPincode, @ShopState = :ShopState, @ShopCountry = :ShopCountry, @ShopGSTNumber = :ShopGSTNumber, @ShopPIC = :ShopPIC, @ShopMobileNumber = :ShopMobileNumber, @Success = @Success OUTPUT; SELECT @Success as Success;',
                    {
                        replacements: {
                            ShopID: data[0].unique_vendor_shop_id,
                            ShopAddress: shop_address,
                            ShopCity: shop_city,
                            ShopPincode: shop_pincode,
                            ShopState: shop_state,
                            ShopCountry: shop_country,
                            ShopGSTNumber: shop_gst_number,
                            ShopPIC: shop_pic,
                            ShopMobileNumber: shop_mobile_number,
                        },
                        type: db.sequelize.QueryTypes.SELECT, // Add this line if using Sequelize < v5
                    }
                )
                if (shopRegisteredSuccess[0].Success === 1) {
                    return res.status(201).json({
                        message: 'Vendor and Shop Registered Successfully',
                        shop_id: data[0].unique_vendor_shop_id,
                        error: false,
                        success: true,
                    })
                }
            }
        } else {
            return res.status(200).json({
                message: 'Vendor Already Exist',
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
            success: false,
        })
    }
}
