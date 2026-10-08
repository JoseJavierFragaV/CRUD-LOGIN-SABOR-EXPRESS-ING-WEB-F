import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {

    const [modoRegistro, setModoRegistro] = useState(false);

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const cambiarModo = () => {

        setModoRegistro(!modoRegistro);

        setNombre('');
        setApellido('');
        setUsuario('');
        setPassword('');

        setError('');
        setMensaje('');
    };

    const iniciarSesion = async (e) => {

        e.preventDefault();

        setError('');
        setMensaje('');
        setCargando(true);

        try {

            const respuesta = await login(
                usuario,
                password
            );

            const datos = respuesta.datos;

            if (!respuesta.ok) {

                setError(
                    datos.mensaje ||
                    'Error al iniciar sesión'
                );

                setCargando(false);

                return;
            }

            localStorage.setItem(
                'token',
                datos.token
            );

            localStorage.setItem(
                'usuario',
                JSON.stringify(datos.usuario)
            );

            navigate('/usuarios');

        } catch (error) {

            setError(
                'No se pudo conectar con el servidor'
            );

        }

        setCargando(false);
    };


    const registrarUsuario = async (e) => {

        e.preventDefault();

        setError('');
        setMensaje('');
        setCargando(true);

        try {

            const respuesta = await fetch(
                'http://localhost:3000/api/auth/register',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        nombre,
                        apellido,
                        usuario,
                        password
                    })
                }
            );

            const datos = await respuesta.json();

            if (!respuesta.ok) {

                setError(
                    datos.mensaje ||
                    'Error al crear la cuenta'
                );

                setCargando(false);

                return;
            }

            setMensaje(
                'Cuenta creada correctamente. Ahora puedes iniciar sesión.'
            );

            setNombre('');
            setApellido('');
            setUsuario('');
            setPassword('');

            setTimeout(() => {

                setModoRegistro(false);
                setMensaje('');
                setError('');

            }, 1500);

        } catch (error) {

            setError(
                'No se pudo conectar con el servidor'
            );

        }

        setCargando(false);
    };


    return (
        <div className="login-container">

            <div className="login-card">

                <div className="login-logo">
                    🍔
                </div>

                <h1>Sabor Express</h1>

                <p className="login-subtitle">

                    {modoRegistro
                        ? 'Crea tu cuenta'
                        : 'Bienvenido nuevamente'}

                </p>


                <form
                    onSubmit={
                        modoRegistro
                            ? registrarUsuario
                            : iniciarSesion
                    }
                >

                    {modoRegistro && (

                        <>

                            <div className="input-group">

                                <label>
                                    Nombre
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ingresa tu nombre"
                                    value={nombre}
                                    onChange={(e) =>
                                        setNombre(e.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    Apellido
                                </label>

                                <input
                                    type="text"
                                    placeholder="Ingresa tu apellido"
                                    value={apellido}
                                    onChange={(e) =>
                                        setApellido(e.target.value)
                                    }
                                    required
                                />

                            </div>

                        </>

                    )}


                    <div className="input-group">

                        <label>
                            Usuario
                        </label>

                        <input
                            type="text"
                            placeholder="Ingresa tu usuario"
                            value={usuario}
                            onChange={(e) =>
                                setUsuario(e.target.value)
                            }
                            required
                        />

                    </div>


                    <div className="input-group">

                        <label>
                            Contraseña
                        </label>

                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>


                    {error && (

                        <div className="error-message">
                            {error}
                        </div>

                    )}


                    {mensaje && (

                        <div className="success-login-message">
                            ✓ {mensaje}
                        </div>

                    )}


                    <button
                        type="submit"
                        className="login-button"
                        disabled={cargando}
                    >

                        {cargando
                            ? 'Procesando...'
                            : modoRegistro
                                ? 'Crear cuenta 🍔'
                                : 'Iniciar sesión 🍔'}

                    </button>

                </form>


                <div className="register-section">

                    <span>
                        {modoRegistro
                            ? '¿Ya tienes una cuenta?'
                            : '¿No tienes una cuenta?'}
                    </span>

                    <button
                        type="button"
                        className="register-link"
                        onClick={cambiarModo}
                    >

                        {modoRegistro
                            ? 'Inicia sesión'
                            : 'Crea una aquí'}

                    </button>

                </div>


                <p className="login-footer">
                    Sistema de gestión · Sabor Express
                </p>

            </div>

        </div>
    );
}

export default Login;