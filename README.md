# API REST - Sistema de Biblioteca Escolar

API REST desenvolvida em Node.js e Express para gerenciamento de acervo bibliotecário e controle de empréstimos, utilizando PostgreSQL como banco relacional, Prisma ORM para persistência e Zod para validação de esquemas.

---

## 🛠️ Tecnologias e Ferramentas

* **Runtime:** Node.js (ES Modules)
* **Framework Web:** Express
* **ORM:** Prisma v6
* **Banco de Dados:** PostgreSQL
* **Validação de Schemas:** Zod
* **Gerenciador de Execução:** Nodemon

---

## 🏛️ Modelagem de Dados

O banco de dados é composto por 4 modelos principais e 1 tabela de junção explícita para relacionamentos N:M:

* **Estudantes (`estudantes`):** Registros dos alunos, matrículas únicas e suporte a exclusão lógica (*soft delete*).
* **Livros (`livros`):** Catálogo de obras, controle de exemplares totais e disponíveis, e exclusão lógica.
* **Categorias (`categorias`):** Classificação temática dos livros.
* **LivroCategoria (`livro_categorias`):** Tabela de junção para a relação **N:M** entre Livros e Categorias.
* **Empréstimos (`emprestimos`):** Relação **1:N** conectando estudantes e livros, com registro de datas previstas e devoluções.

### Recursos de Arquitetura de Dados
* **Campos de Auditoria:** `created_at` e `updated_at` gerenciados automaticamente.
* **Soft Delete:** Controle de visibilidade via campo `deleted_at`.
* **Indexação:** Índices aplicados em campos de alta frequência de busca (`titulo`, `autor`, `nome`, `status`, `estudante_id`).
* **Integridade Referencial:** Políticas explícitas de `Cascade` na junção e `Restrict` em vínculos de empréstimo.

---

## ⚙️ Instalação e Execução

### 1. Pré-requisitos
* Node.js v20+ instalado
* Instância do PostgreSQL em execução na porta 5432

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:
