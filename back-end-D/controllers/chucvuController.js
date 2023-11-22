const db = require('../models');

const getAllChucVu = async (req, res) => {
    try {
        const getCV = await db.ChucVu.findAll();
        res.status(200).json({ getCV });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
const createChucVu = async (req, res) => {
    try {
      
        const {
            positionCode,
            namePosition,
            missionPosition,
            creatorPosition,
            notePosition,
            
        } = req.body;
        console.log(req.body)
        const checkPositionCode = await db.ChucVu.findOne({
            where: {
                MaChucVu: positionCode
            }
        });
        if (checkPositionCode) return res.status(404).json({
            error: 'Mã chức vụ đã được sử dụng'
        });
        const createChucVu = await db.ChucVu.create({
            MaChucVu: positionCode,
            TenChucVu: namePosition,
            MoTa: notePosition,
            NhiemVu: missionPosition,
            NguoiTao: creatorPosition,
        });
        await db.BacLuong.create({
            idChucVu: createChucVu.id
        })
        res.status(200).json({
            msg: "Chức vụ đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lay danh sach chuc vu cua nhan vien
const getNhanVienChucVu = async (req, res) => {
    try {
        const { id } = req.params;
        const getChucVu = await db.NhanVien.findByPk(id, {
            include: [{
                model: db.ChucVu,
                as:'chucvu',
                through:{
                    attributes: ['NgayKetThuc','NgayBatDau']
                }
            }]
        })
       
        //Lay nhan vien chuc vu
        const getNVCV= await getChucVu.chucvu;
        res.status(200).json({
            getNVCV
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getChucVu = async (req, res) => {
    try {
        const { id } = req.params;
     
        const getCV = await db.ChucVu.findByPk(id);
     
        res.status(200).json({
            getCV
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteChucVu = async (req, res) => {
    try {
        const { id } = req.params;
        await db.ChucVu.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({
            msg:'Chức vụ đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateChucVu = async (req, res)=>{
    try {

        const {id}= req.params;
        const {
            positionCode,
            namePosition,
            missionPosition,
            creatorPosition,
            notePosition, 
            hesoluong
        } = req.body;
        await db.ChucVu.update({
            MaChucVu: positionCode,
            TenChucVu: namePosition,
            MoTa: notePosition,
            NhiemVu: missionPosition,
            NguoiTao: creatorPosition,
            HeSoLuong: hesoluong
        },{
            where:{
                id: id
            }
        })
        res.status(200).json({
            msg:'Chức vụ đã được update thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Update bang nhan vien chuc vu
const updateNhanVienChucVu= async(req, res)=>{
    try {
        const {idNhanVien, idChucVu}= req.params;
        await db.NhanVienChucVu.update({
            NgayKetThuc: new Date()
        },
        {
            where:{
                idNhanVien: idNhanVien,
                idChucVu: idChucVu
            }
        })
        res.status(200).json({
            msg:'Cập nhật chức vụ thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = { getAllChucVu, createChucVu, getChucVu, deleteChucVu, updateChucVu, getNhanVienChucVu, updateNhanVienChucVu }