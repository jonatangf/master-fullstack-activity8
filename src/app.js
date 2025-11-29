const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/api.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.status ? err.message : "Error interno del servidor";
  res.status(status).json({ error: message });
});

module.exports = app;
