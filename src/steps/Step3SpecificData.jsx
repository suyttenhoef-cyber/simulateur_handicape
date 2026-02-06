import React, { useState } from 'react';
import { 
  AI_CATEGORIES,
  validateARRData,
  validateAIData,
  getAICategory,
  isARREligible,
  isAIEligible
} from '../engine/calculateDisabilityAllowance';

function Step3SpecificData({ allocationType, onComplete, onBack }) {
  const [specificData, setSpecificData] = useState({
    // Pour ARR
    workCapacityReduction: '',
    // Pour AI
    autonomyScore: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setSpecificData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let validationErrors = {};
    
    if (allocationType === 'arr') {
      validationErrors = validateARRData(specificData);
      
      const reduction = parseFloat(specificData.workCapacityReduction);
      if (!isARREligible(reduction)) {
        validationErrors.workCapacityReduction = 'La réduction de capacité de gain doit être d\'au moins 66% pour être éligible à l\'ARR';
      }
    } else if (allocationType === 'ai') {
      validationErrors = validateAIData(specificData);
      
      const score = parseInt(specificData.autonomyScore);
      if (!isAIEligible(score)) {
        validationErrors.autonomyScore = 'Le score d\'autonomie doit être d\'au moins 7 points pour être éligible à l\'AI';
      }
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onComplete(specificData);
  };

  const getCurrentAICategory = () => {
    const score = parseInt(specificData.autonomyScore);
    if (isNaN(score)) return null;
    return getAICategory(score);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-stethoscope"></i>
        </div>
        <div>
          <h2>Étape 3 : Évaluation du handicap</h2>
          <p className="step-description">
            {allocationType === 'arr' 
              ? 'Renseignez l\'impact sur la capacité de gain'
              : 'Renseignez le score d\'autonomie'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {allocationType === 'arr' && (
          <div className="form-section">
            <h3><i className="fas fa-briefcase"></i> Réduction de la capacité de gain</h3>
            
            <div className="form-group">
              <label className="form-label">
                Pourcentage de réduction de la capacité de gain *
              </label>
              <div className="input-with-hint">
                <div className="percentage-input-group">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={specificData.workCapacityReduction}
                    onChange={(e) => handleInputChange('workCapacityReduction', e.target.value)}
                    className="form-input"
                    placeholder="Ex: 75"
                  />
                  <span className="input-suffix">%</span>
                </div>
                <span className="input-hint">
                  Minimum requis pour l'ARR : 66%
                </span>
              </div>
              {errors.workCapacityReduction && (
                <div className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.workCapacityReduction}
                </div>
              )}
            </div>

            <div className="info-box">
              <h4><i className="fas fa-info-circle"></i> Comment est évaluée la capacité de gain ?</h4>
              <p>
                Le médecin du SPF Sécurité Sociale évalue dans quelle mesure votre handicap 
                vous empêche de gagner un revenu sur le marché du travail classique.
              </p>
              <p>
                <strong>Critère d'éligibilité :</strong> Votre capacité de gain doit être réduite 
                d'au moins 2/3 (66%) par rapport à une personne valide.
              </p>
            </div>

            {specificData.workCapacityReduction && (
              <div className={`eligibility-indicator ${parseFloat(specificData.workCapacityReduction) >= 66 ? 'eligible' : 'not-eligible'}`}>
                {parseFloat(specificData.workCapacityReduction) >= 66 ? (
                  <>
                    <i className="fas fa-check-circle"></i>
                    <span>Éligible à l'ARR selon ce critère</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-times-circle"></i>
                    <span>Non éligible à l'ARR (réduction insuffisante)</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {allocationType === 'ai' && (
          <div className="form-section">
            <h3><i className="fas fa-hand-holding-heart"></i> Score d'autonomie</h3>
            
            <div className="form-group">
              <label className="form-label">
                Score d'autonomie (0-18 points) *
              </label>
              <div className="input-with-hint">
                <div className="score-input-group">
                  <input
                    type="number"
                    min="0"
                    max="18"
                    step="1"
                    value={specificData.autonomyScore}
                    onChange={(e) => handleInputChange('autonomyScore', e.target.value)}
                    className="form-input"
                    placeholder="Ex: 12"
                  />
                  <span className="input-suffix">points</span>
                </div>
                <span className="input-hint">
                  Minimum requis pour l'AI : 7 points
                </span>
              </div>
              {errors.autonomyScore && (
                <div className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.autonomyScore}
                </div>
              )}
            </div>

            <div className="ai-categories-info">
              <h4>Catégories d'allocation d'intégration :</h4>
              <div className="categories-grid">
                {AI_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className={`category-item ${getCurrentAICategory()?.id === cat.id ? 'active' : ''}`}
                  >
                    <div className="category-header">
                      <span className="category-label">{cat.label}</span>
                      <span className="category-score">{cat.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-box">
              <h4><i className="fas fa-info-circle"></i> Comment est calculé le score d'autonomie ?</h4>
              <p>
                Le médecin évalue votre autonomie dans 6 domaines de la vie quotidienne :
              </p>
              <ul>
                <li><strong>Se déplacer</strong> (0-3 points)</li>
                <li><strong>Manger et préparer sa nourriture</strong> (0-3 points)</li>
                <li><strong>Hygiène personnelle et s'habiller</strong> (0-3 points)</li>
                <li><strong>Entretenir son logement et faire les tâches ménagères</strong> (0-3 points)</li>
                <li><strong>Vivre sans surveillance, être conscient des dangers</strong> (0-3 points)</li>
                <li><strong>Avoir des contacts sociaux</strong> (0-3 points)</li>
              </ul>
              <p className="small-text">
                0 = aucune difficulté | 1 = difficultés légères | 2 = grandes difficultés | 3 = impossible sans aide
              </p>
            </div>

            {specificData.autonomyScore && (
              <div className={`eligibility-indicator ${parseInt(specificData.autonomyScore) >= 7 ? 'eligible' : 'not-eligible'}`}>
                {parseInt(specificData.autonomyScore) >= 7 ? (
                  <>
                    <i className="fas fa-check-circle"></i>
                    <span>
                      Éligible à l'AI - {getCurrentAICategory()?.label}
                    </span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-times-circle"></i>
                    <span>Non éligible à l'AI (score insuffisant)</span>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="error-summary">
            <h4><i className="fas fa-exclamation-triangle"></i> Corrections nécessaires</h4>
            <ul>
              {Object.values(errors).map((error, index) => (
                error && <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="step-actions">
          <button type="button" onClick={onBack} className="btn btn-secondary">
            <i className="fas fa-arrow-left"></i> Retour
          </button>
          <button type="submit" className="btn btn-primary">
            <i className="fas fa-arrow-right"></i> Continuer
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step3SpecificData;
