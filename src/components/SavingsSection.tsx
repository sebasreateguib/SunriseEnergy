import { Zap, TrendingDown, ArrowRight } from 'lucide-react';
import billImg from '../assets/electribill.webp';
import { Badge } from '@/components/ui/badge';
import { Announcement, AnnouncementTag, AnnouncementTitle } from '@/components/ui/announcement';

export function SavingsSection() {
  return (
    <section className="savings-section">
      <div className="savings-container">
        <div className="savings-content">
          {/* mb-5 reemplaza el margin que .savings-content daba al .hero-eyebrow,
              porque el contenedor no tiene gap. */}
          <div className="mb-5 w-fit leading-[0]">
            <Announcement
              movingBorder
              movingBorderClassName="bg-[radial-gradient(#a3e635_40%,transparent_60%)]"
            >
              <AnnouncementTag className="bg-[#d9f99d] px-2.5 py-0.5 text-[11px] font-bold text-[#0a0f1d]">
                Hasta -40%
              </AnnouncementTag>
              <AnnouncementTitle>
                Retorno de Inversión
                <TrendingDown className="shrink-0 text-muted-foreground" size={16} />
              </AnnouncementTitle>
            </Announcement>
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
              <img
                src={billImg}
                alt="Recibo de luz alto"
                className="bill-image"
                width={896}
                height={1200}
                loading="lazy"
                decoding="async"
              />
              <Badge variant="destructive" shiny className="absolute top-3 right-3">
                 Alto Costo
              </Badge>
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
