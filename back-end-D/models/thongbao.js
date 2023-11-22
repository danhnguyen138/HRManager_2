'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThongBao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ThongBao.belongsToMany(models.NhanVien,{
        through: 'NhanVienThongBao',
        as: 'nhanvien',
        foreignKey: 'idThongBao'
      });
    }
  }
  ThongBao.init({
    TieuDe:{
      type: DataTypes.STRING(50),
      allowNull:false
    },
    NoiDung:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    TrangThai:{
      type: DataTypes.STRING(80),
      allowNull: false,
      defaultValue:'Chưa gửi'
    },
    ThoiGianGui:{
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'ThongBao',
    tableName:'thongbao'
  });
  return ThongBao;
};