'use strict';
const {
  Model
} = require('sequelize');
const{Address,PaymentType,order,shoppingCart} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Address,PaymentType,order,shoppingCart}) {
      // define association here
      User.hasMany(Address, {foreignKey:"userId"});
      User.hasMany(PaymentType, {foreignKey:"userId"});
      User.hasMany(order,{foreignKey:"userId"});
      User.hasMany(shoppingCart, {foreignKey:"userId"})
    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    permissions: DataTypes.ENUM("Admin","Normal")
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};