import React, { useState, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { UserData } from './src/types/user';
import { useUsers } from './src/ hooks/useUsers';
import { HomeScreen } from './src/screens/HomeScreen';
import { UserDetailScreen } from './src/screens/UserDetailScreen';

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
    <SafeAreaView style={styles.container}>
      {/* Container simulando dispositivo móvel */}
      <View style={styles.phoneContainer}>
        
        {/* Status Bar Visual */}
        <View 
          style={styles.statusBar}
        />
        
        {/* Área de Conteúdo Principal */}
        <View style={styles.contentArea}>
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
        </View>

        {/* Home Indicator (iOS style) */}
        <View 
          style={styles.homeIndicator}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#cbd5e1', // Cor sólida substituindo o gradiente
  },
  phoneContainer: {
    flex: 1,
    marginHorizontal: 'auto',
    maxWidth: 400,
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  statusBar: {
    height: 28,
    backgroundColor: '#7c3aed', // Cor sólida substituindo o gradiente
    width: '100%',
    opacity: 0.9,
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  homeIndicator: {
    height: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '33%',
    marginHorizontal: 'auto',
    borderRadius: 2,
    position: 'absolute',
    bottom: 8,
    left: '33%',
  },
});