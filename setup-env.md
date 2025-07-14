# Configuration .env pour Windows

## Problème
Le fichier `.env` n'existe pas, d'où l'erreur "DATABASE_URL must be set".

## Solution
Créez un fichier `.env` à la racine du projet avec vos variables :

```env
DATABASE_URL=postgresql://votre_connection_string_depuis_neon
SESSION_SECRET=votre_session_secret_depuis_replit_ou_vercel
REPL_ID=votre_repl_id_depuis_replit_ou_vercel
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=localhost:5000
GOOGLE_ADS_CLIENT_ID=ca-pub-3442421625172943
NODE_ENV=development
```

## Récupération des variables
1. **DATABASE_URL** : Dashboard Neon → Connection Details
2. **SESSION_SECRET** : Replit Secrets ou Vercel Environment Variables
3. **REPL_ID** : Replit Secrets ou Vercel Environment Variables

## Test après création
```cmd
npm run db:push
npx cross-env NODE_ENV=development tsx server/index.ts
```