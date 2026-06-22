// Importa el modelo de Envío para poder interactuar con la colección "envios" en MongoDB
const EnvioModel = require("../models/envio.model");

// Objeto controlador que contiene todas las funciones del sistema de envíos
const envioController = {

    // ==============================
    // 1. REGISTRAR NUEVO ENVÍO
    // ==============================
    async save(req, res) {
        try {
            // Creamos un nuevo documento usando el modelo Envio
            // req.body contiene los datos enviados desde el cliente (Thunder Client, postman, frontend, etc.)
            const envio = new EnvioModel(req.body);

            // Guardamos el documento en MongoDB
            await envio.save();

            // Respondemos al cliente con mensaje de éxito y los datos guardados
            res.status(201).json({
                message: "Envío registrado correctamente",
                data: envio
            });

        } catch (error) {
            // Si algo falla (validación, error de BD, etc.)
            res.status(500).json({ error: error.message });
        }
    },


    // ==============================
    // 2. ACTUALIZAR ESTADO DEL ENVÍO
    // ==============================
    async updateStatus(req, res) {
        try {

            // Extraemos solo el campo "estado" del body del request
            // Esto es desestructuración: const estado = req.body.estado
            const { estado } = req.body;

            // Buscamos el envío por su ID y actualizamos solo el estado
            const envio = await EnvioModel.findByIdAndUpdate(
                req.params.id,                                  // ID que viene por la URL
                { estado },                                     // nuevo valor del estado
                { new: true, runValidators: true }              // devuelve el documento actualizado y valida el enum
            );

            // Si no existe el envío, devolvemos error 404
            if (!envio)
                return res.status(404).json({ mensaje: "Envío no encontrado" });

            // Respuesta exitosa
            res.json({
                message: "Estado actualizado correctamente",
                data: envio
            });

        } catch (error) {
            // Error general del servidor
            res.status(500).json({ error: error.message });
        }
    },


    // ==============================
    // 3. CONSULTAR ENVÍOS ACTIVOS
    // ==============================
    async listActive(req, res) {
        try {

            // Buscamos todos los envíos cuyo estado NO sea "entregado"
            // $ne = "not equal" (distinto de)
            const envios = await EnvioModel.find({
                estado: { $ne: "entregado" }
            });

            // Devolvemos la lista de envíos activos
            res.json(envios);

        } catch (error) {
            // Error del servidor
            res.status(500).json({ error: error.message });
        }
    },


    // ==============================
    // 4. BUSCAR ENVÍO POR ID
    // ==============================
    async show(req, res) {
        try {

            // Buscamos un envío por su ID (MongoDB _id)
            const envio = await EnvioModel.findById(req.params.id);

            // Si no existe, devolvemos error 404
            if (!envio)
                return res.status(404).json({ mensaje: "Envío no encontrado" });

            // Si existe, lo devolvemos
            res.json(envio);

        } catch (error) {
            // Error general del servidor
            res.status(500).json({ error: error.message });
        }
    }

};

// Exportamos el controlador para usarlo en las rutas
module.exports = envioController;