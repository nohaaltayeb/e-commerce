'use strict';
const {
  Model
} = require('sequelize');
const{inventory,product} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class productInventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({inventory,product}) {
      // define association here
      productInventory.belongsTo(inventory, {foreignKey:"inventoryId"});
      productInventory.belongsTo(product, {foreignKey:"productId"})
    }
  };
  productInventory.init({
    productId: DataTypes.INTEGER,
    inventoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'productInventory',
  });
  return productInventory;
};