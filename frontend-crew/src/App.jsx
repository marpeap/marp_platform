import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import ProjectInput from './components/ProjectInput';
import AgentCard from './components/AgentCard';
import { sendChatMessage } from './api/client';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [marp1Data, setMarp1Data] = useState(null);
  const [marp3Data, setMarp3Data] = useState(null);
  const [loadingStage, setLoadingStage] = useState(null); // 'marp1' | 'marp3' | null
  const [error, setError] = useState(null);
  const [mode, setMode] = useState(null);
  const [finalVerdict, setFinalVerdict] = useState(null);

  const handleSubmit = async (projectDescription) => {
    setIsLoading(true);
    setError(null);
    setMarp1Data(null);
    setMarp3Data(null);
    setMode(null);
    setFinalVerdict(null);
    setLoadingStage('marp1');

    try {
      const response = await sendChatMessage(projectDescription);
      
      // Capturer le mode et le verdict final
      if (response.mode) {
        setMode(response.mode);
      }
      if (response.final_verdict) {
        setFinalVerdict(response.final_verdict);
      }
      
      // Simuler le chargement séquentiel pour l'UX
      // Marp1 arrive en premier (product_analysis)
      if (response.product_analysis) {
        setMarp1Data(response.product_analysis);
        setLoadingStage('marp3');
        
        // Attendre un peu avant d'afficher Marp3
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Marp3 arrive ensuite (reality_check)
      if (response.reality_check) {
        setMarp3Data(response.reality_check);
        setLoadingStage(null);
      }

    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'analyse');
      setLoadingStage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Agence Digitale <span className="text-indigo-400">IA</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Analysez votre projet avec nos agents IA spécialisés
          </p>
        </motion.div>

        {/* Input Section */}
        <div className="mb-12">
          <ProjectInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto mb-8 p-4 bg-red-900/20 border border-red-500/50 rounded-xl text-red-400"
            >
              <p className="font-semibold">Erreur</p>
              <p className="text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mission Control - Mode Detection */}
        <AnimatePresence>
          {(mode || finalVerdict) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto mb-6"
            >
              <div className="relative overflow-hidden rounded-xl border-2 border-slate-700/50 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm shadow-xl">
                {/* Animated background gradient based on mode */}
                <div className={`absolute inset-0 opacity-20 ${
                  mode?.includes('TECH') || mode?.includes('tech') 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
                    : mode?.includes('SALES') || mode?.includes('sales')
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500'
                }`} />
                
                <div className="relative p-5">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Mode Badge */}
                    {mode && (
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm ${
                          mode?.includes('TECH') || mode?.includes('tech')
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                            : mode?.includes('SALES') || mode?.includes('sales')
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                            : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50'
                        }`}>
                          <span className="text-lg">🎯</span>
                          <span>Mode Détecté :</span>
                          <span className="uppercase tracking-wider">{mode}</span>
                        </div>
                        {/* Active Squad Indicator */}
                        <div className="flex items-center gap-2 text-slate-300 text-sm">
                          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                          <span>Squad Active</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Final Verdict */}
                    {finalVerdict && (
                      <div className="flex-1 md:text-right">
                        <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Verdict Final</p>
                        <p className="text-slate-100 font-semibold text-sm leading-relaxed">{finalVerdict}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        {(isLoading || marp1Data || marp3Data) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto"
          >
            {/* Marp1 - Product Card (Bleue) */}
            <AgentCard
              agent="M1"
              title="Product Analysis"
              subtitle="Analyse de Marp1"
              color="border-indigo-500/50"
              gradientFrom="from-indigo-500"
              gradientTo="to-blue-600"
              isLoading={loadingStage === 'marp1'}
              content={marp1Data}
            />

            {/* Marp3 - Reality Check Card (Rouge/Orange) */}
            <AgentCard
              agent="M3"
              title="Reality Check"
              subtitle="Critique de Marp3"
              color="border-rose-500/50"
              gradientFrom="from-rose-500"
              gradientTo="to-orange-500"
              isLoading={loadingStage === 'marp3'}
              content={marp3Data}
            />
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && !marp1Data && !marp3Data && !error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-block p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
              <p className="text-slate-400 text-lg">
                Décrivez votre projet ci-dessus pour commencer l'analyse
              </p>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-20">
        <div className="container mx-auto px-6 py-6">
          <p className="text-center text-slate-500 text-sm">
            Marp Crew Agency • Powered by AI
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
