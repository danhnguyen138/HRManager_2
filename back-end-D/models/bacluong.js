'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BacLuong extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BacLuong.belongsTo(models.NgachLuong,{
        foreignKey:'idNgachLuong'
      })
    }
  }
  BacLuong.init({
    idNgachLuong: {
      type: DataTypes.INTEGER,
      references: {
        model: 'NgachLuong',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    TenBacLuong: {
      type: DataTypes.STRING(100)
    },
    TienLuong: {
      type: DataTypes.STRING(100)
    },
  }, {
    sequelize,
    modelName: 'BacLuong',
    tableName:'bacluong',
  });
  return BacLuong;
};