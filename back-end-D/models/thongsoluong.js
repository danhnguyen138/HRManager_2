'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ThongSoLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ThongSoLuong.init({
    BHXHNV: {
      type: DataTypes.FLOAT
    },
    BHYTNV: {
      type: DataTypes.FLOAT
    },
    BHYTDN: {
      type: DataTypes.FLOAT
    },
    BHXHDN: {
      type: DataTypes.FLOAT
    },
    DinhMuc: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'ThongSoLuong',
    tableName:'thongsoluong'
  });
  return ThongSoLuong;
};