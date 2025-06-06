import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import Link from 'next/link';

export interface ProdutoFormData {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  sku?: string;
  categoria?: string;
  fornecedor?: string;
}

interface ProdutoFormProps {
  initialData?: ProdutoFormData;
  onSubmit: (data: ProdutoFormData) => void;
  isEditing?: boolean;
}

const defaultFormData: ProdutoFormData = {
  nome: '',
  descricao: '',
  preco: 0,
  quantidade: 0,
  sku: '',
  categoria: '',
  fornecedor: '',
};

const ProdutoForm: React.FC<ProdutoFormProps> = ({
  initialData = defaultFormData,
  onSubmit,
  isEditing = false,
}) => {
  const [formData, setFormData] = useState<ProdutoFormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof ProdutoFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Converte valores numéricos
    if (name === 'preco' || name === 'quantidade') {
      setFormData({
        ...formData,
        [name]: name === 'preco' ? parseFloat(value) : parseInt(value, 10),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProdutoFormData, string>> = {};

    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    }

    if (formData.preco < 0) {
      newErrors.preco = 'Preço não pode ser negativo';
    }

    if (formData.quantidade < 0) {
      newErrors.quantidade = 'Quantidade não pode ser negativa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            id="nome"
            name="nome"
            label="Nome do Produto"
            value={formData.nome}
            onChange={handleChange}
            error={errors.nome}
            required
          />

          <Input
            id="descricao"
            name="descricao"
            label="Descrição"
            value={formData.descricao}
            onChange={handleChange}
          />

          <Input
            id="preco"
            name="preco"
            label="Preço (R$)"
            type="number"
            step="0.01"
            value={formData.preco}
            onChange={handleChange}
            error={errors.preco}
            required
          />

          <Input
            id="quantidade"
            name="quantidade"
            label="Quantidade em Estoque"
            type="number"
            value={formData.quantidade}
            onChange={handleChange}
            error={errors.quantidade}
            required
          />

          <Input
            id="sku"
            name="sku"
            label="SKU (Código)"
            value={formData.sku}
            onChange={handleChange}
          />

          <Input
            id="categoria"
            name="categoria"
            label="Categoria"
            value={formData.categoria}
            onChange={handleChange}
          />

          <Input
            id="fornecedor"
            name="fornecedor"
            label="Fornecedor"
            value={formData.fornecedor}
            onChange={handleChange}
          />
        </CardContent>

        <CardFooter>
          <Link href="/produtos" className="mr-79 px-2 py-2 bg-gray-200 text-black rounded">Voltar para a Lista</Link>
          <Button type="submit" variant="primary">
            {isEditing ? 'Atualizar Produto' : 'Adicionar Produto'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProdutoForm;

