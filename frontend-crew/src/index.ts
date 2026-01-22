/**
 * AI Orchestrator Backend - Bun/Hono
 * 
 * Ce fichier expose le workflow "Chain of Thought" (Draft -> Review -> Final)
 * avec un log détaillé de chaque étape pour le frontend.
 * 
 * Dépendances requises (package.json du backend):
 * - bun (runtime)
 * - hono
 * - @types/node (pour TypeScript)
 * 
 * Installation:
 * bun add hono
 * bun add -d @types/node
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';

// Types pour le workflow log
interface WorkflowLogEntry {
  step: 'DRAFT' | 'CRITIQUE' | 'SYNTHESIS';
  agent_id: string;
  agent_name: string;
  content: string;
}

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
  workflow_log: WorkflowLogEntry[];
  mode?: string;
  final_verdict?: string;
  // Champs optionnels pour compatibilité avec le frontend existant
  product_analysis?: string;
  reality_check?: string;
}

const app = new Hono();

// Middleware CORS
app.use('/*', cors());

// Fonction pour simuler l'appel à un agent (à remplacer par vos vraies implémentations)
async function callAgent(
  agentId: string,
  agentName: string,
  prompt: string,
  context?: string
): Promise<string> {
  // TODO: Implémenter l'appel réel à votre service d'IA/agent
  // Pour l'instant, simulation
  return `Réponse de ${agentName} pour: ${prompt}`;
}

// Configuration des agents par mode
function getAgentConfig(mode: string): {
  leadAgent: { id: string; name: string };
  supportAgent: { id: string; name: string };
} {
  switch (mode) {
    case 'TECH_MODE':
      return {
        leadAgent: { id: 'M2', name: 'Marp2 - Tech Lead 🛠️' },
        supportAgent: { id: 'M3', name: 'Marp3 - Security Check 🛡️' },
      };
    case 'SALES_MODE':
      return {
        leadAgent: { id: 'M6', name: 'Marp6 - The Closer 💼' },
        supportAgent: { id: 'M4', name: 'Marp4 - Business Check 💰' },
      };
    case 'GROWTH_MODE':
      return {
        leadAgent: { id: 'M5', name: 'Marp5 - Marketing Guru 🚀' },
        supportAgent: { id: 'M7', name: 'Marp7 - Nurture Strategy 📧' },
      };
    default: // PROJECT_MODE ou mode par défaut
      return {
        leadAgent: { id: 'M1', name: 'Marp1 - Product Architect 🏗️' },
        supportAgent: { id: 'M3', name: 'Marp3 - Reality Check ⚖️' },
      };
  }
}

// Fonction principale du workflow Draft -> Review -> Final
async function executeWorkflow(
  userMessage: string,
  workflowLog: WorkflowLogEntry[]
): Promise<{
  finalResponse: string;
  mode: string;
  finalVerdict: string;
  productAnalysis?: string;
  realityCheck?: string;
}> {
  // Détection du mode (exemple basique - à adapter selon votre logique réelle)
  let detectedMode = 'PROJECT_MODE';
  const messageLower = userMessage.toLowerCase();
  if (messageLower.includes('technique') || messageLower.includes('code') || messageLower.includes('développement')) {
    detectedMode = 'TECH_MODE';
  } else if (messageLower.includes('vente') || messageLower.includes('prix') || messageLower.includes('commercial')) {
    detectedMode = 'SALES_MODE';
  } else if (messageLower.includes('marketing') || messageLower.includes('croissance') || messageLower.includes('growth')) {
    detectedMode = 'GROWTH_MODE';
  }

  // Obtenir la configuration des agents pour ce mode
  const agentConfig = getAgentConfig(detectedMode);

  // Étape 1: DRAFT - Lead Agent crée le brouillon initial (product_analysis)
  const draftContent = await callAgent(
    agentConfig.leadAgent.id,
    agentConfig.leadAgent.name,
    userMessage
  );
  
  workflowLog.push({
    step: 'DRAFT',
    agent_id: agentConfig.leadAgent.id,
    agent_name: agentConfig.leadAgent.name,
    content: draftContent,
  });

  // Étape 2: CRITIQUE - Support Agents révisent le brouillon (reality_check)
  const critiqueContent = await callAgent(
    agentConfig.supportAgent.id,
    agentConfig.supportAgent.name,
    `Réviser et critiquer cette analyse: ${draftContent}`,
    draftContent
  );

  workflowLog.push({
    step: 'CRITIQUE',
    agent_id: agentConfig.supportAgent.id,
    agent_name: agentConfig.supportAgent.name,
    content: critiqueContent,
  });

  // Étape 3: SYNTHESIS - Finalisation avec synthèse (reply final)
  const synthesisContent = await callAgent(
    agentConfig.leadAgent.id,
    `${agentConfig.leadAgent.name} (Final)`,
    `Synthétiser une réponse finale en tenant compte de l'analyse: ${draftContent} et des critiques: ${critiqueContent}`,
    `${draftContent}\n\nCritiques:\n${critiqueContent}`
  );

  workflowLog.push({
    step: 'SYNTHESIS',
    agent_id: agentConfig.leadAgent.id,
    agent_name: `${agentConfig.leadAgent.name} (Final)`,
    content: synthesisContent,
  });

  // Génération du verdict final
  const finalVerdict = `Analyse complète réalisée par ${agentConfig.leadAgent.name} et ${agentConfig.supportAgent.name}`;

  return {
    finalResponse: synthesisContent,
    mode: detectedMode,
    finalVerdict: finalVerdict,
    productAnalysis: draftContent, // Pour compatibilité avec le frontend
    realityCheck: critiqueContent, // Pour compatibilité avec le frontend
  };
}

// Endpoint principal /api/chat
app.post('/api/chat', async (c) => {
  try {
    const body: ChatRequest = await c.req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return c.json(
        { error: 'Le champ "message" est requis et doit être une chaîne de caractères' },
        400
      );
    }

    // Initialiser le log du workflow
    const workflowLog: WorkflowLogEntry[] = [];

    // Exécuter le workflow
    const { finalResponse, mode, finalVerdict, productAnalysis, realityCheck } = await executeWorkflow(message, workflowLog);

    // Construire la réponse avec le workflow log
    const response: ChatResponse = {
      reply: finalResponse,
      workflow_log: workflowLog,
      mode: mode,
      final_verdict: finalVerdict,
      // Champs pour compatibilité avec le frontend existant
      product_analysis: productAnalysis,
      reality_check: realityCheck,
    };

    return c.json(response);
  } catch (error) {
    console.error('Erreur lors du traitement de la requête:', error);
    return c.json(
      { error: 'Une erreur est survenue lors du traitement de votre requête' },
      500
    );
  }
});

// Endpoint de santé
app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Port par défaut (Bun expose process.env automatiquement)
const port = (process.env.PORT ? parseInt(process.env.PORT) : undefined) || 4000;

console.log(`🚀 Serveur démarré sur le port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
