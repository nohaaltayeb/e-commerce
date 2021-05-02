'use strict';
const {
  Model
} = require('sequelize');
const {orderDetails,User,Payment} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({orderDetails,User,Payment}) {
      // define association here
      order.hasMany(orderDetails, {foreignKey:"orderId"});
      order.belongsTo(User, {foreignKey:"userId"});
      order.hasOne(Payment, {foreignKey:"orderId"});

    }
  };
  order.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    totals: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};