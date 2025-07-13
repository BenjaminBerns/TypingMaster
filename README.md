# TypingMaster - Advanced Typing Test Application

Un site web de test de dactylographie moderne avec fonctionnalités en temps réel, système de classement, et mode multijoueur.

## ✨ Fonctionnalités

### 🎯 Test de Frappe
- Tests personnalisables (1min, 3min, 5min, nombre de mots)
- Niveaux de difficulté (facile, moyen, difficile)
- Support multilingue (Français, Anglais, Espagnol, Allemand)
- Clavier virtuel avec surlignage en temps réel
- Statistiques détaillées (WPM, précision, erreurs)

### 👥 Multijoueur
- Salles publiques et privées
- Système de codes d'invitation
- Compétition en temps réel
- Spectateurs pour parties en cours

### 🏆 Système de Classement
- Classement global avec filtres par région
- Filtres temporels (jour, semaine, mois, année)
- Profils utilisateur détaillés
- Système de défis entre utilisateurs

### 💎 Fonctionnalités Premium
- Textes spécialisés (code, médical, juridique)
- Statistiques avancées avec graphiques
- Thèmes personnalisés
- Export de données
- Programmes d'entraînement

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte GitHub
- Compte Vercel
- Base de données PostgreSQL (Neon recommandé)

### Étapes de déploiement

1. **Cloner le projet sur GitHub**
   ```bash
   git clone <votre-repo>
   cd typing-master
   ```

2. **Configurer la base de données**
   - Créer une base de données sur [Neon](https://neon.tech)
   - Récupérer l'URL de connexion

3. **Déployer sur Vercel**
   - Connecter votre repo GitHub à Vercel
   - Configurer les variables d'environnement :
     ```
     DATABASE_URL=votre_url_neon
     SESSION_SECRET=votre_secret_session
     REPL_ID=votre_repl_id
     ISSUER_URL=https://replit.com/oidc
     REPLIT_DOMAINS=votre-domaine.vercel.app
     ```

4. **Initialiser la base de données**
   ```bash
   npm run db:push
   ```

## 🔧 Variables d'environnement

### Production (Vercel)
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-super-secret-key
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-domain.vercel.app
```

### Développement (Replit)
```env
DATABASE_URL=postgresql://...
SESSION_SECRET=your-secret
REPL_ID=your-repl-id
ISSUER_URL=https://replit.com/oidc
REPLIT_DOMAINS=your-repl-domain.replit.dev
```

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework** : React 18 avec TypeScript
- **Styling** : Tailwind CSS + shadcn/ui
- **State Management** : React Query + React hooks
- **Routing** : Wouter (lightweight router)
- **Build** : Vite

### Backend (Node.js + Express)
- **Framework** : Express.js avec TypeScript
- **Database** : PostgreSQL avec Drizzle ORM
- **Authentication** : Replit Auth (OpenID Connect)
- **Sessions** : PostgreSQL session store
- **Real-time** : WebSocket pour multijoueur

### Base de données
- **ORM** : Drizzle avec schema TypeScript
- **Migrations** : Drizzle Kit
- **Provider** : Neon (PostgreSQL compatible)

## 📱 Fonctionnalités techniques

### Performance
- Lazy loading des composants
- Optimisations React Query
- Cache intelligent
- Images optimisées

### Sécurité
- Authentification OpenID Connect
- Sessions sécurisées
- Validation Zod
- CSRF protection

### Accessibilité
- Support clavier complet
- Lecteurs d'écran
- Contrastes élevés
- Navigation au clavier

## 🎨 Personnalisation

### Thèmes
- Système de thèmes avec CSS variables
- Mode sombre/clair
- Personnalisation des couleurs

### Textes
- Échantillons de texte configurables
- Support multilingue
- Textes spécialisés (Premium)

## 📊 Monétisation

### Google Ads
- Intégration AdSense
- Placement non-intrusif
- Optimisation mobile

### Abonnements Premium
- Stripe pour les paiements
- Gestion des abonnements
- Fonctionnalités premium

## 🔄 Maintenance

### Monitoring
- Logs centralisés
- Métriques de performance
- Alertes automatiques

### Mises à jour
- Déploiement automatique via GitHub
- Tests automatisés
- Rollback rapide

## 📞 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Contacter le support technique
- Documentation complète disponible

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.