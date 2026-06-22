// Importamos mongoose, que es la librería para trabajar con MongoDB
const mongoose = require('mongoose');

// Extraemos "Schema" desde mongoose para poder crear estructuras de datos
const Schema = mongoose.Schema;


/*
    Creamos el esquema principal de Envíos
    Aquí definimos cómo se verá cada documento en la colección "envios"
*/
const EnvioSchema = new Schema({

    codigoPedido: { type: String, required: true, unique: true, trim: true, maxlength: 30 },

    // Información del remitente (quien envía el paquete)
    remitente: {
        
        nombre: { type: String, required: true, trim: true, maxlength: 100 },
        // en telefono se usa String porque puede incluir +, ceros o símbolos
        // validación con expresión regular (solo números y opcional +)
        telefono: { type: String, required: true, trim: true, match: [/^(\+?\d{9,15})$/, 'Teléfono inválido'] },
        direccionOrigen: { type: String, required: true, trim: true, maxlength: 150 }
    },

    // Información del destinatario (quien recibe el paquete)
    destinatario: {
        nombre: { type: String, required: true, trim: true, maxlength: 100 },
        telefono: { type: String, required: true, trim: true, match: [/^(\+?\d{9,15})$/, 'Teléfono inválido'] },
        direccionEntrega: { type: String, required: true, trim: true, maxlength: 150 }
    },

    // Estado del envío (controla el flujo del paquete)
    // enum = solo permite estos valores
    // mensaje que aparece si se envía un valor inválido
    // valor por defecto si no se envía nada
    // crea índice para búsquedas más rápidas por estado
    estado: { type: String, enum: {  values: ['pendiente', 'en_transito', 'entregado'], message: 'Estado no válido' }, default: 'pendiente', index: true }

}, {
    // timestamps = crea automáticamente:
    // createdAt (cuando se crea)
    // updatedAt (cuando se actualiza)
    timestamps: true,

    // elimina el campo "__v" que usa mongoose internamente
    versionKey: false
});

// Exportamos el modelo para usarlo en controladores y rutas
module.exports = mongoose.model('Envio', EnvioSchema);