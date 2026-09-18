-- AlterTable
ALTER TABLE "estudantes" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "livros" ADD COLUMN     "deleted_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "emprestimos_status_idx" ON "emprestimos"("status");

-- CreateIndex
CREATE INDEX "emprestimos_estudante_id_idx" ON "emprestimos"("estudante_id");

-- CreateIndex
CREATE INDEX "estudantes_nome_idx" ON "estudantes"("nome");

-- CreateIndex
CREATE INDEX "livros_titulo_idx" ON "livros"("titulo");

-- CreateIndex
CREATE INDEX "livros_autor_idx" ON "livros"("autor");
