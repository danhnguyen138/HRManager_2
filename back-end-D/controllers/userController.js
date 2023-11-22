const db = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize')
const getAllUser = async (req, res) => {
    try {
        const userlist = await db.NhanVien.findAll({
            include: [{ model: db.PhongBan }, { model: db.ChucVu }]
        });
        res.status(200).json({ userlist });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getDaiDien = async (req, res) => {
    try {

        const getDaiDien = await db.NhanVien.findAll({
            include: [
                {
                    model: db.ChucVu,
                    where: {
                        TenChucVu: {
                            [Op.in]: ['Trưởng phòng', 'Giám đốc']
                        }
                    },


                }
            ]
        })
        res.status(200).json({
            getDaiDien
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getUserInformation = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.NhanVien.findOne({
            where: {
                id: id
            },
            include: [{ model: db.PhongBan }, {
                model: db.ChucVu
            }]
        });
        if (!user) return res.status(400).json({
            error:'Nhân viên không tồn tại hoặc đã bị xóa'
        })
        delete user.Password
        var a = user.HoTen.lastIndexOf(' ');
        user.dataValues.hovatendem = user.HoTen.substring(0, a);
        user.dataValues.ten = user.HoTen.substring(a + 1, user.HoTen.length);
        if (user.isBacLuong==1){
            const bacLuong= await db.BacLuong.findOne({
                where:{
                    id: user.idBacLuong
                },
                include:[{
                    model: db.NgachLuong
                }]
            })
            return res.status(200).json({
                user,
                bacLuong
            })
        }
        res.status(200).json({
            user,
            bacLuong:null
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//Lay danh sach chuc vu theo nhan vien

const createUser = async (req, res) => {
    try {

        const {
            hovatendem,
            ten,
            email,
            password,
            ngaysinh,
            gioitinh,
            honnhan,
            dantoc,
            quoctich,
            tongiao,
            sodienthoai,
            quequan,
            noio,
            hokhau,
            cccd,
            ngaycap,
            noicap,
            idPhongBan,
            hinhanhPath,
            idChucVu,
            MaSoThue
        } = req.body;
        if (MaSoThue!=""){
            const checkMaSoThue= await db.NhanVien.findOne({
                where:{
                    MaSoThue: MaSoThue
                }
            })
            if (checkMaSoThue) {
                return res.status(400).json({ error: "Mã số thuế đã được sử dụng" });
            }
        }
        
        const checkEmail = await db.NhanVien.findOne({
            where: {
                Email: email
            }
        });
        if (checkEmail) {
            return res.status(400).json({ error: "Email đã được tạo từ trước" });
        }
        const checkSoDT= await db.NhanVien.findOne({
            where:{
                SoDT: sodienthoai
            }
        })
        if (checkSoDT) {
            return res.status(400).json({ error: "Số điện thoại không được trùng lặp với nhân viên khác" });
        }
        const checkCCCD=await db.NhanVien.findOne({
            where:{
                CCCD: cccd
            }
        })
        if (checkCCCD) {
            return res.status(400).json({ error: "CCCD không được trùng lặp với nhân viên khác" });
        }
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);
        const getPhongBan = await db.PhongBan.findOne({
            where: {
                id: idPhongBan
            }
        });
        if (parseInt(getPhongBan.SoLuong) <= parseInt(getPhongBan.SiSo)) {
            return res.status(500).json({
                error: 'Phòng ban đủ số lượng nhân viên'
            })
        }
        await db.PhongBan.increment('SiSo', {
            by: 1, where: {
                id: idPhongBan
            }
        })
        const user=await db.NhanVien.create({
            HoTen: hovatendem + ' ' + ten,
            NgaySinh: ngaysinh,
            Email: email,
            Password: hashPassword,
            GioiTinh: gioitinh,
            HonNhan: honnhan,
            DanToc: dantoc,
            QuocTich: quoctich,
            TonGiao: tongiao,
            SoDT: sodienthoai,
            QueQuan: quequan,
            NoiO: noio,
            HoKhau: hokhau,
            CCCD: cccd,
            NgayCap: ngaycap,
            NoiCap: noicap,
            HinhAnh: hinhanhPath,
            idPhongBan: idPhongBan,
            idChucVu: idChucVu,
            MaSoThue: MaSoThue
        });
        const getInsurance = await db.BaoHiem.create({
            MaBH: '',
            MaYT: '',
            NoiKhamYT: '',
            NgayBD: '',
            LuongDongBaoHiem: '',
            TrangThai: 'Chưa tham gia',
            idNhanVien: user.id,
        })
        res.status(200).json({ msg: "Nhân viên đã được tạo thành công" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.body.hovatendem) {
            const {
                hovatendem,
                ten,
                email,
                ngaysinh,
                gioitinh,
                honnhan,
                dantoc,
                quoctich,
                tongiao,
                sodienthoai,
                quequan,
                noio,
                hokhau,
                cccd,
                ngaycap,
                noicap,
                TrangThai,
                MaSoThue,
            } = req.body;
            if (MaSoThue!='') {
                const checkMaSoThue = await db.NhanVien.findOne({
                    where: {
                        MaSoThue: MaSoThue
                    }
                })
                if (checkMaSoThue && checkMaSoThue.id != id) {
                    return res.status(400).json({ error: "Mã số thuế đã được sử dụng" })
                }
            }
            const checkEmail = await db.NhanVien.findOne({
                where: {
                    Email: email
                }
            })
            if (checkEmail && checkEmail.id != id) {
                return res.status(400).json({ error: "Email đã được tạo" })
            }
            const checkSoDT = await db.NhanVien.findOne({
                where: {
                    SoDT: sodienthoai
                }
            })
            if (checkSoDT && checkSoDT.id != id) {
                return res.status(400).json({ error: "Số điện thoại đã được sử dụng" })
            }
            const checkCCCD=await db.NhanVien.findOne({
                where:{
                    CCCD: cccd
                }
            })
            if (checkCCCD && checkCCCD.id!=id) {
                return res.status(400).json({ error: "CCCD không được trùng lặp với nhân viên khác" });
            }
            await db.NhanVien.update({
                HoTen: hovatendem + ' ' + ten,
                NgaySinh: ngaysinh,
                Email: email,
                GioiTinh: gioitinh,
                HonNhan: honnhan,
                DanToc: dantoc,
                QuocTich: quoctich,
                TonGiao: tongiao,
                SoDT: sodienthoai,
                QueQuan: quequan,
                NoiO: noio,
                HoKhau: hokhau,
                CCCD: cccd,
                NgayCap: ngaycap,
                NoiCap: noicap,
                TinhTrang: TrangThai,
                MaSoThue: MaSoThue
            }, {
                where: {
                    id: id
                }
            });
            res.status(200).json({ msg: "Cập nhật nhân viên thành công" });
        } else {
            const {
                hinhanhPath
            } = req.body;
            await db.NhanVien.update({
                HinhAnh: hinhanhPath
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ msg: "Cập nhật avatar thành công" });
        }



    } catch (err) {
        res.status(500).json({ error: err.message })
    }

}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const checkUserAdmin = await db.NhanVien.findOne({
            where: {
                id: id
            }
        });
        if (checkUserAdmin.isAdmin) return res.status(404).json({
            error: "Không thể xóa nhân viên Admin"
        })
        await db.NhanVien.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({
            msg: "Nhân viên đã được xóa",
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const getUserbyIDPhongBan = async (req, res) => {
    try {
        const nhanViens = await db.NhanVien.findAll({

            include: [
                {
                    model: db.PhongBan,
                    where: { id: req.params.id },
                },
                {
                    model: db.ChucVu,
                    where: { TenChucVu: 'Nhân Viên' },
                },
            ],
        });

        res.status(200).json({ nhanViens })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const ChangePassword = async (req, res) => {
    const { newpassword, oldpassword } = req.body;

    const user = await db.NhanVien.findOne({
        where: {
            Email: req.params.email
        }
    });
    const isMatch = await bcrypt.compare(oldpassword, user.Password);
    if (!isMatch) return res.status(400).json({ error: "Mật khẩu cũ không đúng, xin nhập lại" });

    try {
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newpassword, salt);
        await db.NhanVien.update(
            {
                Password: hashPassword
            }, {
            where: {
                Email: req.params.email,
            }
        }

        );
        res.status(200).json({ msg: "Mật khẩu đã được thay đổi" });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })

    }
}
const getIDbyName = async (req, res) => {
    try {
        const nhanViens = await db.NhanVien.findOne({

            where: {
                HoTen: req.params.hoten,
            }
        });

        res.status(200).json({ nhanViens })
    }
    catch (error) {
       
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { getAllUser, getUserInformation, createUser, updateUser, deleteUser, getDaiDien, getUserbyIDPhongBan, ChangePassword,getIDbyName }