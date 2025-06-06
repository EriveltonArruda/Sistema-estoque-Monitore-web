// 'use client' é uma diretiva do Next.js 13+ App Router.
// Ela indica que este componente será renderizado e executado no navegador (lado do cliente).
// Isso é essencial para usar hooks do React como `useState` e `useEffect`, e para interatividade.
'use client';

// --- Importações de Módulos e Componentes ---
import React, { useEffect, useState } from 'react'; // Importa React e os hooks `useEffect` (para efeitos colaterais) e `useState` (para gerenciar estado).
import Layout from '@/components/layout/Layout'; // Importa um componente de layout comum para estruturar a página.
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'; // Importa componentes UI de Card para exibir informações de forma estruturada.
import Button from '@/components/ui/Button'; // Importa um componente de botão UI reutilizável.
import { useRouter } from 'next/navigation'; // Importa o hook `useRouter` do Next.js para navegação programática entre páginas.
import { Produto } from '@/types/produto'; // Importa o tipo/interface `Produto`, que define a estrutura dos dados de um produto.
import { obterProduto, excluirProduto } from '@/services/api'; // Importa funções de serviço para interagir com a API (buscar e excluir produtos).

// ---

/**
 * Componente de página para exibir os detalhes de um produto específico.
 * Ele carrega os dados do produto com base no ID da URL,
 * e oferece opções para editar ou excluir o produto.
 *
 * @param {object} params - Objeto contendo os parâmetros da rota.
 * @param {string} params.id - O ID do produto a ser exibido.
 */
export default function DetalhesProdutoPage({ params }: { params: { id: string } }) {
  // --- Estados Locais do Componente ---

  // `produto`: Armazena os dados do produto obtidos da API. Inicialmente `null`.
  const [produto, setProduto] = useState<Produto | null>(null);
  // `loading`: Indica se os dados estão sendo carregados da API. Começa como `true`.
  const [loading, setLoading] = useState(true);
  // `error`: Armazena qualquer mensagem de erro que possa ocorrer. Inicialmente `null`.
  const [error, setError] = useState<string | null>(null);

  // Inicializa o hook `useRouter` para permitir navegação programática (ex: redirecionar o usuário).
  const router = useRouter();

  // --- Hook `useEffect` para Buscar os Detalhes do Produto ---
  // Este hook é executado uma vez após a montagem inicial do componente
  // e sempre que a dependência `params.id` mudar.
  useEffect(() => {
    // Define uma função assíncrona interna para buscar os dados do produto.
    const fetchProduto = async () => {
      try {
        // Tenta obter os dados do produto usando o ID da URL.
        const data = await obterProduto(params.id);
        setProduto(data); // Atualiza o estado `produto` com os dados recebidos.
        setError(null); // Limpa qualquer erro anterior se a busca for bem-sucedida.
      } catch (err) {
        // Se ocorrer um erro durante a busca:
        console.error('Erro ao buscar produto:', err); // Loga o erro completo no console para depuração.
        setError('Falha ao carregar dados do produto. Tente novamente mais tarde.'); // Define uma mensagem de erro amigável para o usuário.
      } finally {
        // Este bloco é executado sempre, após `try` ou `catch`.
        setLoading(false); // Define `loading` como `false`, indicando que a operação de busca terminou.
      }
    };

    fetchProduto(); // Chama a função de busca quando o componente é montado ou o ID muda.
  }, [params.id]); // A dependência `params.id` garante que a busca seja re-executada se o ID na URL mudar.

  // --- Função `handleDelete` para Excluir um Produto ---
  // Esta função é chamada quando o botão "Excluir" é clicado.
  const handleDelete = async () => {
    // Pede confirmação ao usuário antes de prosseguir com a exclusão.
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        // Tenta excluir o produto da API usando o ID.
        await excluirProduto(params.id);
        alert('Produto excluído com sucesso!'); // Exibe um alerta de sucesso.
        router.push('/produtos'); // Redireciona o usuário para a página de lista de produtos.
      } catch (err) {
        // Se ocorrer um erro durante a exclusão:
        console.error('Erro ao excluir produto:', err); // Loga o erro no console.
        alert('Erro ao excluir produto. Tente novamente.'); // Exibe um alerta de erro para o usuário.
      }
    }
  };

  // --- Renderização Condicional: Estado de Carregamento ---
  // Se `loading` for `true`, exibe uma mensagem de carregamento.
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Carregando...</p> {/* Mensagem de carregamento */}
        </div>
      </Layout>
    );
  }

  // --- Renderização Condicional: Estado de Erro ou Produto Não Encontrado ---
  // Se houver um `error` ou se `produto` for `null` (indicando que não foi encontrado),
  // exibe uma mensagem de erro e um botão para voltar à lista.
  if (error || !produto) {
    return (
      <Layout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Produto não encontrado'} {/* Exibe a mensagem de erro específica ou "Produto não encontrado". */}
        </div>
        <div className="mt-4 text-black">
          <Button
            variant="secondary" // Define o estilo do botão (presumindo que "secondary" seja um estilo definido no seu componente Button).
            onClick={() => router.push('/produtos')} // Redireciona para a lista de produtos ao clicar.
          >
            Voltar para Lista
          </Button>
        </div>
      </Layout>
    );
  }

  // --- Renderização Principal: Detalhes do Produto ---
  // Se o carregamento for concluído e o produto tiver sido encontrado com sucesso,
  // exibe os detalhes completos do produto.
  return (
    <Layout> {/* O componente Layout envolve todo o conteúdo da página para manter a estrutura. */}
      <div className="space-y-6"> {/* Container principal com espaçamento vertical entre os elementos. */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Detalhes do Produto</h1> {/* Título da página. */}
          <div className="flex space-x-2"> {/* Container para os botões de ação. */}
            {/* Botão "Editar": Redireciona para a página de edição do produto. */}
            <Button
              variant="primary" // Define o estilo do botão (presumindo que "primary" seja um estilo definido).
              onClick={() => router.push(`/produtos/editar/${produto.id}`)} // Navega para a rota de edição, passando o ID do produto.
            >
              Editar
            </Button>
            {/* Botão "Excluir": Chama a função `handleDelete` para excluir o produto. */}
            <Button
              variant="danger" // Define o estilo do botão (presumindo que "danger" seja um estilo para ações destrutivas).
              onClick={handleDelete} // Chama a função handleDelete quando clicado.
            >
              Excluir
            </Button>
          </div>
        </div>

        {/* Componente Card para exibir os detalhes do produto de forma organizada. */}
        <Card>
          <CardHeader>
            <CardTitle>{produto.nome}</CardTitle> {/* O nome do produto é o título do Card. */}
          </CardHeader>
          <CardContent className="space-y-4"> {/* Conteúdo principal do Card com espaçamento. */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Layout em grid para organizar os detalhes em colunas. */}
              {/* Seção de Descrição */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                <p>{produto.descricao || 'Sem descrição'}</p> {/* Exibe a descrição ou uma mensagem padrão se vazia. */}
              </div>

              {/* Seção de SKU */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                <p>{produto.sku || 'Não informado'}</p> {/* Exibe o SKU ou uma mensagem padrão. */}
              </div>

              {/* Seção de Preço */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Preço</h3>
                <p className="text-lg font-semibold">R$ {produto.preco.toFixed(2)}</p> {/* Exibe o preço formatado com 2 casas decimais. */}
              </div>

              {/* Seção de Quantidade em Estoque */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Quantidade em Estoque</h3>
                <p className="text-lg font-semibold">{produto.quantidade}</p> {/* Exibe a quantidade. */}
              </div>

              {/* Seção de Categoria */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Categoria</h3>
                <p>{produto.categoria || 'Não categorizado'}</p> {/* Exibe a categoria ou uma mensagem padrão. */}
              </div>

              {/* Seção de Fornecedor */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Fornecedor</h3>
                <p>{produto.fornecedor || 'Não informado'}</p> {/* Exibe o fornecedor ou uma mensagem padrão. */}
              </div>

              {/* Seção de Data de Entrada */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Entrada</h3>
                {/* Formata a data de entrada para o formato de data local (pt-BR). */}
                <p>{new Date(produto.dataEntrada).toLocaleDateString('pt-BR')}</p>
              </div>

              {/* Seção de Última Atualização */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">Última Atualização</h3>
                {/* Formata a data de atualização para o formato de data local (pt-BR). */}
                <p>{new Date(produto.dataAtualizacao).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter> {/* Rodapé do Card, geralmente para ações adicionais. */}
            <Button
              variant="secondary" // Botão para voltar à lista, com estilo secundário.
              onClick={() => router.push('/produtos')} // Redireciona para a página de lista de produtos.
            >
              Voltar para Lista
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}