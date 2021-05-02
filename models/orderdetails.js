'use strict';
const {
  Model
} = require('sequelize');
const {order} = require("../models");
module.exports = (sequelize, DataTypes) => {
  class orderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({order}) {
      // define association here
      orderDetails.belongsTo(order, {foreignKey:"orderId"});
    }
  };
  orderDetails.init({
    total: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    price:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orderDetails',
  });
  return orderDetails;
};