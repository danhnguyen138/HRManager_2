'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DuAn extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  DuAn.init({
    TenDuAn: {
      type: DataTypes.STRING(50),
    },
    NgayBatDau: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NgayKetThuc: {
      type: DataTypes.DATEONLY,
    },   
    idNhanVien: {
      type: DataTypes.JSON,      
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    PhongBan: {
      type: DataTypes.STRING(50),
    },
  }, {
    sequelize,
    modelName: 'DuAn',
    tableName: 'duan'
  });
  return DuAn;
};