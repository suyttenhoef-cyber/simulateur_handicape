import React, { useState } from 'react';
import { 
  INCOME_TYPES,
  calculateDisabilityAllowance,
  formatCurrency,
  validateIncomeData
} from '../engine/calculateDisabilityAllowance';

function Step4IncomeAndCalculation({ allocationType, personalInfo, specificData, onComplete, onBack }) {
  const [incomes, setIncomes] = useState([]);
  const [calculation, setCalculation] = useState(null);
  const [errors, setErrors] = useState({});

  const addIncome = () => {
    setIncomes([...incomes, { type: 'work', amount: '', description: '' }]);
  };

  const removeIncome = (index) => {
    setIncomes(incomes.filter((_, i) => i !== index));
    setCalculation(null);
  };

  const updateIncome = (index, field, value) => {
    const newIncomes = [...incomes];
    newIncomes[index] = { ...newIncomes[index], [field]: value };
    setIncomes(newIncomes);
    setCalculation(null);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    const validationErrors = validateIncomeData(incomes);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const result = calculateDisabilityAllowance(
      allocationType,
      personalInfo,
      specificData,
      incomes
    );
    
    setCalculation(result);
  };

  const handleContinue = () => {
    if (!calculation) return;
    onComplete(incomes, calculation);
  };

  const getTotalIncome = () => {
    return incomes.reduce((sum, income) => sum + (parseFloat(income.amount) || 0), 0);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-euro-sign"></i>
        </div>
        <div>
          <h2>Étape 4 : Revenus et calcul</h2>
          <p className="step-description">
            Renseignez les revenus annuels du demandeur et de son ménage
          </p>
        </div>
      </div>

      <form onSubmit={handleCalculate}>
        <div className="form-section">
          <h3><i className="fas fa-money-bill-wave"></i> Revenus annuels</h3>
          
          <div className="info-box small">
            <p>
              <i className="fas fa-info-circle"></i> Indiquez les revenus <strong>imposables annuels</strong> tels 
              qu'ils apparaissent sur votre avertissement-extrait de rôle.
            </p>
          </div>

          {incomes.map((income, index) => (
            <div key={index} className="income-item">
              <div className="income-header">
                <h4>Revenu #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeIncome(index)}
                  className="btn-remove"
                  title="Supprimer ce revenu"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="income-form">
                <div className="form-group">
                  <label className="form-label">Type de revenu</label>
                  <select
                    value={income.type}
                    onChange={(e) => updateIncome(index, 'type', e.target.value)}
                    className="form-select"
                  >
                    {INCOME_TYPES.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Montant annuel (€)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={income.amount}
                    onChange={(e) => updateIncome(index, 'amount', e.target.value)}
                    className="form-input"
                    placeholder="Ex: 15000"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description (optionnel)</label>
                  <input
                    type="text"
                    value={income.description}
                    onChange={(e) => updateIncome(index, 'description', e.target.value)}
                    className="form-input"
                    placeholder="Ex: Salaire à temps partiel"
                  />
                </div>
              </div>

              {errors[`income_${index}`] && (
                <div className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors[`income_${index}`]}
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addIncome}
            className="btn btn-secondary btn-add"
          >
            <i className="fas fa-plus"></i> Ajouter un revenu
          </button>

          {incomes.length > 0 && (
            <div className="total-income">
              <span>Total des revenus annuels :</span>
              <strong>{formatCurrency(getTotalIncome())}</strong>
            </div>
          )}
        </div>

        <div className="step-actions">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Retour
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-calculator"></i> {calculation ? 'Recalculer' : 'Calculer'}
          </button>
        </div>
      </form>

      {calculation && (
        <div className="calculation-results">
          <div className={`result-card ${calculation.eligible ? 'success' : 'warning'}`}>
            <div className="result-header">
              <div className="result-icon">
                <i className={`fas ${calculation.eligible ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
              </div>
              <div>
                <h3>Résultat de la simulation</h3>
                <p className="result-subtitle">
                  {calculation.eligible 
                    ? `Éligible à ${allocationType.toUpperCase()}`
                    : 'Non éligible ou montant nul'}
                </p>
              </div>
            </div>
            
            <div className="result-content">
              {calculation.eligible ? (
                <>
                  <div className="result-main">
                    <div className="allocation-amount">
                      <span className="amount-label">Montant estimé (annuel)</span>
                      <span className="amount-value">{formatCurrency(calculation.annualAmount)}</span>
                    </div>
                    <div className="allocation-amount monthly">
                      <span className="amount-label">Montant estimé (mensuel)</span>
                      <span className="amount-value">{formatCurrency(calculation.monthlyAmount)}</span>
                    </div>
                  </div>

                  {allocationType === 'arr' && calculation.details && (
                    <div className="result-details">
                      <h4>Détails du calcul (ARR)</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Montant de base annuel :</span>
                          <span className="detail-value">{formatCurrency(calculation.baseAmount)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Revenus exemptés :</span>
                          <span className="detail-value">{formatCurrency(calculation.details.exemptedWorkIncome)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Revenus imposables :</span>
                          <span className="detail-value">{formatCurrency(calculation.taxableIncome)}</span>
                        </div>
                        {calculation.details.reductionPercentage > 0 && (
                          <div className="detail-item">
                            <span className="detail-label">Réduction appliquée :</span>
                            <span className="detail-value highlight">
                              {calculation.details.reductionPercentage.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {allocationType === 'ai' && calculation.details && (
                    <div className="result-details">
                      <h4>Détails du calcul (AI)</h4>
                      <div className="detail-grid">
                        <div className="detail-item">
                          <span className="detail-label">Catégorie :</span>
                          <span className="detail-value">{calculation.category}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Montant de base annuel :</span>
                          <span className="detail-value">{formatCurrency(calculation.baseAmount)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Plafond de revenus :</span>
                          <span className="detail-value">{formatCurrency(calculation.incomeLimit)}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Revenus totaux :</span>
                          <span className="detail-value">{formatCurrency(calculation.totalIncome)}</span>
                        </div>
                        {calculation.details.incomeExcess > 0 && (
                          <div className="detail-item">
                            <span className="detail-label">Dépassement :</span>
                            <span className="detail-value highlight">
                              {formatCurrency(calculation.details.incomeExcess)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="result-info">
                    <div className="info-box">
                      <h4><i className="fas fa-info-circle"></i> Informations importantes</h4>
                      <ul>
                        <li>
                          <i className="fas fa-exclamation-triangle"></i> Ce montant est une <strong>estimation</strong>
                        </li>
                        <li>
                          <i className="fas fa-stethoscope"></i> Le montant final dépendra de l'évaluation médicale officielle
                        </li>
                        <li>
                          <i className="fas fa-file-invoice"></i> Une enquête sur vos revenus sera effectuée
                        </li>
                        <li>
                          <i className="fas fa-calendar-check"></i> Les montants sont indexés chaque année
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="result-info">
                  <div className="info-box warning">
                    <h4><i className="fas fa-info-circle"></i> Raison de la non-éligibilité</h4>
                    <p>{calculation.message || 'Le calcul n\'a pas abouti à une allocation positive.'}</p>
                    <p>
                      Cela peut être dû à :
                    </p>
                    <ul>
                      <li>Des revenus trop élevés par rapport au plafond autorisé</li>
                      <li>Une réduction d'autonomie ou de capacité de gain insuffisante</li>
                      <li>D'autres conditions d'éligibilité non remplies</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            {calculation.eligible && (
              <div className="result-actions">
                <button onClick={handleContinue} className="btn btn-primary btn-large">
                  <i className="fas fa-file-alt"></i> Voir le résumé complet
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Step4IncomeAndCalculation;
