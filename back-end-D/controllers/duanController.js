const db = require('../models');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const moment = require('moment');

const formatday = (day) => {
    const isoDate = moment(day, 'DD/MM/YYYY').toISOString();
    return (isoDate)
  }
const getDanhSachDuAn= async(req, res)=>{
    try {
        const {tenphongban}=req.params;
        const duan=await db.DuAn.findAll({
            where:{                
                PhongBan: tenphongban
            }
        });
        duan.sort((a, b) => b.id - a.id);
        res.status(200).json({
            duan
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getDuAnbyID= async(req, res)=>{
    try {
        const {idproject}=req.params;
        const duan=await db.DuAn.findOne({
            where:{                
                id: idproject
            }
        });        
        res.status(200).json({
            duan
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const CreateDuAn = async (req, res) => {
    const { tenDuAn, ngayBatDau, ngayKetThuc, nhanVienSelected } = req.body;
    const {tenphongban}=req.params;
    console.log(tenDuAn, ngayBatDau, ngayKetThuc, nhanVienSelected ,tenphongban)
    try {   
      
        await db.DuAn.create({
          TenDuAn: tenDuAn,
          NgayBatDau: (ngayBatDau),
          NgayKetThuc:(ngayKetThuc),
          PhongBan:tenphongban,
          idNhanVien:nhanVienSelected.map((nhanVien) => nhanVien.value),
        });        
        
        res.status(200).json({ msg: "Dự án đã được tạo" });      
  
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  

  }

const updateDuAnbyID= async (req, res) => {
    try {
        const { idproject } = req.params;
        const { tenDuAn, ngayBatDau, ngayKetThuc, nhanVienSelected } = req.body;
        await db.DuAn.update({
            TenDuAn: tenDuAn,
            NgayBatDau: ngayBatDau,
            NgayKetThuc: ngayKetThuc,
            idNhanVien:nhanVienSelected.map((nhanVien) => nhanVien.value),       
        }, {
            where: {                
                id: idproject
            }
        });
        res.status(200).json({
            msg: "Dự án đã được cập nhật thành công",

        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



module.exports = {getDanhSachDuAn,CreateDuAn,getDuAnbyID,updateDuAnbyID}