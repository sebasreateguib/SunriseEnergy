import { useState } from 'react';
import { X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '51948650409';
const DEFAULT_MESSAGE = 'Hola, me gustaría solicitar una consulta con Sunrise Energy.';

function WhatsAppIcon({ size = 30 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M16.004 3C9.02 3 3.36 8.66 3.36 15.644c0 2.36.65 4.61 1.878 6.6L3 29l6.94-2.2a12.6 12.6 0 0 0 6.06 1.548h.005c6.984 0 12.643-5.66 12.643-12.644C28.648 8.66 22.99 3 16.004 3Zm0 22.87h-.004a10.5 10.5 0 0 1-5.36-1.47l-.385-.228-4.12 1.307 1.328-4.02-.25-.412a10.44 10.44 0 0 1-1.606-5.6c0-5.816 4.732-10.548 10.55-10.548 2.818 0 5.466 1.1 7.456 3.093a10.47 10.47 0 0 1 3.09 7.462c0 5.817-4.732 10.548-10.55 10.548Zm5.78-7.897c-.317-.158-1.874-.924-2.164-1.03-.29-.106-.502-.158-.713.159-.21.317-.818 1.03-1.003 1.24-.185.212-.37.238-.687.08-.317-.159-1.336-.492-2.545-1.568-.94-.838-1.575-1.874-1.76-2.19-.185-.318-.02-.49.138-.648.142-.14.317-.37.475-.555.159-.185.211-.317.317-.529.106-.211.053-.396-.026-.555-.08-.158-.713-1.716-.977-2.35-.257-.617-.518-.534-.713-.544l-.607-.01c-.211 0-.555.079-.845.396-.29.317-1.108 1.083-1.108 2.641s1.134 3.064 1.292 3.276c.159.211 2.232 3.407 5.407 4.777.756.326 1.346.521 1.806.667.759.242 1.45.208 1.996.126.609-.091 1.874-.766 2.138-1.507.264-.74.264-1.375.185-1.507-.079-.132-.29-.211-.607-.37Z" />
    </svg>
  );
}

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  const goToWhatsApp = () => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`,
      '_blank'
    );
    setOpen(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 90 }}>
      {open && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 1rem)',
            right: 0,
            width: '320px',
            maxWidth: 'calc(100vw - 2rem)',
            backgroundColor: '#ffffff',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.25s ease-out',
          }}
        >
          <div
            style={{
              backgroundColor: '#075e54',
              color: '#ffffff',
              padding: '1rem 1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                width: '2.5rem',
                height: '2.5rem',
                borderRadius: '50%',
                backgroundColor: '#ffffff',
                color: '#075e54',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0,
              }}
            >
              <WhatsAppIcon size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sunrise Energy</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Normalmente responde en minutos</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Cerrar chat"
              style={{
                border: 'none',
                background: 'transparent',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                padding: '0.25rem',
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ backgroundColor: '#e5ddd5', padding: '1.1rem' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '0.75rem',
                borderTopLeftRadius: 0,
                padding: '0.75rem 0.9rem',
                fontSize: '0.875rem',
                color: '#1f2937',
                lineHeight: 1.5,
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              }}
            >
              ¡Hola! 👋 ¿En qué podemos ayudarte con tu proyecto de energía solar? Escríbenos y te respondemos por WhatsApp.
            </div>
          </div>

          <div style={{ padding: '0.85rem', backgroundColor: '#f0f0f0' }}>
            <button
              onClick={goToWhatsApp}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#25d366',
                color: '#ffffff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.7rem 1rem',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
              }}
            >
              Iniciar chat <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Cerrar chat de WhatsApp' : 'Abrir chat de WhatsApp'}
        style={{
          width: '3.75rem',
          height: '3.75rem',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          color: '#ffffff',
          border: 'none',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          boxShadow: '0 10px 25px -5px rgba(37, 211, 102, 0.5)',
        }}
      >
        {open ? <X size={26} /> : <WhatsAppIcon size={32} />}
      </button>
    </div>
  );
}
