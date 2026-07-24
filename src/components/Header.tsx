import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

interface HeaderProps {
  onOpenConsult: () => void;
}

const NAV_LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#clientes', label: 'Clientes' },
];

export function Header({ onOpenConsult }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} id="top">
      <a
        href="#top"
        className="site-header-brand"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
        <img src={logo} alt="Sunrise Energy" className="site-header-logo" />
      </a>

      <nav className="site-header-nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="site-header-nav-link">
            {link.label}
          </a>
        ))}
      </nav>

      <button className="site-header-cta-modern site-header-cta" onClick={onOpenConsult}>
        Solicitar Consulta
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </button>

      <button
        className="site-header-menu-btn"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <>
          <div
            className="site-header-mobile-backdrop"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <div className="site-header-mobile-menu">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <button
              className="site-header-cta-modern"
              style={{ width: '100%', marginTop: '0.5rem', padding: '0.9rem' }}
              onClick={() => {
                setMenuOpen(false);
                onOpenConsult();
              }}
            >
              Solicitar Consulta
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </>
      )}
    </header>
  );
}
