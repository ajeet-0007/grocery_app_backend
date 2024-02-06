const db = require('../../config/index')

exports.vendorRegistration = async (req, res, next) => {
    try {
        const {
            vendor_name,
            vendor_mobile_number,
            vendor_email,
            vendor_gst_number,
            vendor_address,
            vendor_city,
            vendor_pincode,
            vendor_state,
            vendor_country,
            vendor_shop_pic,
            agent_id,
        } = req.body

        const vendor_id = Math.ceil(Math.random() * 100)

        const data = await db.sequelize.query(
            'DECLARE @unique_vendor_shop_id VARCHAR(255); EXEC InsertVendor :vendor_id, :vendor_name, :vendor_mobile_number, :vendor_email, :vendor_gst_number, :vendor_address, :vendor_city, :vendor_pincode, :vendor_state, :vendor_country, :vendor_shop_pic, :agent_id, @unique_vendor_shop_id OUTPUT; SELECT @unique_vendor_shop_id as unique_vendor_shop_id;',
            {
                replacements: {
                    vendor_id: vendor_id,
                    vendor_name: vendor_name,
                    vendor_mobile_number: vendor_mobile_number,
                    vendor_email: vendor_email,
                    vendor_gst_number: vendor_gst_number,
                    vendor_address: vendor_address,
                    vendor_city: vendor_city,
                    vendor_pincode: vendor_pincode,
                    vendor_state: vendor_state,
                    vendor_country: vendor_country,
                    vendor_shop_pic: vendor_shop_pic,
                    agent_id: agent_id,
                },
                type: db.sequelize.QueryTypes.SELECT,
            }
        )

        const vendorSuccessfullDataInserted = await db.sequelize.query(
            'EXEC InsertVendorShopId :vendor_id, :vendor_shop_id',
            {
                replacements: {
                    vendor_id: vendor_id,
                    vendor_shop_id: data[0].unique_vendor_shop_id,
                },
            }
        )

        if (vendorSuccessfullDataInserted[1] === 1) {
            return res.status(201).json({
                message: 'Vendor Registered Successfully',
                vendor_shop_id: data[0].unique_vendor_shop_id,
                success: true,
                error: false,
            })
        } else {
            return res.status(400).json({
                message: 'Something went wrong',
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
