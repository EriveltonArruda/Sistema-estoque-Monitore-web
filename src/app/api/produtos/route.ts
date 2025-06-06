import { NextRequest, NextResponse } from 'next/server';
import { getProdutos, criarProduto } from '@/lib/db';
import { ProdutoInput } from '@/types/produto';

// GET /api/produtos - Listar todos os produtos
export async function GET() {
  try {
    const produtos = await getProdutos();
    return NextResponse.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

// POST /api/produtos - Criar um novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validação básica
    if (!body.nome || body.preco === undefined || body.quantidade === undefined) {
      return NextResponse.json(
        { error: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' },
        { status: 400 }
      );
    }
    
    const produtoInput: ProdutoInput = {
      nome: body.nome,
      descricao: body.descricao || '',
      preco: Number(body.preco),
      quantidade: Number(body.quantidade),
      sku: body.sku,
      categoria: body.categoria,
      fornecedor: body.fornecedor
    };
    
    const novoProduto = await criarProduto(produtoInput);
    
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}

