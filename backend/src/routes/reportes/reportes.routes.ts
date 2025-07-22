import express from 'express';
import { getEstudiantesPorCurso } from '../../controllers/reportes/reportes.controller';

const router = express.Router();

router.get('/estudiantes-por-curso', getEstudiantesPorCurso);

export default router;
