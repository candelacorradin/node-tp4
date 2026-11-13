require('dotenv').config({ quiet: true });
const express = require('express');
const cors = require('cors');
const conectarDB = require('./src/config/db');
const tareasRoutes = require('./src/routes/tareas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Solo se aceptan pedidos de los orígenes definidos en FRONTEND_URL
const origenesPermitidos = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origen) => origen.trim());

app.use(cors({ origin: origenesPermitidos }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'API de tareas con Express y MongoDB' });
});

app.use('/tareas', tareasRoutes);

conectarDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
