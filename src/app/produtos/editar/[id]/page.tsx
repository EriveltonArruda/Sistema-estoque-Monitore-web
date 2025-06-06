
'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProdutoForm, { ProdutoFormData } from '@/components/forms/ProdutoForm';
import { useRouter } from 'next/navigation';
import { obterProduto, atualizarProduto } from '@/services/api';

export default function EditarProdutoPage({ params }: { params: { id: string } }) {
  const [produto, setProduto] = useState<ProdutoFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const data = await obterProduto(params.id);
        setProduto(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar produto:', err);
        setError('Falha ao carregar dados do produto. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [params.id]);

  const handleSubmit = async (data: ProdutoFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await atualizarProduto(params.id, data);
      alert('Produto atualizado com sucesso!');
      router.push(`/produtos/${params.id}`);
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      setError('Falha ao atualizar produto. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64 text-black">
          <p>Carregando...</p>
        </div>
      </Layout>
    );
  }

  if (error || !produto) {
    return (
      <Layout>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Produto não encontrado'}
        </div>
        <div className="mt-4 text-black">
          <button
            className="px-4 py-2 bg-gray-200 text-black rounded"
            onClick={() => router.push('/produtos')}
          >
            Voltar para Lista
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 text-black">
        <h1 className="text-3xl font-bold text-black">Editar Produto</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="max-w-2xl text-black">
          <ProdutoForm
            initialData={produto}
            onSubmit={handleSubmit}
            isEditing={true}
          />
        </div>
      </div>
    </Layout>
  );
}


