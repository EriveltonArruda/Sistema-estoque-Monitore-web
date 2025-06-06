export interface Produto {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  sku?: string;
  categoria?: string;
  fornecedor?: string;
  dataEntrada: string;
  dataAtualizacao: string;
}

export type ProdutoInput = Omit<Produto, 'id' | 'dataEntrada' | 'dataAtualizacao'>;

