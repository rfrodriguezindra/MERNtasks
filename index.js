// se importa express
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();

// conectar a la base de datos
conectarDB();

// Habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}));

// puerto del servidor
const PORT = process.env.PORT || 4000;

// Importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/proyectos',require('./routes/proyecto'));
app.use('/api/tareas',require('./routes/tareas'));

// arrancar el servidor
app.listen(PORT, (
    console.log(`El servidor está funcionando en el puerto ${PORT}`)
))

