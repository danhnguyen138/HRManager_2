const db = require(`../models`);

const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const tinhTongKPI= (array)=>{
    let tong= array.length;
    let tongPhanTram=0;
    array.forEach(item=>tongPhanTram+=parseFloat(item));
    return tongPhanTram/tong;
}
const deleteBangLuong = async(req, res)=>{
    try {
        const {id}= req.params;
        await db.BangLuong.destroy({
            where:{
                id: id
            }
        })
        res.status(200).json({
            msg:'Bảng lương đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const createBangLuong = async (req, res) => {
    try {
        const {
            Thang,
            NgayBatDau,
            NgayKetThuc,
            NgayCongChuan
        } = req.body;

        const user = await db.NhanVien.findAll({
            include: [{ model: db.PhongBan, model: db.ChucVu }]
        });
        const thietlap= await db.ThongSoLuong.findByPk(1);//%baohiem y te xa hoi
        //Kiem tra thu trong bang luong da tao chua
        const check = await db.BangLuong.findOne({
            where:{
                Thang:Thang
            }
        })
        if (check) return res.status(500).json({
            error: 'Bảng lương tháng này đã được tạo'
        })
        const taobangluong= await db.BangLuong.create({
            Thang: Thang,
            NgayBatDau: NgayBatDau,
            NgayKetThuc: NgayKetThuc,
            NgayCongChuan: NgayCongChuan
        })
        user.forEach(async (item) => {
            let thang= taobangluong.Thang.slice(taobangluong.Thang.indexOf('-')+1, taobangluong.Thang.length);
            thang= parseInt(thang);
   
            //xu li khi chua co hop dong
            if (item.LuongChinh==null&&item.idBacLuong==null){
                return await db.NhanVienBangLuong.create({
                    idNhanVien: item.id,
                    idBangLuong: taobangluong.id,
                    HinhThuc: '',
                    NgachLuong: '',
                    BacLuong: '',
                    MucLuong:'',
                    KhenThuong: '',
                    TongGioLam: '',
                    TongNgayLam: '',
                    TienSauTinhCong: '',
                    BHXHNV:"",
                    BHYTNV:"",
                    TongBHNV:"",
                    BHXHDN:"",
                    BHYTDN:"",
                    TongBHXH:"",
                    TienSauTruBH:"",
                    SoNguoiPhuThuoc:"",
                    TienSauGiamTru:"",
                    TienDongThue:'',
                    ThucLanh:"",
                    GhiChu:'Nhân viên không có hợp đồng còn hiệu lực'
                })
            }
            if (item.LuongChinh){
                if(item.LoaiNV=='Nhân viên thực tập'){
                    const getThang= await db.ChamCong.findAll({
                        where:{
                            idNhanVien: item.id,
                            Ngay:{
                                [Sequelize.Op.like]: `${Thang}%`
                            }
                        }
                    })
                    let tongNgay= getThang.length;
                    let getKhenThuong= await db.KhenThuongCaNhan.findAll({
                        where:{
                            idNhanVien: item.id,
                            Thang: thang
                        }
                    })
                    let tongKhenThuong=0;
                    getKhenThuong.forEach(item=>{
                        tongKhenThuong= tongKhenThuong+parseInt(item.TienThuong)
                    })
                    let tienSauTinhCong= parseFloat((item.LuongChinh*tongNgay)/taobangluong.NgayCongChuan);
                    tienSauTinhCong=tienSauTinhCong+tongKhenThuong;
                    tienSauTinhCong=Math.floor(tienSauTinhCong)
                    return await db.NhanVienBangLuong.create({
                        idNhanVien: item.id,
                        idBangLuong: taobangluong.id,
                        HinhThuc: 'Trả lương theo lương chính',
                        NgachLuong: '',
                        BacLuong: '',
                        MucLuong:item.LuongChinh,
                        KhenThuong: tongKhenThuong,
                        TongGioLam: '',
                        TongNgayLam: tongNgay,
                        TienSauTinhCong:tienSauTinhCong ,
                        BHXHNV:0,
                        BHYTNV:0,
                        TongBHNV:0,
                        BHXHDN:0,
                        BHYTDN:0,
                        TongBHXH:0,
                        TienSauTruBH:0,
                        SoNguoiPhuThuoc:0,
                        TienSauGiamTru:0,
                        TienDongThue:0,
                        ThucLanh:tienSauTinhCong,
                        GhiChu:'Nhân viên thực tập'
                    })
                }else {
                    const getThang= await db.ChamCong.findAll({
                        where:{
                            idNhanVien: item.id,
                            Ngay:{
                                [Sequelize.Op.like]: `${Thang}%`
                            }
                        }
                    })
                    let tongNgay= getThang.length;
                    let getKhenThuong= await db.KhenThuongCaNhan.findAll({
                        where:{
                            idNhanVien: item.id,
                            Thang: thang
                        }
                    })
                    let tongKhenThuong=0;
                    getKhenThuong.forEach(item=>{
                        tongKhenThuong= tongKhenThuong+parseInt(item.TienThuong)
                    })
                    let tienSauTinhCong= parseFloat((item.LuongChinh*tongNgay)/taobangluong.NgayCongChuan);
                    tienSauTinhCong=tienSauTinhCong+tongKhenThuong;
                    tienSauTinhCong=Math.floor(tienSauTinhCong)
                    let tienBHXHNV= parseFloat(item.LuongChinh)*parseFloat(thietlap.BHXHNV)/100;
                    let tienBHYTNV= parseFloat(item.LuongChinh)*parseFloat(thietlap.BHYTNV)/100;
                    let tienBHXHDN= parseFloat(item.LuongChinh)*parseFloat(thietlap.BHXHDN)/100;
                    let tienBHYTDN=parseFloat(item.LuongChinh)*parseFloat(thietlap.BHYTDN)/100;
                    let tienSauTruBH= tienSauTinhCong-tienBHXHNV-tienBHYTNV;
                    if (tienSauTruBH<=0) tienSauTruBH=0
                    const countPhuThuoc= await db.NguoiPhuThuoc.count({
                        where:{
                            idNhanVien: item.id
                        }
                    })
                    let tienSauGiamTru= tienSauTruBH- 11000000- parseInt(countPhuThuoc)*4400000;
                    if (tienSauGiamTru<0) tienSauGiamTru=0;
                    let tienDongThue=0;

                    if (tienSauGiamTru<=0){
                        tienDongThue=0
                    }else if( tienSauGiamTru<5000000){
                        tienDongThue=parseFloat(tienSauGiamTru*5)/100;
                    }else if(tienSauGiamTru>=5000000&&tienSauGiamTru<=10000000){
                        tienDongThue=(tienSauGiamTru*0.1)- 250000
                    } else if (tienSauGiamTru>10000000&&tienSauGiamTru<=18000000){
                        tienDongThue=(tienSauGiamTru*0.15)- 750000
                    }
                    else if (tienSauGiamTru>18000000&&tienSauGiamTru<=32000000){
                        tienDongThue=(tienSauGiamTru*0.2)- 1650000
                    }
                    else if (tienSauGiamTru>32000000&&tienSauGiamTru<=52000000){
                        tienDongThue=(tienSauGiamTru*0.25)- 3250000
                    }
                    else if (tienSauGiamTru>52000000&&tienSauGiamTru<=80000000){
                        tienDongThue=(tienSauGiamTru*0.3)- 5850000
                    }
                    else if (tienSauGiamTru>80000000){
                        tienDongThue=(tienSauGiamTru*0.35)- 9850000
                    }
                    return await db.NhanVienBangLuong.create({
                        idNhanVien: item.id,
                        idBangLuong: taobangluong.id,
                        HinhThuc: 'Trả lương theo lương chính',
                        NgachLuong: '',
                        BacLuong: '',
                        MucLuong:item.LuongChinh,
                        KhenThuong: tongKhenThuong,
                        TongGioLam: '',
                        TongNgayLam: tongNgay,
                        TienSauTinhCong:tienSauTinhCong ,
                        BHXHNV:tienBHXHNV,
                        BHYTNV:tienBHYTNV,
                        TongBHNV:tienBHXHNV+tienBHYTNV,
                        BHXHDN:tienBHXHDN,
                        BHYTDN:tienBHYTDN,
                        TongBHXH:tienBHYTDN+tienBHXHDN,
                        TienSauTruBH:tienSauTruBH,
                        SoNguoiPhuThuoc:countPhuThuoc,
                        TienSauGiamTru:tienSauGiamTru,
                        TienDongThue:tienDongThue,
                        ThucLanh:tienDongThue<=0?tienSauTruBH: tienSauTruBH- tienDongThue,
                        GhiChu:'Nhân viên'
                    })
                }
            }else{
                const getBacLuong= await db.BacLuong.findByPk(item.idBacLuong,{
                    include:[{
                        model:db.NgachLuong
                    }]
                });
                if (!getBacLuong) return await db.NhanVienBangLuong.create({
                    idNhanVien: item.id,
                    idBangLuong: taobangluong.id,
                    HinhThuc: 'Trả lương theo bậc lương',
                    NgachLuong: '',
                    BacLuong: item.idBacLuong,
                    MucLuong:'',
                    KhenThuong: '',
                    TongGioLam: '',
                    TongNgayLam: '',
                    TienSauTinhCong: '',
                    BHXHNV:"",
                    BHYTNV:"",
                    TongBHNV:"",
                    BHXHDN:"",
                    BHYTDN:"",
                    TongBHXH:"",
                    TienSauTruBH:"",
                    SoNguoiPhuThuoc:"",
                    TienSauGiamTru:"",
                    TienDongThue:'',
                    ThucLanh:"",
                    GhiChu:'Bậc lương bị xóa'
                })
                const luongChinh= getBacLuong.TienLuong;
                const getThang= await db.ChamCong.findAll({
                    where:{
                        idNhanVien: item.id,
                        Ngay:{
                            [Sequelize.Op.like]: `${Thang}%`
                        }
                    }
                })
                let tongNgay= getThang.length;
                let getKhenThuong= await db.KhenThuongCaNhan.findAll({
                    where:{
                        idNhanVien: item.id,
                        Thang: thang
                    }
                })
                let tongKhenThuong=0;
                getKhenThuong.forEach(item=>{
                    tongKhenThuong= tongKhenThuong+parseInt(item.TienThuong)
                })
                let tienSauTinhCong= parseFloat((item.luongChinh*tongNgay)/taobangluong.NgayCongChuan);
                tienSauTinhCong=tienSauTinhCong+tongKhenThuong;
                tienSauTinhCong=Math.floor(tienSauTinhCong)
                let tienBHXHNV= parseFloat(luongChinh)*parseFloat(thietlap.BHXHNV)/100;
                let tienBHYTNV= parseFloat(luongChinh)*parseFloat(thietlap.BHYTNV)/100;
                let tienBHXHDN= parseFloat(luongChinh)*parseFloat(thietlap.BHXHDN)/100;
                let tienBHYTDN=parseFloat(luongChinh)*parseFloat(thietlap.BHYTDN)/100;
                let tienSauTruBH= tienSauTinhCong-tienBHXHNV-tienBHYTNV;
                if (tienSauTruBH<=0) tienSauTruBH=0
                const countPhuThuoc= await db.NguoiPhuThuoc.count({
                    where:{
                        idNhanVien: item.id
                    }
                })
                let tienSauGiamTru= tienSauTruBH- 11000000- parseInt(countPhuThuoc)*4400000;
                if (tienSauGiamTru<0) tienSauGiamTru=0;
                let tienDongThue=0;

                if (tienSauGiamTru<=0){
                    tienDongThue=0
                }else if( tienSauGiamTru<5000000){
                    tienDongThue=parseFloat(tienSauGiamTru*5)/100;
                }else if(tienSauGiamTru>=5000000&&tienSauGiamTru<=10000000){
                    tienDongThue=(tienSauGiamTru*0.1)- 250000
                } else if (tienSauGiamTru>10000000&&tienSauGiamTru<=18000000){
                    tienDongThue=(tienSauGiamTru*0.15)- 750000
                }
                else if (tienSauGiamTru>18000000&&tienSauGiamTru<=32000000){
                    tienDongThue=(tienSauGiamTru*0.2)- 1650000
                }
                else if (tienSauGiamTru>32000000&&tienSauGiamTru<=52000000){
                    tienDongThue=(tienSauGiamTru*0.25)- 3250000
                }
                else if (tienSauGiamTru>52000000&&tienSauGiamTru<=80000000){
                    tienDongThue=(tienSauGiamTru*0.3)- 5850000
                }
                else if (tienSauGiamTru>80000000){
                    tienDongThue=(tienSauGiamTru*0.35)- 9850000
                }
                return await db.NhanVienBangLuong.create({
                    idNhanVien: item.id,
                    idBangLuong: taobangluong.id,
                    HinhThuc: 'Trả lương theo lương chính',
                    NgachLuong: getBacLuong.NgachLuong.TenNgachLuong,
                    BacLuong: item.idBacLuong,
                    MucLuong:luongChinh,
                    KhenThuong: tongKhenThuong,
                    TongGioLam: '',
                    TongNgayLam: tongNgay,
                    TienSauTinhCong:tienSauTinhCong ,
                    BHXHNV:tienBHXHNV,
                    BHYTNV:tienBHYTNV,
                    TongBHNV:tienBHXHNV+tienBHYTNV,
                    BHXHDN:tienBHXHDN,
                    BHYTDN:tienBHYTDN,
                    TongBHXH:tienBHYTDN+tienBHXHDN,
                    TienSauTruBH:tienSauTruBH,
                    SoNguoiPhuThuoc:countPhuThuoc,
                    TienSauGiamTru:tienSauGiamTru,
                    TienDongThue:tienDongThue,
                    ThucLanh:tienDongThue<=0?tienSauTruBH: tienSauTruBH- tienDongThue,
                    GhiChu:'Nhân viên'
                })
            }
            
            
        });
        res.status(200).json({
            msg: 'hello world'
        })
    } catch (error) {
        res.status(500).json({

        })
    }
}
const getBangLuongById= async(req, res)=>{
    try {
        const {id}= req.params;
        const getBangLuong= await db.BangLuong.findOne({
            where:{
                id: id
            },
            include:[{
                model:db.NhanVien,
  
                through: {
                    attributes: ['id','HinhThuc','NgachLuong','BacLuong','MucLuong','TongNgayLam','KhenThuong','TienSauTinhCong','BHXHNV','BHYTNV','TongBHNV','BHXHDN','BHYTDN','TongBHXH','TienSauTruBH','SoNguoiPhuThuoc','TienSauGiamTru','TienDongThue','ThucLanh','GhiChu'], // Chỉ lấy cột thời gian tạo
                  },
                
            }]
        })
        res.status(200).json({
            getBangLuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getBangLuongNhanVien= async(req,res)=>{
    try {
        const {idNhanVien}= req.params;
        const getBangLuong= await db.NhanVienBangLuong.findAll({
            where:{
                idNhanVien: idNhanVien
            }
        })
        res.status(200).json({
            getBangLuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getBangLuong = async (req, res) => {
    try {
        const getBangLuong = await db.BangLuong.findAll();
        res.status(200).json({
            getBangLuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
};
const getThongSo = async (req, res) => {
    try {
        const count = await db.ThongSoLuong.count();
        if (count == 0) {
            const getThongSo = await db.ThongSoLuong.create({
                BHXHNV: '0',
                BHYTNV: '0',
                BHXHDN: '0',
                BHYTDN: '0',
                DinhMuc: '0',
            })
            return res.status(200).json({
                getThongSo
            })
        }
        const getThongSo = await db.ThongSoLuong.findByPk(1);
        res.status(200).json({
            getThongSo
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateThongSo = async (req, res) => {
    try {
        const {
            BHXHNV,
            BHYTNV,
            BHXHDN,
            BHYTDN,
            DinhMuc,
        } = req.body;
        await db.ThongSoLuong.update({
            BHXHNV: BHXHNV,
            BHYTNV: BHYTNV,
            BHXHDN: BHXHDN,
            BHYTDN: BHYTDN,
            DinhMuc: DinhMuc,
        }, {
            where: {
                id: 1
            }
        })
        res.status(200).json({
            msg: 'Thông số và định mức đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {
    getBangLuong,
    getThongSo,
    updateThongSo,
    createBangLuong,
    deleteBangLuong,
    getBangLuongById,
    getBangLuongNhanVien
}