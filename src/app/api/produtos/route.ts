import { NextRequest, NextResponse } from 'next/server'; // Importa os objetos essenciais do Next.js para lidar com requisições (NextRequest) e respostas (NextResponse) HTTP.
import { getProdutos, criarProduto } from '@/lib/db'; // Importa funções para interagir com o banco de dados: 'getProdutos' para listar e 'criarProduto' para adicionar.
import { ProdutoInput } from '@/types/produto'; // Importa o tipo/interface 'ProdutoInput', que define a estrutura de dados esperada para um novo produto.

// ---

// GET /api/produtos - Listar todos os produtos
// Esta função é acionada quando uma requisição HTTP GET é feita para o endpoint /api/produtos.
// Seu objetivo é retornar uma lista de todos os produtos cadastrados.
export async function GET() {
  try {
    // Chama a função 'getProdutos()' (que deve estar em '@/lib/db') para buscar todos os produtos do banco de dados.
    const produtos = await getProdutos();
    // Retorna a lista de produtos em formato JSON. Por padrão, o status HTTP é 200 (OK).
    return NextResponse.json(produtos);
  } catch (error) {
    // Caso ocorra algum erro durante a busca dos produtos.
    console.error('Erro ao buscar produtos:', error); // Exibe o erro no console do servidor para depuração.
    // Retorna uma resposta de erro JSON com uma mensagem genérica e o status 500 (Erro Interno do Servidor).
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

// ---

// POST /api/produtos - Criar um novo produto
// Esta função é acionada quando uma requisição HTTP POST é feita para o endpoint /api/produtos.
// Seu objetivo é criar um novo produto no banco de dados com base nos dados enviados.
export async function POST(request: NextRequest) { // O objeto 'request' contém os dados da requisição, incluindo o corpo.
  try {
    // Lê o corpo da requisição e o parseia como um objeto JSON.
    // É aqui que os dados do novo produto (nome, preço, etc.) serão recebidos.
    const body = await request.json();
    
    // Validação básica dos dados de entrada.
    // Verifica se os campos essenciais ('nome', 'preco', 'quantidade') estão presentes no corpo da requisição.
    if (!body.nome || body.preco === undefined || body.quantidade === undefined) {
      // Se algum dado obrigatório estiver faltando, retorna uma resposta de erro JSON
      // com uma mensagem descritiva e o status 400 (Bad Request - Requisição Inválida).
      return NextResponse.json(
        { error: 'Dados incompletos. Nome, preço e quantidade são obrigatórios.' },
        { status: 400 }
      );
    }
    
    // Cria um objeto 'produtoInput' que adere ao tipo 'ProdutoInput'.
    // Isso garante que os dados estejam no formato correto antes de serem passados para a função de criação.
    const produtoInput: ProdutoInput = {
      nome: body.nome,
      descricao: body.descricao || '', // Se 'descricao' não for fornecida, assume uma string vazia como padrão.
      preco: Number(body.preco),       // Converte o 'preco' para um tipo numérico.
      quantidade: Number(body.quantidade), // Converte a 'quantidade' para um tipo numérico.
      sku: body.sku,
      categoria: body.categoria,
      fornecedor: body.fornecedor
    };
    
    // Chama a função 'criarProduto()' (que deve estar em '@/lib/db') para adicionar o novo produto ao banco de dados.
    const novoProduto = await criarProduto(produtoInput);
    
    // Retorna o objeto do novo produto criado em formato JSON.
    // O status HTTP 201 (Created) é usado para indicar que um novo recurso foi criado com sucesso.
    return NextResponse.json(novoProduto, { status: 201 });
  } catch (error) {
    // Caso ocorra qualquer erro durante o processo de criação do produto.
    console.error('Erro ao criar produto:', error); // Exibe o erro no console do servidor para depuração.
    // Retorna uma resposta de erro JSON com uma mensagem genérica e o status 500 (Erro Interno do Servidor).
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}