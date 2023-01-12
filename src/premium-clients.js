const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Ruta clientes premium");
});

router.get("/list/:order", function (req, res) {
  const order = req.params.order;
  res.send(`Listados en orden ${order}`);
});

module.exports = router;
