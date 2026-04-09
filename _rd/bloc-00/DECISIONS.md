# Décisions — Bloc 00

## 2026-04-09 — Stripe Buy Button vs backend custom

### Contexte
Le site marpeap.com est entièrement statique (HTML/CSS/JS, Vercel, pas de backend). Il faut permettre des paiements à 15 €/skill sans ajouter un backend.

### Options considérées
- Option A : Stripe Buy Button (embeddable, pas de backend)
- Option B : Stripe Payment Links (redirection externe)
- Option C : Ajouter un backend serverless (Vercel Functions) avec Stripe checkout session

### Option retenue
Option A — Stripe Buy Button

### Raison
- Compatible avec le stack 100% statique actuel
- Stripe héberge le checkout → zéro risque de fuite de clé secrète côté client
- Publishable key seule requise dans le HTML
- Checkout modal ou redirect selon config Dashboard
- Le Buy Button ID est créé manuellement dans le Dashboard Stripe par produit

### Conséquences attendues
- Paiements fonctionnels sans backend
- Maintenance réduite
- Conformité PCI déléguée à Stripe

### Conséquences négatives acceptées
- Pas de vérification serveur post-paiement (pas de webhook → pas de livraison automatique)
- L'utilisateur doit créer chaque produit + Buy Button manuellement dans le Dashboard Stripe
- Le success state est cosmétique (URL redirect `?success=1`), pas cryptographiquement vérifiable

### Impact rollback
Facile : retrait des balises HTML, aucun état persistant côté site.

### Horizon de révision
Si le volume d'achats justifie un backend → envisager Vercel Functions + webhook Stripe.

---

## 2026-04-09 — URL /boutique et stratégie de dissimulation

### Contexte
La page ne doit pas apparaître dans la navigation, le sitemap, ni être indexée par les moteurs.

### Options considérées
- Option A : Page à URL aléatoire type `/s3k9f2` (obscurité pure)
- Option B : URL `/boutique` avec noindex + disallow + absente du sitemap et de la nav

### Option retenue
Option B — `/boutique` avec noindex + disallow

### Raison
- URL mémorisable et distribuable directement
- La dissimulation est explicite et documentée (invariants), pas tacite
- L'obscurité pure ne tient pas si l'URL est partagée publiquement

### Conséquences attendues
- Page accessible uniquement via URL directe
- Aucune indexation moteur
- Invariants documentés dans `_rd/INVARIANTS.md`

### Impact rollback
Facile.

### Horizon de révision
Si la boutique devient publique → retirer noindex, ajouter sitemap, modifier invariants.

---

## 2026-04-09 — Success state via ?success=1

### Contexte
Stripe Buy Button redirige vers une URL de succès configurable dans le Dashboard. Il faut afficher un état post-achat.

### Options considérées
- Option A : Page dédiée `/boutique/merci`
- Option B : Paramètre `?success=1` sur la même page, détecté par JS

### Option retenue
Option B — `?success=1`

### Raison
- Pas de fichier supplémentaire
- Simple et sans ambiguïté de routage avec `cleanUrls: true`
- Suffisant pour un usage non critique

### Impact rollback
Trivial : retirer le bloc JS.
