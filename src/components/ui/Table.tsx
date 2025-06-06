import React from 'react';
// Importa o módulo React. Essencial para a criação de componentes funcionais.

import { twMerge } from 'tailwind-merge';
// Importa a função `twMerge` da biblioteca 'tailwind-merge'.
// Esta função é usada para combinar classes CSS do Tailwind de maneira inteligente,
// resolvendo quaisquer conflitos que possam surgir quando diferentes classes são aplicadas.
// Isso garante que os estilos finais sejam os esperados e evita sobreposições indesejadas.

// Define a interface para as propriedades (props) que o componente Table e seus subcomponentes podem receber.
interface TableProps {
  children: React.ReactNode; // O conteúdo que será renderizado dentro do componente (ex: TableHeader, TableBody).
  className?: string; // Classes CSS adicionais que podem ser passadas de fora para personalizar o estilo. É opcional.
}

// Define o componente funcional principal 'Table'.
// Ele atua como um contêiner para toda a estrutura da tabela.
const Table: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    // Um div que garante que a tabela seja responsiva e tenha rolagem horizontal se o conteúdo for muito largo.
    // `w-full`: Faz o div ocupar 100% da largura disponível.
    // `overflow-auto`: Adiciona barras de rolagem (scroll) se o conteúdo exceder as dimensões do contêiner.
    <div className="w-full overflow-auto">
      {/* O elemento HTML `<table>` nativo. */}
      {/* `twMerge`: Combina as classes base da tabela com quaisquer classes adicionais fornecidas via `className`. */}
      {/* `w-full`: A tabela ocupa 100% da largura de seu contêiner. */}
      {/* `caption-bottom`: Posiciona o texto da legenda da tabela (se houver) na parte inferior. */}
      {/* `text-sm`: Define o tamanho da fonte para pequeno. */}
      <table className={twMerge('w-full caption-bottom text-sm', className)}>
        {children} {/* Renderiza o conteúdo (geralmente TableHeader e TableBody) dentro da tabela. */}
      </table>
    </div>
  );
};

// --- Subcomponentes da Tabela ---
// Estes são componentes exportados individualmente para construir a tabela parte por parte.

// Componente `TableHeader`: Representa a seção do cabeçalho da tabela (`<thead>`).
export const TableHeader: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    // `<thead>`: O elemento HTML para o cabeçalho da tabela.
    // `twMerge`: Combina classes.
    // `[&_tr]:border-b`: Uma classe especial do Tailwind CSS que aplica uma borda inferior (`border-b`)
    // a todas as tags `<tr>` que são filhas diretas deste `<thead>`. Isso cria linhas divisórias no cabeçalho.
    <thead className={twMerge('[&_tr]:border-b', className)}>
      {children}
    </thead>
  );
};

// Componente `TableBody`: Representa a seção do corpo da tabela (`<tbody>`).
export const TableBody: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    // `<tbody>`: O elemento HTML para o corpo da tabela.
    // `twMerge`: Combina classes.
    // `[&_tr:last-child]:border-0`: Aplica `border-0` (sem borda) à última `<tr>` dentro deste `<tbody>`.
    // Isso é útil para evitar uma borda dupla se o TableRow já tiver uma borda inferior e você não quiser uma no final da tabela.
    <tbody className={twMerge('[&_tr:last-child]:border-0', className)}>
      {children}
    </tbody>
  );
};

// Componente `TableRow`: Representa uma linha individual da tabela (`<tr>`).
export const TableRow: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    // `twMerge`: Combina classes.
    <tr className={twMerge('border-b transition-colors hover:bg-gray-50 text-black', className)}>
      {children}
    </tr>
  );
};

// Componente `TableHead`: Representa uma célula de cabeçalho dentro de uma linha de cabeçalho (`<th>`).
export const TableHead: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    // `twMerge`: Combina classes.
    <th className={twMerge('h-12 px-4 text-left align-middle font-medium text-black', className)}>
      {children}
    </th>
  );
};

// Componente `TableCell`: Representa uma célula de dados dentro de uma linha (`<td>`).
export const TableCell: React.FC<TableProps> = ({ children, className = '' }) => {
  return (
    <td className={twMerge('p-4 align-middle text-black', className)}>
      {children}
    </td>
  );
};

export default Table; // Exporta o componente Table principal como exportação padrão.
// Isso permite que você o importe como `import Table from './Table'`
// e os subcomponentes como `import { TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table'`.