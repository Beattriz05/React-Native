import { useState, useCallback } from 'react';
import { LLMState } from '../types/user';
import { LLMService } from '../services/llm';
import { ErrorService } from '../services/errorHandler';

export const useLLM = () => {
  const [state, setState] = useState<LLMState>({
    summary: null,
    loading: false,
    error: null
  });

  const generateSummary = useCallback(async (userName: string, userAge: number, userLocation: string) => {
    setState({ summary: null, loading: true, error: null });

    try {
      // Para demonstração, vamos usar uma resposta simulada se a API key não estiver configurada
      if (!process.env.REACT_APP_LLM_API_KEY) {
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mockSummary = `É um prazer apresentar ${userName}, profissional com ${userAge} anos, atualmente baseado em ${userLocation}. Com sua experiência e perspectiva única, traz contribuições valiosas para nossa equipe. Sempre buscando excelência e colaboração, demonstra grande potencial para impactar positivamente nossos projetos e iniciativas.`;
        setState({ summary: mockSummary, loading: false, error: null });
        return;
      }

      const summary = await LLMService.generateProfessionalIntroduction(userName, userAge, userLocation);
      setState({ summary, loading: false, error: null });
    } catch (error) {
      setState({
        summary: null,
        loading: false,
        error: ErrorService.handle(error, 'Falha ao gerar introdução')
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ summary: null, loading: false, error: null });
  }, []);

  return { ...state, generateSummary, reset };
};