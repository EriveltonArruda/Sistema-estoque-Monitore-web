import { NextRequest, NextResponse } from 'next/server'; // Importa os tipos NextRequest e NextResponse do Next.js para lidar com requisições e respostas HTTP.
import { getProdutoPorId, atualizarProduto, excluirProduto } from '@/lib/db'; // Importa funções de interação com o banco de dados do arquivo '@/lib/db'.
import { ProdutoInput } from '@/types/produto'; // Importa o tipo/interface ProdutoInput, que define a estrutura esperada para os dados de entrada de um produto.

// ---

// GET /api/produtos/[id] - Obter um produto específico
// Esta função lida com requisições GET para buscar um produto pelo seu ID.
export async function GET(
  request: NextRequest, // O objeto de requisição HTTP.
  { params }: { params: { id: string } } // Parâmetros dinâmicos da URL, onde 'id' é o ID do produto.
) {
  try {
    // Tenta buscar o produto no banco de dados usando o ID fornecido na URL.
    const produto = await getProdutoPorId(params.id);

    // Se nenhum produto for encontrado com o ID fornecido.
    if (!produto) {
      // Retorna uma resposta JSON com uma mensagem de erro e status 404 (Não Encontrado).
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Se o produto for encontrado, retorna uma resposta JSON com os dados do produto.
    // O status padrão é 200 (OK).
    return NextResponse.json(produto);
  } catch (error) {
    // Em caso de qualquer erro durante a busca do produto.
    console.error('Erro ao buscar produto:', error); // Loga o erro no console para depuração.
    // Retorna uma resposta JSON com uma mensagem de erro genérica e status 500 (Erro Interno do Servidor).
    return NextResponse.json(
      { error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

// ---

// PUT /api/produtos/[id] - Atualizar um produto existente
// Esta função lida com requisições PUT para atualizar um produto existente pelo seu ID.
export async function PUT(
  request: NextRequest, // O objeto de requisição HTTP.
  { params }: { params: { id: string } } // Parâmetros dinâmicos da URL, contendo o ID do produto a ser atualizado.
) {
  try {
    // Lê o corpo da requisição como JSON, que deve conter os dados atualizados do produto.
    const body = await request.json();

    // Validação básica dos dados de entrada.
    // Verifica se 'nome', 'preco' e 'quantidade' estão presentes no corpo da requisição.
    if (!body.nome || body.preco === undefined || body.quantidade === undefined) {
      // Se algum dado essencial estiver faltando, retorna um erro 400 (Requisição Inválida).
      return NextResponse.json(
        { error: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' },
        { status: 400 }
      );
    }

    // Cria um objeto 'produtoInput' com os dados do corpo da requisição,
    // garantindo a tipagem correta e valores padrão para campos opcionais.
    const produtoInput: ProdutoInput = {
      nome: body.nome,
      descricao: body.descricao || '', // Se 'descricao' não for fornecida, usa uma string vazia.
      preco: Number(body.preco),       // Converte o preço para número.
      quantidade: Number(body.quantidade), // Converte a quantidade para número.
      sku: body.sku,
      categoria: body.categoria,
      fornecedor: body.fornecedor
    };

    // Tenta atualizar o produto no banco de dados usando o ID e os novos dados.
    const produtoAtualizado = await atualizarProduto(params.id, produtoInput);

    // Se a função de atualização retornar nulo/undefined (indicando que o produto não foi encontrado para atualizar).
    if (!produtoAtualizado) {
      // Retorna uma resposta JSON com erro e status 404 (Não Encontrado).
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Se a atualização for bem-sucedida, retorna o produto atualizado em formato JSON.
    return NextResponse.json(produtoAtualizado);
  } catch (error) {
    // Em caso de qualquer erro durante a atualização do produto.
    console.error('Erro ao atualizar produto:', error); // Loga o erro.
    // Retorna uma resposta JSON com erro genérico e status 500 (Erro Interno do Servidor).
    return NextResponse.json(
      { error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

// ---

// DELETE /api/produtos/[id] - Excluir um produto
// Esta função lida com requisições DELETE para excluir um produto pelo seu ID.
export async function DELETE(
  request: NextRequest, // O objeto de requisição HTTP.
  { params }: { params: { id: string } } // Parâmetros dinâmicos da URL, contendo o ID do produto a ser excluído.
) {
  try {
    // Tenta excluir o produto do banco de dados usando o ID.
    // A função 'excluirProduto' deve retornar true se a exclusão foi bem-sucedida, ou false caso contrário.
    const sucesso = await excluirProduto(params.id);

    // Se 'sucesso' for falso (produto não encontrado para exclusão).
    if (!sucesso) {
      // Retorna uma resposta JSON com erro e status 404 (Não Encontrado).
      return NextResponse.json(
        { error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    // Se a exclusão for bem-sucedida, retorna uma resposta JSON indicando sucesso.
    // O status padrão é 200 (OK).
    return NextResponse.json({ success: true });
  } catch (error) {
    // Em caso de qualquer erro durante a exclusão do produto.
    console.error('Erro ao excluir produto:', error); // Loga o erro.
    // Retorna uma resposta JSON com erro genérico e status 500 (Erro Interno do Servidor).
    return NextResponse.json(
      { error: 'Erro ao excluir produto' },
      { status: 500 }
    );
  }
}