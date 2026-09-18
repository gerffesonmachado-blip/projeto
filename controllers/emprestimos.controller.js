import { emprestimosRepository } from '../data/emprestimos.repository.js';

export const criarEmprestimo = async (req, res, next) => {
  try {
    const resultado = await emprestimosRepository.criarEmprestimo(req.body);
    return res.status(201).json(resultado);
  } catch (erro) {
    if (erro.message === 'LIVRO_NAO_ENCONTRADO') {
      return res.status(404).json({ erro: 'Livro não encontrado ou desativado.' });
    }
    if (erro.message === 'ESTUDANTE_NAO_ENCONTRADO') {
      return res.status(404).json({ erro: 'Estudante não encontrado.' });
    }
    if (erro.message === 'SEM_ESTOQUE_DISPONIVEL') {
      return res.status(409).json({ erro: 'Não há exemplares disponíveis no momento.' });
    }
    next(erro);
  }
};

export const listarEmprestimos = async (req, res, next) => {
  try {
    const { pagina, limite, status } = req.query;
    const resultado = await emprestimosRepository.listar({ pagina, limite, status });
    return res.status(200).json(resultado);
  } catch (erro) {
    next(erro);
  }
};

export const devolverLivro = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const resultado = await emprestimosRepository.devolverLivro(id);
    return res.status(200).json(resultado);
  } catch (erro) {
    if (erro.message === 'EMPRESTIMO_NAO_ENCONTRADO') {
      return res.status(404).json({ erro: 'Empréstimo informado não existe.' });
    }
    if (erro.message === 'EMPRESTIMO_JA_DEVOLVIDO') {
      return res.status(400).json({ erro: 'Este empréstimo já foi encerrado e devolvido anteriormente.' });
    }
    next(erro);
  }
};