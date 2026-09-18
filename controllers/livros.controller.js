import { livrosRepository } from '../data/livros.repository.js';

export const listarLivros = async (req, res, next) => {
  try {
    const { pagina, limite, busca } = req.query;
    const resultado = await livrosRepository.buscarTodos({ pagina, limite, busca });
    return res.status(200).json(resultado);
  } catch (erro) {
    next(erro);
  }
};

export const obterLivroPorId = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const livro = await livrosRepository.buscarPorId(id);

    if (!livro) {
      return res.status(404).json({
        erro: { codigo: 'NAO_ENCONTRADO', mensagem: `Livro com id ${id} não encontrado.` }
      });
    }

    return res.status(200).json(livro);
  } catch (erro) {
    next(erro);
  }
};

export const criarLivro = async (req, res, next) => {
  try {
    const novoLivro = await livrosRepository.criar(req.body);
    return res.status(201).json(novoLivro);
  } catch (erro) {
    next(erro);
  }
};

export const atualizarLivro = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const livroAtualizado = await livrosRepository.atualizar(id, req.body);
    return res.status(200).json(livroAtualizado);
  } catch (erro) {
    next(erro);
  }
};

export const apagarLivro = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await livrosRepository.remover(id);
    return res.status(204).send();
  } catch (erro) {
    next(erro);
  }
};

export const livrosController = {
  listarLivros,
  obterLivroPorId,
  criarLivro,
  atualizarLivro,
  apagarLivro
};

export default livrosController;