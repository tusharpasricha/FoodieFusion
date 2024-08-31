module.exports = (sequelize, Sequelize) => {
  const OrderReceive = sequelize.define("orderReceive", {
    orders: {
      type: Sequelize.JSON, // Use JSON for MySQL
      allowNull: false,
    },
    address: {
      type: Sequelize.JSON, // Use JSON for MySQL
      allowNull: false,
    },
    totalAmount: {
      type: Sequelize.FLOAT, // To store the total amount of the order
      allowNull: false,
    },
  });

  return OrderReceive;
};
