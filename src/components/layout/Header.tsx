import React from 'react';

import Image from 'next/image';
import localImage from "../../app/assets/LogoMonitore.png";

import Link from 'next/link';
// Importa o componente 'Link' do Next.js.
// Ele é crucial para a navegação interna otimizada em aplicações Next.js,
// permitindo transições de página rápidas sem recarregar a página inteira.

// React.FC é uma tipagem para componentes funcionais em TypeScript, indicando que é um Componente Funcional React.
// Ele não recebe nenhuma prop neste caso, por isso '<any>' ou 'React.FC<{}>' também poderiam ser usados,
// mas apenas 'React.FC' já é comum para componentes sem props.
const Header: React.FC = () => {
  // O que será renderizado na tela para o cabeçalho.
  return (
    <header className="bg-white shadow">
      {/* Container principal para o conteúdo do cabeçalho. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Outro flex container para agrupar o logo e a navegação principal. */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600 flex items-center">
                Sistema de Estoque <Image className="ml-2" src={localImage} width={60} height={60} alt="Logo da Monitore" />
              </Link>
            </div>
            <nav className="ml-6 flex space-x-8">
              {/* Link de navegação para o Dashboard. */}
              {/* href="/": Aponta para a página inicial. */}
              <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Dashboard
              </Link>
              <Link href="/produtos" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Produtos
              </Link>
              <Link href="/relatorios" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Relatórios
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; // Exporta o componente para que ele possa ser importado e usado em outras partes da aplicação.