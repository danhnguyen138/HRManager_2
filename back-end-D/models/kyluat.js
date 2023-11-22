'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KyLuat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      KyLuat.belongsTo(models.NhanVien,{
        foreignKey:'idNhanVien'
      });
    }
  }
  KyLuat.init({
    TrangThai:{
      type: DataTypes.STRING(30),
      defaultValue: 'Lên kế hoạch'
    },
    idNhanVien:{
      type: DataTypes.INTEGER,
      references: {
        model: 'NhanVien',
        key: 'id'
      },
      onUpdate:'CASCADE',
      onDelete:'SET NULL'
    },
    ThoiGian:{
      type: DataTypes.DATEONLY
    },
    SuViec:{
      type: DataTypes.STRING(100)
    },
    MoTa:{
      type: DataTypes.TEXT
    },
    DiaDiem:{
      type: DataTypes.STRING(100)
    },
    ChungKien:{
      type: DataTypes.STRING(100)
    },
    TuongThuat:{
      type: DataTypes.TEXT
    },
    HinhThucKyLuat:{
      type: DataTypes.TEXT
    },
    SoQD:{
      type: DataTypes.STRING(30)
    },
    NguoiBanHanh:{
      type: DataTypes.STRING(80)
    },
    NgayQD:{
      type:DataTypes.DATEONLY,
      allowNull: false
    },
   
  }, {
    sequelize,
    modelName: 'KyLuat',
    tableName:'kyluat'
  });
  return KyLuat;
};