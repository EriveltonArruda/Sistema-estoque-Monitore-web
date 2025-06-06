'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { listarProdutos } from '@/services/api';
import { Produto } from '@/types/produto';

export default function RelatoriosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gerando, setGerando] = useState(false);

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

  const handleGerarPDF = async () => {
    try {
      setGerando(true);
      
      // Abrir o endpoint em uma nova aba para download do PDF
      window.open('/api/relatorios/pdf', '_blank');
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
      alert('Erro ao gerar o relatório PDF. Tente novamente.');
    } finally {
      setGerando(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Relatórios</h1>
          <Button 
            variant="primary" 
            onClick={handleGerarPDF}
            disabled={loading || gerando}
          >
            {gerando ? 'Gerando...' : 'Gerar Relatório PDF'}
          </Button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p>Carregando dados...</p>
          </div>
        ) : (
          <>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Prévia do Relatório</h2>
              <p className="text-sm text-gray-500 mb-6">
                O relatório PDF incluirá as seguintes informações:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Total de Produtos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{totalProdutos}</p>
                    <p className="text-sm text-gray-500 mt-2">produtos cadastrados</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Valor Total em Estoque</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">R$ {valorTotalEstoque.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-2">em produtos</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Produtos com Estoque Baixo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{produtosEstoqueBaixo}</p>
                    <p className="text-sm text-gray-500 mt-2">produtos com menos de 5 unidades</p>
                  </CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-semibold mb-3">Lista de Produtos</h3>
              <div className="overflow-x-auto">
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

