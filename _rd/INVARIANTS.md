# Invariants globaux — marpeap.com

## Navigation et SEO
- La navbar ne référence jamais /boutique
- /boutique est noindex/nofollow et absente du sitemap
- robots.txt Disallow /boutique
- Le reste des pages publiques reste indexable

## Design système
- Le design system de style-new.css ne doit pas être cassé
- Les tokens de couleur (--brand-gold #D4B87A, etc.) sont partagés

## Stripe
- Aucune clé secrète Stripe n'est exposée côté client
- Seule la publishable key est présente dans le HTML
- Le Buy Button ID provient du Dashboard Stripe (produit créé manuellement)

## Fichiers existants
- index.html, packs.html, contact.html, faq.html, mentions-legales.html : intouchables sauf demande explicite
- vercel.json : intouchable sauf nécessité technique explicite
- robots.txt, sitemap.xml : modifiables uniquement sur décision tracée
