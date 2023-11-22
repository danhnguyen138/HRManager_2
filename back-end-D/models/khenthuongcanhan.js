'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KhenThuongCaNhan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KhenThuongCaNhan.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      })
    }
  }
  KhenThuongCaNhan.init({
    idNhanVien: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    MaKT:{
      type: DataTypes.STRING(30),
      allowNull:false,
      unique: true
    },
    SoQD:{
      type: DataTypes.STRING(30),
    },
    NgayQD:{
      type:DataTypes.DATEONLY,
      allowNull: false
    },
    CanCu:{
      type:DataTypes.TEXT
    },
    LyDo:{
      type:DataTypes.TEXT,
    },
    HinhThuc:{
      type: DataTypes.TEXT
    },
    Thang:{
      type: DataTypes.INTEGER
    },
    TienThuong:{
      type: DataTypes.STRING(40)
    },
    NguoiBanHanh:{
      type: DataTypes.STRING(80)
    },
  }, {
    sequelize,
    modelName: 'KhenThuongCaNhan',
    tableName: 'khenthuongcanhan'
  });
  return KhenThuongCaNhan;
};