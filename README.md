# Marpeap Digitals - Site Vitrine (HTML/CSS/JS Vanilla)

Site vitrine ultra-léger et performant pour Marpeap Digitals, développé en HTML5, CSS3 et JavaScript vanilla (sans framework).

## 🚀 Caractéristiques

- **100% Vanilla** : Aucun framework, aucune dépendance lourde
- **Ultra-léger** : Fichiers optimisés pour une performance maximale
- **Responsive** : Design adaptatif mobile-first
- **Moderne** : Design moderne avec animations CSS pures
- **Performant** : Chargement rapide, optimisé pour le SEO
- **Déployé sur Vercel** : Configuration optimale pour le déploiement

## 📁 Structure du projet

```
/
├── index.html              # Page d'accueil
├── contact.html            # Page contact
├── admin.html              # Page admin
├── css/
│   ├── style.css          # Styles principaux
│   └── admin.css          # Styles admin
├── js/
│   ├── main.js            # Script principal (navigation)
│   ├── contact.js         # Gestion formulaire contact
│   ├── admin.js           # Gestion admin
│   └── supabase-client.js # Client Supabase
├── assets/
│   └── images/            # Images optimisées
│       ├── logo.png
│       ├── background.png
│       ├── services-section.png
│       ├── apropos_section.png
│       ├── portofolio_section.png
│       └── contact_section.png
├── vercel.json            # Configuration Vercel
├── robots.txt             # SEO - robots
├── sitemap.xml            # SEO - sitemap
├── site.webmanifest       # PWA manifest
├── .htaccess              # Configuration Apache (si nécessaire)
├── supabase-schema.sql    # Schéma base de données Supabase
├── EMAILJS_SETUP.md       # Guide configuration EmailJS
├── VERCEL_DEPLOY.md       # Guide déploiement Vercel
└── README.md              # Ce fichier
```

## 🛠️ Installation

Aucune installation nécessaire ! C'est un site statique.

1. Clonez ou téléchargez le projet
2. Ouvrez `index.html` dans votre navigateur
3. Ou déployez sur un hébergeur de fichiers statiques (Vercel, Netlify, GitHub Pages)

### Développement local

Pour tester localement avec un serveur :

```bash
npm run dev
```

Cela lancera un serveur local sur `http://localhost:3000` (ou un autre port).

## 📧 Configuration du formulaire de contact

Le formulaire de contact utilise **Supabase** comme back-end pour stocker les messages et **EmailJS** pour les notifications par email.

### Configuration Supabase

1. **Créez un projet Supabase** :
   - Allez sur [supabase.com](https://supabase.com)
   - Créez un nouveau projet
   - Notez votre URL de projet et votre clé anonyme (anon key)

2. **Configurez la base de données** :
   - Dans le SQL Editor de Supabase, exécutez le script `supabase-schema.sql`
   - Cela créera la table `contacts` avec tous les champs nécessaires

3. **Configurez le client Supabase** :
   - Ouvrez `js/supabase-client.js`
   - Remplacez `SUPABASE_URL` et `SUPABASE_ANON_KEY` par vos valeurs

### Configuration EmailJS

Consultez le fichier `EMAILJS_SETUP.md` pour les instructions détaillées.

## 🚀 Déploiement

### Vercel (Recommandé)

1. **Via GitHub** :
   - Poussez votre code sur GitHub
   - Connectez votre repository à Vercel
   - Vercel détectera automatiquement la configuration

2. **Via CLI** :
   ```bash
   npm i -g vercel
   vercel
   ```

3. **Configuration** :
   - Le fichier `vercel.json` est déjà configuré
   - Les headers de cache sont optimisés
   - Le versioning des fichiers CSS/JS est en place

### Netlify

1. Connectez votre repository GitHub
2. Netlify détectera automatiquement le site statique
3. Déployez !

### GitHub Pages

1. Poussez le code sur GitHub
2. Allez dans Settings > Pages
3. Sélectionnez la branche `main`
4. Le site sera disponible sur `https://votre-username.github.io/repo-name`

## 📱 Responsive

Le site est entièrement responsive et optimisé pour :
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## ⚡ Performance

- **Pas de dépendances lourdes** : Chargement ultra-rapide
- **CSS optimisé** : Variables CSS, animations pures
- **JavaScript vanilla** : Pas de framework, code minimal
- **Images optimisées** : Format PNG/WebP, lazy loading recommandé
- **Cache optimisé** : Headers de cache configurés pour Vercel

## 🔒 Sécurité

- Headers de sécurité configurés dans `vercel.json`
- Validation côté client et serveur (Supabase)
- Protection contre XSS, clickjacking, etc.

## 🎨 Personnalisation

### Couleurs

Modifiez les variables CSS dans `css/style.css` :

```css
:root {
  --primary-blue: #2563eb;
  --primary-purple: #9333ea;
  --primary-pink: #ec4899;
  /* ... */
}
```

### Contenu

Modifiez directement les fichiers HTML pour changer le contenu.

### Versioning

Pour forcer le rechargement des fichiers CSS/JS après une modification :
1. Modifiez la version dans les fichiers HTML (ex: `?v=2.1.0` → `?v=2.1.1`)
2. Commitez et poussez sur GitHub
3. Vercel redéploiera automatiquement

## 📝 Structure des fichiers

### Pages HTML
- `index.html` : Page d'accueil avec sections Hero, Services, À propos, Portfolio
- `contact.html` : Page de contact avec formulaire
- `admin.html` : Interface d'administration

### CSS
- `css/style.css` : Styles principaux (2325+ lignes)
- `css/admin.css` : Styles spécifiques à l'admin

### JavaScript
- `js/main.js` : Navigation, scroll effects, animations
- `js/contact.js` : Gestion du formulaire de contact (Supabase + EmailJS)
- `js/admin.js` : Gestion de l'interface admin
- `js/supabase-client.js` : Client Supabase pour JavaScript vanilla

## 🆘 Support

Pour toute question ou problème :
- Consultez `VERCEL_DEPLOY.md` pour les problèmes de déploiement
- Consultez `EMAILJS_SETUP.md` pour la configuration EmailJS
- Contactez Marpeap Digitals

## 📄 License

Propriétaire - Marpeap Digitals © 2025
