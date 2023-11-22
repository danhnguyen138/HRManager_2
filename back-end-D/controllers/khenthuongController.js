const db = require('../models');
const createKhenThuongCaNhan = async (req, res) => {
    try {
        const {
            MaKT,
            CanCu,
            LyDo,
            HinhThuc,
            SoQD,
            NgayQD ,
            NguoiBanHanh,
            Thang,
            TienThuong,
            idNhanVien
        } = req.body;
        await db.KhenThuongCaNhan.create({
            MaKT: MaKT,
            CanCu: CanCu,
            LyDo: LyDo,
            HinhThuc:HinhThuc,
            SoQD: SoQD,
            NgayQD: NgayQD ,
            NguoiBanHanh: NguoiBanHanh,
            Thang: Thang,
            TienThuong: TienThuong,
            idNhanVien: idNhanVien
        });
        res.status(200).json({
            msg: "Khen thưởng đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const createKhenThuongTapThe= async(req, res)=>{
    try {
        const {
            MaKT,
            CanCu,
            LyDo,
            HinhThuc,
            SoQD,
            NgayQD,
            NguoiBanHanh,
            Thang,
            TienThuong,
            idDoiTuong,
            NgayKT,
            NguonChi,
            TrangThai
        } = req.body;
        await db.KhenThuongTapThe.create({
            MaKT: MaKT,
            CanCu: CanCu,
            LyDo: LyDo,
            HinhThuc: HinhThuc,
            SoQD: SoQD,
            NgayQD: NgayQD,
            NguoiBanHanh: NguoiBanHanh,
            Thang: Thang,
            TienThuong: TienThuong,
            idDoiTuong: idDoiTuong,
            NgayKT: NgayKT,
            NguonChi: NguonChi,
            TrangThai: TrangThai
        });
        res.status(200).json({
            msg: "Khen thưởng đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getKhenthuongCanhan = async (req, res) => {
    try {
        const khenthuongcanhan = await db.KhenThuongCaNhan.findAll({
            include:[{
                model:db.NhanVien
            }]
        });
        res.status(200).json({
            khenthuongcanhan
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getKhenthuongTapthe = async (req, res) => {
    try {
        const khenthuongtapthe = await db.KhenThuongTapThe.findAll({
            include:[{
                model:db.PhongBan
            }]
        });
        res.status(200).json({
            khenthuongtapthe
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getKhenThuongCaNhanById = async (req, res) => {
    try {
        const { id } = req.params;
        const getKhenThuong = await db.KhenThuongCaNhan.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
            }]
        })
        res.status(200).json({
            getKhenThuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getKhenThuongTapTheById = async (req, res) => {
    try {
        const { id } = req.params;
        const getKhenThuong = await db.KhenThuongTapThe.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.PhongBan,
            }]
        })
        res.status(200).json({
            getKhenThuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteKhenThuongTapThe= async(req, res)=>{
    try {
        const { id } = req.params;
        console.log(id)
        await db.KhenThuongTapThe.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Khen thưởng đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteKhenThuongCaNhan = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        await db.KhenThuongCaNhan.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Khen thưởng đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateKhenThuongCaNhan = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            MaKT,
            CanCu,
            LyDo,
            HinhThuc,
            SoQD,
            NgayQD ,
            NguoiBanHanh,
            Thang,
            TienThuong,
            idNhanVien
        } = req.body;
        await db.KhenThuongCaNhan.update({
            MaKT: MaKT,
            CanCu: CanCu,
            LyDo: LyDo,
            HinhThuc:HinhThuc,
            SoQD: SoQD,
            NgayQD: NgayQD ,
            NguoiBanHanh: NguoiBanHanh,
            Thang: Thang,
            TienThuong: TienThuong,
            idNhanVien: idNhanVien
        }, {
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Khen thưởng đã cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateKhenThuongTapThe= async(req,res)=>{
    try {
        const { id } = req.params;
        const {
            MaKT,
            CanCu,
            LyDo,
            HinhThuc,
            SoQD,
            NgayQD,
            NguoiBanHanh,
            Thang,
            TienThuong,
            idDoiTuong,
            NgayKT,
            NguonChi,
            TrangThai
        } = req.body;
        await db.KhenThuongTapThe.update({
            MaKT: MaKT,
            CanCu: CanCu,
            LyDo: LyDo,
            HinhThuc: HinhThuc,
            SoQD: SoQD,
            NgayQD: NgayQD,
            NguoiBanHanh: NguoiBanHanh,
            Thang: Thang,
            TienThuong: TienThuong,
            idDoiTuong: idDoiTuong,
            NgayKT: NgayKT,
            NguonChi: NguonChi,
            TrangThai: TrangThai
        }, {
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Khen thưởng đã cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const sendKhenThuong = async (req, res) => {
    try {
        const { id } = req.params;
        const getKhenThuong = await db.KhenThuong.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
                as: 'nhanvien',
            }]
        });
        const newNotification= await db.ThongBao.create({
            TieuDe: getKhenThuong.TieuDe,
            NoiDung: getKhenThuong.NoiDung,
            TrangThai:'Đã gửi',
            ThoiGianGui: new Date()
        })
        for (let i = 0; i < getKhenThuong.nhanvien.length; i++) {
            await db.NhanVienThongBao.create({
                idNhanVien: getKhenThuong.nhanvien[i].id,
                idThongBao: newNotification.id,
            })
        }
        res.status(200).json({
            msg:'Thông báo khen thưởng đã được gửi'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    createKhenThuongCaNhan,
    createKhenThuongTapThe,
    getKhenthuongCanhan,
    deleteKhenThuongCaNhan,
    getKhenThuongCaNhanById,
    updateKhenThuongCaNhan,
    sendKhenThuong,
    getKhenthuongTapthe,
    deleteKhenThuongTapThe,
    getKhenThuongTapTheById,
    updateKhenThuongTapThe
}