import { UserData } from '../types/user';
import { ErrorService } from './errorHandler';
import { CacheService } from './cache';

const API_URL = 'https://randomuser.me/api/?results=20&nat=br';

export const UserService = {
  fetchUsers: async (useCache: boolean = true): Promise<UserData[]> => {
    try {
      // Tentar cache primeiro se habilitado
      if (useCache) {
        const cachedUsers = CacheService.getUsers();
        if (cachedUsers) {
          return cachedUsers;
        }
      }

      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const users: UserData[] = data.results.map((user: any, index: number) => ({
        id: user.login.uuid || `user-${index}`,
        name: `${user.name.first} ${user.name.last}`,
        email: user.email,
        phone: user.phone,
        cell: user.cell,
        picture: user.picture.large,
        thumbnail: user.picture.medium,
        location: `${user.location.city}, ${user.location.state}`,
        age: user.dob.age,
      }));

      // Salvar no cache
      CacheService.setUsers(users);

      return users;
    } catch (error) {
      throw new Error(ErrorService.handle(error, 'Falha ao carregar usuários'));
    }
  },

  refreshUsers: async (): Promise<UserData[]> => {
    CacheService.clearCache();
    return UserService.fetchUsers(false);
  }
};