import React, { useState } from 'react';
import Step1AllocationType from './steps/Step1AllocationType';
import Step2PersonalInfo from './steps/Step2PersonalInfo';
import Step3SpecificData from './steps/Step3SpecificData';
import Step4IncomeAndCalculation from './steps/Step4IncomeAndCalculation';
import Step5Summary from './steps/Step5Summary';
import ProgressBar from './components/ProgressBar';
import './styles/App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    allocationType: null,
    personalInfo: null,
    specificData: null,
    incomes: null,
    calculation: null
  });

  const handleNextStep = (step, data) => {
    setFormData(prev => ({
      ...prev,
      ...data
    }));
    setCurrentStep(step);
  };

  const handleStep1Complete = (allocationType) => {
    handleNextStep(2, { allocationType });
  };

  const handleStep2Complete = (personalInfo) => {
    handleNextStep(3, { personalInfo });
  };

  const handleStep3Complete = (specificData) => {
    handleNextStep(4, { specificData });
  };

  const handleStep4Complete = (incomes, calculation) => {
    handleNextStep(5, { incomes, calculation });
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setFormData({
      allocationType: null,
      personalInfo: null,
      specificData: null,
      incomes: null,
      calculation: null
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1AllocationType onComplete={handleStep1Complete} />;

      case 2:
        return (
          <Step2PersonalInfo
            onComplete={handleStep2Complete}
            onBack={() => setCurrentStep(1)}
          />
        );

      case 3:
        return (
          <Step3SpecificData
            allocationType={formData.allocationType}
            onComplete={handleStep3Complete}
            onBack={() => setCurrentStep(2)}
          />
        );

      case 4:
        return (
          <Step4IncomeAndCalculation
            allocationType={formData.allocationType}
            personalInfo={formData.personalInfo}
            specificData={formData.specificData}
            onComplete={handleStep4Complete}
            onBack={() => setCurrentStep(3)}
          />
        );

      case 5:
        return (
          <Step5Summary
            formData={formData}
            onRestart={handleRestart}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="fas fa-wheelchair"></i>
            </div>
            <div className="logo-text">
              <h1>Simulateur d'allocations pour personnes handicapées</h1>
              <p className="subtitle">Outil d'évaluation pour les agents de CPAS</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="main-content">
        {currentStep > 0 && currentStep <= 5 && (
          <ProgressBar currentStep={currentStep} />
        )}
        
        <div className="step-container">
          {renderStep()}
        </div>
      </main>
      
      <footer className="app-footer">
        <div className="footer-content">
          <p>
            <i className="fas fa-info-circle"></i> Ce simulateur est basé sur les règles officielles du 
            <a href="https://handicap.belgium.be" target="_blank" rel="noopener noreferrer">
              SPF Sécurité Sociale - Direction générale Personnes handicapées
            </a>
          </p>
          <p className="footer-note">
            Les montants indiqués sont ceux de 2025 (indexés). Pour une simulation officielle, 
            consultez <a href="https://assets.handicap.belgium.be/simulator/fr/" target="_blank" rel="noopener noreferrer">
              le simulateur du SPF
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
