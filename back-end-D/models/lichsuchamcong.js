'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LichSuChamCong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LichSuChamCong.init({
    TenFile: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    NgayBatDau: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NgayKetThuc: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'LichSuChamCong',
    tableName:'lichsuchamcong'
  });
  return LichSuChamCong;
};