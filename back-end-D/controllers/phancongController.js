const db = require('../models');
const moment = require('moment');

const formatday = (day) => {
  const isoDate = moment(day, 'DD/MM/YYYY').toISOString();
  return (isoDate)
}
const AddPhanCong = async (req, res) => {
  const { email, startDate, endDate } = req.body;
  const user = await db.NhanVien.findOne({
    where: {
      Email: email
    },
  });
  try {
    const getidphancong = await db.PhanCong.findOne({
      where: {
        NgayBatDau: formatday(startDate),
        idNhanVien: user.id,
      },
    });
    if (!getidphancong) {
      await db.PhanCong.create({
        NgayBatDau: formatday(startDate),
        NgayKetThuc: formatday(endDate),
        idNhanVien: user.id,
      });
      res.status(200).json({ msg: "Phân công đã được tạo" });
    }
    else {
      res.status(200).json({ msg: "Phân công đã được tạo" });
    }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
const CreatePhanCong = async (req, res, io) => {
  const { ngayphancong, email, congviec, startDate,endDate } = req.body;
  const user = await db.NhanVien.findOne({
    where: {
      Email: email
    },
  });
  try {
    const getidphancong = await db.PhanCong.findOne({
      where: {
        NgayBatDau: formatday(startDate),
        idNhanVien: user.id,
      },
    });

    {
      await db.PhanCongTheoNgay.create({
        NgayPhanCong: formatday(ngayphancong),
        TenCV: congviec,
        idPhanCong: getidphancong.id,
        TienDo:"Đang chờ"
      });
      // Gửi thông báo đến client
      io.emit('phancong', { congviec:congviec });
      res.status(200).json({ msg: "Công việc đã được tạo" });
    }

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }

}
const getDanhSachCongViec = async (req, res) => {
  const user = await db.NhanVien.findOne({
    where: {
      Email: req.params.emailnhanvien
    },
  });
  try {
    const phancong = await db.PhanCong.findOne({
      where: {
        NgayBatDau: formatday(req.params.ngayBatDau),
        idNhanVien: user.id
      },
    });
    if (!phancong) {
      return res.status(404).send('Không tìm thấy thông tin phân công');
    }
    const phancongtheongay = await db.PhanCongTheoNgay.findAll({
      where: { NgayPhanCong: formatday(req.params.ngayPhanCong), idPhanCong: phancong.id },
    });
    const tencv = phancongtheongay.map((pc) => ({
      ID:pc.id,
      TenCV: pc.TenCV,
      TienDo:pc.TienDo,
      KPI: pc.KPI,
    }));
    res.status(200).json(tencv)
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}

const getDanhSachCongViecByIdNhanVien = async (req, res) => {

  try {
    const phancong = await db.PhanCong.findOne({
      where: {
        NgayBatDau: formatday(req.params.ngaybatdau),
        idNhanVien: req.params.id
      },
    });

    if (!phancong) {
      return res.status(404).send('Không tìm thấy thông tin phân công');
    }
    const phancongtheongay = await db.PhanCongTheoNgay.findAll({
      where: { NgayPhanCong: formatday(req.params.ngayphancong), idPhanCong: phancong.id },
    });
    
    const tencv = phancongtheongay.map((pc) => ({      
      ID:pc.id,
      TenCV: pc.TenCV,
      TienDo:pc.TienDo,
      KPI: pc.KPI,
    }));
    
    res.status(200).json(tencv)
  } catch (err) {
    res.status(500).send('Lỗi server');
  }
}
const getPhanCongcByIdNhanVien = async (req, res) => {

  try {
    const phancong = await db.PhanCong.findAll({
      where: {        
        idNhanVien: req.params.idnhanvien
      },
    });    
    res.status(200).json(phancong)
  } catch (err) {
    res.status(500).send('Lỗi server');
  }
}
const deleteCongViec = async (req, res, io) => {
console.log(req.params.idcongviec)
  try {
    const phancong = await db.PhanCongTheoNgay.findOne({
      where: {
        id:req.params.idcongviec,
      }
    });   
    if (phancong.TienDo=="Đã hoàn thành") {
      res.status(404).json({error: "Công việc đã hoàn thành không được xóa" });
    }
    else{
      await db.PhanCongTheoNgay.destroy({
        where: {
          id:req.params.idcongviec,
        }
      })
      io.emit('phancong', { xoacongviec:req.params.value });
      res.status(200).json({ msg: "Công việc đã được xóa" });
    }
    
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}
const deleteCongViecbyName = async (req, res, io) => {
  console.log(req.params.tencongviec);
  console.log(req.params.ngayphancong);
  try {
    const phancong = await db.PhanCongTheoNgay.findAll({
      where: {
        NgayPhanCong: formatday(req.params.ngayphancong),
        TenCV: req.params.tencongviec,
      },
    });

    for (let index = 0; index < phancong.length; index++) {
      const item = phancong[index];
      if (item.TienDo === "Đã hoàn thành") {
        return res.status(404).json({ error: "Công việc đã hoàn thành không được xóa" });
      } else {
        await db.PhanCongTheoNgay.destroy({
          where: {
            id: item.id,
          },
        });
        io.emit('phancong', { xoacongviec: req.params.value });
      }
    }

    return res.status(200).json({ msg: "Công việc đã được xóa" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};



const danhgiaCongViec = async (req, res,io) => {
  const kpi = req.body.kpi;
  try {
    await db.PhanCongTheoNgay.update(
      {
        KPI: kpi
      }, {
      where: {
        id:req.params.idcongviec
      }
    }

    );
    io.emit('phancong',{danhgia:kpi})
    res.status(200).json({ msg: "Công việc đã được update" });
  } catch (error) {
    res.status(500).json({
      error: error.message
    })

  }
}
const updatePhanCong = async(req,res,io)=>{
  try {
    const { id } = req.params; 
    const tiendo= req.body.value;
    console.log(tiendo)
    const updatePC = await db.PhanCongTheoNgay.update({
        TienDo: (tiendo== "Đang thực hiện") ? "Đã hoàn thành" :"Đang thực hiện"
    }, {
        where: {
            id: id
        }
    });
    if (updatePC){
      io.emit('phancong',{update :(tiendo== "Đang thực hiện") ? "Đã hoàn thành" :"Đang thực hiện"})
      return res.status(200).json({
        msg: "Tiến độ đã được cập nhật"
    });
    } 
    return res.status(404).json({
        error: "Tiến Độ cập nhật không thành công"
    })
} catch (error) {
    res.status(500).json({
        error: error.message
    })
}
}
module.exports = { deleteCongViecbyName,CreatePhanCong, getDanhSachCongViec, deleteCongViec, AddPhanCong, danhgiaCongViec, getDanhSachCongViecByIdNhanVien,updatePhanCong,getPhanCongcByIdNhanVien }