'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  img.init({
    public_id: DataTypes.TEXT,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    secure_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'img',
  });
  return img;
};