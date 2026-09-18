import { Router } from 'express';
import * as livrosController from '../controllers/livros.controller.js';

const router = Router();

// Mapeamento das rotas utilizando os métodos do controller
router.get('/', livrosController.listarLivros || livrosController.listar);
router.get('/:id', livrosController.obterLivroPorId || livrosController.buscarPorId);
router.post('/', livrosController.criarLivro || livrosController.criar);
router.put('/:id', livrosController.atualizarLivro || livrosController.atualizar);
router.delete('/:id', livrosController.apagarLivro || livrosController.remover);

export default router;