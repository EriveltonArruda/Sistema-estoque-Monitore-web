import { NextRequest, NextResponse } from 'next/server';
import { getProdutos } from '@/lib/db';
import { Produto } from '@/types/produto';

// Função para gerar o HTML do relatório
function gerarHTMLRelatorio(produtos: Produto[], resumo: {
  totalProdutos: number;
  valorTotalEstoque: number;
  produtosEstoqueBaixo: number;
}): string {
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  const horaAtual = new Date().toLocaleTimeString('pt-BR');

  // Estilo CSS para o relatório
  const estilos = `
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
        color: #333;
      }
      .cabecalho {
        text-align: center;
        margin-bottom: 30px;
      }
      .titulo {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .data {
        font-size: 14px;
        color: #666;
      }
      .resumo {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
      }
      .card-resumo {
        width: 30%;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .card-titulo {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #555;
      }
      .card-valor {
        font-size: 22px;
        font-weight: bold;
        color: #2563eb;
      }
      .card-subtexto {
        font-size: 12px;
        color: #666;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
        font-weight: bold;
      }
      tr:nth-child(even) {
        background-color: #f9f9f9;
      }
      .secao-titulo {
        font-size: 18px;
        font-weight: bold;
        margin: 30px 0 15px 0;
        border-bottom: 1px solid #ddd;
        padding-bottom: 5px;
      }
      .rodape {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #666;
        border-top: 1px solid #ddd;
        padding-top: 10px;
      }
    </style>
  `;

  // Cabeçalho do relatório
  const cabecalho = `
    <div class="cabecalho">
      <div class="titulo">Relatório de Estoque</div>
      <div class="data">Gerado em ${dataAtual} às ${horaAtual}</div>
    </div>
  `;

  // Seção de resumo
  const secaoResumo = `
    <div class="secao-titulo">Resumo do Estoque</div>
    <div class="resumo">
      <div class="card-resumo">
        <div class="card-titulo">Total de Produtos</div>
        <div class="card-valor">${resumo.totalProdutos}</div>
        <div class="card-subtexto">produtos cadastrados</div>
      </div>
      <div class="card-resumo">
        <div class="card-titulo">Valor Total em Estoque</div>
        <div class="card-valor">R$ ${resumo.valorTotalEstoque.toFixed(2)}</div>
        <div class="card-subtexto">em produtos</div>
      </div>
      <div class="card-resumo">
        <div class="card-titulo">Produtos com Estoque Baixo</div>
        <div class="card-valor">${resumo.produtosEstoqueBaixo}</div>
        <div class="card-subtexto">produtos com menos de 5 unidades</div>
      </div>
    </div>
  `;

  // Tabela de produtos
  let tabelaProdutos = `
    <div class="secao-titulo">Lista de Produtos</div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Categoria</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Adicionar cada produto à tabela
  produtos.forEach(produto => {
    tabelaProdutos += `
      <tr>
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>R$ ${produto.preco.toFixed(2)}</td>
        <td>${produto.quantidade}</td>
        <td>${produto.categoria || '-'}</td>
        <td>${produto.sku || '-'}</td>
      </tr>
    `;
  });

  tabelaProdutos += `
      </tbody>
    </table>
  `;

  // Rodapé do relatório
  const rodape = `
    <div class="rodape">
      Sistema de Controle de Estoque - Todos os direitos reservados
    </div>
  `;

  // Montar o HTML completo
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Relatório de Estoque</title>
        ${estilos}
      </head>
      <body>
        ${cabecalho}
        ${secaoResumo}
        ${tabelaProdutos}
        ${rodape}
      </body>
    </html>
  `;
}

// Endpoint para gerar o relatório em PDF
export async function GET(request: NextRequest) {
  try {
    // Buscar todos os produtos
    const produtos = await getProdutos();
    
    // Calcular as métricas de resumo
    const totalProdutos = produtos.length;
    const valorTotalEstoque = produtos.reduce((total, produto) => {
      return total + (produto.preco * produto.quantidade);
    }, 0);
    const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5).length;
    
    // Gerar o HTML do relatório
    const htmlRelatorio = gerarHTMLRelatorio(produtos, {
      totalProdutos,
      valorTotalEstoque,
      produtosEstoqueBaixo
    });
    
    // Retornar o HTML como resposta para download
    return new NextResponse(htmlRelatorio, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': 'attachment; filename=relatorio-estoque.html'
      }
    });
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar relatório' },
      { status: 500 }
    );
  }
}

