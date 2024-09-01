const db = require("../models");
const MenuItem = db.menuItem;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "Name and price are required!",
    });
    return;
  }

  const menuItem = {
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    nutritionalInfo: req.body.nutritionalInfo,
    allergens: req.body.allergens,
    price: req.body.price,
    availability: req.body.availability ? req.body.availability : true,
  };

  MenuItem.create(menuItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the MenuItem.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  console.log("Received query:", req.query); // Log the query parameters
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  MenuItem.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu items.",
      });
    });
};
