const db = require("../models");
const OrderReceive = db.orderReceives;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  console.log('hi')
  console.log('Request method:', req.method);
  console.log('Request headers:', req.headers);
  console.log('Request body:', req.body);

    if (!req.body.orders || !req.body.address || !req.body.totalAmount) {
      res.status(400).send({
        message: "Content can not be empty or incomplete!"
      });
      return;
    }
  
    const orderReceive = {
      orders: req.body.orders, 
      address: req.body.address, 
      totalAmount: req.body.totalAmount
    };
  
    OrderReceive.create(orderReceive)
      .then(data => {
        console.log("creatinf")
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the order."
        });
      });
  };