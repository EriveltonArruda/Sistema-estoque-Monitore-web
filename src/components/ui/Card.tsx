import React from 'react';
// Importa o módulo React. Como este arquivo define componentes funcionais para exibir UI,
// a importação base do React é suficiente.

import { twMerge } from 'tailwind-merge';
// Importa a função `twMerge` da biblioteca 'tailwind-merge'.
// Esta função é usada para combinar classes CSS do Tailwind de forma inteligente,
// prevenindo conflitos e garantindo que os estilos aplicados sejam os corretos.
// Por exemplo, se você tiver `p-4` e `p-8` em diferentes lugares, `twMerge` garantirá
// que `p-8` seja o estilo final, evitando estilos inesperados.

// Define a interface para as propriedades (props) que o componente Card (e seus subcomponentes) pode receber.
interface CardProps {
  children: React.ReactNode; // Conteúdo que será renderizado dentro do Card. Pode ser qualquer coisa que o React possa renderizar (elementos, texto, etc.).
  className?: string; // Classes CSS adicionais que podem ser passadas de fora para personalizar o estilo do Card. É opcional.
}

// Define o componente funcional principal 'Card'.
// React.FC<CardProps> tipa o componente como um Componente Funcional React que aceita as props definidas em 'CardProps'.
// Ele desestrutura as props 'children' e 'className', com 'className' tendo um valor padrão de string vazia.
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    // Usa `twMerge` para combinar as classes base do Card com quaisquer classes adicionais fornecidas via `className`.
    <div className={twMerge('bg-white rounded-lg shadow-md p-6', className)}>
      {children} {/* Renderiza o conteúdo (filhos) dentro do Card. */}
    </div>
  );
};

// --- Subcomponentes do Card ---
// Estes são componentes exportados individualmente, permitindo que você os use como:
// <Card><CardHeader>...</CardHeader><CardContent>...</CardContent></Card>

// Componente 'CardHeader': Usado para a seção de cabeçalho do Card.
export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge('mb-4', className)}>
      {children}
    </div>
  );
};

// Componente 'CardTitle': Usado para o título dentro do CardHeader.
export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <h3 className={twMerge('text-xl font-semibold text-black', className)}>
      {children}
    </h3>
  );
};

// Componente 'CardContent': Usado para a área de conteúdo principal do Card.
export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    // Um <div> simples para envolver o conteúdo.
    // Atualmente, não tem classes base específicas, mas permite a adição de classes via `className`.
    <div className={twMerge('', className)}>
      {children}
    </div>
  );
};

// Componente 'CardFooter': Usado para a seção de rodapé do Card, tipicamente para botões de ação.
export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={twMerge('mt-4 pt-4 border-t flex justify-end', className)}>
      {children}
    </div>
  );
};

export default Card; // Exporta o componente Card principal como exportação padrão.
// Isso significa que você pode importá-lo como `import Card from './Card'`
// e os subcomponentes como `import { CardHeader, CardTitle } from './Card'`.