'use client';
// Esta diretiva é um recurso do Next.js 13+ que marca este componente como um "Client Component".
// Isso significa que ele será renderizado no navegador do usuário, permitindo o uso de Hooks do React como `useState` e `useEffect`,
// além de habilitar a interatividade no lado do cliente.

import React, { useEffect, useState } from 'react';
// Importa as funcionalidades essenciais do React:
// - `React`: O objeto principal do React.
// - `useEffect`: Um Hook para executar "efeitos colaterais" em componentes funcionais, como buscar dados de uma API,
//   manipular o DOM ou configurar inscrições. Ele é executado após a renderização do componente.
// - `useState`: Um Hook para adicionar estado a componentes funcionais, permitindo que eles armazenem e
//   gerenciem dados que podem mudar ao longo do tempo (e acionar uma nova renderização quando mudam).

import Layout from '@/components/layout/Layout';
// Importa o componente `Layout`. Ele é um componente wrapper (envolvente) que define a estrutura
// visual comum para suas páginas, como cabeçalho, rodapé, e a disposição geral do conteúdo.
// O `@/` é um alias de importação do Next.js que geralmente aponta para o diretório `src` do seu projeto.

import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
// Importa componentes UI (User Interface) que seguem um padrão de "cartão".
// - `Card`: O contêiner principal para agrupar informações relacionadas.
// - `CardHeader`: Uma seção para o cabeçalho do cartão.
// - `CardTitle`: O título exibido dentro do `CardHeader`.
// - `CardContent`: A área para o conteúdo principal do cartão.
// Eles ajudam a organizar e estilizar o conteúdo de forma consistente.

import Link from 'next/link';
// Importa o componente `Link` do Next.js. É a forma recomendada de navegar entre
// as páginas da sua aplicação Next.js. Ele otimiza o carregamento da página
// pré-buscando os recursos, resultando em transições mais rápidas.

import Button from '@/components/ui/Button';
// Importa um componente `Button` customizado. Ele provavelmente encapsula estilos
// (como Tailwind CSS) e comportamentos comuns para botões em sua aplicação.

import { listarProdutos } from '@/services/api';
// Importa a função `listarProdutos` de um serviço de API. Esta função é responsável
// por fazer uma requisição HTTP (por exemplo, GET) ao seu backend (ou a uma API simulada)
// para obter a lista de produtos.

import { Produto } from '@/types/produto';
// Importa a definição de tipo `Produto` do TypeScript. Isso ajuda a garantir
// que os dados que você manipula para os produtos sigam uma estrutura esperada
// (por exemplo, `id`, `nome`, `preco`, `quantidade`), fornecendo segurança de tipo
// e autocompletar durante o desenvolvimento.

// Define o componente funcional `Home`. No Next.js App Router (versões 13+),
// um arquivo `page.tsx` exportado como padrão dentro de um diretório de rota
// (como `app/page.tsx` para a raiz) se torna a página principal.
export default function Home() {
  // --- Definição de Estados do Componente ---
  // `useState` é usado para adicionar e gerenciar o estado mutável no componente.

  // `produtos`: Um array que armazenará os dados dos produtos.
  // `setProdutos`: A função usada para atualizar o estado `produtos`.
  // `Produto[]`: Indica que `produtos` é um array de objetos do tipo `Produto`.
  // `[]`: O valor inicial do estado, um array vazio.
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // `loading`: Um booleano para indicar se os dados estão sendo carregados.
  // `setLoading`: Função para atualizar o estado `loading`.
  // `true`: Valor inicial, pois a requisição de dados começa assim que a página é montada.
  const [loading, setLoading] = useState(true);

  // `error`: Uma string para armazenar qualquer mensagem de erro, ou `null` se não houver erro.
  // `setError`: Função para atualizar o estado `error`.
  // `null`: Valor inicial, pois não há erro no início.
  const [error, setError] = useState<string | null>(null);

  // --- Efeito Colateral para Carregar Dados ---
  // `useEffect` é usado para executar a busca de produtos quando o componente é montado.
  // O array de dependências vazio `[]` significa que o efeito será executado apenas uma vez,
  // após a primeira renderização do componente, semelhante ao `componentDidMount` em classes.
  useEffect(() => {
    // Define uma função assíncrona para buscar os produtos.
    const fetchProdutos = async () => {
      try {
        // Tenta chamar a função `listarProdutos` (que faz a requisição à API).
        const data = await listarProdutos();
        // Se a requisição for bem-sucedida, atualiza o estado `produtos` com os dados recebidos.
        setProdutos(data);
        // Garante que a mensagem de erro seja nula se a requisição for bem-sucedida.
        setError(null);
      } catch (err) {
        // Captura qualquer erro que ocorra durante a requisição.
        console.error('Erro ao buscar produtos:', err); // Loga o erro no console para depuração.
        // Define uma mensagem de erro amigável para exibir ao usuário.
        setError('Falha ao carregar dados. Tente novamente mais tarde.');
      } finally {
        // Este bloco é executado sempre, independentemente de `try` ou `catch`.
        // Define `loading` como `false` para indicar que o processo de carregamento foi concluído.
        setLoading(false);
      }
    };

    // Chama a função `fetchProdutos` para iniciar a busca dos dados.
    fetchProdutos();
  }, []); // O array vazio assegura que esta função seja executada apenas uma vez na montagem.

  // --- Cálculos de Estatísticas do Estoque ---
  // Estes cálculos são refeitos a cada renderização, mas como `produtos` só muda na primeira carga
  // (ou se houver uma nova requisição), eles são eficientes.

  // Calcula o número total de produtos no array `produtos`.
  const totalProdutos = produtos.length;

  // Calcula o valor monetário total de todos os produtos em estoque.
  // `reduce` itera sobre o array `produtos`.
  // `total`: O valor acumulado até o momento.
  // `produto`: O objeto do produto atual na iteração.
  // `total + (produto.preco * produto.quantidade)`: Soma o valor de cada produto individual ao total.
  // `0`: O valor inicial para o acumulador `total`.
  const valorTotalEstoque = produtos.reduce((total, produto) => {
    return total + (produto.preco * produto.quantidade);
  }, 0);

  // Filtra os produtos cuja quantidade é menor que 5 e conta quantos são.
  // `filter`: Cria um novo array contendo apenas os produtos que satisfazem a condição `produto.quantidade < 5`.
  // `.length`: Retorna o número de elementos no array filtrado.
  const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5).length;

  // --- Renderização da Interface do Usuário ---
  // O que será exibido na tela para o usuário.
  return (
    // O componente `Layout` envolve todo o conteúdo, aplicando a estrutura visual global da sua aplicação
    // (como o cabeçalho, rodapé e o contêiner principal).
    <Layout>
      {/* Um contêiner `div` principal para o conteúdo do dashboard. */}
      {/* `space-y-6`: Adiciona espaçamento vertical entre os elementos filhos (usando Tailwind CSS). */}
      <div className="space-y-6">
        {/* Título principal do Dashboard. */}
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>

        {/* Renderização Condicional da Mensagem de Erro */}
        {/* Se a variável `error` tiver um valor (não for `null` ou vazio), esta `div` será exibida. */}
        {error && (
          // Estilos Tailwind CSS para um alerta de erro vermelho.
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error} {/* Exibe a mensagem de erro armazenada no estado `error`. */}
          </div>
        )}

        {/* Renderização Condicional de Carregamento ou Conteúdo Principal */}
        {/* Se `loading` for `true`, exibe uma mensagem de "Carregando dados...". */}
        {loading ? (
          // Div centralizada para a mensagem de carregamento, ocupando uma altura de 64 unidades.
          <div className="flex justify-center items-center h-64 text-black">
            <p>Carregando dados...</p>
          </div>
        ) : (
          // Caso `loading` seja `false` (os dados já foram carregados), renderiza o conteúdo real do dashboard.
          // `<>` é um Fragmento React, usado para agrupar múltiplos elementos JSX sem adicionar um nó extra ao DOM.
          <>
            {/* Grid para exibir os cartões de estatísticas. */}
            {/* `grid grid-cols-1`: Em telas pequenas, uma coluna. */}
            {/* `md:grid-cols-3`: Em telas médias e maiores, três colunas. */}
            {/* `gap-6`: Espaçamento entre os itens do grid. */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* --- Card: Total de Produtos --- */}
              <Card>
                <CardHeader>
                  <CardTitle>Total de Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Exibe o número total de produtos com estilo grande e negrito. */}
                  <p className="text-4xl font-bold text-black">{totalProdutos}</p>
                  <p className="text-sm text-gray-500 mt-2">produtos cadastrados</p>
                </CardContent>
              </Card>

              {/* --- Card: Valor Total em Estoque --- */}
              <Card>
                <CardHeader>
                  <CardTitle>Valor Total em Estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Exibe o valor total do estoque formatado para duas casas decimais, com "R$". */}
                  <p className="text-4xl font-bold text-black">R$ {valorTotalEstoque.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2">em produtos</p>
                </CardContent>
              </Card>

              {/* --- Card: Produtos com Estoque Baixo --- */}
              <Card>
                <CardHeader>
                  <CardTitle>Produtos com Estoque Baixo</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Exibe o número de produtos com estoque baixo. */}
                  <p className="text-4xl font-bold text-black">{produtosEstoqueBaixo}</p>
                  <p className="text-sm text-gray-500 mt-2">produtos com estoque baixo</p>
                </CardContent>
              </Card>
            </div>

            {/* --- Seção de Ações Rápidas --- */}
            {/* `mt-8`: Margem superior para separar da seção de estatísticas. */}
            <div className="mt-8">
              {/* Div para organizar o título da seção. */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ações Rápidas</h2>
              </div>

              {/* Grid para os botões de ação rápida. */}
              {/* `grid grid-cols-1`: Em telas pequenas, uma coluna. */}
              {/* `md:grid-cols-2`: Em telas médias e maiores, duas colunas. */}
              {/* `gap-4`: Espaçamento entre os botões. */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Link para a página de adição de novo produto. */}
                {/* `Link`: Navegação otimizada do Next.js. */}
                {/* `href="/produtos/novo"`: O caminho da página de destino. */}
                {/* `className="block"`: Faz com que o Link ocupe toda a largura disponível. */}
                <Link href="/produtos/novo" className="block">
                  {/* Componente `Button` com variante primária e largura total. */}
                  <Button variant="primary" className="w-full">
                    Adicionar Novo Produto
                  </Button>
                </Link>

                {/* Link para a página que lista todos os produtos. */}
                <Link href="/produtos" className="block">
                  {/* Componente `Button` com variante secundária e largura total. */}
                  <Button variant="secondary" className="w-full">
                    Ver Todos os Produtos
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}