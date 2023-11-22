'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NguoiPhuThuoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NguoiPhuThuoc.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      })
    }
  }
  NguoiPhuThuoc.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ChucVu',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    HoTen: {
      type: DataTypes.STRING
    },
    QuanHe: {
      type: DataTypes.STRING
    },
    SoDT: {
      type: DataTypes.STRING
    },
    NgaySinh: {
      type: DataTypes.STRING
    },
    DiaChi: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'NguoiPhuThuoc',
    tableName: 'nguoiphuthuoc'
  });
  return NguoiPhuThuoc;
};