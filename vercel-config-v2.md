# Vercel Configuration V2

## Problème identifié
La nouvelle syntaxe `buildCommand` + `outputDirectory` ne fonctionne pas correctement.

## Solution appliquée
Retour à la syntaxe classique `builds` avec `@vercel/static-build` pour le frontend.

## Configuration
- Frontend: `@vercel/static-build` avec buildCommand personnalisé
- Backend: `@vercel/node@3.0.0` pour l'API
- Routes: Configuration classique pour SPA

## Résultat attendu
Le build créera `public/` et Vercel le trouvera via `@vercel/static-build`.