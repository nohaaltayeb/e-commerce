'use strict';
const {
  Model
} = require('sequelize');
const{category,inventory,discount,shoppingCart} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({category,inventory,discount,shoppingCart}) {
      // define association here
      product.belongsTo(category,{foreignKey:"categoryId"})
      product.belongsToMany(inventory,{through:"product_inventory"});
      product.belongsTo(discount, {foreignKey:"discountId"});
      product.hasMany(shoppingCart, {foreignKey:"productId"})
      
    }
  };
  product.init({
    categoryId: DataTypes.INTEGER,
    inventoryId: DataTypes.INTEGER,
    discount_Percent: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    name: DataTypes.STRING,
    discountId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};