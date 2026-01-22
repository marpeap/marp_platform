import { motion } from 'framer-motion';

const AgentCard = ({ 
  agent, 
  title, 
  subtitle, 
  color, 
  gradientFrom, 
  gradientTo, 
  isLoading, 
  content 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl border-2 ${color} bg-slate-900/80 backdrop-blur-sm shadow-2xl`}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-10`} />
      
      {/* Content */}
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center shadow-lg`}>
            <span className="text-white font-bold text-xl">{agent}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
        </div>

        {/* Content or Loader */}
        {isLoading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-400">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-slate-600 border-t-indigo-500 rounded-full"
              />
              <span className="text-sm">Analyse en cours...</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        ) : content ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            <div className="text-slate-200 whitespace-pre-wrap leading-relaxed">
              {content}
            </div>
          </motion.div>
        ) : (
          <div className="text-slate-500 text-center py-8">
            En attente d'analyse...
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AgentCard;
