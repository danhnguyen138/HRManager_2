'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TongHopNgayCong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TongHopNgayCong.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      })
    }
  }
  TongHopNgayCong.init({
    idNhanVien:{
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    Thang: {
      type: DataTypes.STRING(30)
    },
    NgayLamViec:{
      type: DataTypes.STRING(100)
    },
    TongGio:{
      type: DataTypes.STRING(30)
    },
    DiTre:{
      type: DataTypes.STRING(30)
    },
    VeSom:{
      type: DataTypes.STRING(30)
    }, 
  }, {
    sequelize,
    modelName: 'TongHopNgayCong',
    tableName:'tonghopngaycong'
  });
  return TongHopNgayCong;
};