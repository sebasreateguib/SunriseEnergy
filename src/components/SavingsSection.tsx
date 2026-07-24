import { Zap, TrendingDown, ArrowRight } from 'lucide-react';
import billImg from '../assets/electribill.png';

export function SavingsSection() {
  return (
    <section className="savings-section">
      <div className="savings-container">
        <div className="savings-content">
          <div className="hero-eyebrow">
            <Zap size={15} />
            <span>Retorno de Inversión</span>
          </div>
          <h2 className="section-title">Transformamos este gasto, en tu mayor ahorro</h2>
          <p className="savings-description">
            La energía solar industrial no es un gasto, es una inversión con retorno garantizado. Reduce tu facturación eléctrica de forma drástica y protégete contra las alzas tarifarias.
          </p>
          
          <ul className="savings-benefits">
            <li>
              <div className="savings-benefit-icon"><TrendingDown size={20} /></div>
              <span>Reduce tu facturación hasta en un <strong>40%</strong></span>
            </li>
            <li>
              <div className="savings-benefit-icon"><Zap size={20} /></div>
              <span>Energía limpia y renovable para tu empresa</span>
            </li>
          </ul>
        </div>
        
        <div className="savings-visual">
          {/* "Before" Bill */}
          <div className="bill-card before-card">
            <div className="bill-card-header">Recibo Actual</div>
            <div className="bill-img-wrapper">
              <img src={billImg} alt="Recibo de luz alto" className="bill-image" />
              <div className="bill-badge red-badge">
                 Alto Costo
              </div>
            </div>
          </div>
          
          <div className="savings-arrow">
            <ArrowRight size={32} />
          </div>
          
          {/* "After" Concept */}
          <div className="bill-card after-card">
            <div className="bill-card-header text-green">Con Sunrise Energy</div>
            <div className="after-stats">
              <span className="after-percentage">-40%</span>
              <span className="after-label">Ahorro mensual promedio</span>
            </div>
            <div className="after-bars">
              <div className="bar-row">
                <span className="bar-label">Antes</span>
                <div className="bar-track"><div className="bar-fill red-fill" style={{ width: '100%' }}></div></div>
              </div>
              <div className="bar-row">
                <span className="bar-label">Ahora</span>
                <div className="bar-track"><div className="bar-fill green-fill" style={{ width: '60%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
