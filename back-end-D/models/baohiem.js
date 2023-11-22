'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BaoHiem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BaoHiem.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      });
    }
  }
  BaoHiem.init({
    MaBH: {
      type: DataTypes.STRING(30),

    },
    MaYT:{
      type: DataTypes.STRING(30)
    },
    NoiKhamYT:{
      type: DataTypes.STRING(100)
    },
    NgayBD: {
      type: DataTypes.DATEONLY,
    },
    LuongDongBaoHiem:{
      type: DataTypes.STRING(30),
    },
    TrangThai:{
      type:DataTypes.STRING(30),
      defaultValue:'Đang tham gia'
    },
    GhiChu:{
      type: DataTypes.STRING,
    },
    idNhanVien:{
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    },
  }, {
    sequelize,
    modelName: 'BaoHiem',
    tableName: 'baohiem'
  });
  return BaoHiem;
};