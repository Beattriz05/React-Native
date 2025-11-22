/*Serviço para manipulação centralizada de erros*/
export class ErrorService {
  static handle(error: unknown, defaultMessage: string): string {
    console.error('Error:', error);
    
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'string') {
      return error;
    }
    
    return defaultMessage;
  }
}