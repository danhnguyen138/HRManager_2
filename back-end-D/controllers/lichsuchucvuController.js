const db = require(`../models`);
const getLichSuById = async (req, res) => {
    try {
        const { id } = req.params;
        const getHistory = await db.LichSuPhongBan.findAll({
            where: {
                idNhanVien: id
            }
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
const createLichSuById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            idPhongBan,
            idChucVu,
            phongbancu,
            chucvucu,
            phongbanmoi,
            chucvumoi,
            ngayqd,
            soqd,
            lydo,
        } = req.body;
        const idPhongBanMoi= phongbanmoi.slice(0,phongbanmoi.indexOf(' '));
        const idChucVuMoi= chucvumoi.slice(0,chucvumoi.indexOf(' '));
        const tenphongban= phongbanmoi.slice(phongbanmoi.indexOf(' ')+1, phongbanmoi.length);
        const tenchucvu= chucvumoi.slice(chucvumoi.indexOf(' ')+1, chucvumoi.length);
        if (idPhongBan==idPhongBanMoi&& idChucVu==idChucVuMoi) return res.status(400).json({
            error:'Phòng ban và chức vụ mới không được trùng với phòng ban và chức vụ cũ'
        })
        if (idPhongBan) await db.PhongBan.decrement('SiSo',{by:1, where:{id:idPhongBan}});

        await db.NhanVien.update({
            idPhongBan: idPhongBanMoi,
            idChucVu: idChucVuMoi
        },{
            where:{
                id:id
            }
        });
        const getPhongBan= await db.PhongBan.findOne({where:{
            id: idPhongBanMoi
        }});
        if (getPhongBan.SoLuong<=getPhongBan.SiSo){
            res.status(500).json({
                error: 'Phòng ban đủ số lượng nhân viên'
            })
        }
        await db.PhongBan.increment('SiSo', {by:1,where:{
            id:idPhongBanMoi
        }})
     
        await db.LichSuPhongBan.create({
            idNhanVien: id,
            TenPhongBanCu: phongbancu,
            TenChucVuCu: chucvucu,
            TenPhongBanMoi: tenphongban, 
            TenChucVuMoi: tenchucvu,
            NgayQD: ngayqd,
            SoQD: soqd,
            LyDo: lydo

        })
        res.status(200).json({
            msg:'Thay đổi phòng ban, chức vụ thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    getLichSuById,
    createLichSuById
}