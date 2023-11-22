'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhanCongTheoNgay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PhanCongTheoNgay.belongsTo(models.PhanCong, {
        foreignKey: 'idPhanCong'
      })
    }
  }
  PhanCongTheoNgay.init({
    NgayPhanCong: {
      type: DataTypes.STRING,
      allowNull: false
    },
    TenCV: {
      type: DataTypes.STRING(40),
      allowNull: false
    },

    DanhGia: {
      type: DataTypes.STRING,
    },
    TienDo: {
      type: DataTypes.STRING,
    },
    KPI: {
      type: DataTypes.STRING
    },
    idPhanCong: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PhanCong',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'PhanCongTheoNgay',
    tableName: 'phancongtheongay'
  });
  return PhanCongTheoNgay;
};