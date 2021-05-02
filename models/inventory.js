'use strict';
const {
  Model
} = require('sequelize');
const { product }= require("../models");
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({product}) {
      // define association here
      inventory.belongsToMany(product, {through:"product_inventory"})

    }
  };
  inventory.init({
    quantity: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'inventory',
  });
  return inventory;
};