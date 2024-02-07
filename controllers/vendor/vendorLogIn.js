require('dotenv').config();
const db = require('../../config/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


exports.vendorLogIn = async (req, res, next) => {
    try {
        const {vendor_shop_id, vendor_password} = req.body;
        const data = await db.sequelize.query("EXEC GetVendorPassword :vendor_shop_id", {
            replacements:{
                vendor_shop_id : vendor_shop_id
            },
            type: db.sequelize.QueryTypes.SELECT,
        })
        if(data.length !== 0){
            const checkVendorPassword = await bcrypt.compare(vendor_password, data[0].vendor_password);
            if(checkVendorPassword){
                const vendorAccessToken = jwt.sign({vendor_shop_id: vendor_shop_id}, process.env.VENDOR_SECRET_KEY)
                return res.status(200).json({
                    message: "Vendor Login Successfull",
                    vendorAccessToken:  vendorAccessToken,
                    error : false,
                    success: true
                })
            }else{
                return res.status(200).json({
                    message: "Provide Correct Shop-id Or Password",
                    error : false,
                    success: true
                })
            }
        }else{
            return res.status(200).json({
                message : "Vendor does not Exist",
                error: false,
                success: true
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error : error.message,
            success: false
        })
    }
}