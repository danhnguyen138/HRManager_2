'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NhanVienThongBao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  NhanVienThongBao.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    idThongBao: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ThongBao',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    TrangThai:{
      type: DataTypes.STRING(50),
      defaultValue:'Chưa xem'
    },
  }, {
    sequelize,
    modelName: 'NhanVienThongBao',
    tableName:'nhanvienthongbao'
  });
  return NhanVienThongBao;
};