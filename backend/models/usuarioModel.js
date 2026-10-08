const pool = require('../config/database');

const obtenerUsuarios = async () => {
    const result = await pool.query(
        'SELECT id, nombre, apellido, usuario, estado FROM usuarios ORDER BY id'
    );

    return result.rows;
};

const obtenerUsuarioPorId = async (id) => {
    const result = await pool.query(
        'SELECT id, nombre, apellido, usuario, estado FROM usuarios WHERE id = $1',
        [id]
    );

    return result.rows[0];
};

const obtenerUsuarioPorNombreUsuario = async (usuario) => {
    const result = await pool.query(
        'SELECT * FROM usuarios WHERE usuario = $1',
        [usuario]
    );

    return result.rows[0];
};

const crearUsuario = async (nombre, apellido, usuario, password) => {
    const result = await pool.query(
        `INSERT INTO usuarios 
        (nombre, apellido, usuario, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nombre, apellido, usuario, estado`,
        [nombre, apellido, usuario, password]
    );

    return result.rows[0];
};

const actualizarUsuario = async (id, nombre, apellido, usuario, estado) => {
    const result = await pool.query(
        `UPDATE usuarios
        SET nombre = $1,
            apellido = $2,
            usuario = $3,
            estado = $4
        WHERE id = $5
        RETURNING id, nombre, apellido, usuario, estado`,
        [nombre, apellido, usuario, estado, id]
    );

    return result.rows[0];
};

const eliminarUsuario = async (id) => {
    const result = await pool.query(
        'DELETE FROM usuarios WHERE id = $1 RETURNING id',
        [id]
    );

    return result.rows[0];
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    obtenerUsuarioPorNombreUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};