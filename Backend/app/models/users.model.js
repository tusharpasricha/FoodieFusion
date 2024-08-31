module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      preferences: {
        type: Sequelize.JSON
      }
    });
  
    return User;
  };
  