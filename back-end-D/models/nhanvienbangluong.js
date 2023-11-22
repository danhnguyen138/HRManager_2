'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVienBangLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  NhanVienBangLuong.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    idBangLuong: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BangLuong',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    HinhThuc:{
      type:DataTypes.STRING(40)
    },
    NgachLuong:{
      type:DataTypes.STRING(40)
    },
    BacLuong:{
      type:DataTypes.STRING(40)
    },
    MucLuong:{
      type: DataTypes.STRING(100)
    },
    KhenThuong:{
      type: DataTypes.STRING(100)
    },
    TongGioLam:{
      type:DataTypes.STRING(50),
    
    },
    TongNgayLam:{
      type:DataTypes.STRING(50),
     
    },
    TienSauTinhCong:{
      type: DataTypes.STRING(50)
    },
    BHXHNV:{
      type:DataTypes.STRING(50),
    },
    BHYTNV:{
      type:DataTypes.STRING(50),
    },
    TongBHNV:{
      type:DataTypes.STRING(50),
    },
    BHXHDN:{
      type:DataTypes.STRING(50),
    },
    BHYTDN:{
      type:DataTypes.STRING(50),
    },
    TongBHXH:{
      type:DataTypes.STRING(50)
    },
    TienSauTruBH:{
      type: DataTypes.STRING(50)
    },
    SoNguoiPhuThuoc:{
      type:DataTypes.STRING(50)
    },
    TienSauGiamTru:{
      type: DataTypes.STRING(50)
    },
    TienDongThue:{
      type: DataTypes.STRING(50)
    },
    ThucLanh:{
      type:DataTypes.STRING(50),
    },
    GhiChu:{
      type:DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'NhanVienBangLuong',
    tableName:'nhanvienbangluong'
  });
  return NhanVienBangLuong;
};