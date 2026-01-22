import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { checkApiStatus } from '../api/client';

const Header = () => {
  const [apiStatus, setApiStatus] = useState('checking'); // 'checking', 'online', 'offline'

  useEffect(() => {
    const verifyStatus = async () => {
      const isOnline = await checkApiStatus();
      setApiStatus(isOnline ? 'online' : 'offline');
    };

    verifyStatus();
    // Vérifier le statut toutes les 30 secondes
    const interval = setInterval(verifyStatus, 30000);

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    checking: {
      color: 'bg-slate-500',
      text: 'Vérification...',
      pulse: true,
    },
    online: {
      color: 'bg-green-500',
      text: 'API en ligne',
      pulse: false,
    },
    offline: {
      color: 'bg-red-500',
      text: 'API hors ligne',
      pulse: true,
    },
  };

  const config = statusConfig[apiStatus];

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-100">
            Marp <span className="text-indigo-400">Crew</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
            <div
              className={`w-2 h-2 rounded-full ${config.color} ${
                config.pulse ? 'animate-pulse' : ''
              }`}
            />
            <span className="text-sm text-slate-300">{config.text}</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
