const app = express();

const users = [
  { email: "admin@example.com", name: "admin", rol: "admin" },
  { email: "user@example.com", name: "user", rol: "user" },
];

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Bienvenido a la api de ADA Cars");
});

// Instancia del servidor
const server = app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});

// Exportación del servidor
module.exports = server;
