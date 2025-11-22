import React from 'react';
import { MapPin, ChevronRight } from 'lucide-react';
import { UserCardProps } from '../types/user';

export const UserCard: React.FC<UserCardProps> = React.memo(({ user, onPress }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onPress(user);
    }
  };

  return (
    <article 
      onClick={() => onPress(user)}
      onKeyDown={handleKeyDown}
      className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-slate-100 flex items-center cursor-pointer hover:bg-slate-50 transition-all duration-200 active:scale-[0.98] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
      role="button"
      tabIndex={0}
      aria-label={`Ver detalhes de ${user.name}`}
    >
      <img 
        src={user.thumbnail} 
        alt={`Foto de ${user.name}`}
        className="w-14 h-14 rounded-full border-2 border-purple-100 object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="ml-4 flex-1 min-w-0">
        <h3 className="text-slate-800 font-bold text-base truncate">{user.name}</h3>
        <p className="text-slate-500 text-sm flex items-center gap-1 truncate">
          <MapPin size={12} className="flex-shrink-0" /> 
          <span className="truncate">{user.location}</span>
        </p>
      </div>
      <ChevronRight className="text-slate-300 flex-shrink-0" size={20} />
    </article>
  );
});

UserCard.displayName = 'UserCard';