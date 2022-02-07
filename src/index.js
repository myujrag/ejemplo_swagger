const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");

const path = require('path');

// swagger
const swaggerUI = require('swagger-ui-express');
const swaggertJsDoc = require('swagger-jsdoc');
const swaggerSpec = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Node API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:9000'
      }
    ]
  },
  apis: [
    `${path.join(__dirname, './routes/*.js')}`
  ]
};

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);

// Aqui esta el acceso a la documentación
// Indica que sirve la documentación
// Pasa la configuración inicial
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggertJsDoc(swaggerSpec)));

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
