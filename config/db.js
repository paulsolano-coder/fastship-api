// Importamos la librería Mongoose
// Mongoose nos permite conectar Node.js con MongoDB y manejar la base de datos
const mongoose = require('mongoose');

// Importamos dotenv, una librería que permite cargar variables de entorno desde el archivo .env
const dotenv = require('dotenv');

// Cargamos las variables de entorno antes de usarlas
dotenv.config();

// Cadena de conexión a MongoDB Atlas
// Incluye usuario, contraseña, host del cluster y nombre de la base de datos
// const mongoDB = 'mongodb+srv://paulsolano_db_user:<contraseña>@cluster0.oxo2yhp.mongodb.net/fastshipDB?appName=Cluster0';
// Obtenemos la cadena de conexión desde las variables de entorno (archivo .env)
// process.env es donde Node guarda todas las variables cargadas por dotenv
const mongoDB = process.env.MONGO_URI;


// mongoose.connect() inicia la conexión con MongoDB
// IMPORTANTE: esta función devuelve una PROMESA (Promise)
mongoose.connect(mongoDB)

    // .then() se ejecuta si la conexión fue exitosa (estado: fulfilled)
    // Es decir: MongoDB respondió correctamente y la conexión se estableció
    .then(() => {
        console.log('✅ MongoDB conectado correctamente');
    })

    // .catch() se ejecuta si ocurre un error en la conexión (estado: rejected)
    // Ejemplo: contraseña incorrecta, internet caído, cluster no disponible
    .catch((err) => {
        console.error('❌ Error al conectar a MongoDB:', err.message);
    });

// Exportamos mongoose para poder usarlo en otros archivos del proyecto
// Ejemplo: modelos (schemas), controllers, etc.
module.exports = mongoose;