const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const users = [
  { email: "admin@example.com", name: "admin", rol: "admin" },
  { email: "user@example.com", name: "user", rol: "user" },
];

function JWTValidation(req, res, next) {
  const token = req.header("Authorization");
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.rol === "admin") {
      req.headers = { ...req.headers, rol: "admin" };
      next();
    } else {
      req.headers = { ...req.headers, rol: "user" };
      next();
    }
  } catch (error) {
    res.json({ error });
  }
}

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Bienvenido a la api de ADA Cars");
});

app.post("/auth", function (req, res, next) {
  const userInfo = users.filter((user) => {
    if (user.email == req.body.email) {
      return true;
    } else {
      return false;
    }
  });
  if (userInfo.length === 0) {
    res.status(401).send({ error: "Invalid user name or password" });
  } else {
    const token = jwt.sign(userInfo[0], process.env.SECRET_KEY, {
      expiresIn: "1h",
      algorithm: "HS256",
    });
    res.json({ token });
  }
});

app.get("/premium-clients", JWTValidation, function (req, res) {
  if (req.header("rol") === "admin") {
    res.send("premium-clients list");
  } else {
    res.status("403").json({ error: "Access not allowed" });
  }
});

app.get("/medium-clients", JWTValidation, function (req, res) {
  if (req.header("rol") === "admin" || req.header("rol") === "user") {
    res.send("medium-clients list");
  } else {
    res.status("403").json({ error: "Access not allowed" });
  }
});

module.exports = app;
