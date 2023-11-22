const db = require('../models');
const sequelize = require('sequelize');
const getAll = async (req, res) => {
    try {
        const getPhongBan = await db.PhongBan.findAll();
        res.status(200).json({ getPhongBan });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
const createPhongBan = async (req, res) => {
    try {
        const { departmentCode,
            nameDepartment,
            numberDepartment,
            addressDepartment,
            telDepartment,
            // representative,
            noteDepartment } = req.body;
        const checkMaPB = await db.PhongBan.findOne({
            where: {
                MaPB: departmentCode
            }
        });
        if (checkMaPB) {
            return res.status(400).json({
                error: 'Mã phòng ban đã được tạo'
            })
        }
        const creatPB = await db.PhongBan.create({
            MaPB: departmentCode,
            TenPB: nameDepartment,
            SoLuong: numberDepartment,
            SoDienThoai: telDepartment,
            DiaChi: addressDepartment,
            // NguoiDaiDien: representative,
            NguoiDaiDien: "",
            MoTa: noteDepartment,
            NgayThanhLap: new Date(),
        });


        res.status(200).json({ msg: "Phòng ban đã được tạo thành công" })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}
const getPhongBanDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const getPBDetail = await db.PhongBan.findOne({
            where: {
                MaPB: id
            }
        })
        if (getPBDetail) {
            const getUserInPB = await db.NhanVien.findAll({
                where: {
                    idPhongBan: getPBDetail.id
                },
                include: [{
                    model: db.ChucVu
                }]
            });
            const countNam = await db.NhanVien.count({
                where: {
                    GioiTinh: 'Nam',
                    idPhongBan: getPBDetail.id
                }
            });
            const getCountChucVu = await db.NhanVien.findAll({
                attributes: ['idChucVu', [sequelize.fn('COUNT', 'id'), 'count']],
                group: ['idChucVu'],
                where: {
                    idPhongBan: getPBDetail.id
                },
                include: [{
                    model: db.ChucVu
                }]
            });
            const getPBInfo = {
                ...getPBDetail.dataValues,
                getUserInPB: getUserInPB,
                countNam,
                getCountChucVu
            }
            return res.status(200).json({ getPBInfo })
        }
        return res.status(404).json({
            error: 'Phòng ban không tồn tại'

        })


    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updatePhongBan = async (req, res) => {
    try {
        const { MaPB } = req.params;
        const {
            departmentCode,
            nameDepartment,
            numberDepartment,
            addressDepartment,
            telDepartment,
            // representative,
            noteDepartment

        } = req.body;
        const updatePB = await db.PhongBan.update({

            TenPB: nameDepartment,
            SoLuong: numberDepartment,
            SoDienThoai: telDepartment,
            DiaChi: addressDepartment,
            MoTa: noteDepartment,
            // NguoiDaiDien: representative
            NguoiDaiDien: ""
        }, {
            where: {
                MaPB: MaPB
            }
        });
        if (updatePB) return res.status(200).json({
            msg: "Phòng ban đã được cập nhật"
        });
        return res.status(404).json({
            error: "Phòng ban cập nhật không thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deletePhongBan = async (req, res) => {
    try {
        const { id } = req.params;

        const userInPhongBan = await db.NhanVien.findAll({
            where: {
                idPhongBan: id
            }
        });
        if (userInPhongBan === []) {
            return res.status(403).json({ error: "Phòng ban phải không có nhân viên mới được xóa" });
        }
        await db.PhongBan.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({ msg: "Phòng ban đã được xóa" });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = { getAll, createPhongBan, getPhongBanDetail, updatePhongBan, deletePhongBan };