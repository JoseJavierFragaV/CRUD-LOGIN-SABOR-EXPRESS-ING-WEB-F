const usuarioModel = require('../models/usuarioModel');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { usuario, password } = req.body;

        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: 'Usuario y contraseña son obligatorios'
            });
        }

        const usuarioEncontrado =
            await usuarioModel.obtenerUsuarioPorNombreUsuario(usuario);

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        const passwordHash = md5(password);

        if (passwordHash !== usuarioEncontrado.password) {
            return res.status(401).json({
                mensaje: 'Usuario o contraseña incorrectos'
            });
        }

        if (!usuarioEncontrado.estado) {
            return res.status(403).json({
                mensaje: 'El usuario está inactivo'
            });
        }

        const token = jwt.sign(
            {
                id: usuarioEncontrado.id,
                usuario: usuarioEncontrado.usuario
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '2h'
            }
        );

        res.json({
            mensaje: 'Login exitoso',
            token: token,
            usuario: {
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                apellido: usuarioEncontrado.apellido,
                usuario: usuarioEncontrado.usuario
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });
    }
};


const registrar = async (req, res) => {
    try {

        const {
            nombre,
            apellido,
            usuario,
            password
        } = req.body;

        if (!nombre || !apellido || !usuario || !password) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

        const usuarioExistente =
            await usuarioModel.obtenerUsuarioPorNombreUsuario(usuario);

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: 'El usuario ya existe'
            });
        }

        const passwordHash = md5(password);

        const nuevoUsuario =
            await usuarioModel.crearUsuario(
                nombre,
                apellido,
                usuario,
                passwordHash
            );

        res.status(201).json({
            mensaje: 'Cuenta creada correctamente',
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear la cuenta'
        });
    }
};


module.exports = {
    login,
    registrar
};