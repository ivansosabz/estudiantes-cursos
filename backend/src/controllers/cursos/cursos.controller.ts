import { Request, Response } from 'express';
import { openDb } from '../../database/db';

export const getCursos = async (_req: Request, res: Response) => {
    const db = await openDb();
    const cursos = await db.all('SELECT * FROM cursos');
    res.json(cursos);
};

export const getCursoById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const db = await openDb();
    const curso = await db.get('SELECT * FROM cursos WHERE id = ?', [id]);
    if (!curso) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json(curso);
};

export const createCurso = async (req: Request, res: Response) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const db = await openDb();
    const result = await db.run(
        'INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion || '']
    );
    res.status(201).json({ id: result.lastID, nombre, descripcion });
};

export const updateCurso = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });

    const db = await openDb();
    const result = await db.run(
        'UPDATE cursos SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion || '', id]
    );
    if (result.changes === 0) return res.status(404).json({ error: 'Curso no encontrado' });

    res.json({ id, nombre, descripcion });
};

export const deleteCurso = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const db = await openDb();
    const result = await db.run('DELETE FROM cursos WHERE id = ?', [id]);
    if (result.changes === 0) return res.status(404).json({ error: 'Curso no encontrado' });
    res.json({ message: 'Curso eliminado correctamente' });
};
