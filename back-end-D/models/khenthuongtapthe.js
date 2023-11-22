'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhenThuongTapThe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KhenThuongTapThe.belongsTo(models.PhongBan,{
        foreignKey:'idDoiTuong'
      })
    }
  }
  KhenThuongTapThe.init({
    MaKT: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    TrangThai: {
      type: DataTypes.STRING(30),
      defaultValue: 'Lên kế hoạch'
    },
    SoQD: {
      type: DataTypes.STRING(30)
    },
    NgayQD: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    NgayKT: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    CanCu: {
      type: DataTypes.TEXT
    },
    LyDo: {
      type: DataTypes.TEXT,
    },
    idDoiTuong: {
      type: DataTypes.INTEGER,
      references: {
        model: 'PhongBan',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    },
    HinhThuc: {
      type: DataTypes.TEXT
    },
    NguonChi: {
      type: DataTypes.STRING
    },
    Thang: {
      type: DataTypes.INTEGER
    },
    TienThuong: {
      type: DataTypes.STRING(40)
    },
    NguoiBanHanh: {
      type: DataTypes.STRING(80)
    },
  }, {
    sequelize,
    modelName: 'KhenThuongTapThe',
    tableName: 'khenthuongtapthe'
  });
  return KhenThuongTapThe;
};