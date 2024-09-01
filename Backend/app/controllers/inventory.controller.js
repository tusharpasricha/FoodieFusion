const db = require("../models");
const InventoryItem = db.inventoryItem;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || req.body.quantity == null) {
    res.status(400).send({
      message: "Name and quantity are required!",
    });
    return;
  }

  const inventoryItem = {
    name: req.body.name,
    quantity: req.body.quantity,
    supplierInfo: req.body.supplierInfo,
    lowStockAlertThreshold: req.body.lowStockAlertThreshold
      ? req.body.lowStockAlertThreshold
      : 10,
  };

  InventoryItem.create(inventoryItem)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the InventoryItem.",
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  InventoryItem.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving inventory items.",
      });
    });
};
