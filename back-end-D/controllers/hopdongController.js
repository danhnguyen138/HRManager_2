const db = require('../models');
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
//Lay Hop Dong Cua Nhan Vien
const getHopDongByIdNhanVienActive= async(req, res)=>{
    try {
        const {id}=req.params;
        const hopdong=await db.HopDong.findOne({
            where:{
                idNhanVien: id,
                TrangThai: 'Còn hiệu lực'
            }
        });
        if (!hopdong) return res.status(400).json({
            error:'Không có hợp đồng còn hiệu lực'
        })
        res.status(200).json({
            hopdong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getHopDongByIdHieuLuc= async(req, res)=>{
    try {
        const {id}= req.params;
        const getHD= await db.HopDong.findOne({
            where:{
                idNhanVien: id,
                TrangThai: 'Còn hiệu lực'
            },
        })
        res.status(200).json({
            getHD
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getHopDongByIdNhanVien = async (req, res) => {
    try {
        const { id } = req.params;
        const getHD = await db.HopDong.findAll({
            where: {
                idNhanVien: id
            },
        });
        const today = new Date();
        getHD.forEach(element => {
            if (element.NgayHetHan) {
                const expirationDate = new Date(element.NgayHetHan);
                if (today > expirationDate) {
                    db.HopDong.update({
                        TrangThai: 'Hết hiệu lực'
                    }, {
                        where: {
                            id: element.id
                        }
                    })
                }
            }
        });
        const hopdong = await db.HopDong.findAll({
            where: {
                idNhanVien: id
            },
        });
        res.status(200).json({
            hopdong: hopdong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
//Lay thong tin hop dong theo idNhanVien và id HD
const getHopDongByIdHopDong = async (req, res) => {
    try {

        const { id, idHD } = req.params;
        const contract= await db.HopDong.findByPk(idHD)
        if (!contract) return res.status(400).json({
            error:'Hợp đồng không tồn tại hoặc đã bị xóa'
        })
        res.status(200).json({
            contract
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Tao Hop Dong cho Nhan Vien
const ngayHetHan = (so, kyhieu) => {
    if (kyhieu == 'T') {
        let soThang = parseInt(so);
        let today = new Date();
        var next = new Date(today.getFullYear(), today.getMonth() + soThang, today.getDate());
        return next.toISOString().slice(0, 10);
    } else if (kyhieu == 'N') {
        let soNam = parseInt(so);
        let today = new Date();
        let next = new Date(today.getFullYear() + soNam, today.getMonth(), today.getDate());
        return next.toISOString().slice(0, 10);
    }
    return "";
}
const createHopDongByIdNhanVien = async (req, res) => {
    try {

        const { id } = req.params;
        const checkHD= await db.HopDong.findOne({
            where:{
                idNhanVien: id,
                TrangThai: 'Còn hiệu lực'
            }
        })
        if (checkHD) return res.status(500).json({
            error:'Có hợp đồng còn hiệu lực nên không được tạo mới'
        })
        const {
            idDaiDien,
            hotena,
            chucvu,
            daidien,
            diachia,
            sodienthoaia,
            thoigianlamviec,
            idNhanVien,
            hotenB,
            cccdb,
            ngaycapb,
            tai,
            DiaChiLV,
            mahd,
            tenhopdong,
            loaihopdong,
            thoihan,
            luongchinh,
            luongchinhthuctap,
            luongchinhthuviec,
            ngachluong,
            bacluong,
            ghichu,
            hinhthuctra
        } = req.body;
        let hethan = "";
        if (thoihan != "") {
            const so = thoihan.slice(0, thoihan.indexOf(' '));
            const kyhieu = thoihan.slice(thoihan.indexOf(' ') + 1, thoihan.indexOf(' ') + 2)
            hethan = ngayHetHan(so, kyhieu)
        }
        let idNgachLuong='';
        let idBacLuong='';
        let TenNgachLuong='';
        let TenBacLuong=''
        if (ngachluong!=""){
            idNgachLuong= ngachluong.slice(0,ngachluong.indexOf(' '));
            TenNgachLuong= ngachluong.slice(ngachluong.indexOf(' ')+1,ngachluong.length)
        }
        if (bacluong!=''){
            idBacLuong=bacluong.slice(0, bacluong.indexOf(' '));
            TenBacLuong=bacluong.slice(bacluong.indexOf(' ')+1,bacluong.length)
        }
        // tao hop dong
        await db.HopDong.create({
            idDaiDien: idDaiDien,
            HoTenA: hotena,
            ChucVuA: chucvu,
            DaiDienA: daidien,
            DiaChiA:diachia,
            SoDTA: sodienthoaia,
            ThoiGianLV: thoigianlamviec,
            HoTenB: hotenB,
            CCCDB:cccdb,
            NgayCapB: ngaycapb,
            TaiB: tai,
            DiaChiLV: DiaChiLV,
            MaHD: mahd,
            TenHD: tenhopdong,
            LoaiHD: loaihopdong,
            ThoiHan:thoihan,
            LuongChinh: luongchinh,
            LuongChinhThucTap: luongchinhthuctap,
            LuongChinhThuViec: luongchinhthuviec,
            NgachLuong: TenNgachLuong,
            BacLuong: TenBacLuong,
            GhiChu: ghichu,
            HetHan:hethan==""?null:hethan,
            idNhanVien: idNhanVien,
            HinhThucTra:hinhthuctra
        });
   
        if (loaihopdong=='Thoả thuận thử việc'){
            await db.NhanVien.update({
                LoaiNV: 'Nhân viên thử việc',
                LuongChinh:luongchinhthuviec,
                isBacLuong:0,
                idBacLuong:''
            },{
                where:{
                    id: idNhanVien
                }
            })
        }
       
        if (loaihopdong=='Thỏa thuận thực tập'){
            await db.NhanVien.update({
                LoaiNV:'Nhân viên thực tập',
                LuongChinh: luongchinhthuctap,
                isBacLuong:0,
                idBacLuong:''
            },{
                where:{
                    id:idNhanVien
                }
            })
        }
        if (hinhthuctra=='Trả lương theo bậc lương'){
            await db.NhanVien.update({
                LoaiNV:'Nhân viên chính thức',
                isBacLuong:1,
                idBacLuong:idBacLuong,
                LuongChinh:0
            },{
                where:{
                    id:idNhanVien
                }
            })
        }
        if (hinhthuctra=='Trả lương theo lương chính'){
            await db.NhanVien.update({
                LoaiNV:'Nhân viên chính thức',
                isBacLuong:0,
                idBacLuong:'',
                LuongChinh:luongchinh
            },{
                where:{
                    id: idNhanVien
                }
            })
        }
        // await db.HopDong.create({
        //     SoQD: SoQD,
        //     TieuDe: TieuDe,
        //     NgayKy: NgayKy,
        //     NgayBatDau: NgayBatDau,
        //     NgayKetThuc: NgayKetThuc,
        //     NoiDung: NoiDung,
        //     idNhanVien: id
        // })
        res.status(200).json({
            msg: "Hợp đồng đã được tạo thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
// Lay dai dien hop dong ben A
const getDaiDien = async (req, res) => {
    try {
        const userDaiDien = await db.NhanVien.findAll({
            include: [{
                model: db.ChucVu
            }],

        })
        res.status(200).json({
            userDaiDien
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateHopDongByIdNhanVien = async (req, res) => {
    try {
        const { id, idHD } = req.params;
        const checkHD= await db.HopDong.findOne({
            where:{
                id: idHD
            }
        })
        if (checkHD.TrangThai=='Hết hiệu lực') return res.status(500).json({
            error:'Hợp đồng hết hiệu lực không được cập nhật'
        })
        const {
            idDaiDien,
            mahd,
            tenhopdong,
            loaihopdong,
            thoihan,
            luongcoban,
            trangthai,
            cachtra,
            ngaytra,
            ghichu
        } = req.body;
        let hethan = "";
        if (thoihan != "") {
            const so = thoihan.slice(0, thoihan.indexOf(' '));
            const kyhieu = thoihan.slice(thoihan.indexOf(' ') + 1, thoihan.indexOf(' ') + 2)
            hethan = ngayHetHan(so, kyhieu)
        }
        await db.HopDong.update({
            idDaiDien: idDaiDien,
            MaHD: mahd,
            TenHD: tenhopdong,
            LoaiHD: loaihopdong,
            ThoiHan: thoihan,
            LuongCoBan: luongcoban,
            NgayHetHan: hethan==""?null:hethan,
            TrangThai: trangthai,
            CachTra: cachtra,
            VaoNgay: ngaytra,
            NoiDung: ghichu,

        }, {
            where: {
                idNhanVien: id,
                id: idHD
            }
        });

        res.status(200).json({
            msg: "Hợp đồng đã được cập nhật thành công",

        })
    } catch (err) {
        res.status(500).json({
            error: error.message
        })
    }
}
//'/thaydoihopdong/:id'
const changeHieuLuc= async(req, res)=>{
    try {
        const {id}= req.params;
        const checkHD= await db.HopDong.findByPk(id);
        if (!checkHD) return res.status(400).json({
            error:'Hợp đồng không tồn tại hoặc đã bị xóa'
        })
        await db.NhanVien.update({
            isBacLuong:null,
            LuongChinh: null,
            idBacLuong: null,
            LoaiNV: null
        },{
            where:{
                id: checkHD.idNhanVien
            }
        })
        await db.HopDong.update({
            TrangThai: 'Hết hiệu lực'
        },{
            where:{
                id: id
            }
        }
        )
        res.status(200).json({
            msg:'success'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleleHopDongByIdNhanVien = async (req, res) => {
    try {
        const { id, idHD } = req.params;
        const checkHieuLuc= await db.HopDong.findByPk(idHD);
        if (checkHieuLuc.TrangThai=='Còn hiệu lực') return res.status(400).json({
            error:'Hợp đồng còn hiệu lực không được xóa'
        })
        await db.HopDong.destroy({
            where: {
                idNhanVien: id,
                id: idHD
            }
        })
        res.status(200).json({
            msg: 'Hợp đồng đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {changeHieuLuc,getHopDongByIdHieuLuc, getHopDongByIdNhanVien, createHopDongByIdNhanVien, updateHopDongByIdNhanVien, getDaiDien, deleleHopDongByIdNhanVien, getHopDongByIdHopDong , getHopDongByIdNhanVienActive}