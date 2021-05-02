'use strict';
const {
  Model
} = require('sequelize');
const {product} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
      // define association here
      category.hasMany(product, {foreignKey:"categoryId"})

    }
  };
  category.init({
    name: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'category',
  });
  return category;
};