import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { AppHeaderProps } from '../types/user';

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  showBack = false, 
  onBack 
}) => {
  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-600 text-white p-4 shadow-lg sticky top-0 z-10 flex items-center h-16">
      {showBack && (
        <button 
          onClick={onBack}
          className="mr-4 p-2 hover:bg-purple-500 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          aria-label="Voltar para lista de contatos"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="text-xl font-semibold tracking-tight flex-1">{title}</h1>
    </header>
  );
};