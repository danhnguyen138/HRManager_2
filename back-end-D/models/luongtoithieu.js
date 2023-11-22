'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LuongToiThieu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LuongToiThieu.init({
    SoQD:{
      type: DataTypes.STRING(30),
      allowNull: false
    },
    TenQD:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    VungIThang:{
      type: DataTypes.STRING(30)
    },
    VungIIThang:{
      type: DataTypes.STRING(30)
    },
    VungIIIThang:{
      type: DataTypes.STRING(30)
    },
    VungIVThang:{
      type: DataTypes.STRING(30)
    },
    VungIGio:{
      type: DataTypes.STRING(30)
    },
    VungIIGio:{
      type: DataTypes.STRING(30)
    },
    VungIIIGio:{
      type: DataTypes.STRING(30)
    },
    VungIVGio:{
      type: DataTypes.STRING(30)
    },
    TenFile:{
      type: DataTypes.STRING
    },
    NoiDungLQ:{
      type:DataTypes.TEXT
    },
    TrangThai:{
      type: DataTypes.STRING(30),
      defaultValue:'Đang sử dụng'
    },
  }, {
    sequelize,
    modelName: 'LuongToiThieu',
    tableName:'luongtoithieu'
  });
  return LuongToiThieu;
};