import React from 'react';
// Importa o módulo React. É o mínimo necessário para criar um componente funcional React.

import { twMerge } from 'tailwind-merge';
// Importa a função `twMerge` da biblioteca 'tailwind-merge'.
// Esta função é utilizada para combinar de forma inteligente as classes CSS do Tailwind.
// Ela é crucial para evitar conflitos de estilo quando classes base e classes passadas via props se sobrepõem.
// Por exemplo, se uma classe define um padding e outra também, `twMerge` garante que a mais específica prevaleça.

// Define a interface para as propriedades (props) que o componente Input pode receber.
// `extends React.InputHTMLAttributes<HTMLInputElement>`: Isso é muito importante!
// Ele faz com que o componente `InputProps` herde todas as propriedades HTML padrão que um elemento `<input>` nativo pode ter
// (como `type`, `name`, `value`, `onChange`, `onBlur`, `placeholder`, `required`, etc.).
// Isso permite que você passe qualquer atributo HTML padrão para o seu `Input` customizado.
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // Opcional: O texto do rótulo que será exibido acima do campo de entrada.
  error?: string; // Opcional: Uma mensagem de erro para ser exibida abaixo do campo.
  className?: string; // Opcional: Classes CSS adicionais passadas de fora para personalizar o estilo do input.
}

// Define o componente funcional 'Input'.
// Ele desestrutura as props que recebe: `label`, `error`, `className`, `id` (que é extraído para uso no label)
// e o resto das props (`...props`) que são atributos HTML padrão (como `type`, `name`, `value`, etc.).
const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '', // Define um valor padrão de string vazia para `className` se não for fornecido.
  id,               // O `id` é extraído para ser usado no `htmlFor` do label e no próprio input.
  ...props          // Coleta todas as outras props restantes (ex: `type`, `name`, `value`, `onChange`, etc.).
}) => {
  // Renderiza um `div` que serve como contêiner para o rótulo, o campo de entrada e a mensagem de erro.
  // `mb-4`: Adiciona uma margem inferior de 4 unidades (16px), separando este grupo de input do próximo.
  return (
    <div className="mb-4">
      {/* Renderização Condicional do Rótulo */}
      {/* Se `label` tiver um valor (não for nulo ou vazio), o elemento `<label>` será renderizado. */}
      {label && (
        <label
          htmlFor={id} // Atributo `htmlFor` é essencial para acessibilidade, ligando o rótulo ao i
          className="block text-sm font-medium text-gray-900 mb-1"
        >
          {label} {/* Exibe o texto do rótulo. */}
        </label>
      )}
      {/* O elemento `<input>` HTML nativo. */}
      <input
        id={id} // Define o `id` do input, correspondendo ao `htmlFor` do label.
        // Combina todas as classes CSS usando `twMerge`.
        className={twMerge(
          'w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
          error ? 'border-red-500' : 'border-gray-300',
          className // Quaisquer classes adicionais passadas via prop `className` (terão prioridade devido ao `twMerge`).
        )}
        {...props} // Espalha todas as outras props recebidas (como `type`, `name`, `value`, `onChange`, `required`, etc.)
      // diretamente para o elemento `<input>` nativo. Isso o torna altamente flexível.
      />
      {/* Renderização Condicional da Mensagem de Erro */}
      {/* Se `error` tiver um valor, o parágrafo `<p>` com a mensagem de erro será exibido. */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input; // Exporta o componente Input para que ele possa ser importado e usado em outras partes da aplicação.