import React from 'react';
import { 
  getAllocationTypeLabel, 
  getFamilyCategoryLabel,
  getDocumentsList,
  formatCurrency
} from '../engine/calculateDisabilityAllowance';

function Step5Summary({ formData, onRestart }) {
  const { allocationType, personalInfo, specificData, incomes, calculation } = formData;

  const formatDate = (dateString) => {
    if (!dateString) return 'Non spécifié';
    return new Date(dateString).toLocaleDateString('fr-BE', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const documents = getDocumentsList(allocationType, personalInfo);

  return (
    <div className="summary-card">
      <div className="summary-header">
        <div className="header-icon">
          <i className="fas fa-file-contract"></i>
        </div>
        <div className="header-content">
          <h2>Résumé de la simulation</h2>
          <div className="summary-meta">
            <span className="meta-item">
              <i className="fas fa-calendar"></i> Généré le {formatDate(new Date().toISOString())}
            </span>
          </div>
        </div>
      </div>

      <div className="summary-content">
        <div className="section">
          <h3><i className="fas fa-clipboard-list"></i> Type d'allocation</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Allocation demandée :</span>
              <span className="info-value">{getAllocationTypeLabel(allocationType)}</span>
            </div>
          </div>
        </div>

        <div className="section">
          <h3><i className="fas fa-user-circle"></i> Informations du demandeur</h3>
          <div className="info-grid">
            {personalInfo && (
              <>
                <div className="info-item">
                  <span className="info-label">Âge :</span>
                  <span className="info-value">{personalInfo.age} ans</span>
                </div>
                
                <div className="info-item">
                  <span className="info-label">Situation familiale :</span>
                  <span className="info-value">{getFamilyCategoryLabel(personalInfo.familyCategory)}</span>
                </div>
                
                {personalInfo.dependents > 0 && (
                  <div className="info-item">
                    <span className="info-label">Personnes à charge :</span>
                    <span className="info-value">{personalInfo.dependents} personne(s)</span>
                  </div>
                )}
              </>
            )}
            
            {specificData && allocationType === 'arr' && (
              <div className="info-item">
                <span className="info-label">Réduction capacité de gain :</span>
                <span className="info-value">{specificData.workCapacityReduction}%</span>
              </div>
            )}
            
            {specificData && allocationType === 'ai' && (
              <div className="info-item">
                <span className="info-label">Score d'autonomie :</span>
                <span className="info-value">{specificData.autonomyScore} points</span>
              </div>
            )}
          </div>
        </div>

        {incomes && incomes.length > 0 && (
          <div className="section">
            <h3><i className="fas fa-money-bill-wave"></i> Revenus déclarés</h3>
            <div className="incomes-list">
              {incomes.map((income, index) => (
                <div key={index} className="income-summary-item">
                  <div className="income-type">
                    {income.type === 'work' && <i className="fas fa-briefcase"></i>}
                    {income.type === 'replacement' && <i className="fas fa-file-invoice-dollar"></i>}
                    {income.type === 'property' && <i className="fas fa-home"></i>}
                    {income.type === 'capital' && <i className="fas fa-chart-line"></i>}
                    <span>{income.description || income.type}</span>
                  </div>
                  <div className="income-amount">
                    {formatCurrency(parseFloat(income.amount))}
                  </div>
                </div>
              ))}
              <div className="income-total">
                <span>Total annuel :</span>
                <strong>
                  {formatCurrency(incomes.reduce((sum, inc) => sum + parseFloat(inc.amount || 0), 0))}
                </strong>
              </div>
            </div>
          </div>
        )}

        {calculation && (
          <div className="section highlight">
            <h3><i className="fas fa-euro-sign"></i> Résultat du calcul</h3>
            
            <div className="allocation-summary">
              {calculation.eligible ? (
                <>
                  <div className="allocation-amount-large">
                    {formatCurrency(calculation.annualAmount)}
                    <span className="amount-period">par an</span>
                  </div>
                  
                  <div className="allocation-amount-large monthly">
                    {formatCurrency(calculation.monthlyAmount)}
                    <span className="amount-period">par mois</span>
                  </div>
                  
                  {allocationType === 'ai' && calculation.category && (
                    <div className="allocation-category">
                      <i className="fas fa-chart-bar"></i>
                      {calculation.category}
                    </div>
                  )}

                  <div className="allocation-details">
                    <div className="detail-row">
                      <span>Montant de base annuel :</span>
                      <span className="detail-value">{formatCurrency(calculation.baseAmount)}</span>
                    </div>
                    
                    {calculation.taxableIncome !== undefined && (
                      <div className="detail-row">
                        <span>Revenus imposables :</span>
                        <span className="detail-value">{formatCurrency(calculation.taxableIncome)}</span>
                      </div>
                    )}
                    
                    {calculation.incomeLimit !== undefined && (
                      <div className="detail-row">
                        <span>Plafond de revenus :</span>
                        <span className="detail-value">{formatCurrency(calculation.incomeLimit)}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="not-eligible-message">
                  <i className="fas fa-exclamation-triangle"></i>
                  <h4>Non éligible ou montant nul</h4>
                  <p>{calculation.message || 'Le calcul n\'a pas abouti à une allocation positive.'}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="section">
          <h3><i className="fas fa-file-alt"></i> Documents à fournir</h3>
          
          <div className="documents-list">
            {documents.map((doc, index) => (
              <div key={index} className="document-item">
                <div className="document-icon">
                  <i className={doc.icon}></i>
                </div>
                <div className="document-content">
                  <h4>{doc.title}</h4>
                  <p>{doc.description}</p>
                  {doc.important && (
                    <span className="document-note important">
                      <i className="fas fa-star"></i> {doc.important}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section warning">
          <div className="warning-header">
            <i className="fas fa-exclamation-triangle"></i>
            <h3>Avertissement légal</h3>
          </div>
          <div className="warning-content">
            <p>
              Cette simulation est fournie à titre <strong>purement informatif</strong>. 
              Elle ne constitue en aucun cas une garantie d'obtention de l'allocation 
              ni une décision officielle du SPF Sécurité Sociale.
            </p>
            <p>
              Le montant final dépendra de :
            </p>
            <ul>
              <li>L'évaluation médicale effectuée par le médecin du SPF</li>
              <li>L'enquête sur vos revenus réels</li>
              <li>Le respect de toutes les conditions d'éligibilité</li>
              <li>Les règles en vigueur au moment de la demande</li>
            </ul>
            <p>
              En tant qu'agent CPAS, vous devez vérifier tous les éléments du dossier 
              avant d'orienter le demandeur.
            </p>
          </div>
        </div>

        <div className="section">
          <h3><i className="fas fa-link"></i> Ressources utiles</h3>
          
          <div className="resources">
            <a 
              href="https://handicap.belgium.be/fr/allocations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-globe"></i>
              </div>
              <div className="resource-content">
                <h4>SPF Sécurité Sociale - Personnes handicapées</h4>
                <p>Site officiel avec toutes les informations sur les allocations</p>
              </div>
            </a>
            
            <a 
              href="https://handicap.belgium.be/fr/information-pour-professionnels/simulateur-de-calcul" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-calculator"></i>
              </div>
              <div className="resource-content">
                <h4>Simulateur officiel</h4>
                <p>Outil de simulation officiel du SPF</p>
              </div>
            </a>
            
            <a 
              href="https://www.myhandicap.be" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="resource-content">
                <h4>My Handicap</h4>
                <p>Plateforme en ligne pour introduire une demande</p>
              </div>
            </a>

            <a 
              href="https://www.mi-is.be/fr/cpas" 
              target="_blank" 
              rel="noopener noreferrer"
              className="resource-link"
            >
              <div className="resource-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div className="resource-content">
                <h4>Annuaire des CPAS</h4>
                <p>Coordonnées de tous les CPAS de Belgique</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="summary-actions">
        <button onClick={() => window.print()} className="btn btn-secondary">
          <i className="fas fa-print"></i> Imprimer ce résumé
        </button>
        <button onClick={onRestart} className="btn btn-primary">
          <i className="fas fa-redo"></i> Nouvelle simulation
        </button>
      </div>
    </div>
  );
}

export default Step5Summary;
