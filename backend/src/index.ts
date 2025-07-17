// src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cursosRoutes from './routes/cursos/cursos.routes';
import estudiantesRoutes from './routes/estudiantes/estudiantes.routes';




dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 👉 Importar rutas después de declarar app
import authRoutes from './routes/auth/auth.routes';
app.use('/api/auth', authRoutes);

// Rutas de prueba
app.get('/', (_req, res) => {
    res.send('API funcionando');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Rutas de cursos
app.use('/api/cursos', cursosRoutes);
// Rutas de estudiantes
app.use('/api/estudiantes', estudiantesRoutes);
