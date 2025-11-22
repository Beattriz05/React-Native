import React from 'react';

export const LoadingView: React.FC = () => {
  return (
    <div 
      className="flex-1 flex flex-col justify-center items-center bg-slate-50 min-h-[50vh]"
      role="status"
      aria-live="polite"
      aria-label="Carregando contatos"
    >
      <div 
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mb-4"
        aria-hidden="true"
      ></div>
      <p className="text-slate-500 text-sm">Carregando contatos...</p>
    </div>
  );
};