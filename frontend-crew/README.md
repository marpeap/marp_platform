# Marp Crew Agency - Frontend

Interface web pour l'agence digitale IA Marp Crew.

## 🚀 Installation

```bash
cd frontend-crew
npm install
```

## ⚙️ Configuration

1. Copiez le fichier `env.example` vers `.env` :
```bash
cp env.example .env
```

2. Vérifiez que l'URL de l'API est correcte dans `.env` :
```
VITE_API_URL=http://103.7.55.99:4000
```

## 🏃 Développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📦 Build pour production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`

## 🌐 Déploiement sur Vercel

1. Installez Vercel CLI :
```bash
npm i -g vercel
```

2. Déployez :
```bash
vercel
```

3. Configurez la variable d'environnement `VITE_API_URL` dans les paramètres du projet Vercel.

## 🎨 Stack Technique

- **React 18** - Framework UI
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Axios** - Client HTTP

## 📁 Structure

```
frontend-crew/
├── src/
│   ├── api/
│   │   └── client.js          # Client Axios configuré
│   ├── components/
│   │   ├── Header.jsx         # Header avec statut API
│   │   ├── ProjectInput.jsx   # Zone d'input
│   │   └── AgentCard.jsx      # Cartes d'affichage des résultats
│   ├── App.jsx                # Composant principal
│   ├── main.jsx               # Point d'entrée
│   └── index.css              # Styles globaux
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── env.example
```

## 🔌 API

L'application communique avec le backend sur `http://103.7.55.99:4000/api/chat`

Format de la requête :
```json
{
  "message": "Description du projet..."
}
```

Format de la réponse attendue :
```json
{
  "marp1": "Analyse de Marp1...",
  "marp3": "Critique de Marp3...",
  // ou
  "product": "Analyse de Marp1...",
  "realityCheck": "Critique de Marp3..."
}
```
