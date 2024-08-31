module.exports = (sequelize, Sequelize) => {
    const InventoryItem = sequelize.define("inventoryItem", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      supplierInfo: {
        type: Sequelize.JSON
      },
      lowStockAlertThreshold: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      }
    });
  
    return InventoryItem;
  };
  