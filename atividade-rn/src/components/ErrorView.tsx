import React from 'react';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({ message, onRetry }) => {
  return (
    <div 
      className="flex-1 flex flex-col justify-center items-center bg-slate-50 min-h-[50vh] p-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md text-center">
        <p className="text-red-700 text-sm mb-3">{message}</p>
        <button 
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Tentar carregar novamente"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );
};