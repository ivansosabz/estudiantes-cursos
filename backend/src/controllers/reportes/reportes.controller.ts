import { Request, Response } from 'express';
import { openDb } from '../../database/db';

export const getEstudiantesPorCurso = async (_req: Request, res: Response) => {
    const db = await openDb();

    try {
        const datos = await db.all(`
            SELECT cursos.nombre AS curso, COUNT(estudiantes.id) AS cantidad
            FROM cursos
            LEFT JOIN estudiantes ON estudiantes.curso_id = cursos.id
            GROUP BY cursos.id
        `);

        res.json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el reporte' });
    }
};
