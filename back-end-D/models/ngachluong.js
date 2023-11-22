'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NgachLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NgachLuong.hasMany(models.BacLuong,{
        foreignKey:'idNgachLuong'
      })
    }
  }
  NgachLuong.init({
    MaNgachLuong:{
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    TenNgachLuong:{
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'NgachLuong',
    tableName: 'ngachluong'
  });
  return NgachLuong;
};