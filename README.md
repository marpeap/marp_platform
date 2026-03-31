# Marpeap Digitals - Site Web

Site web professionnel pour Marpeap Digitals, agence de développement web et marketing digital.

## 🚀 Déploiement

Le site est configuré pour fonctionner sur Vercel, Netlify ou tout hébergement statique.

## ⚙️ Configuration après clonage

Après avoir cloné ce repository, vous devez configurer les services externes :

### 1. EmailJS (Formulaire de contact)

1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Dans `js/emailjs-config.js`, remplacez :
   - `VOTRE_PUBLIC_KEY_EMAILJS` par votre clé publique EmailJS
   - `VOTRE_SERVICE_ID_EMAILJS` par votre Service ID
   - `VOTRE_TEMPLATE_ID_NOTIFICATION` par votre Template ID pour les notifications
   - `VOTRE_TEMPLATE_ID_AUTOREPLY` par votre Template ID pour les auto-réponses
   - `votre-email@domaine.com` par l'email destinataire

### 2. Supabase (Base de données)

1. Créez un compte sur [Supabase](https://supabase.com/)
2. Créez un nouveau projet
3. Dans `js/supabase-client.js`, remplacez :
   - `VOTRE_URL_SUPABASE` par votre URL Supabase
   - `VOTRE_CLE_ANONYME_SUPABASE` par votre clé anonyme
4. Exécutez le script SQL dans `fonctions/supabase-permissions.sql` dans l'éditeur SQL de Supabase

### 3. Vérification

Ouvrez la console du navigateur pour vérifier que les services sont correctement configurés :
- ✅ EmailJS initialisé avec succès
- ✅ Supabase client initialisé avec succès

## 📁 Structure du projet

```
/
├── index.html              # Page d'accueil
├── packs.html              # Page des offres
├── contact.html            # Page de contact
├── assets/images/          # Images du site
├── css/
│   ├── style.css           # Styles principaux
│   └── style-new.css       # Nouveau design system
├── js/
│   ├── main.js             # Scripts principaux
│   ├── main-new.js         # Nouveaux scripts
│   ├── contact.js          # Gestion du formulaire
│   └── emailjs-config.js   # ⚠️ À configurer
├── fonctions/              # Configurations et documentation
└── _archived/              # Fichiers archivés
```

## 🔒 Sécurité

Les fichiers sensibles suivants sont exclus du versioning :
- `fonctions/EMAILJS_KEYS.txt`
- `js/emailjs-config.js` (version générique poussée)
- `js/supabase-client.js` (version générique poussée)
- `fonctions/supabase-permissions.sql`

## 🛠️ Technologies utilisées

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Styling**: CSS Variables, Flexbox, Grid
- **Animations**: AOS (Animate On Scroll)
- **Email**: EmailJS
- **Base de données**: Supabase
- **Déploiement**: Vercel

## 📱 Fonctionnalités

- Design responsive mobile-first
- Mode sombre/cyberpunk
- Menu hamburger animé
- Formulaires de contact avec validation
- Animations au scroll
- Optimisé SEO
- PWA ready

## 🚀 Développement local

1. Clonez le repository
2. Ouvrez `index.html` dans votre navigateur
3. Configurez les services externes (voir section Configuration)

## 📞 Support

Pour toute question : contact@marpeap.com

---

Développé avec ❤️ par Marpeap Digitals