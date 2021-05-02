'use strict';
const {
  Model
} = require('sequelize');
const {User} = require("../models")
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      Address.belongsTo(User, {foreignKey:"userId"})
    }
  };
  Address.init({
    userId: DataTypes.INTEGER,
    address1: DataTypes.STRING,
    city: DataTypes.STRING,
    country: DataTypes.STRING,
    post_code: DataTypes.STRING,
    telephone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};