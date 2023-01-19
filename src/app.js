const express = require("express");
const app = express();

const mediumClients = require("./medium-clients");
const premiumClients = require("./premium-clients");

app.use("/medium-clients", mediumClients);
app.use("/premium-clients", premiumClients);

app.use("/category/:category", function (req, res, next) {
  const category = req.params.category;
  if (category == "a" || category == "b" || category == "c") {
    res.redirect("/premium-clients");
  } else {
    res.redirect("/medium-clients");
  }
  next();
});

app.get("/", function (req, res) {
  res.send("Bienvenido a la api de ADA Cars");
});

module.exports = app;
