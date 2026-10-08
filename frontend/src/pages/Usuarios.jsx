import { useEffect, useState } from 'react';
import {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../services/api';

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [modoEdicion, setModoEdicion] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [estado, setEstado] = useState(true);

    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const cargarUsuarios = async () => {

        setCargando(true);

        const respuesta = await obtenerUsuarios();

        if (respuesta.ok) {
            setUsuarios(respuesta.datos);
        } else {
            setError('No se pudieron cargar los usuarios');
        }

        setCargando(false);
    };

    const limpiarFormulario = () => {
        setNombre('');
        setApellido('');
        setUsuario('');
        setPassword('');
        setEstado(true);

        setModoEdicion(false);
        setUsuarioEditando(null);
    };

    const abrirCrear = () => {
        limpiarFormulario();

        setMensaje('');
        setError('');

        setMostrarFormulario(true);
    };

    const abrirEditar = (usuarioSeleccionado) => {

        setNombre(usuarioSeleccionado.nombre);
        setApellido(usuarioSeleccionado.apellido);
        setUsuario(usuarioSeleccionado.usuario);
        setEstado(usuarioSeleccionado.estado);

        setPassword('');

        setUsuarioEditando(usuarioSeleccionado.id);
        setModoEdicion(true);

        setMensaje('');
        setError('');

        setMostrarFormulario(true);
    };

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
        limpiarFormulario();
    };

    const guardarUsuario = async (e) => {

        e.preventDefault();

        setMensaje('');
        setError('');

        if (modoEdicion) {

            const respuesta = await actualizarUsuario(
                usuarioEditando,
                nombre,
                apellido,
                usuario,
                estado
            );

            if (respuesta.ok) {

                setMensaje('Usuario actualizado correctamente');

                await cargarUsuarios();

                cerrarFormulario();

            } else {

                setError(
                    respuesta.datos.mensaje ||
                    'Error al actualizar el usuario'
                );
            }

        } else {

            const respuesta = await crearUsuario(
                nombre,
                apellido,
                usuario,
                password
            );

            if (respuesta.ok) {

                setMensaje('Usuario creado correctamente');

                await cargarUsuarios();

                cerrarFormulario();

            } else {

                setError(
                    respuesta.datos.mensaje ||
                    'Error al crear el usuario'
                );
            }
        }
    };

    const borrarUsuario = async (id) => {

        const confirmar = window.confirm(
            '¿Estás seguro de eliminar este usuario?'
        );

        if (!confirmar) {
            return;
        }

        const respuesta = await eliminarUsuario(id);

        if (respuesta.ok) {

            setMensaje('Usuario eliminado correctamente');

            await cargarUsuarios();

        } else {

            setError(
                respuesta.datos.mensaje ||
                'Error al eliminar el usuario'
            );
        }
    };

    const cerrarSesion = () => {

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        window.location.href = '/login';
    };

    const usuarioActual =
        JSON.parse(localStorage.getItem('usuario'));

    return (
        <div className="dashboard">

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <div className="sidebar-icon">
                        🍔
                    </div>

                    <div>
                        <h2>Sabor Express</h2>
                        <span>Panel administrativo</span>
                    </div>
                </div>

                <nav className="sidebar-menu">

                    <div className="menu-item active">
                        👥
                        <span>Usuarios</span>
                    </div>

                </nav>

                <button
                    className="logout-button"
                    onClick={cerrarSesion}
                >
                    🚪 Cerrar sesión
                </button>

            </aside>

            <main className="main-content">

                <header className="topbar">

                    <div>
                        <h1>Gestión de Usuarios</h1>

                        <p>
                            Administra los usuarios del sistema
                        </p>
                    </div>

                    <div className="user-profile">

                        <div className="user-avatar">
                            👤
                        </div>

                        <div>
                            <strong>
                                {usuarioActual?.nombre || 'Usuario'}
                            </strong>

                            <span>
                                Administrador
                            </span>
                        </div>

                    </div>

                </header>

                {mensaje && (
                    <div className="success-message">
                        ✓ {mensaje}
                    </div>
                )}

                {error && (
                    <div className="error-dashboard">
                        ⚠ {error}
                    </div>
                )}

                <section className="content-card">

                    <div className="card-header">

                        <div>
                            <h2>Usuarios registrados</h2>

                            <p>
                                Total de usuarios: {usuarios.length}
                            </p>
                        </div>

                        <button
                            className="new-user-button"
                            onClick={abrirCrear}
                        >
                            + Nuevo usuario
                        </button>

                    </div>

                    {cargando ? (

                        <div className="loading">
                            Cargando usuarios...
                        </div>

                    ) : usuarios.length === 0 ? (

                        <div className="empty-state">
                            <div>👥</div>

                            <h3>No hay usuarios</h3>

                            <p>
                                Crea el primer usuario del sistema.
                            </p>
                        </div>

                    ) : (

                        <div className="table-container">

                            <table>

                                <thead>

                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>Usuario</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {usuarios.map((item) => (

                                        <tr key={item.id}>

                                            <td>
                                                #{item.id}
                                            </td>

                                            <td>
                                                <strong>
                                                    {item.nombre}
                                                </strong>
                                            </td>

                                            <td>
                                                {item.apellido}
                                            </td>

                                            <td>
                                                @{item.usuario}
                                            </td>

                                            <td>

                                                <span
                                                    className={
                                                        item.estado
                                                            ? 'status active'
                                                            : 'status inactive'
                                                    }
                                                >
                                                    {item.estado
                                                        ? 'Activo'
                                                        : 'Inactivo'}
                                                </span>

                                            </td>

                                            <td>

                                                <div className="actions">

                                                    <button
                                                        className="edit-button"
                                                        onClick={() =>
                                                            abrirEditar(item)
                                                        }
                                                    >
                                                        ✏️
                                                    </button>

                                                    <button
                                                        className="delete-button"
                                                        onClick={() =>
                                                            borrarUsuario(item.id)
                                                        }
                                                    >
                                                        🗑️
                                                    </button>

                                                </div>

                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </main>

            {mostrarFormulario && (

                <div className="modal-overlay">

                    <div className="modal">

                        <div className="modal-header">

                            <div>
                                <h2>
                                    {modoEdicion
                                        ? 'Editar usuario'
                                        : 'Nuevo usuario'}
                                </h2>

                                <p>
                                    {modoEdicion
                                        ? 'Actualiza la información del usuario'
                                        : 'Registra un nuevo usuario'}
                                </p>
                            </div>

                            <button
                                className="close-button"
                                onClick={cerrarFormulario}
                            >
                                ×
                            </button>

                        </div>

                        <form onSubmit={guardarUsuario}>

                            <div className="form-row">

                                <div className="form-group">

                                    <label>
                                        Nombre
                                    </label>

                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(e.target.value)
                                        }
                                        placeholder="Ej. Jose"
                                        required
                                    />

                                </div>

                                <div className="form-group">

                                    <label>
                                        Apellido
                                    </label>

                                    <input
                                        type="text"
                                        value={apellido}
                                        onChange={(e) =>
                                            setApellido(e.target.value)
                                        }
                                        placeholder="Ej. Fraga"
                                        required
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label>
                                    Usuario
                                </label>

                                <input
                                    type="text"
                                    value={usuario}
                                    onChange={(e) =>
                                        setUsuario(e.target.value)
                                    }
                                    placeholder="Ej. jfraga"
                                    required
                                />

                            </div>

                            {!modoEdicion && (

                                <div className="form-group">

                                    <label>
                                        Contraseña
                                    </label>

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Ingresa una contraseña"
                                        required
                                    />

                                </div>

                            )}

                            {modoEdicion && (

                                <div className="form-group">

                                    <label>
                                        Estado
                                    </label>

                                    <select
                                        value={estado}
                                        onChange={(e) =>
                                            setEstado(
                                                e.target.value === 'true'
                                            )
                                        }
                                    >
                                        <option value="true">
                                            Activo
                                        </option>

                                        <option value="false">
                                            Inactivo
                                        </option>

                                    </select>

                                </div>

                            )}

                            <div className="modal-actions">

                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={cerrarFormulario}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="save-button"
                                >
                                    {modoEdicion
                                        ? 'Guardar cambios'
                                        : 'Crear usuario'}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Usuarios;