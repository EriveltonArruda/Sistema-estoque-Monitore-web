import fs from 'fs';
// Importa o módulo 'fs' (File System) nativo do Node.js.
// Ele permite interagir com o sistema de arquivos do computador, como ler e escrever arquivos.
// Usamos `fs.promises` para trabalhar com funções assíncronas baseadas em Promises.

import path from 'path';
// Importa o módulo 'path' nativo do Node.js.
// Ele fornece utilitários para trabalhar com caminhos de arquivos e diretórios,
// garantindo que os caminhos sejam construídos corretamente em diferentes sistemas operacionais.

import { Produto, ProdutoInput } from '@/types/produto';
// Importa as interfaces TypeScript `Produto` e `ProdutoInput`.
// `Produto`: Representa a estrutura completa de um produto, incluindo seu ID e possíveis campos de data.
// `ProdutoInput`: Representa a estrutura dos dados de um produto que são enviados para a API (e consequentemente para este "banco de dados"),
// geralmente sem o ID, que é gerado aqui.
// O alias `@/` aponta para o diretório `src` do seu projeto.

// Define o caminho completo para o arquivo JSON que atuará como seu "banco de dados".
// `process.cwd()`: Retorna o diretório de trabalho atual do processo Node.js.
// `path.join()`: Concatena segmentos de caminho de forma segura, usando o separador de caminho correto para o SO.
// `src/data/produtos.json`: O caminho relativo onde o arquivo de dados estará.
const dbPath = path.join(process.cwd(), 'src/data/produtos.json');

// --- Função para ler todos os produtos do arquivo JSON ---
// `async`: Indica que a função é assíncrona e pode usar `await`.
// `Promise<Produto[]>`: Define que a função retorna uma Promise que, quando resolvida, entregará um array de objetos `Produto`.
export async function getProdutos(): Promise<Produto[]> {
  try {
    // Tenta ler o conteúdo do arquivo `produtos.json` de forma assíncrona.
    // `fs.promises.readFile(dbPath, 'utf8')`: Lê o arquivo no caminho `dbPath` como texto UTF-8.
    const data = await fs.promises.readFile(dbPath, 'utf8');
    // Converte o conteúdo do arquivo (que é uma string JSON) em um objeto JavaScript.
    return JSON.parse(data);
  } catch (error) {
    // Se ocorrer um erro (ex: arquivo não existe, JSON inválido), ele é capturado aqui.
    console.error('Erro ao ler produtos:', error); // Loga o erro no console.
    return []; // Retorna um array vazio para evitar que a aplicação quebre, indicando que não há produtos.
  }
}

// --- Função para obter um produto específico pelo ID ---
// `Promise<Produto | null>`: Retorna uma Promise que se resolve para um objeto `Produto` ou `null` se não for encontrado.
export async function getProdutoPorId(id: string): Promise<Produto | null> {
  try {
    // Primeiro, obtém a lista completa de produtos.
    const produtos = await getProdutos();
    // Usa o método `find` para procurar um produto cujo `id` corresponda ao `id` fornecido.
    // `|| null`: Se nenhum produto for encontrado, `find` retorna `undefined`, então convertemos para `null`.
    return produtos.find(produto => produto.id === id) || null;
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return null; // Retorna `null` em caso de erro na leitura ou busca.
  }
}

// --- Função para criar um novo produto ---
// `produtoInput: ProdutoInput`: Recebe os dados do novo produto, que vêm do formulário (sem o ID ainda).
// `Promise<Produto>`: Retorna uma Promise que se resolve para o objeto `Produto` recém-criado (agora com um ID).
export async function criarProduto(produtoInput: ProdutoInput): Promise<Produto> {
  try {
    // Obtém a lista atual de produtos.
    const produtos = await getProdutos();
    
    // --- Lógica para Gerar um Novo ID (simulada) ---
    // Em um banco de dados real, o ID seria gerado automaticamente pelo DB.
    // `map(p => parseInt(p.id))`: Converte todos os IDs existentes para números inteiros.
    // `Math.max(..., 0)`: Encontra o maior ID numérico. O `0` garante que, se não houver produtos, o maior ID seja 0.
    // `+ 1`: Incrementa o maior ID para obter o próximo ID disponível.
    // `.toString()`: Converte o novo ID numérico de volta para string, pois o ID do produto é string.
    const novoId = (Math.max(...produtos.map(p => parseInt(p.id)), 0) + 1).toString();
    
    // Gera uma string de data e hora atual no formato ISO 8601.
    const agora = new Date().toISOString();
    
    // Cria o novo objeto `Produto` completo, combinando o input, o novo ID e as datas.
    const novoProduto: Produto = {
      id: novoId,             // ID gerado.
      ...produtoInput,      // Espalha todas as propriedades do `produtoInput` (nome, descrição, etc.).
      dataEntrada: agora,   // Adiciona a data de criação.
      dataAtualizacao: agora // Adiciona a data de última atualização (inicialmente igual à de entrada).
    };
    
    // Cria um novo array de produtos, adicionando o `novoProduto` ao final da lista existente.
    const novosProdutos = [...produtos, novoProduto];
    
    // Escreve o array atualizado de produtos de volta no arquivo JSON.
    // `JSON.stringify(novosProdutos, null, 2)`: Converte o array de volta para uma string JSON.
    // `null, 2`: Formata o JSON com indentação de 2 espaços para facilitar a leitura.
    await fs.promises.writeFile(dbPath, JSON.stringify(novosProdutos, null, 2));
    
    return novoProduto; // Retorna o produto recém-criado.
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    // Lança um novo erro com uma mensagem mais genérica para o chamador.
    throw new Error('Falha ao criar produto');
  }
}

// --- Função para atualizar um produto existente ---
// `id: string`: O ID do produto a ser atualizado.
// `produtoInput: ProdutoInput`: Os novos dados a serem aplicados ao produto.
// `Promise<Produto | null>`: Retorna o produto atualizado ou `null` se o produto não for encontrado.
export async function atualizarProduto(id: string, produtoInput: ProdutoInput): Promise<Produto | null> {
  try {
    const produtos = await getProdutos(); // Obtém a lista atual de produtos.
    // Encontra o índice do produto no array usando seu ID.
    const index = produtos.findIndex(produto => produto.id === id);
    
    // Se o produto não for encontrado (index é -1), retorna null.
    if (index === -1) {
      return null;
    }
    
    // Cria um novo objeto `Produto` para o produto atualizado.
    // `...produtos[index]`: Espalha as propriedades existentes do produto original (incluindo `dataEntrada`).
    // `...produtoInput`: Espalha as novas propriedades do `produtoInput`, sobrescrevendo as existentes.
    // `id`: Garante que o ID original seja mantido (embora já esteja em `produtos[index]`).
    // `dataAtualizacao: new Date().toISOString()`: Atualiza a data de última modificação.
    const produtoAtualizado: Produto = {
      ...produtos[index],
      ...produtoInput,
      id, // Garantir que o ID não seja alterado
      dataAtualizacao: new Date().toISOString()
    };
    
    // Substitui o produto antigo no array pelo produto atualizado.
    produtos[index] = produtoAtualizado;
    
    // Escreve o array de produtos atualizado de volta no arquivo JSON.
    await fs.promises.writeFile(dbPath, JSON.stringify(produtos, null, 2));
    
    return produtoAtualizado; // Retorna o produto atualizado.
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new Error('Falha ao atualizar produto');
  }
}

// --- Função para excluir um produto ---
// `Promise<boolean>`: Retorna uma Promise que se resolve para `true` se o produto foi excluído, `false` caso contrário.
export async function excluirProduto(id: string): Promise<boolean> {
  try {
    const produtos = await getProdutos(); // Obtém a lista atual de produtos.
    // Cria um novo array de produtos, filtrando e removendo o produto com o ID especificado.
    const novosProdutos = produtos.filter(produto => produto.id !== id);
    
    // Verifica se a quantidade de produtos diminuiu. Se for igual, significa que o produto não foi encontrado e removido.
    if (novosProdutos.length === produtos.length) {
      return false; // Nenhum produto foi removido (ID não encontrado).
    }
    
    // Escreve o array filtrado (sem o produto excluído) de volta no arquivo JSON.
    await fs.promises.writeFile(dbPath, JSON.stringify(novosProdutos, null, 2));
    
    return true; // Retorna true para indicar que a exclusão foi bem-sucedida.
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw new Error('Falha ao excluir produto');
  }
}