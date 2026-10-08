const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const verificarToken = require('../middleware/authMiddleware');

// Obtener todos los usuarios
router.get('/', verificarToken, usuarioController.obtenerUsuarios);

// Obtener un usuario por ID
router.get('/:id', verificarToken, usuarioController.obtenerUsuarioPorId);

// Crear un usuario
router.post('/', verificarToken, usuarioController.crearUsuario);

// Actualizar un usuario
router.put('/:id', verificarToken, usuarioController.actualizarUsuario);

// Eliminar un usuario
router.delete('/:id', verificarToken, usuarioController.eliminarUsuario);

module.exports = router;