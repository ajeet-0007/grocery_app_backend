// exports.userFetchShop = async (req, res, next) => {
//     try {
//         const {pincode, latitude, longitude} = req.query;
//         console.log(typeof pincode, latitude, longitude)

//         const result = await db.sequelize.query("EXEC [dbo].[GetNearestShops] @pincode=:pincode, @lat=:lat, @lon=:lon", {
//             replacements: {
//                 pincode: pincode,
//                 lat: latitude,
//                 lon: longitude
//             }
//         })

//         console.log(result);

//         return res.json(result);

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             message: error.message,
//             success: false,
//             error: true
//         })
//     }
// }

const db = require('../../config/index')

exports.userFetchShop = async (req, res, next) => {
    try {
        const { pincode, latitude, longitude } = req.query

        const result = await db.sequelize.query(
            'EXEC GetNearestShops @pincode = :pincode, @lat = :lat, @lon = :lon',
            {
                replacements: {
                    pincode: pincode,
                    lat: latitude,
                    lon: longitude,
                },
                type: db.sequelize.QueryTypes.SELECT,
            }
        )

        return res
            .status(200)
            .json({ shopID: result[0]?.ShopID, success: true, error: false })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message,
            success: false,
            error: true,
        })
    }
}
