import { Request, Response } from 'express';
import { openDb } from '../../database/db';

export const getEstudiantes = async (_req: Request, res: Response) => {
    const db = await openDb();
    // Traemos estudiantes junto con el nombre del curso
    const estudiantes = await db.all(`
    SELECT estudiantes.id, estudiantes.nombre, estudiantes.email, cursos.nombre as curso_nombre, estudiantes.curso_id
    FROM estudiantes
    LEFT JOIN cursos ON estudiantes.curso_id = cursos.id
  `);
    res.json(estudiantes);
};

export const getEstudianteById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const db = await openDb();

    const estudiante = await db.get(`
    SELECT estudiantes.id, estudiantes.nombre, estudiantes.email, cursos.nombre as curso_nombre, estudiantes.curso_id
    FROM estudiantes
    LEFT JOIN cursos ON estudiantes.curso_id = cursos.id
    WHERE estudiantes.id = ?
  `, [id]);

    if (!estudiante) return res.status(404).json({ error: 'Estudiante no encontrado' });
    res.json(estudiante);
};

export const createEstudiante = async (req: Request, res: Response) => {
    const { nombre, email, curso_id } = req.body;

    if (!nombre || !email || !curso_id) {
        return res.status(400).json({ error: 'Nombre, email y curso_id son obligatorios' });
    }

    const db = await openDb();

    try {
        const result = await db.run(
            'INSERT INTO estudiantes (nombre, email, curso_id) VALUES (?, ?, ?)',
            [nombre, email, curso_id]
        );
        res.status(201).json({ id: result.lastID, nombre, email, curso_id });
    } catch (error) {
        res.status(400).json({ error: 'Error al crear estudiante (quizás email duplicado)' });
    }
};

export const updateEstudiante = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nombre, email, curso_id } = req.body;

    if (!nombre || !email || !curso_id) {
        return res.status(400).json({ error: 'Nombre, email y curso_id son obligatorios' });
    }

    const db = await openDb();

    const result = await db.run(
        'UPDATE estudiantes SET nombre = ?, email = ?, curso_id = ? WHERE id = ?',
        [nombre, email, curso_id, id]
    );

    if (result.changes === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });

    res.json({ id, nombre, email, curso_id });
};

export const deleteEstudiante = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const db = await openDb();

    const result = await db.run('DELETE FROM estudiantes WHERE id = ?', [id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Estudiante no encontrado' });

    res.json({ message: 'Estudiante eliminado correctamente' });
};
