# Guide de déploiement Vercel

## 🚀 Étapes de déploiement

### 1. Préparer le projet sur GitHub

```bash
# Initialiser git si pas déjà fait
git init

# Ajouter tous les fichiers
git add .

# Commit initial
git commit -m "Initial commit - Migration to Vercel"

# Ajouter votre remote GitHub
git remote add origin https://github.com/votre-username/typing-master.git

# Push vers GitHub
git push -u origin main
```

### 2. Base de données sur Neon

1. Aller sur [Neon.tech](https://neon.tech)
2. Créer un compte gratuit
3. Créer une nouvelle base de données
4. Copier l'URL de connexion `DATABASE_URL`

### 3. Déployer sur Vercel

1. Aller sur [Vercel.com](https://vercel.com)
2. Connecter votre compte GitHub
3. Importer votre projet `typing-master`
4. Configurer les variables d'environnement :

```env
DATABASE_URL=postgresql://username:password@host/database
SESSION_SECRET=your-super-secret-key-minimum-32-characters
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-project.vercel.app
```

5. Déployer !

### 4. Configuration post-déploiement

```bash
# Initialiser la base de données
npm run db:push
```

## 🔧 Configuration Replit Auth

Pour que l'authentification fonctionne sur Vercel :

1. Mettre à jour `REPLIT_DOMAINS` avec votre domaine Vercel
2. Configurer l'URL de callback : `https://your-project.vercel.app/api/callback`

## 📊 Coûts estimés

- **Vercel** : 0€/mois (plan gratuit)
- **Neon** : 0€/mois (25GB gratuit)
- **Total** : 0€/mois au lieu de 130€/mois

## 🎯 Avantages

✅ **Performance** : CDN global automatique
✅ **Sécurité** : HTTPS automatique
✅ **Scaling** : Auto-scaling sans configuration
✅ **Monitoring** : Analytics intégrées
✅ **Déploiement** : Déploiement automatique via git push

## 🔧 Dépannage

### Build fails
```bash
# Nettoyer et rebuilder
rm -rf dist
npm run build
```

### Base de données ne se connecte pas
- Vérifier que `DATABASE_URL` est correctement configurée
- Tester la connexion avec `npm run db:push`

### Authentification ne fonctionne pas
- Vérifier `REPLIT_DOMAINS` correspond à votre domaine Vercel
- Vérifier que `SESSION_SECRET` fait au moins 32 caractères