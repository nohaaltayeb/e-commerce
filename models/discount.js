'use strict';
const {
  Model
} = require('sequelize');
const{product} = require("../models");
module.exports = (sequelize, DataTypes) => {
  class discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
      // define association here
      discount.hasMany(product, {foreignKey:"discountId"});

    }
  };
  discount.init({
    name: DataTypes.STRING,
    discount_percentage: DataTypes.FLOAT,
    active: DataTypes.BOOLEAN,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'discount',
  });
  return discount;
};