# Manual do Usuário - Sistema de Controle de Estoque

Este manual fornece instruções detalhadas sobre como utilizar o Sistema de Controle de Estoque.

## Índice

1. [Introdução](#introdução)
2. [Acessando o Sistema](#acessando-o-sistema)
3. [Dashboard](#dashboard)
4. [Gerenciamento de Produtos](#gerenciamento-de-produtos)
   - [Listagem de Produtos](#listagem-de-produtos)
   - [Visualização de Detalhes](#visualização-de-detalhes)
   - [Adição de Produtos](#adição-de-produtos)
   - [Edição de Produtos](#edição-de-produtos)
   - [Exclusão de Produtos](#exclusão-de-produtos)
5. [Solução de Problemas](#solução-de-problemas)

## Introdução

O Sistema de Controle de Estoque é uma aplicação web desenvolvida para gerenciar o estoque de produtos de uma empresa. Com esta ferramenta, você pode adicionar, visualizar, editar e excluir produtos, além de acompanhar estatísticas gerais do estoque através de um dashboard.

## Acessando o Sistema

Para acessar o sistema, abra um navegador web e digite o endereço fornecido pelo administrador do sistema. Após carregar a página, você será direcionado para o dashboard principal.

## Dashboard

O dashboard é a página inicial do sistema e apresenta uma visão geral do estoque:

![Dashboard](https://exemplo.com/imagens/dashboard.png)

No dashboard, você encontrará:

1. **Total de Produtos**: Número total de produtos cadastrados no sistema.
2. **Valor Total em Estoque**: Soma do valor de todos os produtos multiplicados por suas respectivas quantidades.
3. **Produtos com Estoque Baixo**: Número de produtos com quantidade abaixo do limite mínimo (menos de 5 unidades).
4. **Ações Rápidas**: Botões para acessar rapidamente as principais funcionalidades do sistema.

## Gerenciamento de Produtos

### Listagem de Produtos

Para visualizar todos os produtos cadastrados:

1. Clique em "Produtos" no menu superior ou no botão "Ver Todos os Produtos" no dashboard.
2. A página exibirá uma tabela com todos os produtos, incluindo nome, preço, quantidade e categoria.
3. Você pode realizar ações como visualizar detalhes, editar ou excluir cada produto através dos botões na coluna "Ações".

### Visualização de Detalhes

Para ver informações detalhadas sobre um produto específico:

1. Na página de listagem de produtos, clique no botão "Detalhes" ao lado do produto desejado.
2. A página de detalhes exibirá todas as informações do produto, incluindo descrição, SKU, fornecedor, datas de entrada e atualização.

### Adição de Produtos

Para adicionar um novo produto ao estoque:

1. Clique no botão "Adicionar Produto" na página de listagem de produtos ou no botão "Adicionar Novo Produto" no dashboard.
2. Preencha o formulário com as informações do produto:
   - **Nome do Produto**: Nome ou título do produto (obrigatório).
   - **Descrição**: Descrição detalhada do produto (opcional).
   - **Preço (R$)**: Valor unitário do produto (obrigatório).
   - **Quantidade em Estoque**: Número de unidades disponíveis (obrigatório).
   - **SKU (Código)**: Código de identificação do produto (opcional).
   - **Categoria**: Categoria à qual o produto pertence (opcional).
   - **Fornecedor**: Nome do fornecedor do produto (opcional).
3. Clique no botão "Adicionar Produto" para salvar.
4. Se todas as informações estiverem corretas, você será redirecionado para a página de listagem de produtos e verá uma mensagem de confirmação.

### Edição de Produtos

Para editar as informações de um produto existente:

1. Na página de listagem de produtos, clique no botão "Editar" ao lado do produto desejado.
2. O formulário será preenchido com as informações atuais do produto.
3. Faça as alterações necessárias nos campos.
4. Clique no botão "Atualizar Produto" para salvar as alterações.
5. Se todas as informações estiverem corretas, você será redirecionado para a página de detalhes do produto e verá uma mensagem de confirmação.

### Exclusão de Produtos

Para excluir um produto do estoque:

1. Na página de listagem de produtos ou na página de detalhes do produto, clique no botão "Excluir".
2. Uma caixa de diálogo de confirmação será exibida.
3. Clique em "OK" para confirmar a exclusão ou "Cancelar" para desistir.
4. Se confirmar, o produto será removido do sistema e você verá uma mensagem de confirmação.

## Solução de Problemas

### Problemas Comuns e Soluções

1. **Página não carrega**:
   - Verifique sua conexão com a internet.
   - Atualize a página (F5).
   - Limpe o cache do navegador.

2. **Erro ao adicionar ou editar produto**:
   - Verifique se todos os campos obrigatórios estão preenchidos.
   - Certifique-se de que os valores numéricos (preço e quantidade) são válidos.

3. **Dados não são atualizados**:
   - Atualize a página para carregar os dados mais recentes.
   - Verifique se há algum erro no console do navegador (F12).

### Contato para Suporte

Se você encontrar problemas que não consegue resolver, entre em contato com o suporte técnico:

- Email: suporte@exemplo.com
- Telefone: (XX) XXXX-XXXX

