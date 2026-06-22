// Importamos Express para poder crear rutas del servidor
const express = require("express");

// Creamos un "router" que nos permite definir rutas separadas del archivo principal
const router = express.Router();

// Importamos el controlador donde está la lógica (crear, listar, actualizar, etc.)
const envioController = require("../controllers/envio.controller");

// ==============================
// RUTAS DE ENVÍOS (FASTSHIP API)
// Base URL: http://localhost:3000/api
// ==============================

// ==============================
// 1. REGISTRAR NUEVO ENVÍO
// ==============================
// POST = enviar datos para crear un nuevo registro
// http://localhost:3000/api/envios
router.post("/envios", envioController.save);

// ==============================
// 2. CONSULTAR ENVÍOS ACTIVOS
// ==============================
// GET = obtener información del servidor
// http://localhost:3000/api/envios
// Aquí traemos los envíos que no están entregados
router.get("/envios", envioController.listActive);

// ==============================
// 3. BUSCAR ENVÍO POR ID
// ==============================
// http://localhost:3000/api/envios/ID
// :id es un parámetro dinámico (cambia según el envío)
router.get("/envios/:id", envioController.show);

// ==============================
// 4. ACTUALIZAR ESTADO DEL ENVÍO
// ==============================
// PATCH = actualizar solo una parte del recurso (en este caso el estado)
// http://localhost:3000/api/envios/ID/estado
router.patch("/envios/:id/estado", envioController.updateStatus);

// Exportamos el router para poder usarlo en app.js
module.exports = router;