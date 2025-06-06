// 'use client' é uma diretiva do Next.js 13+ App Router.
// Ela indica que este componente será renderizado no lado do cliente (navegador),
// permitindo o uso de hooks do React como `useState` e `useEffect`, e interatividade.
'use client';

// --- Importações de Módulos e Componentes Necessários ---
import React, { useState, useEffect } from 'react'; // Importa React e os hooks `useState` (para gerenciar estado) e `useEffect` (para efeitos colaterais).
import Layout from '@/components/layout/Layout'; // Importa um componente de layout genérico para estruturar a página.
// Importa componentes de UI de Tabela para exibir dados em formato tabular.
import Table, { TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import Button from '@/components/ui/Button'; // Importa um componente de botão UI reutilizável.
import Link from 'next/link'; // Importa o componente `Link` do Next.js para navegação otimizada (client-side transitions).
import { useRouter } from 'next/navigation'; // Importa o hook `useRouter` do Next.js para navegação programática.
import { Produto } from '@/types/produto'; // Importa o tipo/interface `Produto`, que define a estrutura dos dados de um produto.
import { listarProdutos, excluirProduto } from '@/services/api'; // Importa funções de serviço que interagem com a API (backend) para listar e excluir produtos.

// ---

/**
 * Componente de página `ProdutosPage` para listar todos os produtos.
 * Ele busca os produtos da API, os exibe em uma tabela
 * e permite a navegação para detalhes, edição ou exclusão de produtos.
 */
export default function ProdutosPage() {
  // --- Estados Locais do Componente ---

  // `produtos`: Armazena a lista de produtos obtidos da API. Inicialmente um array vazio.
  const [produtos, setProdutos] = useState<Produto[]>([]);
  // `loading`: Indica se os produtos estão sendo carregados da API. Começa como `true`.
  const [loading, setLoading] = useState(true);
  // `error`: Armazena qualquer mensagem de erro que possa ocorrer. Inicialmente `null`.
  const [error, setError] = useState<string | null>(null);

  // Inicializa o hook `useRouter` para permitir navegação programática (ex: redirecionar).
  const router = useRouter();

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
        setError('Falha ao carregar produtos. Tente novamente mais tarde.'); // Define uma mensagem de erro amigável para o usuário.
      } finally {
        // Este bloco é executado sempre, após `try` ou `catch`.
        setLoading(false); // Define `loading` como `false`, indicando que a operação de busca terminou.
      }
    };

    fetchProdutos();
  }, []); // Array de dependências vazio: o efeito executa apenas uma vez (ao montar).

  // --- Função `handleDelete` para Excluir um Produto ---
  // Esta função é chamada quando o botão "Excluir" de um produto na lista é clicado.
  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        // Tenta excluir o produto da API usando o ID fornecido.
        await excluirProduto(id);
        // Se a exclusão for bem-sucedida, atualiza o estado local `produtos`
        // removendo o produto excluído, sem precisar recarregar toda a lista da API.
        setProdutos(produtos.filter(produto => produto.id !== id));
      } catch (err) {
        // Se ocorrer um erro durante a exclusão:
        console.error('Erro ao excluir produto:', err);
        alert('Erro ao excluir produto. Tente novamente.');
      }
    }
  };

  // --- Renderização do Componente ---
  return (
    <Layout>
      <div className="space-y-6"> {/* Container principal com espaçamento vertical entre os elementos. */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Produtos</h1>
          <Link href="/produtos/novo">
            <Button variant="primary">Adicionar Produto</Button> {/* Botão para adicionar um novo produto. */}
          </Link>
        </div>

        {/* Renderização Condicional de Mensagem de Erro: */}
        {/* Se a variável `error` tiver um valor (não for null), exibe uma div de alerta vermelha. */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error} {/* Exibe a mensagem de erro. */}
          </div>
        )}

        <div className="bg-white shadow rounded-lg"> {/* Container para a tabela de produtos, com estilo de card. */}
          {/* Renderização Condicional: Carregando ou Tabela de Produtos */}
          {loading ? ( // Se `loading` for `true`, exibe uma mensagem de carregamento.
            <div className="flex justify-center items-center h-64">
              <p>Carregando produtos...</p> {/* Mensagem de carregamento. */}
            </div>
          ) : ( // Se `loading` for `false`, renderiza a tabela de produtos.
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Renderização Condicional: Produtos Encontrados ou Nenhum Produto */}
                {produtos.length > 0 ? ( // Se houver produtos no array `produtos`.
                  produtos.map((produto) => ( // Mapeia cada produto para uma `TableRow`.
                    <TableRow key={produto.id}> {/* `key` é essencial para a renderização eficiente de listas no React. */}
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell>R$ {produto.preco.toFixed(2)}</TableCell> {/* Formata o preço para 2 casas decimais. */}
                      <TableCell>{produto.quantidade}</TableCell>
                      <TableCell>{produto.categoria || '-'}</TableCell> {/* Exibe a categoria ou '-' se vazia. */}
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => router.push(`/produtos/${produto.id}`)}
                          >
                            Detalhes
                          </Button>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => router.push(`/produtos/editar/${produto.id}`)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(produto.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : ( // Se não houver produtos no array `produtos`.
                  <TableRow>
                    {/* Exibe uma célula que abrange todas as colunas, indicando que nenhum produto foi encontrado. */}
                    <TableCell colSpan={5} className="text-center py-8">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Layout>
  );
}