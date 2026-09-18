import { Router } from 'express';
import { criarEmprestimo, listarEmprestimos, devolverLivro } from '../controllers/emprestimos.controller.js';
import { validarCorpo } from '../middlewares/validacao.js';
import { criarEmprestimoSchema } from '../schemas/emprestimo.schema.js';

const router = Router();

router.get('/', listarEmprestimos);
router.post('/', validarCorpo(criarEmprestimoSchema), criarEmprestimo);
router.patch('/:id/devolver', devolverLivro);

export default router;