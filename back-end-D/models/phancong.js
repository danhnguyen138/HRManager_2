'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhanCong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PhanCong.belongsTo(models.NhanVien, {
        foreignKey: 'idNhanVien'
      })
      PhanCong.hasMany(models.PhanCongTheoNgay, {
        foreignKey: 'idPhanCong'
      })
    }
  }
  PhanCong.init({
    NgayBatDau: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NgayKetThuc: {
      type: DataTypes.DATEONLY,
    },
    TongKPI: {
      type: DataTypes.FLOAT
    },
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
  }, {
    sequelize,
    modelName: 'PhanCong',
    tableName: 'phancong'
  });
  return PhanCong;
};