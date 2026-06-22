# Fastship API

API desarrollada con Node.js, Express y MongoDB.

## Tecnologías
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- dotenv

## Descripción del proyecto

FastShip API permite registrar, consultar y actualizar envíos.  
La aplicación maneja información del remitente, destinatario, código de pedido y estado del envío.

Actualmente, la API permite:

- Registrar un nuevo envío.
- Consultar envíos activos.
- Buscar un envío por ID.
- Actualizar el estado de un envío.

## 📁 Estructura del proyecto

```text
fastship-api/
│
├── config/
│   └── db.js
│
├── node_modules/
│
├── src/
│   ├── controllers/
│   │   └── envio.controller.js
│   │
│   ├── models/
│   │   └── envio.model.js
│   │
│   ├── routes/
│   │   └── envio.route.js
│   │
│   └── app.js
│
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## 🗄️ Modelo de Datos (MongoDB / Mongoose)

La aplicación utiliza una colección única llamada `envios`. A continuación se detalla la estructura del esquema, sus tipos de datos y restricciones:

### Colección: `envios`

* **`_id`** *(ObjectId)*: Identificador único autogenerado por MongoDB.
* **`codigoPedido`** *(String)*: Identificador comercial único del envío. **[Requerido | Único]**
* **`remitente`** *(Object)*: Subdocumento con los datos del emisor. **[Requerido]**
    * **`nombre`** *(String)*: Nombre completo de quien envía.
    * **`telefono`** *(String)*: Teléfono de contacto del emisor.
    * **`direccionOrigen`** *(String)*: Dirección de recogida del paquete.
* **`destinatario`** *(Object)*: Subdocumento con los datos del receptor. **[Requerido]**
    * **`nombre`** *(String)*: Nombre completo de quien recibe.
    * **`telefono`** *(String)*: Teléfono de contacto del receptor.
    * **`direccionEntrega`** *(String)*: Dirección de destino para la entrega.
* **`estado`** *(String)*: Estado del flujo logístico. Valores permitidos: `pendiente`, `en_transito`, `entregado`. **[Por defecto: 'pendiente']**
* **`createdAt`** *(Date)*: Fecha y hora de registro del envío (Gestionado por Timestamps).
* **`updatedAt`** *(Date)*: Fecha y hora del último cambio de estado (Gestionado por Timestamps).

#### Ejemplo de Documento en la Base de Datos

```json
{
  "_id": "64b0f1a2c3d4e5f6a7b8c9d0",
  "codigoPedido": "FS-10234",
  "remitente": {
    "nombre": "Carlos Mendoza",
    "telefono": "987654321",
    "direccionOrigen": "Av. Benavides 1230, Surco"
  },
  "destinatario": {
    "nombre": "Ana Gómez",
    "telefono": "912345678",
    "direccionEntrega": "Av. Larco 456, Miraflores"
  },
  "estado": "pendiente",
  "createdAt": "2026-06-21T18:30:00.000Z",
  "updatedAt": "2026-06-21T18:30:00.000Z"
}
```


# 🚀 Instalación

## 📥 Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

## 📂 Ingresar al proyecto
```bash
cd fastship-api
```
## 📦 Instalar dependencias 
```bash
npm install
```

## ⚙️ Configuración de variables de entorno

Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```bash
PORT=3000
MONGO_URI=TU_CADENA_DE_CONEXION_MONGODB
```
Nota: el nombre de la variable de conexión debe coincidir con el que estés usando en config/db.js.
Ejecutar el proyecto
Para iniciar el servidor:
node src/app.js
Si se tiene configurado un script en package.json, también puede ejecutarse:
npm start 
o tambien: 
npm run dev
El servidor se ejecutará en:
http://localhost:3000
Respuesta esperada:
🚀 FastShip API funcionando correctamente

Endpoints de la API
La URL base de la API es:
http://localhost:3000/api

********************************************************************************
1. Registrar nuevo envío
********************************************************************************
Método
POST
Endpoint
/api/envios
URL completa
http://localhost:3000/api/envios
Body JSON
{
  "codigoPedido": "PED-001",
  "remitente": {
    "nombre": "Paul Solano",
    "telefono": "931294000",
    "direccionOrigen": "Av. Los Geranios 147, Lima"
  },
  "destinatario": {
    "nombre": "Maura Torres",
    "telefono": "912345678",
    "direccionEntrega": "Jr. Las Flores 456, Callao"
  }
}
********************************************************************************
2. Consultar envíos activos
********************************************************************************
Método
GET
Endpoint
/api/envios
URL completa
http://localhost:3000/api/envios

resultado : 

[
  {
    "_id": "6a38f3c7f94a40269a5c5f36",
    "codigoPedido": "PED-001",
    "estado": "pendiente"
  }
]
********************************************************************************
3. Buscar envío por ID
********************************************************************************
Método
GET
Endpoint
/api/envios/:id
URL completa
http://localhost:3000/api/envios/ID_DEL_ENVIO

{
  "remitente": {
    "nombre": "Paul Solano",
    "telefono": "931294000",
    "direccionOrigen": "Av. Los Geranios 147, Lima"
  },
  "destinatario": {
    "nombre": "Maura Torres",
    "telefono": "912345678",
    "direccionEntrega": "Jr. Las Flores 456, Callao"
  },
  "_id": "6a38f3c7f94a40269a5c5f36",
  "codigoPedido": "PED-001",
  "estado": "pendiente",
  "createdAt": "2026-06-22T08:35:19.255Z",
  "updatedAt": "2026-06-22T08:35:19.255Z"
}

********************************************************************************
4. Actualizar estado del envío
********************************************************************************
Método
PATCH
Endpoint
/api/envios/:id/estado
URL completa
http://localhost:3000/api/envios/ID_DEL_ENVIO/estado
Body JSON
{
  "estado": "en_transito"
}

resultado : 

res.json({
    message: "Estado actualizado correctamente",
    data: {
        _id: envio._id,
        codigoPedido: envio.codigoPedido,
        estado: envio.estado
    }
});
********************************************************************************