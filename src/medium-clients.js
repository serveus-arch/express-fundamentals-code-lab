const express = require("express");
const router = express.Router();

const mediumClients = [
  { nombre: "Maria", age: "23" },
  { nombre: "Ana", age: "22" },
  { nombre: "Ricardo", age: "22" },
  { nombre: "Camila", age: "21" },
  { nombre: "Angel", age: "24" },
  { nombre: "Jeison", age: "27" },
  { nombre: "Armando", age: "28" },
];

router.get("/", function (req, res) {
  res.status(200).json({ clients: mediumClients });
});

router.post("/", function (req, res) {
  const data = req.body;

  mediumClients.push(data);
  res.status(201).json({ createdClient: data });
});

router.put("/:id", function (req, res) {
  const { id } = req.params;
  const data = req.body;

  mediumClients[id] = data;
  res.status(200).json({ updatedClient: mediumClients[id] });
});

router.delete("/:id", function (req, res) {
  const { id } = req.params;
  const data = mediumClients[id];
  mediumClients.splice(id, 1);
  const response = [data]
  res.status(200).json({ deletedClient: response });
});

module.exports = router;
