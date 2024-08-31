module.exports = app => {
    const order = require("../controllers/orders.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", order.create);    
  
    app.use('/api/orders', router);
  };