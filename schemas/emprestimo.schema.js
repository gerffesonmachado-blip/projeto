import { z } from 'zod';

export const criarEmprestimoSchema = z.object({
  estudanteId: z.coerce.number().int().positive({ message: "O ID do estudante deve ser um número inteiro positivo." }),
  livroId: z.coerce.number().int().positive({ message: "O ID do livro deve ser um número inteiro positivo." }),
  diasEmprestimo: z.coerce.number().int().min(1).max(30).optional().default(14)
});