# Guide d'Administration

## 🔐 Accès au Dashboard

**URL**: `https://votre-site.com/admin/login`

Connectez-vous avec les identifiants créés dans Supabase Authentication.

## 📊 Fonctionnalités du Dashboard

### 1. Statistiques Générales

Le dashboard affiche 4 statistiques principales :

- **Total messages** : Nombre total de soumissions
- **Aujourd'hui** : Soumissions reçues aujourd'hui
- **Total caractères** : Nombre total de caractères dans tous les messages (formaté avec espaces)
- **Caractères / signature** : Longueur moyenne des signatures

### 2. Heatmap par Heure

Visualisation graphique montrant :

- La répartition des soumissions par heure de la journée
- Les pics d'activité
- Utile pour identifier les meilleurs moments d'engagement

### 3. Table des Submissions

Table complète avec :

- Date et heure de soumission
- Message complet
- Signature (nom/prénom)
- Nombre de caractères

### 4. Export CSV

Bouton "📥 Exporter CSV" pour télécharger toutes les données :

- Format CSV compatible Excel/Google Sheets
- Encodage UTF-8 avec BOM (caractères spéciaux supportés)
- Colonnes : Date, Heure, Message, Signature, User Agent

## 🔄 Workflow Recommandé

### Pour les Événements

1. **Avant l'événement** : Vérifier que tout fonctionne
2. **Pendant l'événement** : Surveiller les soumissions en temps réel
3. **Après l'événement** :
   - Exporter les données CSV
   - Analyser la heatmap pour comprendre les pics
   - Sauvegarder les données

### Pour la Publication dans la BD

1. Exporter le CSV complet
2. Filtrer/modérer si nécessaire
3. Formater pour l'impression
4. Vérifier les doublons ou contenus inappropriés

## 🛡️ Sécurité

- **Ne partagez jamais vos identifiants admin**
- Les mots de passe sont hashés dans Supabase
- Le dashboard est protégé par authentification
- Pensez à vous déconnecter sur les ordinateurs partagés

## 📱 Accès Mobile

Le dashboard est responsive et fonctionne sur :

- Desktop
- Tablette
- Mobile (affichage adapté)

## 🆘 Dépannage

### "Session expirée"

- Reconnectez-vous via `/admin/login`

### "Erreur de chargement"

- Vérifiez votre connexion internet
- Vérifiez que Supabase est en ligne

### "Export CSV vide"

- Vérifiez qu'il y a des submissions
- Essayez de recharger la page

## 📞 Support

Pour toute question technique, contactez l'administrateur système.
