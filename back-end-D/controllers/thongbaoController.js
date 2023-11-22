const db = require('../models');

const createNotification = async (req, res) => {
    try {
        const {
            title,
            idNhanVien,
            content
        } = req.body;
        const newNotification = await db.ThongBao.create({
            TieuDe: title,
            NoiDung: content
        });
        for (let i = 0; i < idNhanVien.length; i++) {
            await db.NhanVienThongBao.create({
                idNhanVien: idNhanVien[i].value,
                idThongBao: newNotification.id,
            })
        }
        res.status(200).json({
            msg: 'Thông báo đã được tạo thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getNotification = async (req, res) => {
    try {
        const getThongBao = await db.ThongBao.findAll();
        res.status(200).json({
            getThongBao
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const checkNotification = await db.ThongBao.findOne({
            where: {
                id: id
            }
        });
        if (checkNotification.TrangThai === 'Đã gửi') {
            return res.status(400).json({
                error: 'Thông báo đã được gửi không thể xóa'
            })
        }
        await db.ThongBao.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            msg: 'Thông báo đã được xóa thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

}
const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const getThongBao = await db.ThongBao.findOne({
            where: {
                id: id
            },
            include: [{
                model: db.NhanVien,
                as: 'nhanvien'
            }]
        })
        res.status(200).json({
            getThongBao
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const getNotificationByIdNhanVien = async (req, res) => {
    try {
      const { id } = req.params;
      const getThongBao = await db.NhanVien.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: db.ThongBao,
            as: 'thongbao',
            through: {
              attributes: ['TrangThai'], // Chỉ lấy cột trạng thái
            },
            where: {
              TrangThai: 'Đã gửi',
            },
          },
        ],
      });
  
      // Sắp xếp mảng getThongBao.thongbao theo id giảm dần
      getThongBao.thongbao.sort((a, b) => b.id - a.id);
  
      res.status(200).json({
        getThongBao,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
const getNotificationUnReadByIdNhanVien = async (req, res) => {
    const {id}=req.params;
    try {
         await db.NhanVien.findByPk(id, {
            include: [
              {
                model: db.ThongBao,
                as: 'thongbao',
                through: {
                  model: db.NhanVienThongBao,
                  where: { TrangThai: 'Chưa xem' }
                },
                where: { TrangThai: 'Đã gửi' }
              }
            ]
          })
            .then(nhanvien => {
              if (nhanvien) {
                const thongbaos = nhanvien.thongbao;
                res.status(200).json({thongbaos })
              } else {
              }
            }).catch(error => {
                res.status(500).json({
                    error: error.message
                })
              });
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const checkNotification = await db.ThongBao.findOne({
            where: {
                id: id
            }
        });
        if (checkNotification.TrangThai === 'Đã gửi') {
            return res.status(400).json({
                error: 'Thông báo đã được gửi không thể sửa'
            })
        }
        const {
            title,
            content,
            idNhanVien
        } = req.body;
        await db.ThongBao.update({
            TieuDe: title,
            NoiDung: content
        }, {
            where: {
                id: id
            }
        })
        let dataOld = []// Chua id nhan vien cua bang cu
        let dataUpdate = [] //Chua id nhan vien cua form update
        idNhanVien.map(item => dataUpdate.push(item.value));
        const getNhanVienByIdThongBao = await db.NhanVienThongBao.findAll({
            where: {
                idThongBao: id
            }
        })
        for (let i = 0; i < getNhanVienByIdThongBao.length; i++) {
            dataOld.push(getNhanVienByIdThongBao[i].dataValues.idNhanVien)
        }
        let dataNewUpdate = dataUpdate.filter(element => !dataOld.includes(element));// chua id can tao moi
        let dataDelete = dataOld.filter(element => !dataUpdate.includes(element)); // chua id can xoa
        // Tao moi nhan vien voi thong bao
        await dataNewUpdate.map(item => db.NhanVienThongBao.create({
            idNhanVien: item,
            idThongBao: id,

        }))
        // Xoa cac row can xoa
        await dataDelete.map(item => db.NhanVienThongBao.destroy({
            where: {
                idNhanVien: item,
                idThongBao: id
            }
        }))
        res.status(200).json({
            msg: 'Thông báo đã cập nhật thành công'
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
const sendNotification = async (req, res, io) => {
    try {
        const { id } = req.params;
        await db.ThongBao.update(
            {
                TrangThai: 'Đã gửi',
                ThoiGianGui: new Date()
            },
            {
                where: {
                    id: id
                }
            }
        );

        // Gửi thông báo đến client
        io.emit('notification', { id: id });
        
        res.status(200).json({
            msg: 'Thông báo đã được gửi thành công'
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
const getAllTB = async (req, res) => {   
    try {       
        const getThongBao = await db.ThongBao.findAll();
        res.status(200).json({ getThongBao });
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
const updateNotificationReaded = async (req, res) => {  
    try {     
        const getidthongbao= await db.ThongBao.findOne({
            where : {
                TieuDe : req.params.tieude,
                ThoiGianGui:req.params.thoigiangui,
            }
        })
        await db.NhanVienThongBao.update({            
            TrangThai:"Đã xem"
        }, {
            where: {
                idNhanVien: req.params.id,
                idThongBao:getidthongbao.id,
            }
        })
        res.status(200).json("OK");
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }
}
module.exports = {
    createNotification,
    getNotification,
    deleteNotification,
    getNotificationById,
    updateNotification,
    sendNotification,
    getAllTB,
    getNotificationByIdNhanVien,
    updateNotificationReaded,
    getNotificationUnReadByIdNhanVien
}