const db = require('../models');
const sequelize = require('sequelize');
///luongcunhanvien/:id'
const getLuongCuById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await db.NhanVien.findOne({
            where: {
                id: id
            },
        });
        if (!user) return res.status(400).json({
            error: 'Nhân viên không tồn tại hoặc đã bị xóa'
        })
        if (!user.LoaiNV) return res.status(400).json({
            error: 'Nhân viên chưa có hợp đồng còn hiệu lực'
        })
        if (user.isBacLuong == '1') {
            const bacLuong = await db.BacLuong.findOne({
                where: {
                    id: user.idBacLuong
                },
                include: [{
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
            bacLuong: null,
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//'/thaydoiluong/:id'
const getThayDoiById= async(req, res)=>{
    try {
        const {id}= req.params;
        const getThayDoi= await db.ThayDoiLuong.findAll({
            where:{
                idNhanVien: id
            }
        })
        res.status(200).json({
            getThayDoi
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
//'/thaydoiluong/create'
const createThayDoiLuong = async (req, res) => {
    try {
        const {
            idNhanVien,
            HinhThucCu,
            NgachLuongCu,
            BacLuongCu,
            TienLuongCu,
            HinhThucMoi,
            NgachLuongMoi,
            BacLuongMoi,
            TienLuongMoi,
            LyDo
        } = req.body
        console.log(req.body);
        let idBacLuong = '';
        let TenNgachLuong = '';
        let idNgachLuong = '';
        let TenBacLuong = '';
        if (BacLuongMoi != '') {
            idBacLuong = BacLuongMoi.slice(0, BacLuongMoi.indexOf(' '))
            TenBacLuong = BacLuongMoi.slice(BacLuongMoi.indexOf(' ') + 1, BacLuongMoi.length)
        };
        if (NgachLuongMoi != '') {
            idNgachLuong = NgachLuongMoi.slice(0, NgachLuongMoi.indexOf(' '))
            TenNgachLuong = NgachLuongMoi.slice(NgachLuongMoi.indexOf(' ') + 1, NgachLuongMoi.length)
        }
        if (HinhThucCu == HinhThucMoi) {
            if (TienLuongCu === TienLuongMoi && HinhThucMoi == 'Trả lương theo lương chính') return res.status(500).json({
                error: 'Thông tin thay đổi phải khác thông tin cũ'
            })
            if (HinhThucMoi == 'Trả lương theo bậc lương') {
                if (BacLuongCu == TenBacLuong && NgachLuongCu == TenNgachLuong) {
                    return res.status(500).json({
                        error: 'Thông tin thay đổi phải khác thông tin cũ'
                    }
                    )
                }
            }
        }
        if (HinhThucMoi=='Trả lương theo bậc lương'){
            await db.NhanVien.update({
                isBacLuong:1,
                LuongChinh:0,
                idBacLuong:idBacLuong
            },{
                where:{
                    id:idNhanVien
                }
            })
        }else{
            await db.NhanVien.update({
                isBacLuong:0,
                LuongChinh:TienLuongMoi,
                idBacLuong:null
            },{
                where:{
                    id:idNhanVien
                }
            })
        }
        await db.ThayDoiLuong.create({
            idNhanVien: idNhanVien,
            HinhThucCu: HinhThucCu,
            NgachLuongCu: NgachLuongCu,
            BacLuongCu : BacLuongCu,
            TienLuongCu: TienLuongCu,
            HinhThucMoi: HinhThucMoi,
            NgachLuongMoi: TenNgachLuong,
            BacLuongMoi: TenBacLuong,
            TienLuongMoi: TienLuongMoi,
            LyDo: LyDo
        })
        res.status(200).json({
            msg: 'Lương đã được thay đổi thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = {getThayDoiById, getLuongCuById, createThayDoiLuong };