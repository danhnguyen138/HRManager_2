const db = require('../models');
const { Sequelize, Model, DataTypes } = require('sequelize');
const postTongHop= async(req, res)=>{
    try {
        const {Thang, idNhanVien}= req.body;
        console.log(Thang)
        const getThang= await db.ChamCong.findAll({
            where:{
                idNhanVien: idNhanVien,
                Ngay:{
                    [Sequelize.Op.like]: `${Thang}%`
                }
            }
        })
        const getThietLap= await db.ThietLapThoiGian.findOne({
            where:{
                id:1
            }
        });
        let tong= getThang.length;
        let tongGio=0;
        let buoiTre=0;
        let veSom=0;
        getThang.forEach(element => {
            tongGio=tongGio+parseFloat(element.TongGio);
            if (element.GioVao>getThietLap.GioVao) buoiTre+=1;
            if (element.GioRa<getThietLap.GioRa) veSom+=1;
        });
        const check= await db.TongHopNgayCong.findAll({
            where:{
                idNhanVien: idNhanVien,
                Thang: Thang
            }
        });
        if (check.length==0){
            const getTongHop=await db.TongHopNgayCong.create({
                idNhanVien: idNhanVien,
                Thang: Thang,
                NgayLamViec: tong,
                TongGio: tongGio,
                DiTre: buoiTre,
                VeSom: veSom
            })
            return res.status(200).json({
                getTongHop
            })
        }
        await db.TongHopNgayCong.update({
            NgayLamViec: tong,
            TongGio: tongGio,
            DiTre: buoiTre,
            VeSom: veSom
        },{
            where:{
                idNhanVien: idNhanVien,
                Thang: Thang
            }
        })
        const getTongHop= await db.TongHopNgayCong.findOne({
            where:{
                idNhanVien: idNhanVien,
                Thang: Thang
            }
        })
        res.status(200).json({
            getTongHop
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports={postTongHop}