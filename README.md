# Fastship API

API desarrollada con Node.js, Express y MongoDB.

## Tecnologías
- Node.js
- Express
- MongoDB

## 📁 Estructura del proyecto

```text
fastship-api/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── app.js
│
├── config/
├── node_modules/
├── package.json
└── .gitignore
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


## Instalación
npm install
npm run dev