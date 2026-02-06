import React from 'react';

function ProgressBar({ currentStep }) {
  const steps = [
    { number: 1, label: 'Type d\'allocation' },
    { number: 2, label: 'Informations personnelles' },
    { number: 3, label: 'Évaluation handicap' },
    { number: 4, label: 'Revenus & calcul' },
    { number: 5, label: 'Résumé' }
  ];

  return (
    <div className="progress-bar">
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.number} className="progress-step-wrapper">
            <div className={`progress-step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}>
              <div className="step-circle">
                {currentStep > step.number ? (
                  <i className="fas fa-check"></i>
                ) : (
                  <span>{step.number}</span>
                )}
              </div>
              <span className="step-label">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`progress-line ${currentStep > step.number ? 'completed' : ''}`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;
