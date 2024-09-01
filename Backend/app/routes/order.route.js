module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");
  const authJwt = require("../middleware/middleware.js");


  var router = require("express").Router();

  router.post("/", authJwt.verifyToken, orders.create);

  router.get("/", authJwt.verifyToken, orders.findAll);

  app.use("/api/orders", router);
};
