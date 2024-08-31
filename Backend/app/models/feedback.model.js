module.exports = (sequelize, Sequelize) => {
    const Feedback = sequelize.define("feedback", {
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', 
          key: 'id'
        }
      },
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'orders', 
          key: 'id'
        }
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      review: {
        type: Sequelize.TEXT
      },
      suggestions: {
        type: Sequelize.JSON
      }
    });
  
    return Feedback;
  };
  