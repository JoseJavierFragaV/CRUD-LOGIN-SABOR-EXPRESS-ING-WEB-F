require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pool = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'API del Core Web funcionando correctamente'
    });
});

app.get('/api/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');

        res.json({
            mensaje: 'Conexión con PostgreSQL exitosa',
            fecha: result.rows[0].now
        });

    } catch (error) {
        console.error('Error al conectar con PostgreSQL:', error);

        res.status(500).json({
            mensaje: 'Error al conectar con PostgreSQL',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});