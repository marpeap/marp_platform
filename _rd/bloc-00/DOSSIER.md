# Bloc 00 — Boutique de Skill

## Propriété créée
Après ce bloc, le site expose une page `/boutique` permettant l'achat de skills individuels à 15 €/unité via Stripe Buy Button, sans backend, sans indexation moteur, sans apparition dans la navigation.

## Invariants à préserver
- La navbar ne référence jamais /boutique
- /boutique est noindex/nofollow et absente du sitemap
- robots.txt Disallow /boutique
- Le reste des pages publiques reste indexable
- Aucune clé secrète Stripe n'est exposée côté client (seule la publishable key est dans le HTML)
- Le Buy Button ID provient du Dashboard Stripe (produit créé manuellement)
- Le design system de style-new.css ne doit pas être cassé
- Les tokens de couleur (--brand-gold #D4B87A, etc.) sont partagés

## Surface touchée
- `boutique.html` — nouvelle page (créée)
- `robots.txt` — ajout de `Disallow: /boutique`
- `sitemap.xml` — vérification de l'absence de /boutique (déjà absent)
- `_rd/INVARIANTS.md` — déjà mis à jour

## Actifs réutilisés
- `style-new.css` — tokens CSS partagés (--brand-gold, --bg-primary, --text-primary, etc.)
- Pattern navbar identique aux autres pages (contact.html, packs.html)
- Pattern footer identique aux autres pages
- Stripe Buy Button (script + web component natif, pas de lib tierce)

## Angles morts connus
- Pas de vérification de paiement côté serveur (statique) : le success state repose sur le redirect URL de Stripe
- Pas de comptage des achats ni d'analytics d'achat
- Pas de gestion des remboursements côté page
- Le contenu de chaque skill est fourni par l'utilisateur : ce bloc ne définit pas le contenu

## Classe(s) de patch attendue(s)
- P1 : C1 (nouveau fichier HTML stateless)
- P2 : C1 (CSS skills grid, stateless)
- P3 : C3 (intégration Stripe Buy Button, surface de paiement tierce)
- P4 : C1 (robots.txt update)
- P5 : C1 (success state JS)

## Stratégie de release attendue
Aucune promotion graduelle nécessaire. Page cachée (noindex + disallow). Exposition par URL directe uniquement. Rollback = retrait du fichier boutique.html + revert robots.txt.
