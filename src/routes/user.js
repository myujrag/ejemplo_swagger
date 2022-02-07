const express = require("express");
const userSchema = require("../models/user");

/**
 * @swagger
 * components:
 *  schemas:
 *    Usuario:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Nombre del usuario
 *        age:
 *          type: integer
 *          description: Edad del usuario
 *        email:
 *          type: email
 *          description: Correo electrónico del usuario
 *      required:
 *        - name
 *        - age
 *        - email
 *      example:
 *        name: Juan Perez
 *        age: 35
 *        email: jperes@gmail.com
 */
const router = express.Router();

// Crear usuario
/**
 * @swagger
 * /api/users:
 *  post:
 *    summary: Crear un nuevo usuario
 *    tags: [Usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Usuario'
 *    responses:
 *      200:
 *        description: Usuario creado!
 * 
 */
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Regresa todos los usuarios
 *    tags: [Usuario]
 *    responses:
 *      200:
 *        description: Todos los usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Usuario'
 */
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *    summary: Regresa un usuario
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id del usuario
 *    responses:
 *      200:
 *        description: Usuario obtenido
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Usuario'
 *      404:
 *        description: No se encontro el usuario
 */
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a user
/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *    summary: Eliminar un usuario
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id del usuario
 *    responses:
 *      200:
 *        description: Usuario eliminado
 *      404:
 *        description: No se encontro el usuario
 */
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a user
/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *    summary: Actualizar un usuario
 *    tags: [Usuario]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: Id del usuario
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Usuario'
 *    responses:
 *      200:
 *        description: Usuario modificado
 *      404:
 *        description: No se encontro el usuario
 */
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
