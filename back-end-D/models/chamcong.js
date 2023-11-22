'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChamCong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChamCong.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      });
    }
  }
  ChamCong.init({
    idNhanVien:{
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    Ngay:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    GioVao:{
      type: DataTypes.TIME,
    },
    GioRa:{
      type: DataTypes.TIME,
    },
    TongGio:{
      type: DataTypes.STRING(20),
    },
  }, {
    sequelize,
    tableName:'chamcong',
    modelName: 'ChamCong',
  });
  return ChamCong;
};