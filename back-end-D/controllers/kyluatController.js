const db = require('../models');
const createKyLuat = async (req, res) => {
    try {
        const {
            idNhanVien,
            SuViec,
            MoTa,
            DiaDiem,
            ChungKien,
            TuongThuat,
            HinhThucKyLuat,
            SoQD,
            NguoiBanHanh,
            NgayQD,
            ThoiGian,
            TrangThai,
        }= req.body;
        await db.KyLuat.create({
            idNhanVien: idNhanVien,
            SuViec: SuViec,
            MoTa: MoTa,
            DiaDiem: DiaDiem,
            ChungKien: ChungKien,
            TuongThuat: TuongThuat,
            HinhThucKyLuat: HinhThucKyLuat,
            SoQD: SoQD,
            NguoiBanHanh: NguoiBanHanh,
            NgayQD: NgayQD,
            ThoiGian: ThoiGian,
            TrangThai: TrangThai,
        });
       
        res.status(200).json({
            msg: "Kỷ luật đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getAllKyLuat= async(req, res)=>{
    try {
        const getKyLuat= await db.KyLuat.findAll({
            include:[{
                model:db.NhanVien
            }]
        });
        res.status(200).json({
            getKyLuat
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getKyLuatById= async(req, res)=>{
    try {
        const {id}= req.params;
        const getKyLuat = await db.KyLuat.findOne({
            where:{
                id: id
            },
            include:[{
                model: db.NhanVien,
            }]
        })
        res.status(200).json({
            getKyLuat
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}
const deleteKyLuat= async (req, res)=>{
    try {
        const {id}= req.params;
        await db.KyLuat.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg:'Kỷ luật đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateKyLuat= async(req, res)=>{
    try {
        const {id}= req.params;
        const {
            idNhanVien,
            SuViec,
            MoTa,
            DiaDiem,
            ChungKien,
            TuongThuat,
            HinhThucKyLuat,
            SoQD,
            NguoiBanHanh,
            NgayQD,
            ThoiGian,
            TrangThai,
        }= req.body;
        await db.KyLuat.update({
            idNhanVien: idNhanVien,
            SuViec: SuViec,
            MoTa: MoTa,
            DiaDiem: DiaDiem,
            ChungKien: ChungKien,
            TuongThuat: TuongThuat,
            HinhThucKyLuat: HinhThucKyLuat,
            SoQD: SoQD,
            NguoiBanHanh: NguoiBanHanh,
            NgayQD: NgayQD,
            ThoiGian: ThoiGian,
            TrangThai: TrangThai,
        },{
            where:{
                id: id
            }
        })
      
        res.status(200).json({
            msg:'Kỷ luật đã cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const sendKyLuat= async(req, res)=>{
    try {
        const { id } = req.params;
        const getKyLuat = await db.KyLuat.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
                as: 'nhanvien',
            }]
        });
        const newNotification= await db.ThongBao.create({
            TieuDe: getKyLuat.TieuDe,
            NoiDung: getKyLuat.NoiDung,
            TrangThai:'Đã gửi',
            ThoiGianGui: new Date()
        })
        for (let i = 0; i < getKyLuat.nhanvien.length; i++) {
            await db.NhanVienThongBao.create({
                idNhanVien: getKyLuat.nhanvien[i].id,
                idThongBao: newNotification.id,
            })
        }
        res.status(200).json({
            msg:'Thông báo kỷ luật đã được gửi'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    createKyLuat,
    getAllKyLuat,
    deleteKyLuat,
    getKyLuatById,
    updateKyLuat,
    sendKyLuat
}