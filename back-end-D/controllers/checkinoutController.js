const db = require('../models');

const getInOut= async(req, res)=>{
    try {
        const {id}= req.params;
        const getInOutDetail = await db.CheckInOut.findAll({
            where: {
                USERID: id
            }
        });
        
        res.status(200).json({ getInOutDetail });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
        
    }
}


module.exports= {getInOut}