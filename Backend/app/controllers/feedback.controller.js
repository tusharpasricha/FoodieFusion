const db = require("../models");
const Feedback = db.Feedback;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if (!req.body.userId || !req.body.orderId || !req.body.rating) {
        res.status(400).send({
            message: "User ID, Order ID, and rating are required!"
        });
        return;
    }

    const feedback = {
        userId: req.body.userId,
        orderId: req.body.orderId,
        rating: req.body.rating,
        review: req.body.review,
        suggestions: req.body.suggestions
    };

    Feedback.create(feedback)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Feedback."
            });
        });
};

exports.findAll = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: { [Op.like]: `%${userId}%` } } : null;

    Feedback.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving feedbacks."
            });
        });
};
