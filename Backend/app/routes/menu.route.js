module.exports = app => {
    const menuItems = require("../controllers/menu.controller.js");

    var router = require("express").Router();

    router.post("/", menuItems.create);

    router.get("/", menuItems.findAll);

    app.use('/api/menuitems', router);
};
