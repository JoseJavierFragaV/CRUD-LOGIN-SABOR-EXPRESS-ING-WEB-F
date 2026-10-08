const usuarioModel = require('../models/usuarioModel');
const md5 = require('md5');

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioModel.obtenerUsuarios();

        res.json(usuarios);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener los usuarios'
        });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const usuario = await usuarioModel.obtenerUsuarioPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json(usuario);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al obtener el usuario'
        });
    }
};

const crearUsuario = async (req, res) => {
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
            mensaje: 'Usuario creado correctamente',
            usuario: nuevoUsuario
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al crear el usuario'
        });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nombre,
            apellido,
            usuario,
            estado
        } = req.body;

        const usuarioActualizado =
            await usuarioModel.actualizarUsuario(
                id,
                nombre,
                apellido,
                usuario,
                estado
            );

        if (!usuarioActualizado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario actualizado correctamente',
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al actualizar el usuario'
        });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const usuarioEliminado =
            await usuarioModel.eliminarUsuario(id);

        if (!usuarioEliminado) {
            return res.status(404).json({
                mensaje: 'Usuario no encontrado'
            });
        }

        res.json({
            mensaje: 'Usuario eliminado correctamente'
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: 'Error al eliminar el usuario'
        });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};