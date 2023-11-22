'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CongTy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CongTy.init({
    MaDonVi:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    TenDonVi:{
      type:DataTypes.STRING(100),
      allowNull: false
    },
    DiaChi:{
      type:DataTypes.STRING(),
      allowNull: false
    },
    DienThoai:{
      type:DataTypes.STRING(20),
      allowNull: false
    },
    Fax:{
      type:DataTypes.STRING(20),
      allowNull: false
    },
    Website:{
      type:DataTypes.STRING(100),
      allowNull: false
    },
    Email:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    LinhVuc:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    MaSoThue:{
      type:DataTypes.STRING(30),
      allowNull: false
    },
    NganHang:{
      type:DataTypes.STRING(50),
      allowNull: false
    },
    SoTK:{
      type: DataTypes.STRING(30),
      allowNull: false
    },
    DiaBan:{
      type: DataTypes.STRING(30),
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'CongTy',
    tableName:'congty'
  });
  return CongTy;
};