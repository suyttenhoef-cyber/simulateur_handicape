// =============================================
// CONSTANTES ET CONFIGURATION
// =============================================

// Types d'allocation
export const ALLOCATION_TYPES = [
  {
    id: 'arr',
    label: 'Allocation de Remplacement de Revenus (ARR)',
    shortLabel: 'ARR',
    description: 'Pour les personnes dont le handicap réduit la capacité de gain',
    icon: 'fas fa-briefcase',
    details: [
      'Évalue l\'impact sur votre capacité à travailler',
      'Nécessite une réduction d\'au moins 2/3 de la capacité de gain',
      'Montant selon situation familiale et revenus'
    ]
  },
  {
    id: 'ai',
    label: 'Allocation d\'Intégration (AI)',
    shortLabel: 'AI',
    description: 'Pour les personnes dont le handicap réduit l\'autonomie',
    icon: 'fas fa-hand-holding-heart',
    details: [
      'Évalue l\'impact sur votre autonomie quotidienne',
      'Nécessite un score d\'au moins 7 points',
      'Montant selon catégorie et revenus'
    ]
  }
];

// Catégories de situation familiale
export const FAMILY_CATEGORIES = [
  {
    id: 'alone',
    label: 'A - Personne isolée',
    description: 'Personne vivant seule',
    icon: 'fas fa-user',
    code: 'A'
  },
  {
    id: 'household_alone',
    label: 'B - Ménage sans personnes à charge',
    description: 'Couple ou cohabitant sans enfants ni personnes à charge',
    icon: 'fas fa-user-friends',
    code: 'B'
  },
  {
    id: 'household_dependents',
    label: 'C - Ménage avec personne(s) à charge',
    description: 'Avec enfant(s) ou autre(s) personne(s) à charge',
    icon: 'fas fa-users',
    code: 'C'
  }
];

// Catégories AI (Allocation d'Intégration) selon le score d'autonomie
export const AI_CATEGORIES = [
  {
    id: 'cat1',
    label: 'Catégorie I',
    minPoints: 7,
    maxPoints: 8,
    description: '7 ou 8 points',
    icon: 'fas fa-chart-bar'
  },
  {
    id: 'cat2',
    label: 'Catégorie II',
    minPoints: 9,
    maxPoints: 11,
    description: '9 à 11 points',
    icon: 'fas fa-chart-bar'
  },
  {
    id: 'cat3',
    label: 'Catégorie III',
    minPoints: 12,
    maxPoints: 14,
    description: '12 à 14 points',
    icon: 'fas fa-chart-bar'
  },
  {
    id: 'cat4',
    label: 'Catégorie IV',
    minPoints: 15,
    maxPoints: 16,
    description: '15 ou 16 points',
    icon: 'fas fa-chart-bar'
  },
  {
    id: 'cat5',
    label: 'Catégorie V',
    minPoints: 17,
    maxPoints: 18,
    description: '17 ou 18 points',
    icon: 'fas fa-chart-bar'
  }
];

// Montants ARR 2025 (indexés) en euros par an
export const ARR_AMOUNTS = {
  A: 9124.94, // Catégorie A - Personne isolée
  B: 6083.29, // Catégorie B - Ménage sans charge
  C: 9124.94  // Catégorie C - Ménage avec charge
};

// Montants AI 2025 (indexés) en euros par an
export const AI_AMOUNTS = {
  cat1: 1312.84,
  cat2: 4330.20,
  cat3: 6847.70,
  cat4: 8765.97,
  cat5: 9124.94
};

// Plafonds de revenus exemptés pour ARR (revenus du travail)
export const ARR_WORK_EXEMPTIONS = {
  basic: 5270.28, // Exemption de base
  additional: 1400.94 // Par enfant à charge
};

// Plafonds de revenus pour AI
export const AI_INCOME_LIMITS = {
  A: {
    basic: 21787.82,
    perDependent: 4007.16
  },
  B: {
    basic: 32681.73,
    perDependent: 4007.16
  },
  C: {
    basic: 32681.73,
    perDependent: 4007.16
  }
};

// Types de revenus
export const INCOME_TYPES = [
  {
    id: 'work',
    label: 'Revenus du travail',
    description: 'Salaires, revenus professionnels',
    icon: 'fas fa-briefcase'
  },
  {
    id: 'replacement',
    label: 'Revenus de remplacement',
    description: 'Chômage, maladie, pension',
    icon: 'fas fa-file-invoice-dollar'
  },
  {
    id: 'property',
    label: 'Revenus immobiliers',
    description: 'Loyers, revenus fonciers',
    icon: 'fas fa-home'
  },
  {
    id: 'capital',
    label: 'Revenus mobiliers',
    description: 'Intérêts, dividendes',
    icon: 'fas fa-chart-line'
  }
];

// =============================================
// FONCTIONS D'UTILITÉ
// =============================================

// Obtient la catégorie AI selon le score
export const getAICategory = (score) => {
  if (score < 7) return null;
  return AI_CATEGORIES.find(cat => score >= cat.minPoints && score <= cat.maxPoints);
};

// Vérifie l'éligibilité minimale ARR (réduction capacité de gain ≥ 66%)
export const isARREligible = (reductionPercentage) => {
  return reductionPercentage >= 66;
};

// Vérifie l'éligibilité minimale AI (score ≥ 7)
export const isAIEligible = (autonomyScore) => {
  return autonomyScore >= 7;
};

// =============================================
// VALIDATION DES DONNÉES
// =============================================

export const validatePersonalInfo = (data) => {
  const errors = {};
  
  if (!data.age || data.age < 18) {
    errors.age = 'L\'âge minimum est de 18 ans';
  }
  
  if (data.age >= 65) {
    errors.age = 'Pour les personnes de 65 ans et plus, contactez votre région pour l\'Allocation pour Personnes Âgées (APA)';
  }
  
  if (!data.familyCategory) {
    errors.familyCategory = 'Veuillez sélectionner une situation familiale';
  }
  
  if (data.familyCategory === 'household_dependents' && (!data.dependents || data.dependents < 1)) {
    errors.dependents = 'Veuillez indiquer le nombre de personnes à charge';
  }
  
  return errors;
};

export const validateARRData = (data) => {
  const errors = {};
  
  if (data.workCapacityReduction === undefined || data.workCapacityReduction === null) {
    errors.workCapacityReduction = 'Veuillez indiquer le pourcentage de réduction de capacité de gain';
  } else if (data.workCapacityReduction < 0 || data.workCapacityReduction > 100) {
    errors.workCapacityReduction = 'Le pourcentage doit être entre 0 et 100';
  }
  
  return errors;
};

export const validateAIData = (data) => {
  const errors = {};
  
  if (data.autonomyScore === undefined || data.autonomyScore === null) {
    errors.autonomyScore = 'Veuillez indiquer le score d\'autonomie';
  } else if (data.autonomyScore < 0 || data.autonomyScore > 18) {
    errors.autonomyScore = 'Le score doit être entre 0 et 18';
  }
  
  return errors;
};

export const validateIncomeData = (incomes) => {
  const errors = {};
  
  if (!incomes || !Array.isArray(incomes)) {
    return errors;
  }
  
  incomes.forEach((income, index) => {
    if (income.amount && income.amount < 0) {
      errors[`income_${index}`] = 'Le montant ne peut pas être négatif';
    }
  });
  
  return errors;
};

// =============================================
// CALCUL DE L'ARR
// =============================================

const calculateARR = (personalInfo, incomeInfo) => {
  const { familyCategory, dependents = 0 } = personalInfo;
  const { workIncome = 0, otherIncome = 0 } = incomeInfo;
  
  // Montant de base selon catégorie familiale
  let baseAmount = ARR_AMOUNTS[FAMILY_CATEGORIES.find(c => c.id === familyCategory)?.code] || 0;
  
  // Calcul des revenus exemptés (revenus du travail)
  let exemptedIncome = ARR_WORK_EXEMPTIONS.basic;
  if (dependents > 0) {
    exemptedIncome += ARR_WORK_EXEMPTIONS.additional * dependents;
  }
  
  // Revenus du travail pris en compte (après exemption)
  const taxableWorkIncome = Math.max(0, workIncome - exemptedIncome);
  
  // Tous les autres revenus sont pris en compte à 100%
  const totalTaxableIncome = taxableWorkIncome + otherIncome;
  
  // Calcul de l'allocation (montant de base - revenus imposables)
  const allocation = Math.max(0, baseAmount - totalTaxableIncome);
  
  return {
    eligible: allocation > 0,
    baseAmount,
    exemptedIncome,
    taxableIncome: totalTaxableIncome,
    annualAmount: allocation,
    monthlyAmount: allocation / 12,
    details: {
      workIncome,
      otherIncome,
      exemptedWorkIncome: Math.min(workIncome, exemptedIncome),
      taxableWorkIncome,
      reductionPercentage: baseAmount > 0 ? ((baseAmount - allocation) / baseAmount * 100) : 0
    }
  };
};

// =============================================
// CALCUL DE L'AI
// =============================================

const calculateAI = (personalInfo, autonomyScore, incomeInfo) => {
  const { familyCategory, dependents = 0 } = personalInfo;
  const { totalIncome = 0 } = incomeInfo;
  
  // Déterminer la catégorie AI
  const aiCategory = getAICategory(autonomyScore);
  if (!aiCategory) {
    return {
      eligible: false,
      message: 'Score d\'autonomie insuffisant (minimum 7 points requis)',
      annualAmount: 0,
      monthlyAmount: 0
    };
  }
  
  // Montant de base selon catégorie AI
  const baseAmount = AI_AMOUNTS[aiCategory.id];
  
  // Plafond de revenus
  const familyCode = FAMILY_CATEGORIES.find(c => c.id === familyCategory)?.code;
  const incomeLimitConfig = AI_INCOME_LIMITS[familyCode];
  
  let incomeLimit = incomeLimitConfig.basic;
  if (dependents > 0) {
    incomeLimit += incomeLimitConfig.perDependent * dependents;
  }
  
  // Si revenus dépassent le plafond, calcul de la réduction
  let allocation = baseAmount;
  if (totalIncome > incomeLimit) {
    const excess = totalIncome - incomeLimit;
    allocation = Math.max(0, baseAmount - excess);
  }
  
  return {
    eligible: allocation > 0,
    category: aiCategory.label,
    categoryId: aiCategory.id,
    baseAmount,
    incomeLimit,
    totalIncome,
    annualAmount: allocation,
    monthlyAmount: allocation / 12,
    details: {
      autonomyScore,
      incomeExcess: Math.max(0, totalIncome - incomeLimit),
      reductionPercentage: baseAmount > 0 ? ((baseAmount - allocation) / baseAmount * 100) : 0
    }
  };
};

// =============================================
// FONCTION PRINCIPALE
// =============================================

export const calculateDisabilityAllowance = (allocationType, personalInfo, specificData, incomeData) => {
  const result = {
    allocationType,
    timestamp: new Date().toISOString()
  };
  
  // Préparer les revenus
  const incomeInfo = {
    workIncome: 0,
    otherIncome: 0,
    totalIncome: 0
  };
  
  if (incomeData && Array.isArray(incomeData)) {
    incomeData.forEach(income => {
      const amount = parseFloat(income.amount) || 0;
      incomeInfo.totalIncome += amount;
      
      if (income.type === 'work') {
        incomeInfo.workIncome += amount;
      } else {
        incomeInfo.otherIncome += amount;
      }
    });
  }
  
  // Calcul selon le type d'allocation
  if (allocationType === 'arr') {
    const arrResult = calculateARR(personalInfo, incomeInfo);
    return { ...result, ...arrResult };
  } else if (allocationType === 'ai') {
    const { autonomyScore } = specificData;
    const aiResult = calculateAI(personalInfo, autonomyScore, incomeInfo);
    return { ...result, ...aiResult };
  }
  
  return {
    ...result,
    eligible: false,
    message: 'Type d\'allocation non reconnu'
  };
};

// =============================================
// UTILITAIRES POUR LE RÉSUMÉ
// =============================================

export const getAllocationTypeLabel = (typeId) => {
  const type = ALLOCATION_TYPES.find(t => t.id === typeId);
  return type ? type.label : 'Type non spécifié';
};

export const getFamilyCategoryLabel = (categoryId) => {
  const category = FAMILY_CATEGORIES.find(c => c.id === categoryId);
  return category ? category.label : 'Catégorie non spécifiée';
};

export const getDocumentsList = (allocationType, personalInfo) => {
  const baseDocuments = [
    {
      title: 'Carte d\'identité',
      description: 'Copie de la carte d\'identité du demandeur',
      icon: 'fas fa-id-card',
      important: 'Document obligatoire'
    },
    {
      title: 'Composition de ménage',
      description: 'Attestation récente de composition de ménage',
      icon: 'fas fa-users'
    },
    {
      title: 'Avertissement-extrait de rôle',
      description: 'Dernier avis d\'imposition ou document fiscal',
      icon: 'fas fa-file-invoice'
    },
    {
      title: 'Attestation de résidence',
      description: 'Preuve de domiciliation en Belgique',
      icon: 'fas fa-home'
    }
  ];
  
  const additionalDocuments = [];
  
  if (allocationType === 'arr') {
    additionalDocuments.push({
      title: 'Rapport médical',
      description: 'Attestation médicale concernant la réduction de capacité de gain',
      icon: 'fas fa-file-medical',
      important: 'Document obligatoire pour l\'ARR'
    });
  }
  
  if (allocationType === 'ai') {
    additionalDocuments.push({
      title: 'Rapport médical',
      description: 'Attestation médicale concernant la réduction d\'autonomie',
      icon: 'fas fa-file-medical',
      important: 'Document obligatoire pour l\'AI'
    });
  }
  
  if (personalInfo?.familyCategory === 'household_dependents') {
    additionalDocuments.push({
      title: 'Attestations pour personnes à charge',
      description: 'Documents prouvant les personnes à charge (attestations familiales, scolaires, etc.)',
      icon: 'fas fa-child'
    });
  }
  
  return [...baseDocuments, ...additionalDocuments];
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};
