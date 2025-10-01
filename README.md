# Que de la Drague

Site web de soutien pour le projet de BD féministe et engagé de Lisa Launey & Fanny Charby.

## 📋 Description

Ce site permet aux supporters de laisser un message de soutien qui sera inclus à la fin de la BD. Les visiteurs peuvent :

- Lire la description du projet
- Télécharger le PDF du projet
- Laisser un message personnalisé avec leur nom
- Les messages sont enregistrés dans une base de données Supabase

## 🚀 Installation

### Prérequis

- Node.js 18+ et npm
- Un compte Supabase

### Étapes

1. **Installer les dépendances**

   ```bash
   npm install
   ```

2. **Configurer Supabase**

   a. Créez un projet sur [supabase.com](https://supabase.com)

   b. Dans votre projet Supabase, allez dans l'éditeur SQL et exécutez le contenu du fichier :

   ```
   supabase/migrations/001_create_submissions_table.sql
   ```

   c. Créez un fichier `.env` à la racine du projet avec vos identifiants Supabase :

   ```env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_publique
   ```

   Vous trouverez ces valeurs dans :

   - Settings → API → Project URL
   - Settings → API → Project API keys → anon/public

3. **Remplacer le logo (optionnel)**

   Remplacez le fichier `public/logo.svg` par votre propre logo.

   Pour l'utiliser dans l'App, éditez `src/App.jsx` et remplacez :

   ```jsx
   <div className="logo-placeholder">
     <span>LOGO</span>
   </div>
   ```

   par :

   ```jsx
   <img src="/logo.svg" alt="Logo" className="logo" />
   ```

   Puis ajoutez dans `src/App.css` :

   ```css
   .logo {
     width: 120px;
     height: 120px;
     object-fit: contain;
     margin-bottom: 20px;
   }
   ```

4. **Mettre à jour le lien PDF**

   Dans `src/App.jsx`, remplacez l'URL du placeholder :

   ```jsx
   window.open("https://example.com/placeholder.pdf", "_blank")
   ```

   par l'URL de votre vrai PDF.

## 💻 Développement

Lancer le serveur de développement :

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

## 📦 Build pour production

Créer une version optimisée :

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`

Pour tester la version de production localement :

```bash
npm run preview
```

## 🚢 Déploiement

Vous pouvez déployer ce site sur plusieurs plateformes :

### Vercel (recommandé)

1. Push votre code sur GitHub
2. Connectez votre repo sur [vercel.com](https://vercel.com)
3. Ajoutez vos variables d'environnement dans les settings Vercel
4. Déployez !

### Netlify

1. Push votre code sur GitHub
2. Connectez votre repo sur [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Ajoutez vos variables d'environnement dans les settings

### Supabase Storage (hosting statique)

```bash
npm run build
# Uploadez le contenu du dossier dist/ sur Supabase Storage
```

## 📊 Base de données

La table `submissions` stocke :

- `id` : UUID unique
- `message` : Le message du supporter
- `signature` : Le nom/prénom du supporter
- `created_at` : Date et heure de soumission
- `user_agent` : Informations sur le navigateur (pour analytics)
- `referrer` : Page référente (utile pour tracker d'où viennent les visiteurs du QR code)

Pour consulter les messages, allez dans votre projet Supabase → Table Editor → submissions

## 🔒 Sécurité

Les Row Level Security (RLS) policies sont activées :

- Tout le monde peut insérer des messages
- Tout le monde peut lire les messages (pour de futures fonctionnalités)

Si vous voulez restreindre l'accès en lecture, modifiez la policy dans le fichier de migration.

## 📱 QR Code

Pour générer un QR code pointant vers votre site :

1. Une fois déployé, copiez l'URL de production
2. Utilisez un générateur de QR code comme [qr-code-generator.com](https://www.qr-code-generator.com/)
3. Imprimez et affichez à votre événement !

## 🎨 Personnalisation

Le design utilise du CSS simple (pas de Tailwind). Vous pouvez facilement personnaliser :

- Les couleurs dans `src/App.css` (cherchez les valeurs `#A586AE` (fond violet) et `#2F5AA2` (boutons bleus))
- Les textes dans `src/App.jsx`
- La structure dans `src/App.jsx`

## 📄 Licence

Tous droits réservés - Lisa Launey & Fanny Charby
