# Déploiement Fix - Output Directory

## Problème identifié
Vercel cherche le dossier `public` mais notre build crée `dist/public`.

## Solution appliquée
- Changed buildCommand: `vite build --outDir public` (au lieu de dist/public)
- Changed outputDirectory: `public` (au lieu de dist/public)

## Résultat attendu
Le build créera directement dans `public/` que Vercel pourra trouver.

## Prochaines étapes
1. Commit + push cette correction
2. Vercel redéploie automatiquement
3. Le site devrait se charger correctement