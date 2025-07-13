# 🚀 Guide complet de migration A à Z - Replit vers Vercel

## 📋 Vue d'ensemble

Cette migration vous permettra d'économiser **130€/mois** tout en gardant toutes les fonctionnalités.

**Durée estimée** : 2-3 heures
**Coût final** : 0€/mois (au lieu de 130€/mois)

---

## 🎯 ÉTAPE 1 : Télécharger le projet depuis Replit

### 1.1 Méthode recommandée : Download ZIP
1. Dans Replit, cliquez sur les **3 points (...)** dans l'explorateur de fichiers
2. Sélectionnez **"Download as ZIP"**
3. Décompressez le fichier sur votre ordinateur
4. Renommez le dossier en `typing-master` (ou le nom que vous préférez)

### 1.2 Alternative : Git clone (si vous avez déjà Git)
```bash
git clone https://github.com/votre-repl-url.git typing-master
cd typing-master
```

---

## 📁 ÉTAPE 2 : Créer le repository GitHub

### 2.1 Créer le repository
1. Aller sur [GitHub.com](https://github.com)
2. Cliquer sur **"New repository"**
3. Nom : `typing-master` (ou votre choix)
4. Visibilité : **Public** (gratuit) ou **Private** (si vous préférez)
5. **NE PAS** cocher "Initialize with README"
6. Cliquer **"Create repository"**

### 2.2 Initialiser Git localement
```bash
# Ouvrir un terminal dans le dossier du projet
cd typing-master

# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - Migration from Replit to Vercel"

# Ajouter le remote GitHub (remplacer par votre URL)
git remote add origin https://github.com/VOTRE-USERNAME/typing-master.git

# Pusher vers GitHub
git push -u origin main
```

---

## 🗄️ ÉTAPE 3 : Configurer la base de données PostgreSQL (Neon)

### 3.1 Créer un compte Neon
1. Aller sur [Neon.tech](https://neon.tech)
2. Cliquer **"Get started for free"**
3. Créer un compte (avec GitHub pour plus de simplicité)

### 3.2 Créer la base de données
1. Cliquer **"Create project"**
2. Nom du projet : `typing-master-db`
3. Région : **Europe** (pour de meilleures performances)
4. PostgreSQL version : **15** (recommandé)
5. Cliquer **"Create project"**

### 3.3 Récupérer l'URL de connexion
1. Dans le dashboard Neon, aller dans **"Connection details"**
2. Copier l'URL complète qui ressemble à :
   ```
   postgresql://username:password@host.neon.tech/database
   ```
3. **IMPORTANT** : Gardez cette URL en sécurité !

---

## 🚀 ÉTAPE 4 : Déployer sur Vercel

### 4.1 Créer un compte Vercel
1. Aller sur [Vercel.com](https://vercel.com)
2. Cliquer **"Sign up"**
3. Choisir **"Continue with GitHub"** (recommandé)
4. Autoriser Vercel à accéder à vos repositories

### 4.2 Importer le projet
1. Dans le dashboard Vercel, cliquer **"New Project"**
2. Sélectionner votre repository `typing-master`
3. Cliquer **"Import"**

### 4.3 Configurer les variables d'environnement
**CRUCIAL** : Avant de déployer, configurer ces variables :

1. Dans la page d'import, cliquer **"Environment Variables"**
2. Ajouter ces variables une par une :

```env
DATABASE_URL=postgresql://votre-url-neon-complete
SESSION_SECRET=votre-secret-32-caracteres-minimum-tres-securise
REPL_ID=votre-repl-id-actuel
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=typing-master.vercel.app
```

### 4.4 Générer SESSION_SECRET
Utilisez cet outil en ligne ou cette commande :
```bash
# Commande (Linux/Mac)
openssl rand -hex 32

# Ou générer en ligne sur : https://generate-secret.vercel.app/32
```

### 4.5 Déployer
1. Cliquer **"Deploy"**
2. Attendre 2-3 minutes que le build se termine
3. Votre site sera disponible sur `https://typing-master.vercel.app`

---

## 🔧 ÉTAPE 5 : Initialiser la base de données

### 5.1 Installer les dépendances localement
```bash
# Dans le dossier du projet
npm install
```

### 5.2 Configurer l'environnement local
1. Créer un fichier `.env` (copier depuis `.env.example`)
2. Ajouter vos variables d'environnement :
```env
DATABASE_URL=postgresql://votre-url-neon
SESSION_SECRET=votre-secret-identique-vercel
REPL_ID=votre-repl-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=typing-master.vercel.app
```

### 5.3 Créer les tables
```bash
# Créer les tables dans la base de données
npm run db:push
```

**Résultat attendu** : Vous devriez voir les tables créées dans Neon.

---

## 🔐 ÉTAPE 6 : Configurer l'authentification Replit

### 6.1 Mettre à jour les domaines autorisés
1. Dans votre Repl original, aller dans les **secrets**
2. Mettre à jour `REPLIT_DOMAINS` avec votre nouveau domaine Vercel :
   ```
   typing-master.vercel.app
   ```

### 6.2 Tester l'authentification
1. Aller sur votre site Vercel
2. Cliquer **"Se connecter"**
3. Vous devriez être redirigé vers Replit pour l'authentification
4. Après connexion, retour automatique vers votre site

---

## 💰 ÉTAPE 7 : Configurer les abonnements Premium (Stripe)

### 7.1 Créer un compte Stripe
1. Aller sur [Stripe.com](https://stripe.com)
2. Créer un compte business
3. Activer le mode "Live" (production)

### 7.2 Récupérer les clés API
1. Dans le dashboard Stripe, aller dans **"API Keys"**
2. Copier :
   - **Publishable key** (commence par `pk_`)
   - **Secret key** (commence par `sk_`)

### 7.3 Ajouter les variables Stripe dans Vercel
1. Dans Vercel, aller dans **Project Settings** → **Environment Variables**
2. Ajouter :
```env
STRIPE_PUBLISHABLE_KEY=pk_live_votre_cle_publique
STRIPE_SECRET_KEY=sk_live_votre_cle_secrete
```

### 7.4 Configurer les produits Stripe
1. Dans Stripe, créer un produit "Premium Monthly"
2. Prix : 4,99€/mois
3. Récupérer l'ID du prix (commence par `price_`)

---

## 📢 ÉTAPE 8 : Configurer Google Ads

### 8.1 Créer un compte Google AdSense
1. Aller sur [AdSense.google.com](https://www.google.com/adsense/)
2. Créer un compte avec votre domaine Vercel
3. Attendre l'approbation (peut prendre 24-48h)

### 8.2 Récupérer le Publisher ID
1. Dans AdSense, aller dans **"Sites"**
2. Copier votre Publisher ID (commence par `ca-pub-`)

### 8.3 Ajouter dans Vercel
```env
GOOGLE_ADSENSE_CLIENT_ID=ca-pub-votre-publisher-id
```

---

## 🧪 ÉTAPE 9 : Tests complets

### 9.1 Tester toutes les fonctionnalités
1. **Page d'accueil** : Se charge correctement
2. **Test de frappe** : Fonctionne, calcule WPM/précision
3. **Authentification** : Connexion/déconnexion
4. **Sauvegarde** : Résultats sauvegardés en base
5. **Classement** : Affichage des scores
6. **Multijoueur** : Création/participation aux salles
7. **Premium** : Pages et fonctionnalités premium
8. **Profil** : Statistiques personnelles

### 9.2 Tester sur différents appareils
- **Desktop** : Chrome, Firefox, Safari
- **Mobile** : iOS Safari, Android Chrome
- **Tablette** : Responsive design

---

## 🔧 ÉTAPE 10 : Optimisations post-migration

### 10.1 Configurer un domaine personnalisé (optionnel)
1. Acheter un domaine (ex: `typing-master.com`)
2. Dans Vercel, ajouter le domaine custom
3. Configurer les DNS selon les instructions Vercel

### 10.2 Monitoring et analytics
1. Activer Vercel Analytics (gratuit)
2. Ajouter Google Analytics si souhaité
3. Configurer les alertes d'erreur

### 10.3 Performance
1. Vérifier les Core Web Vitals
2. Optimiser les images si nécessaire
3. Tester la vitesse avec PageSpeed Insights

---

## 🚨 Résolution de problèmes courants

### Build qui échoue
```bash
# Nettoyer et rebuilder
rm -rf dist node_modules
npm install
npm run build
```

### Base de données inaccessible
1. Vérifier que `DATABASE_URL` est correcte dans Vercel
2. Tester la connexion avec un client PostgreSQL
3. Vérifier les permissions dans Neon

### Authentification qui ne fonctionne pas
1. Vérifier `REPLIT_DOMAINS` correspond exactement au domaine Vercel
2. Vérifier `SESSION_SECRET` fait au moins 32 caractères
3. Vérifier `REPL_ID` est correct

### Google Ads ne s'affichent pas
1. Vérifier que le site est approuvé par AdSense
2. Attendre 24-48h après ajout du code
3. Vérifier le Publisher ID

---

## 📊 Récapitulatif des coûts

### Avant migration (Replit)
- **Hébergement** : 130€/mois
- **Base de données** : Incluse
- **Total** : 130€/mois = 1560€/an

### Après migration (Vercel)
- **Hébergement** : 0€/mois (gratuit)
- **Base de données** : 0€/mois (Neon gratuit)
- **Total** : 0€/mois = 0€/an

### Économie
**1560€/an économisés** ! 🎉

---

## 📞 Support et maintenance

### Mises à jour futures
1. Modifier le code localement
2. Commit et push vers GitHub
3. Vercel déploie automatiquement

### Monitoring
- Vérifier les logs Vercel régulièrement
- Surveiller les métriques de performance
- Suivre les revenus AdSense et Premium

### Backup
- GitHub contient tout le code
- Neon fait des backups automatiques
- Exporter les données importantes régulièrement

---

## ✅ Checklist finale

- [ ] Projet téléchargé et sur GitHub
- [ ] Base de données Neon créée et configurée
- [ ] Déploiement Vercel réussi
- [ ] Variables d'environnement configurées
- [ ] Authentification testée et fonctionnelle
- [ ] Base de données initialisée (tables créées)
- [ ] Stripe configuré pour les abonnements
- [ ] Google Ads configuré (si approuvé)
- [ ] Tests complets effectués
- [ ] Monitoring mis en place

**Félicitations ! Votre site est maintenant en ligne et vous économisez 130€/mois !** 🎉

Pour toute question, consultez les logs Vercel ou créez une issue sur GitHub.