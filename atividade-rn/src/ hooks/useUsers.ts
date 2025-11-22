import { useState, useEffect, useCallback } from 'react';
import { UserData, UsersState } from '../types/user';
import { UserService } from '../services/api';

export const useUsers = (): [UsersState, () => Promise<void>, () => Promise<void>] => {
  const [state, setState] = useState<UsersState>({
    data: [],
    loading: true,
    error: null
  });

  const fetchUsers = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const users = await UserService.fetchUsers();
      setState({ data: users, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao carregar usuários'
      }));
    }
  }, []);

  const refreshUsers = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const users = await UserService.refreshUsers();
      setState({ data: users, loading: false, error: null });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Erro ao atualizar usuários'
      }));
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return [state, fetchUsers, refreshUsers];
};