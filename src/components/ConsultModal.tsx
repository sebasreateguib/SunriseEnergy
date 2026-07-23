import { CheckCircle2, Sparkles, X } from 'lucide-react';

interface ConsultModalProps {
  open: boolean;
  onClose: () => void;
}

export function ConsultModal({ open, onClose }: ConsultModalProps) {
  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 100,
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '1.5rem',
          padding: '2.5rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          animation: 'fadeInUp 0.3s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            border: 'none',
            background: '#f1f5f9',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div
            style={{
              width: '3rem',
              height: '3rem',
              backgroundColor: '#d9f99d',
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <Sparkles size={22} color="#0f172a" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0, color: '#0f172a' }}>
              Inicia tu Proyecto de Energía Limpia
            </h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>
              Acelera tu camino hacia las cero emisiones de carbono
            </p>
          </div>
        </div>

        <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
          En Sunrise Energy trabajaremos junto a tu organización para diseñar e implementar infraestructura solar, eólica y de almacenamiento a medida.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span>Evaluación de viabilidad sin costo inicial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span>Integración a la red y cumplimiento normativo integral</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#334155' }}>
            <CheckCircle2 size={18} color="#16a34a" />
            <span>Pronóstico personalizado de ROI y reducción de emisiones</span>
          </div>
        </div>

        <button
          onClick={() => {
            window.open('https://wa.me/51948650409?text=Hola,%20me%20gustaría%20solicitar%20una%20consulta%20con%20Sunrise%20Energy.', '_blank');
            onClose();
          }}
          className="btn-primary-pill"
          style={{ width: '100%', textAlign: 'center' }}
        >
          Contactar por WhatsApp
        </button>
      </div>
    </div>
  );
}
