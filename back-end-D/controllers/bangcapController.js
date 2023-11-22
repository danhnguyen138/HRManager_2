const db = require('../models');

const getBangCapByIdNhanVien = async (req, res) => {
    try {
        const { id } = req.params;

        const getBC = await db.BangCap.findAll({
            where: {
                idNhanVien: id
            }
        });
        res.status(200).json({
            bangcap: getBC
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lay thong tin bang caap id bang cap id nhan vien
const getBangCapByIdBangCap= async(req, res)=>{
    try {
        const {id, idBC}= req.params;
        const getBC= await db.BangCap.findOne({
            where:{
                idNhanVien: id,
                id: idBC
            }
        })
        res.status(200).json({
            bangcap: getBC 
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}
const createBangCapByIdNhanVien = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            degreeCode,
            decisionNumber,
            title,
            typeDegree,
            specialized,
            formsTrain,
            rating,
            score,
            dateSign,
            termDegree,
            placeDegree,
            addressDegree,
            noteDegree
        } = req.body;

        await db.BangCap.create({
            MaBC: degreeCode,
            SoQD: decisionNumber,
            TenBC: title,
            LoaiBC: typeDegree,
            ChuyenNganh: specialized,
            HinhThuc: formsTrain,
            XepLoai: rating,
            DiemSo: score,
            NgayKy: dateSign,
            HieuLuc: termDegree,
            ToChuc: placeDegree,
            DiaChi: addressDegree,
            GhiChu: noteDegree,
            idNhanVien: id
        })
        res.status(200).json({
            msg: "Bằng cấp đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateBangCapByIdNhanVien = async (req, res) => {
    try {
        const { id, idBC } = req.params;
        const {
            degreeCode,
            decisionNumber,
            title,
            typeDegree,
            specialized,
            formsTrain,
            rating,
            score,
            dateSign,
            termDegree,
            placeDegree,
            addressDegree,
            noteDegree
        } = req.body;
        await db.BangCap.update({
            MaBC: degreeCode,
            SoQD: decisionNumber,
            TenBC: title,
            LoaiBC: typeDegree,
            ChuyenNganh: specialized,
            HinhThuc: formsTrain,
            XepLoai: rating,
            DiemSo: score,
            NgayKy: dateSign,
            HieuLuc: termDegree,
            ToChuc: placeDegree,
            DiaChi: addressDegree,
            GhiChu: noteDegree,
        }, {
            where: {
                idNhanVien: id,
                id: idBC
            }
        });
        res.status(200).json({
            msg: "Bằng cấp đã được cập nhật thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteBangCapByIdNhanVien= async(req, res)=>{
    try {
        const {id, idBC}= req.params;
        await db.BangCap.destroy({
            where:{
                idNhanVien:id,
                id: idBC
            }
        })
        res.status(200).json({
            msg:'Bằng cấp đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    getBangCapByIdNhanVien,
    createBangCapByIdNhanVien,
    updateBangCapByIdNhanVien,
    deleteBangCapByIdNhanVien,
    getBangCapByIdBangCap
}