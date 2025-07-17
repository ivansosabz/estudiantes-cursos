// src/database/init.ts
import { openDb } from './db';

async function init() {
    const db = await openDb();

    // Tabla de usuarios para login
    await db.exec(`
    CREATE TABLE IF NOT EXISTS usuarios 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );
`);

    // Tabla de cursos
    await db.exec(`
    CREATE TABLE IF NOT EXISTS cursos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL
    );
`);

    // Tabla de estudiantes con relación a cursos
    await db.exec(`
    CREATE TABLE IF NOT EXISTS estudiantes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        curso_id INTEGER,
        FOREIGN KEY (curso_id) REFERENCES cursos(id)
    );
`);

    console.log('Tablas creadas');
}

init();
