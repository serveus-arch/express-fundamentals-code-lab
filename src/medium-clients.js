const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.send("Ruta clientes medium");
});

module.exports = router;
