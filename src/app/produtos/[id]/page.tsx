
'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { Produto } from '@/types/produto';
import { obterProduto, excluirProduto } from '@/services/api';

export default function DetalhesProdutoPage({ params }: { params: { id: string } }) {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await excluirProduto(params.id);
        alert('Produto excluído com sucesso!');
        router.push('/produtos');
      } catch (err) {
        console.error('Erro ao excluir produto:', err);
        alert('Erro ao excluir produto. Tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
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
          <Button
            variant="secondary"
            onClick={() => router.push('/produtos')}
          >
            Voltar para Lista
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Detalhes do Produto</h1>
          <div className="flex space-x-2">
            <Button
              variant="primary"
              onClick={() => router.push(`/produtos/editar/${produto.id}`)}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Excluir
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{produto.nome}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Descrição</h3>
                <p>{produto.descricao || 'Sem descrição'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">SKU</h3>
                <p>{produto.sku || 'Não informado'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Preço</h3>
                <p className="text-lg font-semibold">R$ {produto.preco.toFixed(2)}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Quantidade em Estoque</h3>
                <p className="text-lg font-semibold">{produto.quantidade}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Categoria</h3>
                <p>{produto.categoria || 'Não categorizado'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Fornecedor</h3>
                <p>{produto.fornecedor || 'Não informado'}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Data de Entrada</h3>
                <p>{new Date(produto.dataEntrada).toLocaleDateString('pt-BR')}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Última Atualização</h3>
                <p>{new Date(produto.dataAtualizacao).toLocaleDateString('pt-BR')}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="secondary"
              onClick={() => router.push('/produtos')}
            >
              Voltar para Lista
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}


