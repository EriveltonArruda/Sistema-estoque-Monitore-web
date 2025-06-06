import React from 'react';
// Importa o módulo React. Como este componente é puramente de exibição e não usa estado ou efeitos,
// apenas o React é suficiente.

import Link from 'next/link';
// Importa o componente 'Link' do Next.js.
// Ele é crucial para a navegação interna otimizada em aplicações Next.js,
// permitindo transições de página rápidas sem recarregar a página inteira.

// Define o componente funcional 'Header'.
// React.FC é uma tipagem para componentes funcionais em TypeScript, indicando que é um Componente Funcional React.
// Ele não recebe nenhuma prop neste caso, por isso '<any>' ou 'React.FC<{}>' também poderiam ser usados,
// mas apenas 'React.FC' já é comum para componentes sem props.
const Header: React.FC = () => {
  // O que será renderizado na tela para o cabeçalho.
  return (
    // O elemento <header> HTML semântico.
    // className="bg-white shadow": Aplica estilos Tailwind CSS para um fundo branco e uma sombra sutil,
    // dando um efeito de elevação ao cabeçalho.
    <header className="bg-white shadow">
      {/* Container principal para o conteúdo do cabeçalho. */}
      {/* max-w-7xl: Define uma largura máxima para o conteúdo. */}
      {/* mx-auto: Centraliza o container horizontalmente. */}
      {/* px-4 sm:px-6 lg:px-8: Define o preenchimento horizontal (padding) em diferentes tamanhos de tela (responsivo). */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container para alinhar itens horizontalmente e definir a altura. */}
        {/* flex: Habilita o flexbox. */}
        {/* justify-between: Espaça os itens ao máximo, colocando o primeiro no início e o último no fim. */}
        {/* h-16: Define uma altura fixa de 4 rem (16 * 0.25rem = 4rem). */}
        <div className="flex justify-between h-16">
          {/* Outro flex container para agrupar o logo e a navegação principal. */}
          <div className="flex">
            {/* Flex item para o logo, com propriedades para centralizá-lo verticalmente. */}
            {/* flex-shrink-0: Impede que o item encolha. */}
            {/* flex items-center: Habilita flexbox e centraliza itens verticalmente. */}
            <div className="flex-shrink-0 flex items-center">
              {/* Componente 'Link' do Next.js para o logo. */}
              {/* href="/": Aponta para a página inicial (dashboard). */}
              {/* className="text-xl font-bold text-blue-600": Estilos para o texto do logo (tamanho, negrito, cor azul). */}
              <Link href="/" className="text-xl font-bold text-blue-600">
                Sistema de Estoque {/* Texto do logo. */}
              </Link>
            </div>
            {/* Elemento <nav> HTML semântico para a navegação principal. */}
            {/* ml-6: Margem esquerda para separar da logo. */}
            {/* flex space-x-8: Habilita flexbox e adiciona espaçamento horizontal entre os itens de navegação. */}
            <nav className="ml-6 flex space-x-8">
              {/* Link de navegação para o Dashboard. */}
              {/* href="/": Aponta para a página inicial. */}
              {/* inline-flex items-center: Habilita flexbox para alinhar ícones ou texto, e centraliza verticalmente. */}
              {/* px-1 pt-1: Preenchimento horizontal e superior. */}
              {/* border-b-2 border-transparent: Borda inferior transparente de 2px (para o hover effect). */}
              {/* text-sm font-medium text-gray-500: Estilos de texto (tamanho, peso, cor cinza). */}
              {/* hover:text-gray-700 hover:border-gray-300: Estilos ao passar o mouse (muda cor do texto e da borda). */}
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Dashboard {/* Texto do link. */}
              </Link>
              {/* Link de navegação para a página de Produtos. */}
              <Link href="/produtos" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Produtos {/* Texto do link. */}
              </Link>
              {/* Link de navegação para a página de Relatórios. */}
              <Link href="/relatorios" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Relatórios {/* Texto do link. */}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; // Exporta o componente para que ele possa ser importado e usado em outras partes da aplicação.