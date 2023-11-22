const db = require('../models');

const getInsuranceDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await db.BaoHiem.count({
            where: {
                idNhanVien: id
            }
        });
        if (count === 0) {
            const getInsurance = await db.BaoHiem.create({
                MaBH: 'BHXHxxxxxxxxxx',
                MaYT: 'BHxxxxxxxxxxxxx',
                NoiKhamYT: 'xxxxxxxxx',
                NgayBD: 'xxxxxx',
                LuongDongBaoHiem: 'xxxxxxxxx',
                TrangThai: 'Chưa tham gia',
                idNhanVien: id,
            })
            return res.status(200).json({
                getInsurance
            })
        }
        const getInsurance = await db.BaoHiem.findOne({
            where: {
                idNhanVien: id
            }
        })

        res.status(200).json({ getInsurance });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
const updateInsurance = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            maYT,
            maBH,
            NoiKhamYT
        } = req.body;
        const oldInsurance = await db.BaoHiem.findOne({
            where: {
                idNhanVien: id
            }
        });
        // Them lich su cap nhat
        const checkMaBH= await db.BaoHiem.findOne({
            where:{
                MaBH:maBH
            }
        })
        
        if (checkMaBH&&checkMaBH.idNhanVien!=id){
            return res.status(400).json({
                error:'Mã bảo hiểm đã được sử dụng'
            })
        }
        if (oldInsurance.MaYT !== maYT) {
            if (oldInsurance.MaYT === 'BHxxxxxxxxxxxxx') {
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm y tế',
                    NoiDungCu: oldInsurance.MaYT,
                    NoiDungMoi: maYT,
                    LyDo: 'Cập nhật mới mã bảo hiểm y tế',
                    idThayDoi: req.user.id
                })
            }else{
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm y tế',
                    NoiDungCu: oldInsurance.MaYT,
                    NoiDungMoi: maYT,
                    LyDo: 'Sai mã bảo hiểm y tế',
                    idThayDoi: req.user.id
                })
            }
        }
        if (oldInsurance.MaBH !== maBH) {
            if (oldInsurance.MaBH === 'BHXHxxxxxxxxxx') {
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm xã hội',
                    NoiDungCu: oldInsurance.MaBH,
                    NoiDungMoi: maBH,
                    LyDo: 'Cập nhật mới mã bảo hiểm xã hội',
                    idThayDoi: req.user.id
                })
            }else{
                await db.LichSuCapNhatBaoHiem.create({
                    idNhanVien: id,
                    TruongTD: 'Mã bảo hiểm xã hội',
                    NoiDungCu: oldInsurance.MaBH,
                    NoiDungMoi: maBH,
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
        await db.BaoHiem.update({
            MaYT: maYT,
            MaBH: maBH,
            NoiKhamYT: NoiKhamYT
        }, {
            where: {
                idNhanVien: id
            }
        })

        res.status(200).json({
            msg: 'Cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
module.exports = { getInsuranceDetail, updateInsurance }