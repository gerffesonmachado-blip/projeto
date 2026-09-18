/*
  Warnings:

  - You are about to drop the column `data_retirada` on the `emprestimos` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `estudantes` table. All the data in the column will be lost.
  - You are about to drop the column `atualizado_em` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `criado_em` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `exemplares` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `genero_id` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the column `isbn` on the `livros` table. All the data in the column will be lost.
  - You are about to drop the `autores` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `generos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `livros_autores` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated_at` to the `emprestimos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turma` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `estudantes` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `estudantes` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `autor` to the `livros` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `livros` table without a default value. This is not possible if the table is not empty.
  - Made the column `ano` on table `livros` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "livros" DROP CONSTRAINT "livros_genero_id_fkey";

-- DropForeignKey
ALTER TABLE "livros_autores" DROP CONSTRAINT "livros_autores_autor_id_fkey";

-- DropForeignKey
ALTER TABLE "livros_autores" DROP CONSTRAINT "livros_autores_livro_id_fkey";

-- DropIndex
DROP INDEX "emprestimos_estudante_id_data_devolucao_idx";

-- DropIndex
DROP INDEX "livros_isbn_key";

-- DropIndex
DROP INDEX "livros_titulo_idx";

-- AlterTable
ALTER TABLE "emprestimos" DROP COLUMN "data_retirada",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "data_emprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "estudantes" DROP COLUMN "ativo",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "turma" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "nome" SET DATA TYPE TEXT,
ALTER COLUMN "matricula" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "livros" DROP COLUMN "atualizado_em",
DROP COLUMN "criado_em",
DROP COLUMN "exemplares",
DROP COLUMN "genero_id",
DROP COLUMN "isbn",
ADD COLUMN     "autor" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exemplares_disponiveis" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "exemplares_total" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "titulo" SET DATA TYPE TEXT,
ALTER COLUMN "ano" SET NOT NULL;

-- DropTable
DROP TABLE "autores";

-- DropTable
DROP TABLE "generos";

-- DropTable
DROP TABLE "livros_autores";

-- CreateTable
CREATE TABLE "categorias" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livro_categorias" (
    "livro_id" INTEGER NOT NULL,
    "categoria_id" INTEGER NOT NULL,

    CONSTRAINT "livro_categorias_pkey" PRIMARY KEY ("livro_id","categoria_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categorias_nome_key" ON "categorias"("nome");

-- AddForeignKey
ALTER TABLE "livro_categorias" ADD CONSTRAINT "livro_categorias_livro_id_fkey" FOREIGN KEY ("livro_id") REFERENCES "livros"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "livro_categorias" ADD CONSTRAINT "livro_categorias_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
