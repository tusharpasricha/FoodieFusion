module.exports = (app) => {
  const feedback = require("../controllers/feedback.controller.js");
  const authJwt = require("../middleware/middleware.js");


  var router = require("express").Router();

  router.post("/", authJwt.verifyToken,feedback.create);

  router.get("/", feedback.findAll);

  app.use("/api/feedback", router);
};
