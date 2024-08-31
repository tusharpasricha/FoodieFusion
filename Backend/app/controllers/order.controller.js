const db = require("../models");
const Order = db.Orders;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.userId || !req.body.orderDetails || !req.body.totalAmount) {
        res.status(400).send({
            message: "User ID, order details, and total amount are required!"
        });
        return;
    }

    const order = {
        userId: req.body.userId,
        orderDetails: req.body.orderDetails, 
        totalAmount: req.body.totalAmount,
        paymentStatus: req.body.paymentStatus ? req.body.paymentStatus : "Pending",
        deliveryAddress: req.body.deliveryAddress 
    }

    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};

exports.findAll = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;

    Order.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving orders."
            });
        });
};
