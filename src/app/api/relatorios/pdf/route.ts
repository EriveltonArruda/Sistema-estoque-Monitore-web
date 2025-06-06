import { NextRequest, NextResponse } from 'next/server'; // Importa os objetos NextRequest e NextResponse do Next.js para lidar com requisições e respostas HTTP.
import { getProdutos } from '@/lib/db'; // Importa a função 'getProdutos' do seu arquivo de interação com o banco de dados. Esta função é responsável por buscar todos os produtos.
import { Produto } from '@/types/produto'; // Importa o tipo/interface 'Produto', que define a estrutura esperada de um objeto de produto.

// ---

// Função para gerar o HTML do relatório
// Esta função recebe uma lista de produtos e um objeto de resumo com métricas de estoque
// e retorna uma string contendo o HTML completo de um relatório de estoque.
function gerarHTMLRelatorio(produtos: Produto[], resumo: {
  totalProdutos: number;
  valorTotalEstoque: number;
  produtosEstoqueBaixo: number;
}): string {
  // Obtém a data e hora atuais no formato local (pt-BR) para inclusão no relatório.
  const dataAtual = new Date().toLocaleDateString('pt-BR');
  const horaAtual = new Date().toLocaleTimeString('pt-BR');

  // Define uma string contendo estilos CSS embutidos na tag <style>.
  // Esses estilos são usados para formatar a aparência do relatório HTML,
  // como fontes, margens, cores, layout de tabelas e cards.
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

  // Define a string HTML para o cabeçalho do relatório.
  // Inclui o título principal do relatório e a data/hora em que foi gerado.
  const cabecalho = `
    <div class="cabecalho">
      <div class="titulo">Relatório de Estoque</div>
      <div class="data">Gerado em ${dataAtual} às ${horaAtual}</div>
    </div>
  `;

  // Define a string HTML para a seção de resumo do estoque.
  // Exibe métricas importantes como total de produtos, valor total em estoque e produtos com estoque baixo,
  // formatados como "cards" para facilitar a visualização.
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

  // Inicia a string HTML para a tabela que listará os produtos.
  // Inclui o título da seção e o cabeçalho da tabela (<thead>) com as colunas.
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

  // Itera sobre cada produto na lista 'produtos' e constrói uma linha (<tr>) da tabela para cada um.
  // Os dados do produto são inseridos nas células (<td>) correspondentes.
  produtos.forEach(produto => {
    tabelaProdutos += `
      <tr>
        <td>${produto.id}</td>
        <td>${produto.nome}</td>
        <td>R$ ${produto.preco.toFixed(2)}</td> // Formata o preço com 2 casas decimais.
        <td>${produto.quantidade}</td>
        <td>${produto.categoria || '-'}</td> // Se a categoria for nula/indefinida, exibe '-'.
        <td>${produto.sku || '-'}</td>       // Se o SKU for nulo/indefinido, exibe '-'.
      </tr>
    `;
  });

  // Fecha as tags do corpo (<tbody>) e da tabela (<table>).
  tabelaProdutos += `
      </tbody>
    </table>
  `;

  // Define a string HTML para o rodapé do relatório.
  // Geralmente contém informações de direitos autorais ou notas do sistema.
  const rodape = `
    <div class="rodape">
      Sistema de Controle de Estoque - Todos os direitos reservados
    </div>
  `;

  // Monta o documento HTML completo combinando todas as partes (estilos, cabeçalho, resumo, tabela e rodapé).
  // Retorna esta string HTML completa.
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

// ---

// Endpoint para gerar o relatório de estoque (em formato HTML, tratado como download).
// Esta função é o handler principal para requisições HTTP GET que chegam neste endpoint da API.
export async function GET(request: NextRequest) {
  try {
    // 1. Busca todos os produtos do banco de dados usando a função importada 'getProdutos()'.
    const produtos = await getProdutos();
    
    // 2. Calcula as métricas de resumo necessárias para o relatório.
    // 'totalProdutos': O número total de produtos encontrados.
    const totalProdutos = produtos.length;
    // 'valorTotalEstoque': O valor monetário total de todos os produtos em estoque.
    // Usa o método 'reduce' para somar o resultado de (preço * quantidade) para cada produto.
    const valorTotalEstoque = produtos.reduce((total, produto) => {
      return total + (produto.preco * produto.quantidade);
    }, 0);
    // 'produtosEstoqueBaixo': O número de produtos cuja quantidade em estoque é menor que 5.
    // Usa o método 'filter' para encontrar esses produtos e '.length' para contá-los.
    const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5).length;
    
    // 3. Chama a função 'gerarHTMLRelatorio' para criar a string HTML do relatório.
    // Passa a lista de produtos e o objeto de resumo com as métricas calculadas.
    const htmlRelatorio = gerarHTMLRelatorio(produtos, {
      totalProdutos,
      valorTotalEstoque,
      produtosEstoqueBaixo
    });
    
    // 4. Retorna o HTML gerado como uma resposta HTTP para o cliente.
    // 'new NextResponse(htmlRelatorio, ...)' cria a resposta.
    return new NextResponse(htmlRelatorio, {
      status: 200, // Define o status HTTP como 200 (OK), indicando que a requisição foi bem-sucedida.
      headers: {
        'Content-Type': 'text/html', // Define o cabeçalho 'Content-Type' para 'text/html', informando ao navegador que o conteúdo é HTML.
        // O cabeçalho 'Content-Disposition' com 'attachment' instrui o navegador a baixar o arquivo
        // em vez de exibi-lo diretamente. 'filename' sugere o nome do arquivo baixado.
        // Embora o nome sugira '.html', o conteúdo é HTML, e pode ser aberto no navegador ou salvo.
        'Content-Disposition': 'attachment; filename=relatorio-estoque.html' 
      }
    });
  } catch (error) {
    // Bloco catch para lidar com qualquer erro que possa ocorrer durante a execução.
    console.error('Erro ao gerar relatório:', error); // Loga o erro no console do servidor para depuração.
    // Retorna uma resposta JSON de erro com uma mensagem genérica e o status 500 (Erro Interno do Servidor).
    return NextResponse.json(
      { error: 'Erro ao gerar relatório' },
      { status: 500 }
    );
  }
}