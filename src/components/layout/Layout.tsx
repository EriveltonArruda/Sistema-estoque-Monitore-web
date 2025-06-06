import React from 'react';
// Importa o módulo React. Como este componente é um componente funcional simples que
// apenas renderiza outros componentes e não gerencia estado próprio ou efeitos,
// a importação base do React é suficiente.

import Header from './Header';
// Importa o componente 'Header' de um arquivo local (neste caso, no mesmo diretório ou em um subdiretório 'layout/Header').
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
  // O que será renderizado na tela para o layout.
  return (
    // Um contêiner <div> principal que envolve todo o conteúdo da página.
    // className="min-h-screen": Garante que o div tenha pelo menos a altura total da tela (útil para que o rodapé fique no final).
    // bg-gray-100: Define uma cor de fundo cinza claro para toda a página (Tailwind CSS).
    // text-black: Define a cor do texto padrão dentro deste layout como preto.
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Renderiza o componente Header. Ele ficará fixo no topo de todas as páginas. */}
      <Header />

      {/* Define a área principal de conteúdo da página. */}
      {/* className="py-10": Adiciona preenchimento vertical (padding) de 10 unidades Tailwind (40px) acima e abaixo do conteúdo principal. */}
      <main className="py-10">
        {/* Um contêiner interno para o conteúdo principal. */}
        {/* max-w-7xl: Define uma largura máxima para o conteúdo (limita a largura em telas grandes). */}
        {/* mx-auto: Centraliza este contêiner horizontalmente na tela. */}
        {/* px-4 sm:px-6 lg:px-8: Define o preenchimento horizontal (padding) em diferentes tamanhos de tela (responsivo). */}
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