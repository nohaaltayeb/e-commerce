'use strict';
const {
  Model
} = require('sequelize');
const{product,User} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class shoppingCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product,User}) {
      // define association here
      shoppingCart.belongsTo(product, {foreignKey:"productId"});
      shoppingCart.belongsTo(User, {foreignKey:"userId"})
    }
  };
  shoppingCart.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'shoppingCart',
  });
  return shoppingCart;
};