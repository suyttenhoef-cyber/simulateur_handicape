import React, { useState } from 'react';
import { 
  FAMILY_CATEGORIES,
  validatePersonalInfo
} from '../engine/calculateDisabilityAllowance';

function Step2PersonalInfo({ onComplete, onBack }) {
  const [personalInfo, setPersonalInfo] = useState({
    age: '',
    familyCategory: '',
    dependents: 0,
    hasPartner: false
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFamilyCategoryChange = (category) => {
    const updates = { familyCategory: category };
    
    if (category === 'alone') {
      updates.hasPartner = false;
      updates.dependents = 0;
    } else if (category === 'household_alone') {
      updates.hasPartner = true;
      updates.dependents = 0;
    } else if (category === 'household_dependents') {
      updates.hasPartner = true;
      if (personalInfo.dependents === 0) {
        updates.dependents = 1;
      }
    }
    
    setPersonalInfo(prev => ({
      ...prev,
      ...updates
    }));
    
    if (errors.familyCategory) {
      setErrors(prev => ({ ...prev, familyCategory: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validatePersonalInfo(personalInfo);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    onComplete(personalInfo);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <div className="step-icon">
          <i className="fas fa-user"></i>
        </div>
        <div>
          <h2>Étape 2 : Informations personnelles</h2>
          <p className="step-description">
            Renseignez les informations sur la situation du demandeur
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3><i className="fas fa-calendar-alt"></i> Âge du demandeur</h3>
          
          <div className="form-group">
            <label className="form-label">
              Âge en années *
            </label>
            <div className="input-with-hint">
              <input
                type="number"
                min="18"
                max="64"
                value={personalInfo.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="form-input"
                placeholder="Ex: 35"
              />
              <span className="input-hint">
                Âge minimum : 18 ans | Maximum : 64 ans
              </span>
            </div>
            {errors.age && (
              <div className="field-error">
                <i className="fas fa-exclamation-circle"></i> {errors.age}
              </div>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3><i className="fas fa-home"></i> Situation familiale</h3>
          
          <div className="form-group">
            <label className="form-label">
              Catégorie familiale *
            </label>
            <div className="family-categories">
              {FAMILY_CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  className={`family-category-card ${personalInfo.familyCategory === category.id ? 'selected' : ''}`}
                  onClick={() => handleFamilyCategoryChange(category.id)}
                >
                  <div className="category-icon">
                    <i className={category.icon}></i>
                  </div>
                  <div className="category-content">
                    <h4>{category.label}</h4>
                    <p>{category.description}</p>
                  </div>
                  <div className="category-code">
                    {category.code}
                  </div>
                </div>
              ))}
            </div>
            {errors.familyCategory && (
              <div className="field-error">
                <i className="fas fa-exclamation-circle"></i> {errors.familyCategory}
              </div>
            )}
          </div>

          {personalInfo.familyCategory === 'household_dependents' && (
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-child"></i> Nombre de personnes à charge *
              </label>
              <div className="number-input-group">
                <button
                  type="button"
                  className="number-btn"
                  onClick={() => handleInputChange('dependents', Math.max(1, personalInfo.dependents - 1))}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={personalInfo.dependents}
                  onChange={(e) => handleInputChange('dependents', parseInt(e.target.value) || 1)}
                  className="number-input"
                />
                <button
                  type="button"
                  className="number-btn"
                  onClick={() => handleInputChange('dependents', Math.min(10, personalInfo.dependents + 1))}
                >
                  <i className="fas fa-plus"></i>
                </button>
                <span className="input-suffix">personne(s) à charge</span>
              </div>
              {errors.dependents && (
                <div className="field-error">
                  <i className="fas fa-exclamation-circle"></i> {errors.dependents}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="step-info">
          <div className="info-box">
            <h4><i className="fas fa-question-circle"></i> Qu'est-ce qu'une personne à charge ?</h4>
            <p>
              Une personne à charge est une personne qui vit avec vous et qui dépend 
              financièrement de vous (enfants mineurs, enfants majeurs aux études, etc.).
            </p>
          </div>
        </div>

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

export default Step2PersonalInfo;
