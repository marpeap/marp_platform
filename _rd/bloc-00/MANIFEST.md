# Manifest — Bloc 00

Etat : not_started

## Patches

P1 — C1 — Squelette boutique.html avec navbar, footer, noindex, section hero — `boutique.html` — Preuve primaire : fichier existe, s'ouvre dans le navigateur sans erreur console, `<meta name="robots" content="noindex, nofollow">` présent dans le source — Preuve non-cassure : les autres pages (index, contact, packs) inchangées — E1 : structure HTML valide, noindex présent, meta title/description présents — Rollback : `git restore boutique.html` — [ ] done

P2 — C1 — CSS skills grid + skill card design (style inline dans boutique.html) — `boutique.html` — Preuve primaire : grid de cards skills s'affiche correctement sur desktop et mobile, tokens --brand-gold et --bg-primary utilisés — Preuve non-cassure : style-new.css non modifié — E1 : grep style-new.css confirme aucun changement — E3 : rendu visuel correct dans navigateur — Rollback : `git restore boutique.html` — [ ] done

P3 — C3 — Intégration Stripe Buy Button par skill (script Stripe + web component) — `boutique.html` — Preuve primaire : clic sur bouton d'achat ouvre le checkout Stripe — Preuve non-cassure : publishable key seule visible dans le source HTML (grep confirme absence de sk_live) — E1 : grep `sk_live` dans boutique.html retourne 0 résultat — E3 : smoke visuel : bouton Stripe s'affiche, clic ouvre modal/redirect Stripe — Rollback : retirer les balises `<stripe-buy-button>` et le script Stripe — [ ] done

P4 — C1 — Ajout Disallow /boutique dans robots.txt — `robots.txt` — Preuve primaire : `curl https://www.marpeap.com/robots.txt | grep boutique` retourne la ligne Disallow — Preuve non-cassure : les autres règles robots.txt inchangées — E1 : diff robots.txt, une seule ligne ajoutée sous la section User-agent: * — Rollback : retirer la ligne Disallow /boutique — [ ] done

P5 — C1 — Success state : détection ?success=1 en JS, affichage message post-achat — `boutique.html` — Preuve primaire : accès à `/boutique?success=1` affiche le message de confirmation, les cards sont masquées ou un bandeau apparaît — Preuve non-cassure : accès à `/boutique` sans paramètre affiche la grille normale — E1 : logique JS simple, pas de dépendance externe — E3 : test manuel des deux URLs — Rollback : retirer le bloc JS de détection — [ ] done

## Regressions à vérifier après bloc
- [ ] index.html s'affiche sans erreur
- [ ] contact.html s'affiche sans erreur
- [ ] packs.html s'affiche sans erreur
- [ ] faq.html s'affiche sans erreur
- [ ] robots.txt accessible, contient Disallow /boutique, ne bloque pas les pages publiques
- [ ] sitemap.xml ne contient pas /boutique
- [ ] La navbar de boutique.html ne contient pas de lien vers /boutique
- [ ] Aucune clé sk_live dans boutique.html

## Release gate du bloc
- [ ] Risque d'exposition qualifié (page cachée, noindex, disallow — exposition volontaire par URL directe uniquement)
- [ ] Stratégie de promotion notée (pas de promotion — distribution URL directe)
- [ ] Signal d'arrêt explicite (si la clé Stripe était exposée par erreur → retrait immédiat)
- [ ] Plan rollback noté (retrait boutique.html + revert robots.txt)

## Découvertes de session
(vide au départ)

## Blocages
- P3 nécessite : publishable key Stripe + Buy Button IDs par skill (fournis par l'utilisateur)
- P1/P2 peuvent être exécutés dès maintenant sans ces données
