'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LichSuCapNhatBaoHiem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LichSuCapNhatBaoHiem.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      })
      LichSuCapNhatBaoHiem.belongsTo(models.NhanVien,{
        foreignKey: 'idThayDoi',
        as: 'thaydoi'
      })
    }
  }
  LichSuCapNhatBaoHiem.init({
    idNhanVien:{
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    TruongTD:{
      type: DataTypes.STRING(40)
    },
    NoiDungCu:{
      type: DataTypes.STRING(100)
    },
    NoiDungMoi:{
      type: DataTypes.STRING(100)
    },
    LyDo:{
      type: DataTypes.STRING(100)
    },
    idThayDoi:{
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'LichSuCapNhatBaoHiem',
    tableName:'lichsucapnhatbaohiem'
  });
  return LichSuCapNhatBaoHiem;
};