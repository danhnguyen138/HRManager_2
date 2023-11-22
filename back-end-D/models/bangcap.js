'use strict'; 
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BangCap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BangCap.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      });
    }
  }
  BangCap.init({
    MaBC:{
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    SoQD: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    TenBC: {
      type: DataTypes.STRING(50),
      allowNull:false
    },
    LoaiBC:{
      type: DataTypes.STRING(50),
      allowNull:false
    },
    ChuyenNganh:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    HinhThuc:{
      type: DataTypes.STRING(50)
    },
    XepLoai:{
      type: DataTypes.STRING(30),
      allowNull: false
    },
    DiemSo:{
      type: DataTypes.STRING(10),
      allowNull: false
    }, 
    NgayKy:{
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    HieuLuc:{
      type: DataTypes.STRING(20),
      allowNull: false
    },
    ToChuc:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    DiaChi:{
      type: DataTypes.STRING(100),
      allowNull: false
    },
    GhiChu:{
      type: DataTypes.STRING,
    },
    TrangThai:{
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue:"Còn hiệu lực"
    },
    idNhanVien:{
      type: DataTypes.INTEGER,
      allowNull:false,
      references:{
        model: 'NhanVien',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'BangCap',
    tableName: 'bangcap'
  });
  return BangCap;
};