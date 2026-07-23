const FOOTER_LINKS = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#expertise', label: 'Expertise' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#clientes', label: 'Clientes' },
];

export function Footer() {
  return (
    <footer className="minimalist-footer">
      <div className="minimalist-footer-inner">
        <div className="minimalist-footer-col">
          <span className="minimalist-footer-copyright">
            © {new Date().getFullYear()} SUNRISE ENERGY
          </span>
        </div>
        
        <div className="minimalist-footer-col center">
          
        </div>
        
        <div className="minimalist-footer-col right">
          <nav className="minimalist-footer-nav">
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
