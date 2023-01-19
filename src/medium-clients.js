const express = require("express");
const router = express.Router();

function methods(req, res, next) {
  const method = req.method;
  if (method === "GET") {
    next();
  } else {
    res.status(405).send("Invalid http request method");
  }
}

router.use(methods);

router.get("/", function (req, res) {
  res.send("Ruta clientes medium");
});

module.exports = router;
