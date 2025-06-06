'use client';

import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProdutoForm, { ProdutoFormData } from '@/components/forms/ProdutoForm';
import { useRouter } from 'next/navigation';
import { criarProduto } from '@/services/api';

export default function NovoProdutoPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProdutoFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await criarProduto(data);
      alert('Produto adicionado com sucesso!');
      router.push('/produtos');
    } catch (err) {
      console.error('Erro ao adicionar produto:', err);
      setError('Falha ao adicionar produto. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">Adicionar Novo Produto</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div className="max-w-2xl text-black">
          <ProdutoForm
            onSubmit={handleSubmit}
            isEditing={false}
          />
        </div>
      </div>
    </Layout>
  );
}

