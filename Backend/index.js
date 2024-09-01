const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
require("dotenv").config();

var corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

require("./app/routes/user.route")(app);
require("./app/routes/order.route")(app);
require("./app/routes/menu.route")(app);
require("./app/routes/inventory.route")(app);
require("./app/routes/feedback.route")(app);

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Foodie Fusion." });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
