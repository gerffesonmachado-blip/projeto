import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.livroCategoria.deleteMany();
  await prisma.emprestimo.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.estudante.deleteMany();
  await prisma.categoria.deleteMany();

  // 10 Categorias
  const cats = await Promise.all(
    ["Ficção", "História", "Tecnologia", "Filosofia", "Romance", "Ciência", "Artes", "Poesia", "Biografia", "Direito"].map(
      nome => prisma.categoria.create({ data: { nome, descricao: `Obras de ${nome}` } })
    )
  );

  // 10 Estudantes
  const estudantes = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.estudante.create({
        data: {
          nome: `Estudante ${i + 1}`,
          matricula: `MAT2026${100 + i}`,
          email: `aluno${i + 1}@escola.com`,
          turma: `${(i % 3) + 1}º Ano`
        }
      })
    )
  );

  // 10 Livros
  const livros = await Promise.all(
    Array.from({ length: 10 }).map((_, i) =>
      prisma.livro.create({
        data: {
          titulo: `Livro Acadêmico Volume ${i + 1}`,
          autor: `Autor Referência ${i + 1}`,
          ano: 2010 + i,
          exemplaresTotal: 5,
          exemplaresDisponiveis: 5
        }
      })
    )
  );

  // Relações N:M
  for (let i = 0; i < 10; i++) {
    await prisma.livroCategoria.create({
      data: { livroId: livros[i].id, categoriaId: cats[i % cats.length].id }
    });
  }

  // 10 Empréstimos
  for (let i = 0; i < 10; i++) {
    await prisma.emprestimo.create({
      data: {
        estudanteId: estudantes[i].id,
        livroId: livros[i].id,
        dataPrevista: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: i % 2 === 0 ? "ativo" : "devolvido"
      }
    });
  }
}

main()
  .catch(e => { process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });