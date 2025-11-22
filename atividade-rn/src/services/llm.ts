import { ErrorService } from './errorHandler';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const LLM_API_KEY = ""; // Chave da API (deixada em branco para o ambiente Canvas)
const LLM_MODEL = 'gemini-2.5-flash-preview-09-2025';

export const LLMService = {
  /*Gera uma introdução profissional usando o Gemini*/
  generateProfessionalIntroduction: async (
    userName: string, 
    userAge: number, 
    userLocation: string
  ): Promise<string> => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${LLM_MODEL}:generateContent?key=${LLM_API_KEY}`;
    
    // System Instruction para guiar a resposta do modelo
    const systemPrompt = "Você é um assistente de networking. Sua tarefa é criar uma breve introdução profissional e otimista (3-4 frases) para um colega de trabalho, baseada em suas informações básicas. Use o idioma Português do Brasil. Mantenha um tom profissional e amigável. Assuma que a pessoa trabalha em uma área relacionada a Pessoas, como RH, Recrutamento ou Gestão, pois está em um diretório.";
    
    // Query do Usuário
    const userQuery = `Gere uma introdução profissional para o colega ${userName}, com ${userAge} anos, que atualmente reside em ${userLocation}.`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
    };

    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const result = await response.json();
          const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return text;
          }
        }
      } catch (error) {
        console.error(`Tentativa ${attempts + 1} falhou:`, error);
      }

      attempts++;
      if (attempts < maxAttempts) {
        await wait(Math.pow(2, attempts) * 1000); 
      }
    }
    
    throw new Error("Falha ao gerar o conteúdo após múltiplas tentativas.");
  }
};