import React from 'react';

import Header from './Header';
// Este 'Header' é o cabeçalho de navegação que será exibido no topo de todas as páginas que usam este layout.

// Define a interface para as props (propriedades) que o componente Layout pode receber.
interface LayoutProps {
  // 'children' é uma prop especial do React. Ela representa o conteúdo que será
  // passado para o componente Layout entre suas tags de abertura e fechamento.
  // React.ReactNode é um tipo flexível que pode ser qualquer coisa que o React possa renderizar (elementos JSX, strings, números, arrays, etc.).
  children: React.ReactNode;
}

// Define o componente funcional 'Layout'.
// React.FC<LayoutProps> é uma tipagem para componentes funcionais em TypeScript,
// indicando que este é um Componente Funcional React que aceita as props definidas em 'LayoutProps'.
// Ele desestrutura a prop 'children' diretamente dos argumentos.
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Renderiza o componente Header. Ele ficará fixo no topo de todas as páginas. */}
      <Header />

      {/* Define a área principal de conteúdo da página. */}
      <main className="py-10">
        {/* Um contêiner interno para o conteúdo principal. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Renderiza o conteúdo 'children' que é passado para o componente Layout. */}
          {/* Este é o slot onde o conteúdo específico de cada página (como o Dashboard, formulário de produto, etc.) será inserido. */}
          {children}
        </div>
      </main>
      {/* (Opcional) Você pode adicionar um rodapé aqui se quiser que ele apareça em todas as páginas. */}
      {/* Exemplo: */}
      {/* <footer className="mt-8 text-center text-gray-500 text-sm py-4">
            &copy; {new Date().getFullYear()} Meu Sistema de Estoque
          </footer> */}
    </div>
  );
};

export default Layout; // Exporta o componente Layout para que ele possa ser importado e usado em outras páginas ou layouts.