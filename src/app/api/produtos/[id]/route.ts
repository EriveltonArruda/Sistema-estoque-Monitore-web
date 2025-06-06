import { NextRequest, NextResponse } from 'next/server';
import { getProdutoPorId, atualizarProduto, excluirProduto } from '@/lib/db';
import { ProdutoInput } from '@/types/produto';

// GET /api/produtos/[id] - Obter um produto específico
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const produto = await getProdutoPorId(params.id);
    
    if (!produto) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(produto);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

// PUT /api/produtos/[id] - Atualizar um produto existente
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    
    const produtoAtualizado = await atualizarProduto(params.id, produtoInput);
    
    if (!produtoAtualizado) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(produtoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

// DELETE /api/produtos/[id] - Excluir um produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const sucesso = await excluirProduto(params.id);
    
    if (!sucesso) {
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    );
  }
}

