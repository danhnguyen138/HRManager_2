'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LichSuPhongBan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        LichSuPhongBan.belongsTo(models.NhanVien,{
          foreignKey:'idNhanVien'
        })
    }
  }
  LichSuPhongBan.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    TenPhongBanCu: {
      type: DataTypes.STRING(50),

    },
    TenChucVuCu: {
      type: DataTypes.STRING(50),

    },
    TenPhongBanMoi: {
      type: DataTypes.STRING(50),

    },
    TenChucVuMoi: {
      type: DataTypes.STRING(50),
 
    },
    LyDo: {
      type: DataTypes.TEXT,

    },
    SoQD: {
      type: DataTypes.STRING(30)
    },
    NgayQD: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NguoiBanHanh: {
      type: DataTypes.STRING(50)
    },
  }, {
    sequelize,
    modelName: 'LichSuPhongBan',
    tableName: 'lichsuphongban'
  });
  return LichSuPhongBan;
};