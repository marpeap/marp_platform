# Manifest — Bloc 00

Etat : done

## Patches

P1 — C1 — Squelette boutique.html avec navbar, footer, noindex, section hero — `boutique.html` — [x] done
P2 — C1 — CSS skills grid + skill card design (7 atmosphères distinctes, Hyper V3) — `boutique.html` — [x] done
P3 — C3 — Payment Links Stripe par skill (7 produits + prix 15€ + links créés via API) — `boutique.html` — [x] done
P4 — C1 — Disallow /boutique et /boutique.html dans robots.txt — `robots.txt` — [x] done
P5 — C1 — Success state JS (?success=1 → banner) — `boutique.html` — [x] done

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
