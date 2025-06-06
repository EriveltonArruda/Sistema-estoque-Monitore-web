// 'use client' indica que este é um Client Component no Next.js.
// Isso significa que ele será renderizado e executado no navegador do usuário,
// permitindo o uso de hooks do React como useState, e possibilitando interatividade.
'use client';

// Importações de módulos e componentes necessários
import React, { useState } from 'react'; // Hook 'useState' do React para gerenciar estado
import Layout from '@/components/layout/Layout'; // Componente de layout comum da aplicação
import ProdutoForm, { ProdutoFormData } from '@/components/forms/ProdutoForm'; // Componente de formulário para produtos e sua tipagem de dados
import { useRouter } from 'next/navigation'; // Hook do Next.js para navegação programática entre rotas
import { criarProduto } from '@/services/api'; // Função para interagir com a API (criar um novo produto)

/**
 * Componente de página para adicionar um novo produto.
 * Ele exibe um formulário vazio para o usuário preencher
 * e lida com a submissão dos dados para criar um novo produto na API.
 */
export default function NovoProdutoPage() {
  // Inicializa o hook useRouter para permitir a navegação programática.
  const router = useRouter();

  // --- Estados do Componente ---

  // Estado booleano para indicar se o formulário está em processo de envio.
  // Útil para desabilitar o botão de submissão e evitar envios duplicados,
  // melhorando a experiência do usuário.
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado para armazenar mensagens de erro, caso ocorram problemas ao adicionar o produto.
  // Começa como 'null' (sem erro).
  const [error, setError] = useState<string | null>(null);

  // --- Função para Lidar com a Submissão do Formulário (handleSubmit) ---

  /**
   * Função assíncrona chamada quando o formulário de criação é submetido.
   * Ela envia os dados do novo produto para a API.
   * @param {ProdutoFormData} data - Os dados do formulário submetidos.
   */
  const handleSubmit = async (data: ProdutoFormData) => {
    // 1. Inicia o processo de submissão:
    setIsSubmitting(true); // Ativa o estado de submissão
    setError(null); // Limpa qualquer mensagem de erro anterior

    try {
      // 2. Tenta criar o produto na API:
      await criarProduto(data); // Chama a função da API para enviar os dados do novo produto

      // 3. Em caso de sucesso:
      alert('Produto adicionado com sucesso!'); // Exibe um alerta de sucesso para o usuário
      router.push('/produtos'); // Redireciona o usuário para a página de lista de produtos
    } catch (err) {
      // 4. Em caso de erro:
      console.error('Erro ao adicionar produto:', err); // Loga o erro completo no console para depuração
      setError('Falha ao adicionar produto. Tente novamente.'); // Define uma mensagem de erro amigável para exibir na UI
    } finally {
      // 5. Finaliza o processo de submissão:
      // Independentemente de sucesso ou falha, define 'isSubmitting' como 'false'
      // para reabilitar o botão de submissão.
      setIsSubmitting(false);
    }
  };

  // --- Renderização do Componente ---

  return (
    // O componente Layout encapsula o conteúdo da página, fornecendo uma estrutura consistente.
    <Layout>
      <div className="space-y-6"> {/* Espaçamento vertical entre elementos */}
        <h1 className="text-3xl font-bold text-black">Adicionar Novo Produto</h1>

        {/* Renderização condicional de mensagens de erro: */}
        {/* Se a variável 'error' tiver um valor (não for null), exibe uma div de alerta vermelha. */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error} {/* Exibe a mensagem de erro */}
          </div>
        )}

        <div className="max-w-2xl text-black">
          {/* O componente ProdutoForm é renderizado aqui. */}
          <ProdutoForm
            onSubmit={handleSubmit} // Passa a função 'handleSubmit' para o formulário, que será chamada ao submeter
            isEditing={false} // Indica ao formulário que ele está no modo de criação (não edição),
          // o que pode influenciar o texto de botões ou a lógica interna do formulário.
          />
        </div>
      </div>
    </Layout>
  );
}