# Simulateur d'Allocations pour Personnes Handicapées

Outil de simulation pour les agents CPAS permettant d'estimer le montant des allocations pour personnes handicapées (ARR et AI).

## 🎯 Fonctionnalités

- **Simulation ARR** (Allocation de Remplacement de Revenus) : Pour les personnes dont le handicap réduit la capacité de gain d'au moins 66%
- **Simulation AI** (Allocation d'Intégration) : Pour les personnes dont le handicap réduit l'autonomie (score minimum 7 points)
- Calcul basé sur :
  - La situation familiale (catégories A, B, C)
  - Les revenus du ménage
  - Le degré de handicap
  - Le nombre de personnes à charge
- Génération de résumé imprimable
- Interface moderne et intuitive

## 🚀 Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation des dépendances

```bash
npm install
```

## 💻 Utilisation

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `dist/`

### Prévisualisation du build

```bash
npm run preview
```

## 📁 Structure du projet

```
simulateur-allocations-handicap/
├── src/
│   ├── components/
│   │   └── ProgressBar.jsx       # Barre de progression
│   ├── steps/
│   │   ├── Step1AllocationType.jsx        # Choix du type d'allocation
│   │   ├── Step2PersonalInfo.jsx          # Informations personnelles
│   │   ├── Step3SpecificData.jsx          # Données spécifiques (score/capacité)
│   │   ├── Step4IncomeAndCalculation.jsx  # Revenus et calcul
│   │   └── Step5Summary.jsx               # Résumé final
│   ├── engine/
│   │   └── calculateDisabilityAllowance.js  # Moteur de calcul
│   ├── styles/
│   │   └── App.css                # Styles de l'application
│   ├── App.jsx                    # Composant principal
│   └── main.jsx                   # Point d'entrée
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🧮 Logique de calcul

### ARR (Allocation de Remplacement de Revenus)

**Montants de base 2025** :
- Catégorie A (personne isolée) : 9 124,94 € / an
- Catégorie B (ménage sans charge) : 6 083,29 € / an
- Catégorie C (ménage avec charge) : 9 124,94 € / an

**Revenus exemptés** :
- Base : 5 270,28 € / an
- + 1 400,94 € par enfant à charge

**Critère d'éligibilité** :
- Réduction de capacité de gain ≥ 66%
- Âge entre 18 et 64 ans

### AI (Allocation d'Intégration)

**Catégories selon le score d'autonomie** :
- Catégorie I (7-8 points) : 1 312,84 € / an
- Catégorie II (9-11 points) : 4 330,20 € / an
- Catégorie III (12-14 points) : 6 847,70 € / an
- Catégorie IV (15-16 points) : 8 765,97 € / an
- Catégorie V (17-18 points) : 9 124,94 € / an

**Plafonds de revenus** :
- Catégorie A : 21 787,82 € + 4 007,16 € par personne à charge
- Catégories B et C : 32 681,73 € + 4 007,16 € par personne à charge

**Critère d'éligibilité** :
- Score d'autonomie ≥ 7 points (sur 18)
- Âge entre 18 et 64 ans

## ⚠️ Avertissements importants

1. **Ceci est un outil de simulation** : Les montants calculés sont des estimations
2. **Décision finale du SPF** : Seul le SPF Sécurité Sociale peut octroyer officiellement l'allocation
3. **Évaluation médicale requise** : Le degré de handicap doit être confirmé par un médecin du SPF
4. **Enquête sur les revenus** : Les revenus déclarés seront vérifiés

## 📚 Ressources officielles

- [SPF Sécurité Sociale - Personnes handicapées](https://handicap.belgium.be/fr/allocations)
- [Simulateur officiel](https://assets.handicap.belgium.be/simulator/fr/)
- [My Handicap - Plateforme de demande](https://www.myhandicap.be)

## 🎨 Design

Interface inspirée de l'identité visuelle CPAS Connect avec :
- Palette de couleurs professionnelle
- Navigation intuitive en 5 étapes
- Design responsive (mobile, tablette, desktop)
- Possibilité d'impression du résumé

## 📄 Licence

Ce projet est développé pour un usage interne CPAS.

## 🤝 Support

Pour toute question concernant l'utilisation de cet outil, contactez votre responsable CPAS.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Février 2025  
**Montants indexés** : 2025
