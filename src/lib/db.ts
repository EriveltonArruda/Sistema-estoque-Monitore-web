import fs from 'fs';
import path from 'path';
import { Produto, ProdutoInput } from '@/types/produto';

const dbPath = path.join(process.cwd(), 'src/data/produtos.json');

// Função para ler todos os produtos do arquivo JSON
export async function getProdutos(): Promise<Produto[]> {
  try {
    const data = await fs.promises.readFile(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler produtos:', error);
    return [];
  }
}

// Função para obter um produto específico pelo ID
export async function getProdutoPorId(id: string): Promise<Produto | null> {
  try {
    const produtos = await getProdutos();
    return produtos.find(produto => produto.id === id) || null;
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    return null;
  }
}

// Função para criar um novo produto
export async function criarProduto(produtoInput: ProdutoInput): Promise<Produto> {
  try {
    const produtos = await getProdutos();
    
    // Gerar um novo ID (em um banco de dados real, isso seria feito automaticamente)
    const novoId = (Math.max(...produtos.map(p => parseInt(p.id)), 0) + 1).toString();
    
    const agora = new Date().toISOString();
    
    const novoProduto: Produto = {
      id: novoId,
      ...produtoInput,
      dataEntrada: agora,
      dataAtualizacao: agora
    };
    
    const novosProdutos = [...produtos, novoProduto];
    
    await fs.promises.writeFile(dbPath, JSON.stringify(novosProdutos, null, 2));
    
    return novoProduto;
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    throw new Error('Falha ao criar produto');
  }
}

// Função para atualizar um produto existente
export async function atualizarProduto(id: string, produtoInput: ProdutoInput): Promise<Produto | null> {
  try {
    const produtos = await getProdutos();
    const index = produtos.findIndex(produto => produto.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const produtoAtualizado: Produto = {
      ...produtos[index],
      ...produtoInput,
      id, // Garantir que o ID não seja alterado
      dataAtualizacao: new Date().toISOString()
    };
    
    produtos[index] = produtoAtualizado;
    
    await fs.promises.writeFile(dbPath, JSON.stringify(produtos, null, 2));
    
    return produtoAtualizado;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new Error('Falha ao atualizar produto');
  }
}

// Função para excluir um produto
export async function excluirProduto(id: string): Promise<boolean> {
  try {
    const produtos = await getProdutos();
    const novosProdutos = produtos.filter(produto => produto.id !== id);
    
    if (novosProdutos.length === produtos.length) {
      return false; // Nenhum produto foi removido
    }
    
    await fs.promises.writeFile(dbPath, JSON.stringify(novosProdutos, null, 2));
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw new Error('Falha ao excluir produto');
  }
}

