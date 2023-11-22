'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThayDoiLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ThayDoiLuong.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    HinhThucCu:{
      type: DataTypes.STRING(100)
    },
    NgachLuongCu:{
      type: DataTypes.STRING(100)
    },
    BacLuongCu:{
      type: DataTypes.STRING(100)
    },
    TienLuongCu:{
      type: DataTypes.STRING(100)
    },
    HinhThucMoi:{
      type: DataTypes.STRING(100)
    },
    NgachLuongMoi:{
      type: DataTypes.STRING(100)
    },
    BacLuongMoi:{
      type: DataTypes.STRING(100)
    },
    TienLuongMoi:{
      type: DataTypes.STRING(100)
    },
    LyDo:{
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'ThayDoiLuong',
    tableName: 'thaydoiluong'
  });
  return ThayDoiLuong;
};