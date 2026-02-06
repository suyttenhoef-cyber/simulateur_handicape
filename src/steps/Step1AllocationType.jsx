import React, { useState } from 'react';
import { ALLOCATION_TYPES } from '../engine/calculateDisabilityAllowance';

function Step1AllocationType({ onComplete }) {
  const [selectedType, setSelectedType] = useState(null);
  const [error, setError] = useState('');

  const handleSelect = (type) => {
    setSelectedType(type);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedType) {
      setError('Veuillez sélectionner un type d\'allocation');
      return;
    }

    onComplete(selectedType);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-clipboard-list"></i>
        </div>
        <div>
          <h2>Étape 1 : Type d'allocation</h2>
          <p className="step-description">
            Sélectionnez le type d'allocation pour personnes handicapées que vous souhaitez simuler
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="allocation-type-selection">
          {ALLOCATION_TYPES.map((type) => (
            <div
              key={type.id}
              className={`allocation-type-option ${selectedType === type.id ? 'selected' : ''}`}
              onClick={() => handleSelect(type.id)}
            >
              <div className="option-header">
                <div className="option-icon">
                  <i className={type.icon}></i>
                </div>
                <div className="option-title">
                  <h3>{type.label}</h3>
                  <span className="option-description">{type.description}</span>
                </div>
              </div>
              
              <div className="option-details">
                <ul>
                  {type.details.map((detail, index) => (
                    <li key={index}>
                      <i className="fas fa-check-circle"></i> {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i> {error}
          </div>
        )}

        <div className="step-info">
          <div className="info-box">
            <h4><i className="fas fa-info-circle"></i> Information importante</h4>
            <p>
              <strong>ARR (Allocation de Remplacement de Revenus)</strong> : Pour les personnes dont le handicap 
              réduit d'au moins 2/3 la capacité à gagner un revenu sur le marché du travail.
            </p>
            <p>
              <strong>AI (Allocation d'Intégration)</strong> : Pour les personnes dont le handicap réduit 
              l'autonomie dans les activités de la vie quotidienne (score minimum de 7 points requis).
            </p>
            <p className="small-text">
              Il est possible de cumuler les deux allocations si vous remplissez les conditions pour chacune.
            </p>
          </div>
        </div>

        <div className="step-actions single">
          <button type="submit" className="btn btn-primary btn-large">
            <i className="fas fa-arrow-right"></i> Continuer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step1AllocationType;
