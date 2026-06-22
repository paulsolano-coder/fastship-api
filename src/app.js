require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const dotenv = require("dotenv");

// ==============================
// CONFIGURACIÓN DE VARIABLES .env
// ==============================
dotenv.config();

// ==============================
// IMPORTAR CONEXIÓN A BD
// ==============================
// Esto ejecuta db.js automáticamente y conecta MongoDB
require("../config/db");

// ==============================
// CREAR APP EXPRESS
// ==============================
const app = express();

// ==============================
// MIDDLEWARES
// ==============================
app.use(express.json());

// ==============================
// RUTAS
// ==============================
const envioRoutes = require("./routes/envio.route");

app.use("/api", envioRoutes);

// ==============================
// RUTA BASE (PRUEBA)
// ==============================
app.get("/", (req, res) => {
    res.send("🚀 FastShip API funcionando correctamente");
});

// ==============================
// LEVANTAR SERVIDOR
// ==============================
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});