import { Produto, ProdutoInput } from '@/types/produto';

// URL base da API
const API_URL = '/api';

// Serviço para listar todos os produtos
export async function listarProdutos(): Promise<Produto[]> {
  try {
    const response = await fetch(`${API_URL}/produtos`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar produtos: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    throw error;
  }
}

// Serviço para obter um produto específico
export async function obterProduto(id: string): Promise<Produto> {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`);
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar produto: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao obter produto ${id}:`, error);
    throw error;
  }
}

// Serviço para criar um novo produto
export async function criarProduto(produto: ProdutoInput): Promise<Produto> {
  try {
    const response = await fetch(`${API_URL}/produtos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao criar produto: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw error;
  }
}

// Serviço para atualizar um produto existente
export async function atualizarProduto(id: string, produto: ProdutoInput): Promise<Produto> {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produto),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao atualizar produto: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    throw error;
  }
}

// Serviço para excluir um produto
export async function excluirProduto(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/produtos/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao excluir produto: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Erro ao excluir produto ${id}:`, error);
    throw error;
  }
}

