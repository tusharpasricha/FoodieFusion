module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("order", {
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    orderDetails: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    totalAmount: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    paymentStatus: {
      type: Sequelize.STRING,
      defaultValue: "Pending",
    },
    deliveryAddress: {
      type: Sequelize.JSON,
      allowNull: false,
    },
    orderTimestamp: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  });

  return Order;
};
