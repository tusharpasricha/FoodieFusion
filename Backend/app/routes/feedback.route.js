module.exports = (app) => {
  const feedback = require("../controllers/feedback.controller.js");

  var router = require("express").Router();

  router.post("/", feedback.create);

  router.get("/", feedback.findAll);

  app.use("/api/feedback", router);
};
