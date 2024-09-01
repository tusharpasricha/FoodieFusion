module.exports = (sequelize, Sequelize) => {
  const MenuItem = sequelize.define("menuItem", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    ingredients: {
      type: Sequelize.JSON,
    },
    nutritionalInfo: {
      type: Sequelize.JSON,
    },
    allergens: {
      type: Sequelize.JSON,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    availability: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return MenuItem;
};
