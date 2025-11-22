import React, { useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { HomeScreenProps } from '../types/user';
import { AppHeader } from '../components/AppHeader';
import { UserCard } from '../components/UserCard';
import { LoadingView } from '../components/LoadingView';
import { ErrorView } from '../components/ErrorView';

export const HomeScreen: React.FC<HomeScreenProps> = React.memo(({ 
  users, 
  loading, 
  error, 
  onUserPress, 
  onRefresh 
}) => {
  const userCount = useMemo(() => users.length, [users.length]);
  const userText = useMemo(() => 
    `${userCount} contato${userCount !== 1 ? 's' : ''} encontrado${userCount !== 1 ? 's' : ''}`,
    [userCount]
  );

  if (error) {
    return <ErrorView message={error} onRetry={onRefresh} />;
  }

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <AppHeader title="Meus Contatos" />
      
      <main className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <LoadingView />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="text-slate-500 text-sm font-medium">
                {userText}
              </span>
              <button 
                onClick={onRefresh}
                className="text-purple-600 text-sm font-bold flex items-center gap-1 hover:bg-purple-50 px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                aria-label="Atualizar lista de contatos"
              >
                <RefreshCw size={14} /> Atualizar
              </button>
            </div>

            <section 
              aria-label="Lista de contatos"
              className="space-y-1"
            >
              {users.map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onPress={onUserPress} 
                />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
});

HomeScreen.displayName = 'HomeScreen';