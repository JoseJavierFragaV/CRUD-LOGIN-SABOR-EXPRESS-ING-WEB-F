# Sabor Express

Sistema web de gestión de usuarios desarrollado como proyecto académico para la asignatura de Ingeniería Web.

Sabor Express es una aplicación web que implementa un sistema de autenticación y administración de usuarios utilizando React, Node.js, Express y PostgreSQL. El proyecto aplica una arquitectura MVC en el backend, autenticación mediante JWT y operaciones CRUD protegidas.

## Objetivo del proyecto

El objetivo principal es desarrollar una aplicación web funcional que permita demostrar la integración entre un frontend, un backend y una base de datos, aplicando conceptos fundamentales de desarrollo web.

El sistema permite:

* Registrar nuevos usuarios.
* Iniciar sesión mediante usuario y contraseña.
* Generar y validar tokens JWT.
* Proteger las rutas de la aplicación.
* Consultar usuarios registrados.
* Crear usuarios.
* Editar información de usuarios.
* Activar o desactivar usuarios.
* Eliminar usuarios.
* Almacenar la información en PostgreSQL.
* Aplicar una arquitectura MVC en el backend.

## Tecnologías utilizadas

### Frontend

* React
* JavaScript
* HTML
* CSS
* Vite
* React Router DOM
* Fetch API

### Backend

* Node.js
* Express
* JavaScript
* CORS
* Dotenv
* JSON Web Token (JWT)
* MD5

### Base de datos

* PostgreSQL
* PostgreSQL Driver (`pg`)

### Herramientas

* Visual Studio Code
* Git
* GitHub
* PowerShell

## Arquitectura del proyecto

El backend utiliza el patrón de arquitectura MVC (Model-View-Controller).

### Model

Se encarga de interactuar directamente con PostgreSQL y ejecutar las consultas necesarias para obtener, crear, actualizar y eliminar información.

### Controller

Contiene la lógica de negocio de la aplicación y procesa las solicitudes recibidas desde las rutas.

### Routes

Define los endpoints de la API y determina qué controlador debe ejecutarse para cada solicitud.

### Middleware

Se utiliza para verificar el token JWT antes de permitir el acceso a las rutas protegidas.

### Frontend

El frontend fue desarrollado con React y utiliza React Router DOM para controlar la navegación entre las diferentes vistas de la aplicación.

## Estructura del proyecto

```text
core-web/
│
├── backend/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── usuarioController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── usuarioModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── usuarioRoutes.js
│   │
│   ├── app.js
│   ├── package.json
│   └── .env (archivo local, no incluido en el repositorio)
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Usuarios.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

## Funcionalidades principales

### Registro de usuarios

El sistema permite crear una nueva cuenta ingresando:

* Nombre.
* Apellido.
* Usuario.
* Contraseña.

Antes de registrar el usuario, el backend verifica que el nombre de usuario no se encuentre registrado previamente.

La contraseña se procesa mediante MD5 antes de almacenarse en la base de datos, de acuerdo con los requerimientos establecidos para el proyecto.

### Inicio de sesión

El usuario puede iniciar sesión utilizando sus credenciales.

El proceso funciona de la siguiente manera:

1. El usuario ingresa su usuario y contraseña.
2. React envía las credenciales al backend.
3. Express recibe la solicitud.
4. El backend consulta el usuario en PostgreSQL.
5. Se procesa la contraseña ingresada mediante MD5.
6. Se compara con la contraseña almacenada.
7. Si las credenciales son correctas, se genera un token JWT.
8. El token se almacena en el navegador.
9. El usuario obtiene acceso al panel de administración.

### Autenticación mediante JWT

El sistema utiliza JSON Web Token (JWT) para controlar el acceso a las funcionalidades protegidas.

Las operaciones relacionadas con usuarios requieren enviar el token mediante el encabezado:

```text
Authorization: Bearer TOKEN
```

El middleware `authMiddleware.js` verifica que el token sea válido antes de permitir el acceso.

Si el token no existe, es inválido o ha expirado, el servidor devuelve un error de autorización.

### Protección de rutas

El frontend utiliza un componente denominado `ProtectedRoute`.

Este componente verifica si existe un token almacenado en `localStorage`.

Si no existe un token válido disponible, el usuario es redirigido hacia la pantalla de inicio de sesión.

De esta manera, el panel de usuarios no puede ser accedido directamente sin autenticación.

## CRUD de usuarios

El sistema implementa las operaciones básicas CRUD:

### Create

Permite crear nuevos usuarios desde el panel de administración.

### Read

Permite consultar y visualizar los usuarios almacenados en PostgreSQL.

### Update

Permite modificar:

* Nombre.
* Apellido.
* Usuario.
* Estado del usuario.

### Delete

Permite eliminar usuarios registrados en la base de datos.

## Estado de usuarios

Cada usuario cuenta con un campo `estado` de tipo booleano.

Este campo permite determinar si el usuario se encuentra:

* Activo.
* Inactivo.

Los usuarios inactivos no pueden iniciar sesión en el sistema.

## Base de datos

El proyecto utiliza PostgreSQL como sistema gestor de base de datos.

La base de datos utilizada se denomina:

```text
core_web
```

La tabla principal utilizada por el sistema es:

```text
usuarios
```

Su estructura es:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(32) NOT NULL,
    estado BOOLEAN DEFAULT TRUE
);
```

El archivo `database/schema.sql` contiene el script necesario para crear la estructura de la tabla y agregar un usuario de prueba.

## API REST

El backend proporciona diferentes endpoints para manejar la autenticación y los usuarios.

### Autenticación

| Método | Endpoint             | Descripción                |
| ------ | -------------------- | -------------------------- |
| POST   | `/api/auth/login`    | Iniciar sesión             |
| POST   | `/api/auth/register` | Registrar un nuevo usuario |

### Usuarios

| Método | Endpoint            | Descripción                |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/usuarios`     | Obtener todos los usuarios |
| GET    | `/api/usuarios/:id` | Obtener un usuario por ID  |
| POST   | `/api/usuarios`     | Crear un usuario           |
| PUT    | `/api/usuarios/:id` | Actualizar un usuario      |
| DELETE | `/api/usuarios/:id` | Eliminar un usuario        |

Las rutas de usuarios se encuentran protegidas mediante JWT.

## Configuración del proyecto

### Requisitos

Para ejecutar el proyecto se necesita tener instalado:

* Node.js
* PostgreSQL
* Git
* Visual Studio Code

### 1. Clonar el repositorio

```bash
git clone https://github.com/JoseJavierFragaV/CRUD-LOGIN-SABOR-EXPRESS-ING-WEB-F.git
```

Ingresar a la carpeta:

```bash
cd CRUD-LOGIN-SABOR-EXPRESS-ING-WEB-F
```

### 2. Configurar la base de datos

Crear una base de datos llamada:

```text
core_web
```

Después ejecutar el contenido del archivo:

```text
database/schema.sql
```

Esto creará la tabla `usuarios` y agregará el usuario de prueba.

### 3. Configurar las variables de entorno

Dentro de la carpeta `backend` se debe crear un archivo llamado:

```text
.env
```

El archivo debe contener la configuración correspondiente al entorno local:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=core_web
DB_PASSWORD=TU_CONTRASEÑA_DE_POSTGRES
DB_PORT=5432

JWT_SECRET=core_web_secreto_2026
PORT=3000
```

El archivo `.env` no se encuentra incluido en el repositorio por motivos de seguridad.

## Ejecución del backend

Ingresar a la carpeta:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el servidor:

```bash
npm run dev
```

El backend se ejecutará en:

```text
http://localhost:3000
```

También se puede ejecutar mediante:

```bash
npm start
```

## Ejecución del frontend

Abrir una segunda terminal y dirigirse a:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

El frontend estará disponible en la dirección indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Usuario de prueba

Para probar el inicio de sesión se puede utilizar:

```text
Usuario: admin
Contraseña: 123456
```

Este usuario se encuentra definido en el archivo:

```text
database/schema.sql
```

## Flujo general de la aplicación

El funcionamiento general del sistema puede resumirse de la siguiente manera:

```text
                    USUARIO
                       │
                       ▼
              ┌─────────────────┐
              │ React / Vite    │
              │    Frontend     │
              └────────┬────────┘
                       │
                       │ HTTP / JSON
                       ▼
              ┌─────────────────┐
              │ Node.js         │
              │ Express         │
              └────────┬────────┘
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
        ┌───────────┐     ┌─────────────┐
        │  Routes   │     │ Middleware  │
        └─────┬─────┘     │    JWT      │
              │           └─────────────┘
              ▼
        ┌─────────────┐
        │ Controllers │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │    Models   │
        └──────┬──────┘
               │
               ▼
        ┌─────────────┐
        │ PostgreSQL  │
        │  core_web   │
        └─────────────┘
```

## Flujo de autenticación

El proceso de autenticación funciona de la siguiente manera:

```text
Usuario
   │
   ▼
Login en React
   │
   ▼
POST /api/auth/login
   │
   ▼
Express
   │
   ▼
Consulta PostgreSQL
   │
   ▼
Validación de contraseña
   │
   ▼
Generación de JWT
   │
   ▼
Token almacenado en localStorage
   │
   ▼
Acceso a rutas protegidas
```

## Conceptos aplicados

Durante el desarrollo del proyecto se aplicaron diferentes conceptos de desarrollo web:

* Desarrollo frontend con React.
* Componentización.
* Navegación mediante React Router.
* Consumo de APIs REST.
* Desarrollo backend con Node.js y Express.
* Arquitectura MVC.
* Middleware.
* Autenticación mediante JWT.
* Manejo de variables de entorno.
* Operaciones CRUD.
* Conexión entre Node.js y PostgreSQL.
* Consultas SQL parametrizadas.
* Control de versiones con Git.
* Gestión del código mediante GitHub.

## Control de versiones

El proyecto utiliza Git para el control de versiones y GitHub como plataforma para almacenar y administrar el código fuente.

Repositorio:

https://github.com/JoseJavierFragaV/CRUD-LOGIN-SABOR-EXPRESS-ING-WEB-F

## Video de demostración

El video de demostración presenta el funcionamiento principal del proyecto, incluyendo el inicio de sesión, registro de usuarios, autenticación mediante JWT, protección de rutas y operaciones CRUD.
(https://youtu.be/Rwdk4Pi2-DQ)

## Autor

**Jose Fraga**

CRUD/LOGIN académico desarrollado para la asignatura de Ingeniería Web.

## Licencia

Este proyecto fue desarrollado con fines académicos.
