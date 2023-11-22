'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhongBan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhongBan.hasMany(models.NhanVien,{
        foreignKey: 'idPhongBan'
      })
      PhongBan.hasMany(models.KhenThuongTapThe,{
        foreignKey:'idDoiTuong'
      })
    }
  }
  PhongBan.init({
    MaPB:{
      type:DataTypes.STRING(10),
      unique: true,
      allowNull:false
    }, 
    TenPB: {
      type: DataTypes.STRING(30),
      allowNull: false
    
    },
    SoLuong:{
      type: DataTypes.STRING(30),
      allowNull: false
    },
    SiSo:{
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 0
    },
    DiaChi: {
      type: DataTypes.STRING(100),
      allowNull:false
    },
    SoDienThoai:{
      type:DataTypes.STRING(30),
      allowNull:false
    },
    DiaChi: {
        type: DataTypes.STRING(100),
        allowNull:false
      },
    MoTa: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    NgayThanhLap:{
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    TrangThai:{
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue:"Đang hoạt động"
    },
    NguoiDaiDien:{
      type: DataTypes.STRING(50),
      allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'PhongBan',
    tableName:'phongban'
  });
  return PhongBan;
};