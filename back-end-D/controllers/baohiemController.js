const db = require('../models');
const { Op } = require('sequelize');
const getLichSuCapNhat = async (req, res) => {
    try {
        const { id } = req.params;
        const getHistory = await db.LichSuCapNhatBaoHiem.findAll({
            where: {
                idNhanVien: id
            },
            include: [{
                model: db.NhanVien,
                as:'thaydoi'
            }]
        })

        res.status(200).json({
            getHistory
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getNhanVienNotInBaoHiem = async (req, res) => {
    try {
        const [result, metadata] = await db.sequelize.query(
            "SELECT idNhanVien FROM `baohiem`;"
        )
        let dataEmployee = [];
        result.map(item => dataEmployee.push(item.idNhanVien))

        const employee = await db.NhanVien.findAll({
            where: {
                id: {
                    [Op.notIn]: dataEmployee
                }
            }
        })
        res.status(200).json({
            employee
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getBaoHiemById = async (req, res) => {
    try {
        const { id } = req.params;
        const getBaoHiem = await db.BaoHiem.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien
            }]
        });
        res.status(200).json({
            getBaoHiem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const createBaoHiem = async (req, res) => {
    try {
        const {
            idNhanVien,
            insuranceCode,
            dateStart,
            insurancePremium,
            percentCompany,
            percentEmployee,
            moneyEmployee,
            creator,
            noteInsurance,
            money
        } = req.body;
        await db.BaoHiem.create({
            MaBH: insuranceCode,
            NgayBD: dateStart,
            MucDong: insurancePremium,
            PhanTramLD: percentEmployee,
            PhanTramCT: percentCompany,
            GhiChu: noteInsurance,
            NguoiThucHien: creator,
            NhanVienDong: money,
            idNhanVien: idNhanVien
        })
        res.status(200).json({
            msg: 'Bảo hiểm đã được tạo thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateBaoHiem = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            LuongDongBaoHiem,
            MaYT,
            MaBH,
            NoiKhamYT,
            TrangThai
        } = req.body;
        const oldInsurance = await db.BaoHiem.findOne({
            where: {
                idNhanVien: id
            }
        });
        // Them lich su cap nhat
        const checkMaBH= await db.BaoHiem.findOne({
            where:{
                MaBH:MaBH
            }
        })
        if (checkMaBH&&checkMaBH.idNhanVien!=id){
            return res.status(400).json({
                error:'Mã bảo hiểm đã được sử dụng'
            })
        }
        if (oldInsurance.MaYT !== MaYT) {
            if (oldInsurance.MaYT === 'BHxxxxxxxxxxxxx') {
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm y tế',
                    NoiDungCu: oldInsurance.MaYT,
                    NoiDungMoi: MaYT,
                    LyDo: 'Cập nhật mới mã bảo hiểm y tế',
                    idThayDoi: req.user.id
                })
            }else{
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm y tế',
                    NoiDungCu: oldInsurance.MaYT,
                    NoiDungMoi: MaYT,
                    LyDo: 'Sai mã bảo hiểm y tế',
                    idThayDoi: req.user.id
                })
            }
        }
        if (oldInsurance.MaBH !== MaBH) {
            if (oldInsurance.MaBH === 'BHXHxxxxxxxxxx') {
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm xã hội',
                    NoiDungCu: oldInsurance.MaBH,
                    NoiDungMoi: MaBH,
                    LyDo: 'Cập nhật mới mã bảo hiểm xã hội',
                    idThayDoi: req.user.id
                })
            }else{
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm xã hội',
                    NoiDungCu: oldInsurance.MaBH,
                    NoiDungMoi: MaBH,
                    LyDo: 'Sai mã bảo hiểm xã hội',
                    idThayDoi: req.user.id
                })
            }
        }
        if (oldInsurance.NoiKhamYT !== NoiKhamYT) {
            if (oldInsurance.NoiKhamYT === 'xxxxxxxxx') {
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Nơi khám bảo hiểm y tế',
                    NoiDungCu: oldInsurance.NoiKhamYT,
                    NoiDungMoi: NoiKhamYT,
                    LyDo: 'Cập nhật mới nơi khám bảo hiểm',
                    idThayDoi: req.user.id
                })
            }else{
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Nơi khám bảo hiểm y tế',
                    NoiDungCu: oldInsurance.NoiKhamYT,
                    NoiDungMoi: NoiKhamYT,
                    LyDo: 'Sai nơi khám bảo hiểm y tế',
                    idThayDoi: req.user.id
                })
            }
        }
        if (oldInsurance.LuongDongBaoHiem !== LuongDongBaoHiem) {
            if (oldInsurance.NoiKhamYT === 'xxxxxxxxx') {
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Lương bảo hiểm',
                    NoiDungCu: oldInsurance.LuongDongBaoHiem,
                    NoiDungMoi: LuongDongBaoHiem,
                    LyDo: 'Cập nhật mới lương bảo hiểm',
                    idThayDoi: req.user.id
                })
            }else{
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Lương bảo hiểm',
                    NoiDungCu: oldInsurance.LuongDongBaoHiem,
                    NoiDungMoi: LuongDongBaoHiem,
                    LyDo: 'Cập nhật lương bảo hiểm mới',
                    idThayDoi: req.user.id
                })
            }
        }
        if (oldInsurance.TrangThai !== TrangThai) {
            
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Trạng thái',
                    NoiDungCu: oldInsurance.TrangThai,
                    NoiDungMoi: TrangThai,
                    LyDo: 'Cập nhật trạng thái mới',
                    idThayDoi: req.user.id
                })
            
        }
        await db.BaoHiem.update({
            LuongDongBaoHiem: LuongDongBaoHiem,
            MaYT: MaYT,
            MaBH: MaBH,
            NoiKhamYT: NoiKhamYT,
            TrangThai: TrangThai
        }, {
            where: {
                idNhanVien: id
            }
        })
        res.status(200).json({
            msg: 'Bảo hiểm đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getBaoHiem = async (req, res) => {
    try {
        const getBaoHiem = await db.BaoHiem.findAll({
            include: [{
                model: db.NhanVien
            }]
        })
        res.status(200).json({
            getBaoHiem
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const deleteBaoHiem = async (req, res) => {
    try {
        const { id } = req.params;
        await db.BaoHiem.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Bảo hiểm đã được xóa thành công.'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    getNhanVienNotInBaoHiem,
    createBaoHiem,
    getBaoHiem,
    deleteBaoHiem,
    getBaoHiemById,
    updateBaoHiem,
    getLichSuCapNhat
}