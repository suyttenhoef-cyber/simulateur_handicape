# 📊 Simulateur d'Allocations pour Personnes Handicapées

## 🎯 Vue d'ensemble

Application web React + Vite pour simuler les allocations pour personnes handicapées (ARR et AI) destinée aux agents CPAS.

## 📦 Contenu du projet

### Fichiers principaux
- `index.html` - Page HTML principale
- `package.json` - Dépendances et scripts npm
- `vite.config.js` - Configuration Vite
- `.gitignore` - Fichiers à ignorer par Git

### Documentation
- `README.md` - Documentation complète du projet
- `INSTALLATION.md` - Guide d'installation rapide

### Code source (`src/`)

#### Composants React
- `src/App.jsx` - Composant principal de l'application
- `src/main.jsx` - Point d'entrée React
- `src/components/ProgressBar.jsx` - Barre de progression

#### Étapes du formulaire
- `src/steps/Step1AllocationType.jsx` - Choix ARR ou AI
- `src/steps/Step2PersonalInfo.jsx` - Âge et situation familiale
- `src/steps/Step3SpecificData.jsx` - Score d'autonomie ou capacité de gain
- `src/steps/Step4IncomeAndCalculation.jsx` - Revenus et calcul
- `src/steps/Step5Summary.jsx` - Résumé et impression

#### Logique métier
- `src/engine/calculateDisabilityAllowance.js` - Moteur de calcul des allocations
  - Constantes et montants 2025
  - Fonctions de validation
  - Algorithmes de calcul ARR et AI
  - Utilitaires de formatage

#### Styles
- `src/styles/App.css` - Styles CSS complets
  - Design moderne inspiré CPAS Connect
  - Responsive design
  - Styles d'impression

## 🔧 Technologies utilisées

- **React 18** - Framework JavaScript
- **Vite 5** - Build tool ultra-rapide
- **Font Awesome 6** - Icônes
- **Google Fonts (Inter)** - Typographie moderne
- **CSS3** - Styles avec variables CSS et gradients

## 🎨 Caractéristiques du design

- ✅ Interface moderne et professionnelle
- ✅ Palette de couleurs CPAS Connect
- ✅ Navigation intuitive en 5 étapes
- ✅ Responsive (mobile, tablette, desktop)
- ✅ Mode impression optimisé
- ✅ Animations et transitions fluides
- ✅ Feedback visuel en temps réel
- ✅ Indicateurs d'éligibilité clairs

## 📐 Architecture de l'application

```
1. L'utilisateur choisit le type d'allocation (ARR ou AI)
   ↓
2. Renseigne les informations personnelles (âge, situation familiale)
   ↓
3. Indique le degré de handicap (score ou %)
   ↓
4. Entre les revenus du ménage
   ↓
5. Obtient le calcul et peut imprimer le résumé
```

## 🧮 Formules de calcul

### ARR (Allocation de Remplacement de Revenus)
```
Allocation = Montant de base - (Revenus - Exemptions)

Exemptions = 5270.28€ + (1400.94€ × nb_enfants)

Montants de base :
- Catégorie A : 9124.94€
- Catégorie B : 6083.29€
- Catégorie C : 9124.94€
```

### AI (Allocation d'Intégration)
```
Allocation = Montant de base - max(0, Revenus - Plafond)

Catégories selon score :
- I (7-8pts) : 1312.84€
- II (9-11pts) : 4330.20€
- III (12-14pts) : 6847.70€
- IV (15-16pts) : 8765.97€
- V (17-18pts) : 9124.94€
```

## 🚀 Commandes disponibles

```bash
npm install          # Installer les dépendances
npm run dev          # Lancer en développement
npm run build        # Compiler pour production
npm run preview      # Prévisualiser le build
npm run lint         # Vérifier le code
```

## 📱 Compatibilité navigateurs

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## ⚠️ Notes importantes

1. **Outil de simulation uniquement** - Ne constitue pas une décision officielle
2. **Montants 2025** - Indexés selon la législation en vigueur
3. **Évaluation médicale requise** - Le SPF doit confirmer le degré de handicap
4. **Vérification des revenus** - Une enquête officielle sera effectuée

## 📚 Sources législatives

- Loi-programme du 22 décembre 2008
- AR du 6 juillet 1987 (ARR)
- AR du 6 juillet 1987 (AI)
- Montants indexés au 01/01/2025

## 🔗 Liens utiles

- [SPF Sécurité Sociale](https://handicap.belgium.be)
- [Simulateur officiel](https://assets.handicap.belgium.be/simulator/fr/)
- [My Handicap](https://www.myhandicap.be)
- [CPAS Connect](https://www.cpasconnect.be)

## 👨‍💻 Développement

Créé pour les agents CPAS afin de faciliter l'évaluation préliminaire des demandes d'allocations pour personnes handicapées.

---

**Version** : 1.0.0  
**Date** : Février 2026  
**Statut** : Prêt pour déploiement
