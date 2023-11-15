const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
require('dotenv').config();

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

app.post('/login', (req, res) => {
  // Simulación de una autenticación en la base de datos
  const user = {
     username: 'John',
     password: '12345'
  };
 
  // Comparación de las credenciales recibidas con las del usuario
  if (req.body.username === user.username && req.body.password === user.password) {
     // Generación del JWT
     const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
 
     // Envío del JWT como respuesta
     res.json({ token: jwtToken });
  } else {
     res.status(401).json({ message: 'Autenticación fallida' });
  }
 });

 app.get('/protected', (req, res) => {
  // Extracción del token JWT desde el header de autorización
  const token = req.headers.authorization.split(' ')[1];
 
  // Validación del token JWT
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
     if (err) {
       res.status(401).json({ message: 'Token no válido' });
     } else {
       res.json({ message: 'Acceso concedido', username: decoded.username });
     }
  });
 });





module.exports=server;