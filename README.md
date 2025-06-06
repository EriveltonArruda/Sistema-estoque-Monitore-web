# Sistema de Controle de Estoque

Um sistema completo de controle de estoque com operações CRUD (Create, Read, Update, Delete) desenvolvido com React e Next.js.

## Visão Geral

Este sistema permite gerenciar o estoque de produtos de uma empresa, oferecendo funcionalidades para adicionar, visualizar, editar e excluir produtos. O sistema inclui um dashboard com informações resumidas sobre o estoque.

## Tecnologias Utilizadas

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: API Routes do Next.js
- **Banco de Dados**: Arquivo JSON (simulação de banco de dados)
- **Estilização**: Tailwind CSS

## Estrutura do Projeto

```
sistema-estoque/
├── src/
│   ├── app/                    # Páginas da aplicação (Next.js App Router)
│   │   ├── api/                # Rotas da API
│   │   │   └── produtos/       # Endpoints para produtos
│   │   ├── produtos/           # Páginas relacionadas a produtos
│   │   └── page.tsx            # Página inicial (dashboard)
│   ├── components/             # Componentes reutilizáveis
│   │   ├── forms/              # Formulários
│   │   ├── layout/             # Componentes de layout
│   │   └── ui/                 # Componentes de UI
│   ├── data/                   # Dados da aplicação
│   │   └── produtos.json       # Banco de dados simulado
│   ├── lib/                    # Funções utilitárias
│   │   └── db.ts               # Funções de acesso ao banco de dados
│   ├── services/               # Serviços da aplicação
│   │   └── api.ts              # Serviço de comunicação com a API
│   └── types/                  # Definições de tipos TypeScript
│       └── produto.ts          # Tipos relacionados a produtos
└── ...
```

## Funcionalidades

### Dashboard
- Exibição de estatísticas gerais do estoque
- Acesso rápido às principais funcionalidades

### Gerenciamento de Produtos
- Listagem de todos os produtos
- Visualização detalhada de um produto específico
- Adição de novos produtos
- Edição de produtos existentes
- Exclusão de produtos

## Modelo de Dados

### Produto
- **id**: Identificador único do produto
- **nome**: Nome do produto
- **descricao**: Descrição detalhada do produto
- **preco**: Preço unitário do produto
- **quantidade**: Quantidade disponível em estoque
- **sku**: Stock Keeping Unit - Código de identificação do produto (opcional)
- **categoria**: Categoria do produto (opcional)
- **fornecedor**: Fornecedor do produto (opcional)
- **dataEntrada**: Data de entrada do produto no estoque
- **dataAtualizacao**: Última data de atualização do produto

## API Endpoints

### Produtos
- `GET /api/produtos`: Lista todos os produtos
- `GET /api/produtos/[id]`: Obtém um produto específico
- `POST /api/produtos`: Cria um novo produto
- `PUT /api/produtos/[id]`: Atualiza um produto existente
- `DELETE /api/produtos/[id]`: Exclui um produto

## Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd sistema-estoque
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Execute o projeto em modo de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Acesse a aplicação em `http://localhost:3000`

## Próximos Passos e Melhorias Futuras

- Implementação de autenticação e autorização
- Integração com um banco de dados real (MongoDB, PostgreSQL)
- Adição de funcionalidades de busca e filtragem
- Implementação de relatórios e exportação de dados
- Adição de histórico de movimentações de estoque
- Implementação de alertas para estoque baixo

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.

## Autor

Desenvolvido por [Seu Nome]

