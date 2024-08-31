module.exports = app => {
    const inventory = require("../controllers/inventory.controller.js");

    var router = require("express").Router();

    router.post("/", inventory.create);

    router.get("/", inventory.findAll);

    app.use('/api/inventory', router);
};
