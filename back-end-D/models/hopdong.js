'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HopDong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HopDong.belongsTo(models.NhanVien, {
        foreignKey: 'idNhanVien',
      })
    }
  }
  HopDong.init({
    idDaiDien: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    HoTenA: {
      type: DataTypes.STRING(100)
    },
    ChucVuA: {
      type: DataTypes.STRING(100)
    },
    DaiDienA: {
      type: DataTypes.STRING(100)
    },
    DiaChiA: {
      type: DataTypes.STRING(100)
    },
    SoDTA: {
      type: DataTypes.STRING(100)
    },
    ThoiGianLV: {
      type: DataTypes.STRING(100)
    },
    HetHan:{
      type: DataTypes.STRING
    },
    HinhThucTra:{
      type: DataTypes.STRING
    },
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    HoTenB: {
      type: DataTypes.STRING(100)
    },
    CCCDB: {
      type: DataTypes.STRING(100)
    },
    NgayCapB: {
      type: DataTypes.STRING(100)
    },
    TaiB: {
      type: DataTypes.STRING(100)
    },
    DiaChiLV: {
      type: DataTypes.STRING
    },
    MaHD: {
      type: DataTypes.STRING(100)
    },

    TenHD: {
      type: DataTypes.STRING(100)
    },
    LoaiHD: {
      type: DataTypes.STRING(100)
    },
    ThoiHan: {
      type: DataTypes.STRING(100)
    },
    LuongChinh: {
      type: DataTypes.STRING(100)
    },
    LuongChinhThucTap: {
      type: DataTypes.STRING(100)
    },
    LuongChinhThuViec: {
      type: DataTypes.STRING(100)
    },
    NgachLuong: {
      type: DataTypes.STRING(100)
    },
    BacLuong: {
      type: DataTypes.STRING(100)
    },
    GhiChu: {
      type: DataTypes.TEXT
    },
    TrangThai: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: 'Còn hiệu lực'
    },

  }, {
    sequelize,
    modelName: 'HopDong',
    tableName: 'hopdong'
  });
  return HopDong;
};