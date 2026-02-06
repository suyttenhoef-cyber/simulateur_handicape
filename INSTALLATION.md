# 🚀 Guide d'Installation Rapide

## Installation en 3 étapes

### 1️⃣ Installer les dépendances

```bash
npm install
```

⏱️ Temps estimé : 1-2 minutes

### 2️⃣ Lancer en mode développement

```bash
npm run dev
```

✅ L'application sera accessible sur : http://localhost:5173

### 3️⃣ (Optionnel) Compiler pour la production

```bash
npm run build
```

📦 Les fichiers compilés seront dans le dossier `dist/`

## 📋 Prérequis

- **Node.js** version 18 ou supérieure
- **npm** (inclus avec Node.js)

### Vérifier votre version de Node.js

```bash
node --version
```

Si vous n'avez pas Node.js ou si la version est trop ancienne, téléchargez-le sur : https://nodejs.org/

## ❓ En cas de problème

### Erreur "command not found: npm"
➡️ Installez Node.js depuis https://nodejs.org/

### Erreur "EACCES: permission denied"
➡️ Sur Linux/Mac, utilisez : `sudo npm install`

### Port 5173 déjà utilisé
➡️ Vite choisira automatiquement un autre port (ex: 5174)

### Erreur pendant l'installation
➡️ Supprimez le dossier `node_modules` et le fichier `package-lock.json`, puis réessayez :
```bash
rm -rf node_modules package-lock.json
npm install
```

## 🎯 Utilisation de l'application

1. Ouvrez votre navigateur sur http://localhost:5173
2. Suivez les 5 étapes du simulateur :
   - Étape 1 : Choisir le type d'allocation (ARR ou AI)
   - Étape 2 : Renseigner les informations personnelles
   - Étape 3 : Évaluer le degré de handicap
   - Étape 4 : Indiquer les revenus et calculer
   - Étape 5 : Consulter et imprimer le résumé

## 📱 Compatibilité

✅ Chrome, Firefox, Safari, Edge (versions récentes)
✅ Responsive : fonctionne sur ordinateur, tablette et mobile

## 💾 Déploiement

Pour mettre l'application en ligne :

1. Compiler : `npm run build`
2. Le dossier `dist/` contient tous les fichiers à héberger
3. Uploader sur votre serveur web ou utiliser un service comme :
   - Netlify (gratuit)
   - Vercel (gratuit)
   - GitHub Pages

---

**Besoin d'aide ?** Consultez le README.md complet pour plus de détails.
