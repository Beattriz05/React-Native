import React, { useState, useCallback } from 'react';
import { UserData } from './types/user';
import { useUsers } from './hooks/useUsers';
import { HomeScreen } from './screens/HomeScreen';
import { UserDetailScreen } from './screens/UserDetailScreen';

type Screen = 'HOME' | 'DETAILS';

/**
 * Componente principal da aplicação
 */
export default function App() {
  // Estado dos usuários
  const [{ data: users, loading, error }, , refreshUsers] = useUsers();
  
  // Navegação
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  // Handlers de navegação
  const navigateToDetails = useCallback((user: UserData) => {
    setSelectedUser(user);
    setCurrentScreen('DETAILS');
  }, []);

  const navigateToHome = useCallback(() => {
    setSelectedUser(null);
    setCurrentScreen('HOME');
  }, []);

  const handleRefresh = useCallback(async () => {
    await refreshUsers();
  }, [refreshUsers]);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-200 to-slate-300 flex justify-center items-center font-sans">
      {/* Container simulando dispositivo móvel */}
      <div className="w-full max-w-md h-full sm:h-[85vh] bg-slate-50 sm:rounded-[2rem] sm:border-8 sm:border-slate-800 overflow-hidden shadow-2xl relative flex flex-col">
        
        {/* Status Bar Visual */}
        <div 
          className="h-7 bg-gradient-to-r from-purple-700 to-purple-600 w-full absolute top-0 left-0 z-20 sm:rounded-t-[1.5rem] hidden sm:block opacity-90"
          aria-hidden="true"
        ></div>
        
        {/* Área de Conteúdo Principal */}
        <div className="flex-1 mt-0 sm:mt-7 overflow-hidden relative bg-slate-50">
          {currentScreen === 'HOME' && (
            <HomeScreen 
              users={users} 
              loading={loading} 
              error={error}
              onUserPress={navigateToDetails}
              onRefresh={handleRefresh}
            />
          )}
          
          {currentScreen === 'DETAILS' && selectedUser && (
            <UserDetailScreen 
              user={selectedUser} 
              goBack={navigateToHome} 
            />
          )}
        </div>

        {/* Home Indicator (iOS style) */}
        <div 
          className="h-1 bg-black/20 w-1/3 mx-auto rounded-full absolute bottom-2 left-1/3 z-30"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}