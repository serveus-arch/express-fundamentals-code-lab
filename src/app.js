const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || "HS256";
const PORT = process.env.PORT || 3000;

const users = [
  { email: "admin@example.com", name: "admin", rol: "admin" },
  { email: "user@example.com", name: "user", rol: "user" },
];

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Bienvenido a la api de ADA Cars");
});

const emailMiddleware = (users) => {
  return (req, res, next) => {
    const email = req.body.email;
    console.log(email);

    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(401).send({ error: "Invalid user name or password" });
    }
    next();
  };
};

const JWTValidation = (req, res, next) => {
  const headerToken = req.headers.authorization;

  try {
    const decoded = jwt.verify(headerToken, SECRET_KEY);
    console.log("---->", decoded);
    req.user = decoded;
    console.log("user", req.user);
    console.log("Rol", req.user.rol);

    req.headers = { ...req.headers, rol: req.user.rol };

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

app.post("/auth", emailMiddleware(users), (req, res) => {
  const email = req.body.email;
  const user = users.find((user) => user.email === email);
  const payload = {
    email: user.email,
    rol: user.rol,
    name: user.name,
  };
  console.log("PayLoad", payload);
  const token = jwt.sign(payload, SECRET_KEY);
  res.json({ token });
});

app.get("/premium-clients", JWTValidation, (req, res) => {
  if (req.headers.rol === "admin") {
    res.send("premium-clients list");
  } else if (req.headers.rol === "user") {
    res.status(403).json({ error: "Access not allowed" });
  }
});

app.get("/medium-clients", JWTValidation, (req, res) => {
  if (req.headers.rol === "admin" || req.headers.rol === "user") {
    res.send("medium-clients list");
  } else {
    res.status(403).json({ error: "Access not allowed" });
  }
});

const server = app.listen(PORT, () => {
  console.log('Servidor en ejecución en el puerto ${PORT}');
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Servidor cerrado correctamente");
    process.exit(0);
  });
});

module.exports=server;