import express from 'express';
import livrosRoutes from './routes/livros.routes.js';
import emprestimosRoutes from './routes/emprestimos.routes.js';

const app = express();
app.use(express.json());

app.use('/livros', livrosRoutes);
app.use('/emprestimos', emprestimosRoutes);

// Middleware Global de Tratamento de Erros
app.use((erro, req, res, next) => {
  console.error(erro);
  return res.status(500).json({
    erro: "ERRO_INTERNO",
    mensagem: "Ocorreu um erro inesperado no servidor."
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API REST da biblioteca rodando na porta ${PORT}`);
});