const API_URL = 'http://localhost:3000/api';

export const login = async (usuario, password) => {
    const respuesta = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario,
            password
        })
    });

    const datos = await respuesta.json();

    return {
        ok: respuesta.ok,
        datos
    };
};

export const obtenerUsuarios = async () => {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/usuarios`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const datos = await respuesta.json();

    return {
        ok: respuesta.ok,
        datos
    };
};

export const crearUsuario = async (
    nombre,
    apellido,
    usuario,
    password
) => {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre,
            apellido,
            usuario,
            password
        })
    });

    const datos = await respuesta.json();

    return {
        ok: respuesta.ok,
        datos
    };
};

export const actualizarUsuario = async (
    id,
    nombre,
    apellido,
    usuario,
    estado
) => {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            nombre,
            apellido,
            usuario,
            estado
        })
    });

    const datos = await respuesta.json();

    return {
        ok: respuesta.ok,
        datos
    };
};

export const eliminarUsuario = async (id) => {
    const token = localStorage.getItem('token');

    const respuesta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const datos = await respuesta.json();

    return {
        ok: respuesta.ok,
        datos
    };
};