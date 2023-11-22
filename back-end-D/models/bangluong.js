'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BangLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BangLuong.belongsToMany(models.NhanVien,{
        through: 'NhanVienBangLuong',
   
        foreignKey: 'idBangLuong'
      });
    }
  }
  BangLuong.init({
    Thang:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    NgayBatDau:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NgayKetThuc:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NgayCongChuan:{
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'BangLuong',
    tableName: 'bangluong'
  });
  return BangLuong;
};