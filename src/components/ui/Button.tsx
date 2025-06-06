import React from 'react';
// Importa o módulo React. Como este componente é um componente funcional e não usa Hooks de estado ou efeito,
// apenas a importação base do React é necessária.

import { twMerge } from 'tailwind-merge';
// Importa a função `twMerge` da biblioteca 'tailwind-merge'.
// Esta função é super útil para combinar classes Tailwind CSS de forma inteligente,
// resolvendo conflitos (ex: se você tiver `p-4` e `p-8`, ela manterá o `p-8`).
// Isso ajuda a manter seus estilos consistentes e sem surpresas.

// Define a interface para as propriedades (props) que o componente Button pode receber.
interface ButtonProps {
  children: React.ReactNode; // O conteúdo que será exibido dentro do botão (texto, ícones, etc.).
  variant?: 'primary' | 'secondary' | 'danger' | 'success'; // Define o estilo visual do botão (cor, fundo). É opcional.
  size?: 'sm' | 'md' | 'lg'; // Define o tamanho do botão (pequeno, médio, grande). É opcional.
  className?: string; // Classes CSS adicionais que podem ser passadas de fora para personalizar ainda mais o botão. É opcional.
  onClick?: () => void; // Função que será executada quando o botão for clicado. É opcional.
  type?: 'button' | 'submit' | 'reset'; // O tipo do botão HTML (especialmente importante em formulários). É opcional.
  disabled?: boolean; // Booleano para desabilitar o botão. É opcional.
}

// Define o componente funcional 'Button'.
// Desestrutura as props com valores padrão, caso não sejam fornecidas.
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary', // Padrão: 'primary' se nenhum variante for especificado.
  size = 'md',       // Padrão: 'md' (médio) se nenhum tamanho for especificado.
  className = '',    // Padrão: string vazia para classes adicionais.
  onClick,           // Função de clique (sem valor padrão, pode ser undefined).
  type = 'button',   // Padrão: 'button' se nenhum tipo for especificado.
  disabled = false,  // Padrão: 'false' (botão habilitado) se não for especificado.
}) => {
  // Define os estilos base que se aplicam a TODOS os botões, independentemente da variante ou tamanho.
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

  // Objeto que mapeia cada 'variant' para um conjunto específico de classes Tailwind CSS.
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500',
  };

  // Objeto que mapeia cada 'size' para um conjunto específico de classes Tailwind CSS.
  // Isso define a altura, preenchimento (padding) e tamanho da fonte para cada tamanho de botão.
  // - h-8 px-3 text-xs: Exemplo de estilos para 'sm' (small).
  const sizeStyles = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 py-2',
    lg: 'h-12 px-6 py-3 text-lg',
  };

  // Renderiza o elemento HTML <button>.
  return (
    <button
      type={type} // Define o atributo 'type' do botão (button, submit, reset).
      // Combina todas as classes CSS usando `twMerge`.
      // `twMerge` garante que as classes sejam aplicadas corretamente e que as duplicatas/conflitos sejam resolvidos.
      // A ordem é importante: baseStyles -> variantStyles -> sizeStyles -> className (para classes personalizadas sobrescreverem).
      className={twMerge(
        baseStyles,         // Classes base aplicadas a todos os botões.
        variantStyles[variant], // Classes específicas da variante (cor, hover).
        sizeStyles[size],     // Classes específicas do tamanho (altura, padding, texto).
        className             // Quaisquer classes adicionais passadas via prop 'className'.
      )}
      onClick={onClick}   // Atribui a função de clique ao evento 'onClick'.
      disabled={disabled} // Atribui o atributo 'disabled' ao botão.
    >
      {children} {/* Renderiza o conteúdo (texto/ícone) dentro do botão. */}
    </button>
  );
};

export default Button; // Exporta o componente Button para que ele possa ser importado e usado em outras partes da aplicação.