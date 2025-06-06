import React, { useState } from 'react';
// Importa o módulo React e o Hook 'useState'.
// - useState: Essencial para gerenciar o estado interno do componente, como os dados do formulário e as mensagens de erro.

import Button from '../ui/Button';
// Importa o componente 'Button' que você provavelmente tem em seu diretório 'ui'.
// Ele fornece botões com estilos consistentes.

import Input from '../ui/Input';
// Importa o componente 'Input' que você provavelmente tem em seu diretório 'ui'.
// Ele fornece campos de entrada com estilos e funcionalidades consistentes (incluindo exibição de erros).

import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
// Importa os componentes de 'Card' e suas subpartes (Header, Title, Content, Footer).
// Usados para estruturar visualmente o formulário dentro de um "cartão", melhorando a organização e o design.

import Link from 'next/link';
// Importa o componente 'Link' do Next.js, usado para navegação otimizada entre as páginas.

// Define a interface para os dados do formulário de produto.
// Isso é útil para garantir a tipagem (TypeScript) e a consistência dos dados que o formulário manipula.
export interface ProdutoFormData {
  id?: string; // Opcional, usado para identificação em edições.
  nome: string; // Obrigatório.
  descricao: string; // Obrigatório.
  preco: number; // Obrigatório, tipo numérico.
  quantidade: number; // Obrigatório, tipo numérico.
  sku?: string; // Opcional, Stock Keeping Unit.
  categoria?: string; // Opcional.
  fornecedor?: string; // Opcional.
}

// Define a interface para as props (propriedades) que o componente ProdutoForm pode receber.
interface ProdutoFormProps {
  initialData?: ProdutoFormData; // Dados iniciais para preencher o formulário (útil para edição). Opcional.
  onSubmit: (data: ProdutoFormData) => void; // Função que será chamada quando o formulário for submetido com dados válidos.
  isEditing?: boolean; // Booleano para indicar se o formulário está no modo de edição (muda o texto dos botões/título). Opcional.
}

// Define os dados padrão para o formulário.
// Usado quando nenhum 'initialData' é fornecido, garantindo que o formulário comece com valores predefinidos.
const defaultFormData: ProdutoFormData = {
  nome: '',
  descricao: '',
  preco: 0,
  quantidade: 0,
  sku: '',
  categoria: '',
  fornecedor: '',
};

// Declaração do componente funcional ProdutoForm.
// React.FC é uma tipagem para componentes funcionais em TypeScript.
// Ele desestrutura as props 'initialData', 'onSubmit' e 'isEditing'.
const ProdutoForm: React.FC<ProdutoFormProps> = ({
  initialData = defaultFormData, // Se 'initialData' não for passado, usa 'defaultFormData'.
  onSubmit,
  isEditing = false, // Se 'isEditing' não for passado, assume 'false'.
}) => {
  // Estado para armazenar os dados atuais do formulário.
  // Começa com os dados fornecidos em 'initialData'.
  const [formData, setFormData] = useState<ProdutoFormData>(initialData);

  // Estado para armazenar mensagens de erro de validação.
  // Partial<Record<keyof ProdutoFormData, string>>: Indica que é um objeto onde as chaves são nomes de campos do ProdutoFormData,
  // e os valores são strings (as mensagens de erro). 'Partial' permite que nem todas as chaves estejam presentes.
  const [errors, setErrors] = useState<Partial<Record<keyof ProdutoFormData, string>>>({});

  // Função `handleChange` é chamada toda vez que o valor de um campo de entrada muda.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Extrai o 'name' (nome do campo) e 'value' (valor digitado) do evento.

    // Verifica se o campo é 'preco' ou 'quantidade' para converter o valor para número.
    if (name === 'preco' || name === 'quantidade') {
      setFormData({
        ...formData, // Mantém os outros campos do formulário.
        [name]: name === 'preco' ? parseFloat(value) : parseInt(value, 10),
        // Se for 'preco', converte para número decimal (parseFloat).
        // Se for 'quantidade', converte para número inteiro (parseInt).
        // [name]: Isso usa a sintaxe de propriedade computada do JavaScript para atualizar a propriedade correta.
      });
    } else {
      // Para outros campos (texto), atualiza diretamente o valor.
      setFormData({
        ...formData, // Mantém os outros campos do formulário.
        [name]: value, // Atualiza o campo específico.
      });
    }
  };

  // Função `validate` para verificar a validade dos dados do formulário.
  // Retorna true se o formulário for válido, false caso contrário.
  const validate = (): boolean => {
    // Cria um objeto vazio para armazenar os novos erros encontrados.
    const newErrors: Partial<Record<keyof ProdutoFormData, string>> = {};

    // Validação do campo 'nome': verifica se está vazio ou contém apenas espaços em branco.
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório'; // Adiciona uma mensagem de erro se o nome for inválido.
    }

    // Validação do campo 'preco': verifica se é negativo.
    if (formData.preco < 0) {
      newErrors.preco = 'Preço não pode ser negativo'; // Adiciona mensagem de erro.
    }

    // Validação do campo 'quantidade': verifica se é negativo.
    if (formData.quantidade < 0) {
      newErrors.quantidade = 'Quantidade não pode ser negativa'; // Adiciona mensagem de erro.
    }

    // Atualiza o estado de erros com os novos erros encontrados.
    setErrors(newErrors);
    // Retorna true se não houver erros (o objeto newErrors estiver vazio), false caso contrário.
    return Object.keys(newErrors).length === 0;
  };

  // Função `handleSubmit` é chamada quando o formulário é submetido.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário (recarregar a página).

    // Chama a função de validação.
    if (validate()) {
      // Se o formulário for válido, chama a função 'onSubmit' (passada via props)
      // com os dados do formulário como argumento.
      onSubmit(formData);
    }
  };

  // --- Renderização da Interface do Usuário ---
  return (
    // O formulário é envolto por um componente Card para um layout agradável.
    <Card>
      <CardHeader>
        {/* O título do Card muda dependendo do modo (edição ou adição). */}
        <CardTitle>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</CardTitle>
      </CardHeader>
      {/* O formulário HTML, com o evento onSubmit vinculado à função handleSubmit. */}
      <form onSubmit={handleSubmit}>
        <CardContent>
          {/* Componente Input para o campo 'Nome do Produto'. */}
          {/* id, name, label: Props padrão para o Input. */}
          {/* value: Vincula o valor do Input ao estado 'formData.nome'. */}
          {/* onChange: Vincula a função handleChange para atualizar o estado quando o input muda. */}
          {/* error: Passa a mensagem de erro específica para este campo. */}
          {/* required: Atributo HTML para validação básica de campo obrigatório. */}
          <Input
            id="nome"
            name="nome"
            label="Nome do Produto"
            value={formData.nome}
            onChange={handleChange}
            error={errors.nome}
            required
          />

          {/* Componente Input para o campo 'Descrição'. */}
          <Input
            id="descricao"
            name="descricao"
            label="Descrição"
            value={formData.descricao}
            onChange={handleChange}
          />

          {/* Componente Input para o campo 'Preço'. */}
          {/* type="number": Define o tipo de entrada como número. */}
          {/* step="0.01": Permite valores decimais com duas casas. */}
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

          {/* Componente Input para o campo 'Quantidade em Estoque'. */}
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

          {/* Componente Input para o campo 'SKU'. */}
          <Input
            id="sku"
            name="sku"
            label="SKU (Código)"
            value={formData.sku}
            onChange={handleChange}
          />

          {/* Componente Input para o campo 'Categoria'. */}
          <Input
            id="categoria"
            name="categoria"
            label="Categoria"
            value={formData.categoria}
            onChange={handleChange}
          />

          {/* Componente Input para o campo 'Fornecedor'. */}
          <Input
            id="fornecedor"
            name="fornecedor"
            label="Fornecedor"
            value={formData.fornecedor}
            onChange={handleChange}
          />
        </CardContent>

        <CardFooter>
          {/* Link para voltar à lista de produtos. */}
          {/* className="mr-79 px-2 py-2 bg-gray-200 text-black rounded": Estilização com Tailwind CSS. */}
          {/* O 'mr-79' parece um espaçamento um pouco grande, talvez seja um typo e queria ser 'mr-4' ou algo assim, mas mantive como está. */}
          <Link href="/produtos" className="mr-79 px-2 py-2 bg-gray-200 text-black rounded">
            Voltar para a Lista
          </Link>
          {/* Botão de submissão do formulário. */}
          {/* type="submit": Essencial para que o botão acione o onSubmit do formulário. */}
          {/* variant="primary": Estilo primário do botão. */}
          {/* O texto do botão muda dependendo do modo (edição ou adição). */}
          <Button type="submit" variant="primary">
            {isEditing ? 'Atualizar Produto' : 'Adicionar Produto'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProdutoForm; // Exporta o componente para que ele possa ser usado em outras partes da aplicação.