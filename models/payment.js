'use strict';
const {
  Model
} = require('sequelize');
const {order} = require("../models");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({order}) {
      // define association here
      Payment.belongsTo(order,{foreignKey:"orderId"});
    }
  };
  Payment.init({
    orderId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    type: DataTypes.ENUM("VISA","CASH", "CHEQUE")
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};