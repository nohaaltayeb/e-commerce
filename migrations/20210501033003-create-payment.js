'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        references:{
          model:'orders',
          key:'id'
        }
      },
      amount: {
        type: Sequelize.INTEGER
      },
      type: {
        type : Sequelize.ENUM("VISA","CASH", "CHEQUE"), 
        allowNull : false, 
        defaultValue : 'VISA',
        validate: {
          isIn: { 
            args: [["VISA","CASH", "CHEQUE"]],
            msg: "Wrong status"
          }
        }
      
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Payments');
  }
};