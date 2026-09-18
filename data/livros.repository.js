import { prisma } from '../database.js';

export const livrosRepository = {
  buscarTodos: async ({ pagina = 1, limite = 10, busca } = {}) => {
    const take = Number(limite) || 10;
    const pag = Number(pagina) || 1;
    const skip = (pag - 1) * take;

    const where = {
      deletedAt: null,
      ...(busca && {
        OR: [
          { titulo: { contains: busca, mode: 'insensitive' } },
          { autor: { contains: busca, mode: 'insensitive' } }
        ]
      })
    };

    const [total, dados] = await Promise.all([
      prisma.livro.count({ where }),
      prisma.livro.findMany({
        where,
        take,
        skip,
        orderBy: { id: 'asc' },
        include: {
          categorias: {
            include: { categoria: { select: { nome: true } } }
          }
        }
      })
    ]);

    return {
      metadados: {
        totalRegistros: total,
        totalPaginas: Math.ceil(total / take),
        paginaAtual: pag,
        limitePorPagina: take
      },
      dados: dados.map(l => ({
        ...l,
        categorias: l.categorias.map(c => c.categoria.nome)
      }))
    };
  },

  buscarPorId: (id) => prisma.livro.findFirst({
    where: { id: Number(id), deletedAt: null },
    include: {
      categorias: {
        include: { categoria: { select: { nome: true } } }
      }
    }
  }),

  criar: (dados) => prisma.livro.create({ data: dados }),

  atualizar: (id, dados) => prisma.livro.update({
    where: { id: Number(id) },
    data: dados
  }),

  remover: (id) => prisma.livro.update({
    where: { id: Number(id) },
    data: { deletedAt: new Date() }
  })
};