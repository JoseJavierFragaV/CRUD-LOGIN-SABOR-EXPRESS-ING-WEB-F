
-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);

-- Usuario de prueba
-- Usuario: admin
-- Contraseña: 123456

INSERT INTO usuarios
(nombre, apellido, usuario, password)
VALUES
(
    'Jose',
    'Fraga',
    'admin',
    'e10adc3949ba59abbe56e057f20f883e'
);