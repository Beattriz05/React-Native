import { UserData } from '../types/user';

export class CacheService {
  private static readonly CACHE_KEY = 'users_cache';
  private static readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  static getUsers(): UserData[] | null {
    try {
      const cached = localStorage.getItem(this.CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > this.CACHE_DURATION;

      return isExpired ? null : data;
    } catch {
      return null;
    }
  }

  static setUsers(users: UserData[]): void {
    try {
      const cacheData = {
        data: users,
        timestamp: Date.now()
      };
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Failed to cache users:', error);
    }
  }

  static clearCache(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
}