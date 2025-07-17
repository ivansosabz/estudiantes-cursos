import express from 'express';
import {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
} from '../../controllers/cursos/cursos.controller';

const router = express.Router();

router.get('/', getCursos);
router.get('/:id', getCursoById);
router.post('/', createCurso);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

export default router;
