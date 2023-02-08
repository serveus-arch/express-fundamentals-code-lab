const express = require("express");
const router = express.Router();

const premiumClients = [
  { nombre: "Roberto", age: "23" },
  { nombre: "Pablo", age: "22" },
  { nombre: "Laura", age: "22" },
  { nombre: "Sofia", age: "21" },
  { nombre: "Angelica", age: "24" },
  { nombre: "Estiven", age: "27" },
  { nombre: "Armando", age: "28" },
];

router.get("/", function (req, res) {
  const data = req.body;
  premiumClients.push(data);
  res.status(201).json({ createdClient: data });
});

router.post("/", function (req, res) {
  res.json({ meetings: meetings });
});

router.put("/:id", function (req, res) {
  res.status(200).json({ deletedUser: data });
});

router.delete("/:id", function (req, res) {
  const id = req.params.id;
  // Get the data from the request
  premiumClients[id] = data;
  res.status(200).json({ updatedClient: premiumClients[id] });
});

module.exports = router;
