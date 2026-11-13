# Gestor de tareas — Integración Front-Back

Aplicación full stack: un frontend en **React (Vite)** que consume una **API REST en Express + MongoDB**. El frontend lista las tareas guardadas (GET) y permite crear nuevas desde un formulario (POST), con indicador de carga y mensajes de error si la API no responde. La API es la del TP3, con CORS configurado.

## Enlaces de producción

- **Frontend (Vercel):** https://node-tp4.vercel.app
- **Backend (Render):** https://node-tp4-api.onrender.com

> El plan gratuito de Render apaga el servidor cuando no se usa, así que el primer pedido puede tardar unos 50 segundos. Mientras tanto se ve el indicador de carga.

## Estructura

```
backend/                     # API en Express + Mongoose
  index.js                   # servidor, CORS y rutas
  src/config/db.js
  src/models/Tarea.js
  src/controllers/tareas.controller.js
  src/routes/tareas.routes.js
  .env.example
frontend/                    # React + Vite
  src/services/api.js        # consumo de la API con fetch
  src/components/TareaForm.jsx
  src/components/TareaLista.jsx
  src/App.jsx                # GET, estado de carga y errores
  .env.development           # URL de la API en desarrollo
  .env.production            # URL de la API en producción
capturas/
```

## Instalación y ejecución local

Requisitos: Node.js 18 o superior y MongoDB (local o Atlas).

```bash
git clone https://github.com/candelacorradin/node-tp4.git
cd node-tp4
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Variables de `backend/.env`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/tp4
FRONTEND_URL=http://localhost:5173
```

`FRONTEND_URL` define qué orígenes acepta CORS. Se pueden poner varios separados por coma.

### Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Se abre en http://localhost:5173.

Vite toma la URL de la API de `VITE_API_URL`:

| Archivo            | Se usa en                     | Valor                                  |
| ------------------ | ----------------------------- | -------------------------------------- |
| `.env.development` | `npm run dev`                 | `http://localhost:3000`                |
| `.env.production`  | `npm run build`               | `https://node-tp4-api.onrender.com`    |

## Rutas de la API

| Método | Ruta          | Descripción              |
| ------ | ------------- | ------------------------ |
| POST   | `/tareas`     | Crea una tarea           |
| GET    | `/tareas`     | Lista todas las tareas   |
| GET    | `/tareas/:id` | Devuelve una tarea       |
| PUT    | `/tareas/:id` | Actualiza una tarea      |
| DELETE | `/tareas/:id` | Elimina una tarea        |

El frontend usa `GET /tareas` y `POST /tareas`. Si los datos no son válidos, la API responde `400` y el formulario muestra el detalle.

## Despliegue

### Base de datos (MongoDB Atlas)

Crear un cluster gratuito, un usuario de base de datos y permitir el acceso desde `0.0.0.0/0` en *Network Access*. Copiar la cadena de conexión.

### Backend (Render)

1. *New → Web Service* y conectar este repositorio.
2. **Root Directory:** `backend`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Variables de entorno: `MONGODB_URI` (la de Atlas) y `FRONTEND_URL` (la URL de Vercel).

### Frontend (Vercel)

1. *Add New → Project* e importar este repositorio.
2. **Root Directory:** `frontend` (Vercel detecta Vite solo).
3. Variable de entorno: `VITE_API_URL` con la URL de Render.
4. Vercel corre `npm run build` y publica la carpeta `dist`.

## Capturas

| Prueba | Captura |
| ------ | ------- |
| Estado de carga | ![Cargando](capturas/01-cargando.png) |
| Datos obtenidos de la API (GET) | ![GET](capturas/02-get-tareas.png) |
| Formulario enviando datos (POST) | ![POST](capturas/03-post-tarea.png) |
| Validación de la API en el formulario | ![Validación](capturas/04-validacion.png) |
| Error cuando la API no responde | ![Error](capturas/05-error-api.png) |

## Autora

- **Estudiante:** Candela Corradin
- **Curso:** Diplomatura Full Stack — Centro de e-Learning UTN BA
- **Unidad:** Módulo 1 - Unidad 4 · Integración Front-Back
