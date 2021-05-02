'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PaymentTypes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type : { 
        type : Sequelize.ENUM('bankAccount','depitCard','creditCard'), 
        allowNull : false, 
        defaultValue : 'bankAccount',
        validate: {
          isIn: { 
            args: [['bankAccount','depitCard','creditCard']],
            msg: "Wrong status"
          }
        }
      },
      accountNumber: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'Users',
          key:'id'
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
    await queryInterface.dropTable('PaymentTypes');
  }
};