# Vercel Configuration V2

## Problème identifié
Le projet utilise `dist/public` comme sortie (vite.config.ts ligne 28), pas `public`.

## Solution appliquée
- buildCommand: `vite build` (utilise la config Vite existante)
- outputDirectory: `dist/public` (correspond à la configuration Vite)

## Configuration
- Frontend: `@vercel/static-build` avec le dossier correct
- Backend: `@vercel/node@3.0.0` pour l'API
- Routes: Configuration classique pour SPA

## Résultat attendu
Le build créera `dist/public/` et Vercel le trouvera correctement.