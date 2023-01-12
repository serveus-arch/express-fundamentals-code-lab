const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Ruta clientes medium");
});

router.get("/list/:limit", function (req, res) {
  const limit = req.params.limit;
  res.send(`Listados ${limit} autos`);
});

module.exports = router;
