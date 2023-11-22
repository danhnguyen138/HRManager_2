const db = require('../models');
const sequelize= require('sequelize');

const getThietLap= async(req, res)=>{
    try {
        const count= await db.ThietLapThoiGian.count();
        if (count===0){
            let getThietLap= await db.ThietLapThoiGian.create({
                GioVao:'',
                GioRa:'',
          
            })
            return res.status(200).json({
                getThietLap
            })
        }
        
        let getThietLap= await db.ThietLapThoiGian.findByPk(1);
        return res.status(200).json({
            getThietLap
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateChamCongThietLap= async(req, res)=>{
    try {
        const {
            GioVao,
            GioRa,
          
        }= req.body;
        await db.ThietLapThoiGian.update({
            GioVao: GioVao,
            GioRa: GioRa,
       
        },{
            where:{
                id:1
            }
        })
        res.status(200).json({
            msg:'Thiết lập thời gian đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports={getThietLap, updateChamCongThietLap}