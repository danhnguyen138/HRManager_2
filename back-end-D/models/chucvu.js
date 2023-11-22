'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChucVu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChucVu.hasMany(models.NhanVien,{
        foreignKey: 'idChucVu'
      });
    }
  }
  ChucVu.init({
    MaChucVu: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false
    },
    TenChucVu: {
      type: DataTypes.STRING(30),
      unique: true,
      allowNull: false
    },
    MoTa: {
      type: DataTypes.TEXT,
    },
    NhiemVu: {
      type: DataTypes.STRING
    },
    NguoiTao:{
      type:DataTypes.STRING(50)
    },
  }, {
    sequelize,
    modelName: 'ChucVu',
    tableName:'chucvu'
  });
  return ChucVu;
};