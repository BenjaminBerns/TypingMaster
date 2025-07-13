# ✅ Migration Checklist - Replit vers Vercel

## Préparation du projet

### 📁 Fichiers de configuration créés
- [x] `vercel.json` - Configuration Vercel
- [x] `api/index.ts` - API serverless compatible
- [x] `build.js` - Script de build
- [x] `scripts/vercel-build.js` - Script de build Vercel
- [x] `README.md` - Documentation complète
- [x] `DEPLOYMENT.md` - Guide de déploiement détaillé
- [x] `.env.example` - Variables d'environnement
- [x] `MIGRATION_CHECKLIST.md` - Cette checklist

### 🛠️ Actions à effectuer par l'utilisateur

#### 1. Télécharger le projet depuis Replit
- [ ] Télécharger via "Download as ZIP" ou git clone
- [ ] Décompresser sur l'ordinateur local

#### 2. Créer le repository GitHub
- [ ] Créer un nouveau repository sur GitHub
- [ ] Initialiser git localement : `git init`
- [ ] Ajouter remote : `git remote add origin https://github.com/username/repo.git`
- [ ] Faire le premier commit : `git add . && git commit -m "Initial commit"`
- [ ] Push vers GitHub : `git push -u origin main`

#### 3. Configurer la base de données Neon
- [ ] Créer un compte sur [Neon.tech](https://neon.tech)
- [ ] Créer une nouvelle base de données PostgreSQL
- [ ] Copier l'URL de connexion `DATABASE_URL`
- [ ] Tester la connexion si possible

#### 4. Déployer sur Vercel
- [ ] Créer un compte sur [Vercel.com](https://vercel.com)
- [ ] Connecter le compte GitHub
- [ ] Importer le projet depuis GitHub
- [ ] Configurer les variables d'environnement :
  - [ ] `DATABASE_URL` (depuis Neon)
  - [ ] `SESSION_SECRET` (générer une clé de 32+ caractères)
  - [ ] `REPL_ID` (depuis Replit)
  - [ ] `ISSUER_URL=https://replit.com/oidc`
  - [ ] `REPLIT_DOMAINS` (domaine Vercel, ex: project.vercel.app)

#### 5. Configuration post-déploiement
- [ ] Initialiser la base de données : `npm run db:push`
- [ ] Tester l'authentification
- [ ] Vérifier que toutes les fonctionnalités marchent
- [ ] Tester les Google Ads (optionnel)

## 🔧 Résolution de problèmes

### Build échoue
- [ ] Vérifier que tous les fichiers sont présents
- [ ] Nettoyer et rebuilder : `rm -rf dist && npm run build`
- [ ] Vérifier les logs Vercel

### Base de données ne se connecte pas
- [ ] Vérifier `DATABASE_URL` dans Vercel
- [ ] Tester avec un client PostgreSQL
- [ ] Vérifier les permissions Neon

### Authentification ne fonctionne pas
- [ ] Vérifier `REPLIT_DOMAINS` correspond au domaine Vercel
- [ ] Vérifier `SESSION_SECRET` fait au moins 32 caractères
- [ ] Vérifier `REPL_ID` est correct

## 📊 Vérifications post-migration

### Fonctionnalités à tester
- [ ] Page d'accueil se charge
- [ ] Test de frappe fonctionne
- [ ] Authentification marche
- [ ] Sauvegarde des résultats
- [ ] Classement global
- [ ] Mode multijoueur
- [ ] Pages premium
- [ ] Profil utilisateur

### Performance
- [ ] Temps de chargement acceptable
- [ ] Pas d'erreurs console
- [ ] Responsive design OK
- [ ] Google Ads s'affichent (si configuré)

## 💰 Économies réalisées

- **Avant** : ~130€/mois (Replit)
- **Après** : 0€/mois (Vercel gratuit + Neon gratuit)
- **Économie** : 130€/mois = 1560€/an

## 🎯 Prochaines étapes

Une fois la migration terminée :
- [ ] Configurer un domaine personnalisé (optionnel)
- [ ] Mettre en place le monitoring
- [ ] Optimiser les performances
- [ ] Configurer Google Analytics
- [ ] Améliorer le SEO

## 📞 Support

Si vous rencontrez des problèmes :
1. Consultez les logs Vercel
2. Vérifiez ce checklist
3. Consultez `DEPLOYMENT.md`
4. Créez une issue sur GitHub