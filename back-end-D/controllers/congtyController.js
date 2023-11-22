const db = require(`../models`);
const { Op } = require('sequelize');
const getCongty = async (req, res) => {
    try {
        const count = await db.CongTy.count();
        if (count === 0) {
            let getCongTy = await db.CongTy.create({
                MaDonVi: '######',
                TenDonVi: '######',
                DiaChi: '######',
                DienThoai: '######',
                Fax: '######',
                Website: '######',
                Email: '######',
                LinhVuc: '######',
                MaSoThue: '######',
                NganHang: '######',
                SoTK: '######',
                DiaBan: '',
            })
            return res.status(200).json({
                getCongTy
            })
        }
        let getCongTy = await db.CongTy.findByPk(1);
        return res.status(200).json({
            getCongTy
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateLuongToiThieu = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            SoQD,
            TenQD,
            VungIThang,
            VungIIThang,
            VungIIIThang,
            VungIVThang,
            VungIGio,
            VungIIGio,
            VungIIIGio,
            VungIVGio,
            TenFilePath,
        } = req.body;
        const checkSoQD = await db.LuongToiThieu.findOne({
            where: {
                SoQD: SoQD,
                id: {
                    [Op.ne]: id
                }
            }
        })
        if (checkSoQD) return res.status(400).json({
            error: 'Số quyết định không được trùng lặp'
        });
        if (TenFilePath == '') {
            await db.LuongToiThieu.update({
                SoQD: SoQD,
                TenQD: TenQD,
                VungIThang: VungIThang,
                VungIIThang: VungIIThang,
                VungIIIThang: VungIIIThang,
                VungIVThang: VungIVThang,
                VungIGio: VungIGio,
                VungIIGio: VungIIGio,
                VungIIIGio: VungIIIGio,
                VungIVGio: VungIVGio,
            }, {
                where: {
                    id: id
                }
            })
        } else {
            await db.LuongToiThieu.update({
                SoQD: SoQD,
                TenQD: TenQD,
                VungIThang: VungIThang,
                VungIIThang: VungIIThang,
                VungIIIThang: VungIIIThang,
                VungIVThang: VungIVThang,
                VungIGio: VungIGio,
                VungIIGio: VungIIGio,
                VungIIIGio: VungIIIGio,
                VungIVGio: VungIVGio,
                TenFile: TenFilePath
            }, {
                where: {
                    id: id
                }
            })
        }
        res.status(200).json({
            msg: 'Chính sách đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Tạo mới lương tối thiểu
const createLuongToiThieu = async (req, res) => {
    try {
        const {
            SoQD,
            TenQD,
            VungIThang,
            VungIIThang,
            VungIIIThang,
            VungIVThang,
            VungIGio,
            VungIIGio,
            VungIIIGio,
            VungIVGio,
            TenFilePath,
        } = req.body;
        const checkSoQD = await db.LuongToiThieu.findOne({
            where: {
                SoQD: SoQD
            }
        })
        if (checkSoQD) return res.status(400).json({
            error: 'Số quyết định không được trùng lặp'
        })
        const newCreate = await db.LuongToiThieu.create({
            SoQD: SoQD,
            TenQD: TenQD,
            VungIThang: VungIThang,
            VungIIThang: VungIIThang,
            VungIIIThang: VungIIIThang,
            VungIVThang: VungIVThang,
            VungIGio: VungIGio,
            VungIIGio: VungIIGio,
            VungIIIGio: VungIIIGio,
            VungIVGio: VungIVGio,
            TenFile: TenFilePath,
            TrangThai: 'Đang sử dụng'
        })
        const checkTrangThai = await db.LuongToiThieu.findAll({
            where: {
                TrangThai: 'Đang sử dụng',
                id: {
                    [Op.ne]: newCreate.id
                }
            }
        });

        if (checkTrangThai.length != 0) {
            checkTrangThai.forEach(element => {
                db.LuongToiThieu.update({
                    TrangThai: 'Đã sử dụng'
                }, {
                    where: {
                        id: element.id
                    }
                })
            });
        }
        res.status(200).json({
            msg: 'Lương tối thiểu đã được sửa chữa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
// Cập nhật thông tin công ty
const updateCongty = async (req, res) => {
    try {
        const {
            MaDonVi,
            TenDonVi,
            DiaChi,
            DienThoai,
            Fax,
            Website,
            Email,
            LinhVuc,
            MaSoThue,
            NganHang,
            SoTaiKhoan,
            DiaBan

        } = req.body;
        await db.CongTy.update({
            MaDonVi: MaDonVi,
            TenDonVi: TenDonVi,
            DiaChi: DiaChi,
            DienThoai: DienThoai,
            Fax: Fax,
            Website: Website,
            Email: Email,
            LinhVuc: LinhVuc,
            MaSoThue: MaSoThue,
            NganHang: NganHang,
            SoTK: SoTaiKhoan,
            DiaBan: DiaBan
        }, {
            where: {
                id: 1
            }
        })
        res.status(200).json({
            msg: 'Thông tin công ty đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lấy thông tin lương tối thiểu đang sử dụng
const getLuongToiThieuSuDung = async (req, res) => {
    try {
        const dangSuDung = await db.LuongToiThieu.findOne({
            where: {
                TrangThai: 'Đang sử dụng'
            }
        });
        res.status(200).json({
            dangSuDung
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lấy danh sách lương tối thiểu theo id
const getDanhSachById = async (req, res) => {
    try {
        const { id } = req.params;
        const getToiThieu = await db.LuongToiThieu.findOne({
            where: {
                id: id
            }
        });
        if (!getToiThieu) return res.status(404).json({
            error: 'Quyết định không tồn tại hoặc đã bị xóa'
        })
        res.status(200).json({
            getToiThieu
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lấy giá trị lương tối thiểu vùng của công ty theo tháng
const getLuongToiThieuVung = async (req, res) => {
    try {
        const dangSuDung = await db.LuongToiThieu.findOne({
            where: {
                TrangThai: 'Đang sử dụng'
            }
        });
        if (!dangSuDung) return res.status(400).json({
            error: 'Lương tối thiểu vùng chưa có, cần cập nhật thông tin'
        })
        const thongTinCongTy = await db.CongTy.findByPk(1);
        if (!thongTinCongTy.DiaBan) return res.status(400).json({
            error: 'Công ty chưa chọn mã vùng'
        });
        let getLuongToiThieu = '';
        if (thongTinCongTy.DiaBan == 'I') {
            getLuongToiThieu = dangSuDung.VungIThang;
        }
        if (thongTinCongTy.DiaBan == 'II') {
            getLuongToiThieu = dangSuDung.VungIIThang;
        }
        if (thongTinCongTy.DiaBan == 'III') {
            getLuongToiThieu = dangSuDung.VungIIIThang;
        }
        if (thongTinCongTy.DiaBan == 'IV') {
            getLuongToiThieu = dangSuDung.VungIVThang;
        }
        res.status(200).json({
            getLuongToiThieu
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lay danh sach luong toi thieu
const getDanhSachLuongToiThieu = async (req, res) => {
    try {
        const getDanhSach = await db.LuongToiThieu.findAll();
        res.status(200).json({
            getDanhSach
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Cập nhật thang lương;
const updateThangLuong = async (req, res) => {
    try {
        const {
            idChucVu,
            I,
            II,
            III,
            IV,
            V,
            VI,
            VII,
            VIII,
            IX,
            X
        } = req.body;
        let dem = 0;
        if (X == '') dem += 1;
        if (IX == '') dem += 1;
        if (VIII == '') dem += 1;
        if (VII == '') dem += 1;
        if (VI == '') dem += 1;
        if (V == '') dem += 1;
        if (IV == '') dem += 1;
        if (III == '') dem += 1;
        if (II == '') dem += 1;
        if (I == '') dem += 1;
        await db.BacLuong.update({
            I: I,
            II: II,
            III: III,
            IV: IV,
            V: V,
            VI: VI,
            VII: VII,
            VIII: VIII,
            IX: IX,
            X: X,
            SoBac: 10 - dem,
        }, {
            where: {
                idChucVu: idChucVu
            }
        })
        res.status(200).json({
            msg: 'Success'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getThangLuong = async (req, res) => {
    try {
        const getThangLuong = await db.BacLuong.findAll({
            include: [{
                model: db.ChucVu
            }]
        });

        res.status(200).json({
            getThangLuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lay ngach luong
const getNgachLuong = async (req, res) => {
    try {
        const getDataNgachLuong = await db.NgachLuong.findAll({
            include: [{
                model: db.BacLuong
            }]
        });
        res.status(200).json({
            getDataNgachLuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Tao va cap nhat bac luong
const createBacLuong = async (req, res) => {
    try {
        const {
            idNgachLuong,
        } = req.body;
        for (let key in req.body) {
            if (req.body.hasOwnProperty(key) && req.body[key] != "" && key != 'idNgachLuong') {
                const check = await db.BacLuong.findOne({
                    where: {
                        idNgachLuong: idNgachLuong,
                        TenBacLuong: key
                    }
                })
                if (check) {
                    await db.BacLuong.update({
                        TienLuong: req.body[key]
                    }, {
                        where: {
                            idNgachLuong: idNgachLuong,
                            TenBacLuong: key
                        }
                    })
                }else{
                    await db.BacLuong.create({
                        TenBacLuong: key,
                        TienLuong: req.body[key],
                        idNgachLuong: idNgachLuong
                    })
                }
            }
            if (req.body.hasOwnProperty(key) && req.body[key] == "") {
                await db.BacLuong.destroy({
                    where:{
                        TenBacLuong: key,
                        idNgachLuong: idNgachLuong
                    }
                })
            }
        }
        res.status(200).json({
            msg: "Bậc lương đã được cập nhật thành công"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
// Lay bac luong by id
const getBacLuongById = async (req, res) => {
    try {
        const { id } = req.params;
        const getDataBacLuong = await db.BacLuong.findAll({
            where: {
                idNgachLuong: id
            }
        })
        res.status(200).json({
            getDataBacLuong
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Cap nhat ngach luong
const updateNgachLuong= async(req, res)=>{
    try {
        const {id}= req.params;
        const {MaNgachLuong, TenNgachLuong}= req.body;
        console.log(id)
        const checkId= await db.NgachLuong.findByPk(id);
        if (!checkId) return res.status(400).json({
            error:'Ngạch lương không tồn tại hoặc đã bị xóa'
        })
        await db.NgachLuong.update({
            TenNgachLuong: TenNgachLuong
        },{
            where:{
                id: id
            }
        })
        res.status(200).json({
            msg:'Ngạch lương đã được cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Xoa Ngach luong
const deleteNgachLuong = async (req, res) => {
    try {
        const { id } = req.params;
        const checkId = await db.NgachLuong.findByPk(id);
        if (!checkId) return res.status(400).json({
            error: 'Ngạch lương không tồn tại hoặc đã xóa từ trước'
        })
        await db.NgachLuong.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Ngạch lương đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
// Tao ngach luong moi
const createNgachLuong = async (req, res) => {
    try {
        const {
            MaNgachLuong,
            TenNgachLuong
        } = req.body;
        const checkTen = await db.NgachLuong.findOne({
            where: {
                TenNgachLuong: TenNgachLuong
            }
        })
        if (checkTen) return res.status(400).json({
            error: 'Tên ngạch bị trùng'
        })
        const ngachLuong = await db.NgachLuong.create({
            MaNgachLuong: MaNgachLuong,
            TenNgachLuong: TenNgachLuong
        })
        res.status(200).json({
            msg: 'Ngạch lương được tạo thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteLuongToiThieu = async (req, res) => {
    try {
        const { id } = req.params;
        const check = await db.LuongToiThieu.findOne({
            where: {
                id: id
            }
        });
        if (!check) return res.status(404).json({
            error: 'Dữ liệu không tồn tại hoặc đã xóa'
        })
        if (check.TrangThai == 'Đang sử dụng') return res.status(400).json({
            error: 'Quyết định đang sử dụng không thể xóa'
        })
        await db.LuongToiThieu.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Quyết định đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = { updateNgachLuong,createBacLuong, getBacLuongById, deleteNgachLuong, getNgachLuong, createNgachLuong, updateThangLuong, getThangLuong, getLuongToiThieuVung, getCongty, updateCongty, createLuongToiThieu, getLuongToiThieuSuDung, getDanhSachLuongToiThieu, deleteLuongToiThieu, getDanhSachById, updateLuongToiThieu }