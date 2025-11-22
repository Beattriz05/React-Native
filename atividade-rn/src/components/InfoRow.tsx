import React from 'react';
import { InfoRowProps } from '../types/user';

export const InfoRow: React.FC<InfoRowProps> = ({ 
  icon, 
  label, 
  value, 
  isLast = false 
}) => {
  return (
    <div className={`flex items-center p-4 ${!isLast ? 'border-b border-slate-100' : ''}`}>
      <div 
        className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mr-4 flex-shrink-0"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-slate-400 uppercase font-semibold tracking-wide">
          {label}
        </p>
        <p className="text-slate-700 font-medium break-words">{value}</p>
      </div>
    </div>
  );
};