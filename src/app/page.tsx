'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { listarProdutos } from '@/services/api';
import { Produto } from '@/types/produto';

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await listarProdutos();
        setProdutos(data);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        setError('Falha ao carregar dados. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  // Calcular estatísticas
  const totalProdutos = produtos.length;
  const valorTotalEstoque = produtos.reduce((total, produto) => {
    return total + (produto.preco * produto.quantidade);
  }, 0);
  const produtosEstoqueBaixo = produtos.filter(produto => produto.quantidade < 5).length;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-black">Dashboard</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64 text-black">
            <p>Carregando dados...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total de Produtos</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-black">{totalProdutos}</p>
                  <p className="text-sm text-gray-500 mt-2">produtos cadastrados</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Valor Total em Estoque</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-black">R$ {valorTotalEstoque.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2">em produtos</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Produtos com Estoque Baixo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-black">{produtosEstoqueBaixo}</p>
                  <p className="text-sm text-gray-500 mt-2">produtos com estoque baixo</p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ações Rápidas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/produtos/novo" className="block">
                  <Button variant="primary" className="w-full">
                    Adicionar Novo Produto
                  </Button>
                </Link>

                <Link href="/produtos" className="block">
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

