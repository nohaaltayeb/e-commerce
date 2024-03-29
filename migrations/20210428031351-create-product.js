'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:'categories',
          key:'id'
        }  
      },
      inventoryId: {
        type: Sequelize.INTEGER,
        references:{
          model:'inventories',
          key:'id'
        }  
      },
      discount_Percent: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.FLOAT
      },
      name: {
        type: Sequelize.STRING
      },
      discountId: {
        type: Sequelize.INTEGER,
        references:{
          model:'discounts',
          key:'id'
        }  
      },
      deletedAt: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('products');
  }
};