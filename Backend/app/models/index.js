const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.orderReceives = require("./orders.model.js")(sequelize, Sequelize);
db.user = require("./users.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);
db.feedback = require("./feedback.model.js")(sequelize, Sequelize);
db.menuItem = require("./menu.model.js")(sequelize, Sequelize);


db.user.hasMany(db.order, { as: "orders" });
db.order.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.user.hasMany(db.feedback, { as: "feedbacks" });
db.feedback.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user"
});

db.order.hasMany(db.feedback, { as: "feedbacks" });
db.feedback.belongsTo(db.order, {
  foreignKey: "orderId",
  as: "order"
});


module.exports = db;