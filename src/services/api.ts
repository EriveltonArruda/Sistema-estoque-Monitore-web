import { Produto, ProdutoInput } from '@/types/produto';
// Importa as interfaces TypeScript 'Produto' e 'ProdutoInput' do arquivo de tipos.
// - 'Produto': Define a estrutura completa de um objeto produto retornado pela API (geralmente inclui um 'id').
// - 'ProdutoInput': Define a estrutura dos dados de um produto que serão enviados para a API
//   (ex: para criação ou atualização), que pode ser ligeiramente diferente de 'Produto'
//   (por exemplo, sem o 'id', que é gerado pelo backend).
// O '@/' é um alias de importação do Next.js que aponta para o diretório 'src' do seu projeto.

// URL base da API.
// Define a parte inicial da URL para todas as requisições, tornando o código mais fácil de manter.
// Em um ambiente de produção, esta URL poderia ser uma variável de ambiente (ex: process.env.NEXT_PUBLIC_API_URL).
const API_URL = '/api';

// --- Serviço para listar todos os produtos ---
// 'async': Indica que esta função é assíncrona e pode usar 'await'.
// 'Promise<Produto[]>': Define que a função retornará uma Promise que se resolverá para um array de objetos 'Produto'.
export async function listarProdutos(): Promise<Produto[]> {
  try {
    // Tenta fazer uma requisição HTTP GET para a URL '/api/produtos'.
    // 'fetch': A API nativa do navegador para fazer requisições de rede.
    const response = await fetch(`${API_URL}/produtos`);
    
    // Verifica se a resposta da requisição foi bem-sucedida (status 2xx).
    // '!response.ok': Retorna true se o status HTTP for um erro (ex: 404, 500).
    if (!response.ok) {
      // Se a resposta não for OK, lança um erro com o status HTTP.
      throw new Error(`Erro ao buscar produtos: ${response.status}`);
    }
    
    // Converte a resposta JSON em um objeto JavaScript.
    // 'await response.json()': Espera que a resposta seja parseada como JSON.
    return await response.json();
  } catch (error) {
    // Captura qualquer erro que ocorra durante a requisição ou o processamento.
    console.error('Erro ao listar produtos:', error); // Loga o erro no console.
    throw error; // Relança o erro para que a função chamadora possa lidar com ele.
  }
}

// --- Serviço para obter um produto específico por ID ---
// 'Promise<Produto>': A função retornará uma Promise que se resolverá para um único objeto 'Produto'.
export async function obterProduto(id: string): Promise<Produto> {
  try {
    // Faz uma requisição GET para '/api/produtos/{id}', onde '{id}' é o ID do produto.
    const response = await fetch(`${API_URL}/produtos/${id}`);
    
    // Verifica se a resposta foi bem-sucedida.
    if (!response.ok) {
      throw new Error(`Erro ao buscar produto: ${response.status}`);
    }
    
    // Retorna o produto parseado como JSON.
    return await response.json();
  } catch (error) {
    console.error(`Erro ao obter produto ${id}:`, error); // Loga o erro com o ID do produto.
    throw error; // Relança o erro.
  }
}

// --- Serviço para criar um novo produto ---
// 'produto: ProdutoInput': Recebe um objeto 'ProdutoInput' como argumento.
// 'Promise<Produto>': Retorna o produto criado, que terá um ID.
export async function criarProduto(produto: ProdutoInput): Promise<Produto> {
  try {
    // Faz uma requisição HTTP POST para '/api/produtos'.
    const response = await fetch(`${API_URL}/produtos`, {
      method: 'POST', // Define o método HTTP como POST.
      headers: {
        'Content-Type': 'application/json', // Informa ao servidor que o corpo da requisição é JSON.
      },
      body: JSON.stringify(produto), // Converte o objeto 'produto' em uma string JSON para enviar no corpo da requisição.
    });
    
    // Verifica se a resposta foi bem-sucedida.
    if (!response.ok) {
      throw new Error(`Erro ao criar produto: ${response.status}`);
    }
    
    // Retorna o produto recém-criado parseado como JSON (geralmente com o ID atribuído pelo backend).
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
}

// --- Serviço para atualizar um produto existente ---
// 'id: string': O ID do produto a ser atualizado.
// 'produto: ProdutoInput': Os novos dados do produto.
// 'Promise<Produto>': Retorna o produto atualizado.
export async function atualizarProduto(id: string, produto: ProdutoInput): Promise<Produto> {
  try {
    // Faz uma requisição HTTP PUT para '/api/produtos/{id}'.
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT', // Define o método HTTP como PUT.
      headers: {
        'Content-Type': 'application/json', // Informa ao servidor que o corpo da requisição é JSON.
      },
      body: JSON.stringify(produto), // Envia os dados atualizados do produto como JSON.
    });
    
    // Verifica se a resposta foi bem-sucedida.
    if (!response.ok) {
      throw new Error(`Erro ao atualizar produto: ${response.status}`);
    }
    
    // Retorna o produto atualizado parseado como JSON.
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    throw error;
  }
}

// --- Serviço para excluir um produto ---
// 'Promise<boolean>': Retorna uma Promise que se resolverá para 'true' se a exclusão for bem-sucedida.
export async function excluirProduto(id: string): Promise<boolean> {
  try {
    // Faz uma requisição HTTP DELETE para '/api/produtos/{id}'.
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE', // Define o método HTTP como DELETE.
    });
    
    // Verifica se a resposta foi bem-sucedida (status 2xx).
    // Para DELETE, um status 204 (No Content) ou 200 (OK) é comum.
    if (!response.ok) {
      throw new Error(`Erro ao excluir produto: ${response.status}`);
    }
    
    // Se a resposta for OK, retorna true para indicar sucesso.
    return true;
  } catch (error) {
    console.error(`Erro ao excluir produto ${id}:`, error);
    throw error;
  }
}