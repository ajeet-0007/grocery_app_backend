require('dotenv').config
const jwt = require('jsonwebtoken')

exports.vendorAuthorize = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        return 'Provide token!'
    } else {
        jwt.verify(token, process.env.VENDOR_SECRET_KEY, (err, decoded) => {
            if (err) {
                return 'Auth Error!'
            } else {
                req.vendor = decoded
            }
        })
        next()
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
            success: false
        })
    }
    
}
