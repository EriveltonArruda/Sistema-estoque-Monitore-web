// 'use client' indica que este é um Client Component no Next.js.
// Isso significa que ele será renderizado no lado do cliente (navegador),
// permitindo o uso de hooks do React como useState e useEffect, e interação.
'use client';

// Importações de módulos e componentes necessários
import React, { useEffect, useState } from 'react'; // Hooks do React para gerenciar estado e efeitos colaterais
import Layout from '@/components/layout/Layout'; // Componente de layout comum da aplicação
import ProdutoForm, { ProdutoFormData } from '@/components/forms/ProdutoForm'; // Componente de formulário para produtos e sua tipagem
import { useRouter } from 'next/navigation'; // Hook do Next.js para navegação programática entre rotas
import { obterProduto, atualizarProduto } from '@/services/api'; // Funções para interagir com a API (buscar e atualizar produtos)

/**
 * Componente de página para editar um produto existente.
 * Ele carrega os dados do produto, exibe um formulário pré-preenchido
 * e lida com a submissão para atualizar o produto na API.
 *
 * @param {object} params - Parâmetros da rota, contendo o ID do produto.
 * @param {string} params.id - O ID do produto a ser editado.
 */
export default function EditarProdutoPage({ params }: { params: { id: string } }) {
  // --- Estados do Componente ---

  // Estado para armazenar os dados do produto que está sendo editado.
  // Começa como 'null' porque os dados ainda não foram carregados da API.
  const [produto, setProduto] = useState<ProdutoFormData | null>(null);

  // Estado booleano para indicar se os dados do produto estão sendo carregados.
  // Começa como 'true' porque a operação de busca inicia assim que o componente é montado.
  const [loading, setLoading] = useState(true);

  // Estado para armazenar mensagens de erro, caso ocorram problemas ao buscar ou atualizar o produto.
  // Começa como 'null' (sem erro).
  const [error, setError] = useState<string | null>(null);

  // Estado booleano para indicar se o formulário de atualização está em processo de envio.
  // Útil para desabilitar o botão de submissão e evitar envios duplicados.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inicializa o hook useRouter para permitir a navegação programática.
  const router = useRouter();

  // --- Efeito para Carregar o Produto (useEffect) ---

  // Este useEffect é executado quando o componente é montado
  // e sempre que 'params.id' mudar (o que não deve acontecer muito
  // em uma página de edição com ID fixo, mas é uma boa prática incluí-lo na dependência).
  useEffect(() => {
    // Função assíncrona para buscar os detalhes do produto da API.
    const fetchProduto = async () => {
      try {
        // Tenta obter o produto usando o ID da rota.
        const data = await obterProduto(params.id);
        // Se for bem-sucedido, atualiza o estado 'produto' com os dados recebidos.
        setProduto(data);
        // Limpa qualquer mensagem de erro anterior.
        setError(null);
      } catch (err) {
        // Se ocorrer um erro durante a busca, loga o erro no console
        console.error('Erro ao buscar produto:', err);
        // E define uma mensagem de erro amigável para o usuário.
        setError('Falha ao carregar dados do produto. Tente novamente mais tarde.');
      } finally {
        // Independentemente do sucesso ou falha, define 'loading' como 'false'
        // para indicar que a operação de busca terminou.
        setLoading(false);
      }
    };

    // Chama a função para buscar o produto.
    fetchProduto();
  }, [params.id]); // A dependência garante que o efeito seja re-executado se o ID mudar.

  // --- Função para Lidar com a Submissão do Formulário (handleSubmit) ---

  /**
   * Função chamada quando o formulário de edição é submetido.
   * Ela envia os dados atualizados do produto para a API.
   * @param {ProdutoFormData} data - Os dados do formulário submetidos.
   */
  const handleSubmit = async (data: ProdutoFormData) => {
    // Define 'isSubmitting' como 'true' para indicar que o envio começou.
    setIsSubmitting(true);
    // Limpa qualquer mensagem de erro anterior.
    setError(null);

    try {
      // Tenta atualizar o produto na API com o ID e os novos dados.
      await atualizarProduto(params.id, data);
      // Se for bem-sucedido, exibe um alerta de sucesso.
      alert('Produto atualizado com sucesso!');
      // Redireciona o usuário para a página de detalhes do produto.
      router.push(`/produtos/${params.id}`);
    } catch (err) {
      // Se ocorrer um erro durante a atualização, loga o erro no console.
      console.error('Erro ao atualizar produto:', err);
      // E define uma mensagem de erro para o usuário.
      setError('Falha ao atualizar produto. Tente novamente.');
    } finally {
      // Independentemente do sucesso ou falha, define 'isSubmitting' como 'false'
      // para indicar que o envio terminou.
      setIsSubmitting(false);
    }
  };

  // --- Renderização Condicional (Estados da UI) ---

  // Se o componente estiver no estado de carregamento, exibe uma mensagem de "Carregando...".
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64 text-black">
          <p>Carregando...</p>
        </div>
      </Layout>
    );
  }

  // Se houver um erro OU o produto não for encontrado (por exemplo, ID inválido),
  // exibe uma mensagem de erro e um botão para voltar à lista de produtos.
  if (error || !produto) {
    return (
      <Layout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Produto não encontrado'} {/* Exibe o erro específico ou "Produto não encontrado" */}
        </div>
        <div className="mt-4 text-black">
          <button
            className="px-4 py-2 bg-gray-200 text-black rounded"
            onClick={() => router.push('/produtos')} // Botão para voltar à lista de produtos
          >
            Voltar para Lista
          </button>
        </div>
      </Layout>
    );
  }

  // --- Renderização Principal do Formulário de Edição ---

  // Se o carregamento for concluído com sucesso e o produto for encontrado,
  // exibe o formulário para edição.
  return (
    <Layout>
      <div className="space-y-6 text-black">
        <h1 className="text-3xl font-bold text-black">Editar Produto</h1>

        {/* Exibe uma mensagem de erro aqui também, caso ocorra um erro na submissão do formulário */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="max-w-2xl text-black">
          {/* O componente ProdutoForm é renderizado aqui. */}
          <ProdutoForm
            initialData={produto} // Passa os dados do produto carregados para preencher o formulário
            onSubmit={handleSubmit} // Passa a função 'handleSubmit' para o formulário chamar ao ser submetido
            isEditing={true} // Indica ao formulário que ele está no modo de edição (pode mudar o texto do botão, etc.)
          />
        </div>
      </div>
    </Layout>
  );
}