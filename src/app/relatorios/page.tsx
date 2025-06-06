// 'use client' é uma diretiva do Next.js 13+ App Router.
// Ela indica que este componente será renderizado no navegador (lado do cliente),
// o que é necessário para usar hooks do React como `useState` e `useEffect`, e para interatividade.
'use client';

// --- Importações de Módulos e Componentes Necessários ---
import React, { useEffect, useState } from 'react'; // Importa React e os hooks `useEffect` (para efeitos colaterais) e `useState` (para gerenciar estado).
import Layout from '@/components/layout/Layout'; // Importa um componente de layout genérico para estruturar a página.
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'; // Importa componentes UI de Card para exibir informações de forma agrupada.
import Button from '@/components/ui/Button'; // Importa um componente de botão UI reutilizável.
import { listarProdutos } from '@/services/api'; // Importa a função de serviço para listar produtos da API.
import { Produto } from '@/types/produto'; // Importa o tipo/interface `Produto`, que define a estrutura dos dados de um produto.

// ---

/**
 * Componente de página `RelatoriosPage` para exibir estatísticas e uma prévia de relatórios.
 * Ele busca a lista de produtos da API para calcular métricas importantes do estoque
 * e oferece a opção de gerar um relatório PDF completo.
 */
export default function RelatoriosPage() {
  // --- Estados Locais do Componente ---

  // `produtos`: Armazena a lista de produtos obtidos da API. Inicialmente um array vazio.
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // `loading`: Indica se os dados estão sendo carregados da API. Começa como `true`.
  const [loading, setLoading] = useState(true);
  // `error`: Armazena qualquer mensagem de erro que possa ocorrer. Inicialmente `null`.
  const [error, setError] = useState<string | null>(null);
  // `gerando`: Indica se um relatório PDF está sendo gerado/aberto. Controla o estado do botão.
  const [gerando, setGerando] = useState(false);

  // --- Hook `useEffect` para Buscar a Lista de Produtos ---
  // Este hook é executado uma vez após a montagem inicial do componente.
  // O array de dependências vazio `[]` garante que ele seja executado apenas uma vez.
  useEffect(() => {
    // Define uma função assíncrona interna para buscar a lista de produtos.
    const fetchProdutos = async () => {
      try {
        // Tenta listar os produtos da API.
        const data = await listarProdutos();
        setProdutos(data); // Se bem-sucedido, atualiza o estado `produtos` com os dados recebidos.
        setError(null); // Limpa qualquer erro anterior se a busca for bem-sucedida.
      } catch (err) {
        // Se ocorrer um erro durante a busca:
        console.error('Erro ao buscar produtos:', err); // Loga o erro completo no console para depuração.
        setError('Falha ao carregar dados. Tente novamente mais tarde.'); // Define uma mensagem de erro amigável para o usuário.
      } finally {
        // Este bloco é executado sempre, após `try` ou `catch`.
        setLoading(false); // Define `loading` como `false`, indicando que a operação de busca terminou.
      }
    };

    fetchProdutos(); // Chama a função de busca quando o componente é montado.
  }, []); // Array de dependências vazio: o efeito executa apenas uma vez (ao montar).

  // --- Cálculos de Estatísticas ---
  // Essas variáveis são recálculadas sempre que o estado `produtos` é atualizado.

  // `totalProdutos`: Número total de produtos cadastrados.
  const totalProdutos = produtos.length;

  // `valorTotalEstoque`: Calcula o valor monetário total de todos os produtos em estoque.
  // Itera sobre cada produto e soma (preço * quantidade).
  const valorTotalEstoque = produtos.reduce((total, produto) => {
    return total + (produto.preco * produto.quantidade);
  }, 0); // O '0' é o valor inicial do acumulador `total`.

  // `produtosEstoqueBaixo`: Conta quantos produtos têm uma quantidade em estoque menor que 5.
  const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5).length;

  // --- Função `handleGerarPDF` para Gerar o Relatório PDF ---
  // É chamada quando o botão "Gerar Relatório PDF" é clicado.
  const handleGerarPDF = async () => {
    try {
      setGerando(true); // Ativa o estado `gerando` para indicar que o PDF está sendo processado.

      // Abre uma nova aba no navegador que aponta para o endpoint da API responsável por gerar o PDF.
      // O backend irá processar a requisição e enviar o arquivo PDF para download.
      window.open('/api/relatorios/pdf', '_blank');
    } catch (err) {
      // Se houver um erro ao tentar abrir a URL (ex: problema de rede, URL incorreta),
      // registra o erro no console e alerta o usuário.
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar o relatório PDF. Tente novamente.');
    } finally {
      // Garante que o estado `gerando` volte a ser `false`, independentemente do resultado.
      setGerando(false);
    }
  };

  // --- Renderização do Componente ---
  return (
    <Layout> {/* O componente Layout envolve todo o conteúdo da página para manter a estrutura e o estilo. */}
      <div className="space-y-6"> {/* Container principal com espaçamento vertical entre os elementos. */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Relatórios</h1> {/* Título da página. */}
          {/* Botão para gerar o relatório PDF. */}
          <Button
            variant="primary" // Estilo primário para o botão.
            onClick={handleGerarPDF} // Chama a função `handleGerarPDF` ao ser clicado.
            // O botão é desabilitado enquanto os dados estão sendo carregados (`loading`)
            // ou enquanto o PDF está sendo gerado (`gerando`), para evitar cliques múltiplos.
            disabled={loading || gerando}
          >
            {/* O texto do botão muda para "Gerando..." enquanto o PDF está sendo processado. */}
            {gerando ? 'Gerando...' : 'Gerar Relatório PDF'}
          </Button>
        </div>

        {/* Renderização Condicional de Mensagem de Erro: */}
        {/* Se a variável `error` tiver um valor (não for null), exibe uma div de alerta vermelha. */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error} {/* Exibe a mensagem de erro. */}
          </div>
        )}

        {/* Renderização Condicional: Carregando ou Conteúdo do Relatório */}
        {loading ? ( // Se `loading` for `true`, exibe uma mensagem de carregamento.
          <div className="flex justify-center items-center h-64">
            <p>Carregando dados...</p> {/* Mensagem de carregamento. */}
          </div>
        ) : ( // Se `loading` for `false`, renderiza as estatísticas e a prévia da lista de produtos.
          <>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Prévia do Relatório</h2>
              <p className="text-sm text-gray-500 mb-6">
                O relatório PDF incluirá as seguintes informações:
              </p>

              {/* Grid para exibir as estatísticas principais em Cards. */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card: Total de Produtos */}
                <Card>
                  <CardHeader>
                    <CardTitle>Total de Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{totalProdutos}</p> {/* Exibe o total de produtos. */}
                    <p className="text-sm text-gray-500 mt-2">produtos cadastrados</p>
                  </CardContent>
                </Card>

                {/* Card: Valor Total em Estoque */}
                <Card>
                  <CardHeader>
                    <CardTitle>Valor Total em Estoque</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">R$ {valorTotalEstoque.toFixed(2)}</p> {/* Exibe o valor total formatado. */}
                    <p className="text-sm text-gray-500 mt-2">em produtos</p>
                  </CardContent>
                </Card>

                {/* Card: Produtos com Estoque Baixo */}
                <Card>
                  <CardHeader>
                    <CardTitle>Produtos com Estoque Baixo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{produtosEstoqueBaixo}</p> {/* Exibe o número de produtos com estoque baixo. */}
                    <p className="text-sm text-gray-500 mt-2">produtos com menos de 5 unidades</p>
                  </CardContent>
                </Card>
              </div>

              {/* Prévia da Lista de Produtos (apenas os primeiros 5) */}
              <h3 className="text-lg font-semibold mb-3">Lista de Produtos</h3>
              <div className="overflow-x-auto"> {/* Permite rolagem horizontal se a tabela for muito larga. */}
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantidade
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mapeia e renderiza apenas os primeiros 5 produtos como prévia. */}
                    {produtos.slice(0, 5).map((produto) => (
                      <tr key={produto.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b border-gray-200">{produto.id}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{produto.nome}</td>
                        <td className="py-2 px-4 border-b border-gray-200">R$ {produto.preco.toFixed(2)}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{produto.quantidade}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{produto.categoria || '-'}</td>
                        <td className="py-2 px-4 border-b border-gray-200">{produto.sku || '-'}</td>
                      </tr>
                    ))}
                    {/* Se houver mais de 5 produtos, exibe uma linha indicando que há mais itens. */}
                    {produtos.length > 5 && (
                      <tr>
                        <td colSpan={6} className="py-2 px-4 border-b border-gray-200 text-center text-sm text-gray-500">
                          ... e mais {produtos.length - 5} produtos
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Dica para o usuário sobre como gerar o relatório completo. */}
            <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              <p className="font-medium">Dica:</p>
              <p className="text-sm">Clique no botão "Gerar Relatório PDF" para baixar o relatório completo em formato PDF.</p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}