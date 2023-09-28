const express = require("express");
const app = express();
const mediumClientsEndpoint = require("./medium-clients");
const premiumClientsEndpoint = require("./premium-clients");

app.use(express.json());

app.use("/api/medium-clients", mediumClientsEndpoint);
app.use("/api/premium-clients", premiumClientsEndpoint);

app.get("/", function (req, res) {
  res.send("Bienvenido a la api de ADA Cars");
});

module.exports = app;
