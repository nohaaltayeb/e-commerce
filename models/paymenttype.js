'use strict';
const {
  Model
} = require('sequelize');
const{User} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class PaymentType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      PaymentType.belongsTo(User, {foreignKey:"userId"})
    }
  };
  PaymentType.init({
    type: DataTypes.ENUM("bankAccount", "depitCard", "creditCard"),
    accountNumber: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'PaymentType',
  });
  return PaymentType;
};