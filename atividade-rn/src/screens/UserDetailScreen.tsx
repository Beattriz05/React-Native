import React, { useCallback, useMemo } from 'react';
import { Mail, Phone, Smartphone, MapPin, Zap, Loader } from 'lucide-react';
import { UserDetailScreenProps } from '../types/user';
import { AppHeader } from '../components/AppHeader';
import { InfoRow } from '../components/InfoRow';
import { useLLM } from '../hooks/useLLM';

export const UserDetailScreen: React.FC<UserDetailScreenProps> = ({ user, goBack }) => {
  const { summary, loading, error, generateSummary, reset } = useLLM();

  const handleContact = useCallback(() => {
    alert(`Ligando para ${user.name}...`);
  }, [user.name]);

  const handleGenerateSummary = useCallback(() => {
    generateSummary(user.name, user.age, user.location);
  }, [generateSummary, user.name, user.age, user.location]);

  const contactInfo = useMemo(() => [
    { icon: <Mail size={20} />, label: 'Email', value: user.email },
    { icon: <Phone size={20} />, label: 'Telefone', value: user.phone },
    { icon: <Smartphone size={20} />, label: 'Celular', value: user.cell },
    { icon: <MapPin size={20} />, label: 'Endereço', value: user.location }
  ], [user]);

  return (
    <div className="flex flex-col min-h-full bg-slate-50 animate-in fade-in slide-in-from-right-10 duration-300">
      <AppHeader title="Detalhes do Contato" showBack onBack={goBack} />
      
      <main className="flex-1 overflow-y-auto p-4">
        {/* Card de Perfil */}
        <section 
          className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center mb-4 border border-slate-100"
          aria-labelledby="profile-heading"
        >
          <div className="relative">
            <img 
              src={user.picture} 
              alt={`Foto de perfil de ${user.name}`}
              className="w-32 h-32 rounded-full border-4 border-purple-50 shadow-md object-cover mb-4"
            />
            <div 
              className="absolute bottom-4 right-2 bg-green-500 w-5 h-5 rounded-full border-2 border-white"
              aria-label="Online"
              title="Online"
            ></div>
          </div>
          <h2 id="profile-heading" className="text-2xl font-bold text-slate-800 text-center mb-1">
            {user.name}
          </h2>
          <p className="text-purple-600 font-medium">{user.age} anos</p>
        </section>

        {/* Geração de Introdução */}
        <section className="mb-6" aria-labelledby="llm-section-title">
          <h3 id="llm-section-title" className="sr-only">
            Introdução Profissional
          </h3>
          
          <button 
            onClick={handleGenerateSummary}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-semibold shadow-md transition-all duration-200 flex justify-center items-center gap-2 ${
              loading 
                ? 'bg-purple-300 text-purple-700 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50'
            }`}
            aria-describedby={loading ? "generating-description" : undefined}
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" aria-hidden="true" />
                <span id="generating-description">Gerando Introdução...</span>
              </>
            ) : (
              <>
                <Zap size={18} aria-hidden="true" />
                Gerar Introdução Profissional
              </>
            )}
          </button>

          {/* Resumo Gerado */}
          {summary && (
            <div 
              className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg shadow-sm"
              role="status"
              aria-live="polite"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-bold text-purple-800 flex items-center gap-1">
                  <Zap size={16} aria-hidden="true" /> 
                  Introdução Gerada
                </h4>
                <button 
                  onClick={reset}
                  className="text-purple-600 hover:text-purple-800 text-xs font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 rounded"
                  aria-label="Limpar introdução gerada"
                >
                  Limpar
                </button>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {summary}
              </p>
            </div>
          )}

          {/* Mensagem de Erro */}
          {error && (
            <div 
              className="mt-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
        </section>

        {/* Informações de Contato */}
        <section 
          className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-4"
          aria-labelledby="contact-info-heading"
        >
          <h3 id="contact-info-heading" className="sr-only">
            Informações de Contato
          </h3>
          {contactInfo.map((info, index) => (
            <InfoRow
              key={info.label}
              icon={info.icon}
              label={info.label}
              value={info.value}
              isLast={index === contactInfo.length - 1}
            />
          ))}
        </section>
        
        {/* Botão de Ação */}
        <button 
          onClick={handleContact}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-purple-800 active:scale-95 transition-all duration-200 flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          aria-label={`Entrar em contato com ${user.name}`}
        >
          <Phone size={18} aria-hidden="true" />
          Entrar em Contato
        </button>
      </main>
    </div>
  );
};