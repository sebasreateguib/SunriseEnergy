import { ChevronRight, Equal, X } from 'lucide-react'
import React from 'react'
import logoIcon from '../../assets/logoicon-cropped.webp'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const menuItems = [
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Proyectos', href: '#proyectos' },
    { name: 'Clientes', href: '#clientes' },
]

interface HeaderProps {
    onOpenConsult: () => void
}

export const Header = ({ onOpenConsult }: HeaderProps) => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Con el menú abierto: Escape lo cierra y el fondo deja de scrollear. Sin
    // esto el panel se quedaba fijo mientras la página se movía por detrás.
    React.useEffect(() => {
        if (!menuState) return

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setMenuState(false)
        }
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', onKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [menuState])

    const handleCta = () => {
        setMenuState(false)
        onOpenConsult()
    }

    // El scroll suave se hace acá y no con `scroll-behavior: smooth` en html:
    // esa regla se quitó a propósito (commit "scroll fixed") porque afectaba a
    // toda la página, incluida la secuencia de scroll. El offset se lee del
    // scroll-padding-top del <html> para no duplicar el alto del header.
    const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMenuState(false)

        const target = document.querySelector(href)
        if (!target) return // sin destino, que el navegador haga el salto nativo

        event.preventDefault()

        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' })
        history.replaceState(null, '', href)
    }

    return (
        <header className="absolute inset-x-0 top-0 z-50 px-0 lg:fixed lg:px-2">
            <div
                className={cn(
                    // En mobile la barra es blanca sólida con un borde inferior
                    // que la separa de la foto del hero; el backdrop-blur ya no
                    // hace falta al no ser translúcida. De lg hacia arriba sigue
                    // siendo la pastilla flotante con blur.
                    'relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 border-b border-black/5 bg-white px-4 py-2.5 transition-all duration-300 sm:px-5 lg:mt-3 lg:rounded-2xl lg:border lg:border-black/5 lg:bg-white/80 lg:shadow-sm lg:backdrop-blur-xl',
                    isScrolled && 'shadow-sm lg:max-w-4xl lg:bg-white/95 lg:shadow-lg lg:shadow-black/10'
                )}>
                <a
                    href="#top"
                    aria-label="Ir al inicio"
                    className="flex shrink-0 items-center gap-2.5"
                    onClick={(e) => {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>
                    <img src={logoIcon} alt="" width={240} height={224} className="h-9 w-auto sm:h-11" />
                    <span className="flex flex-col leading-none">
                        <span className="text-[15px] font-extrabold tracking-tight text-neutral-950 sm:text-[17px]">
                            Sunrise Energy
                        </span>
                        <span className="text-[10px] font-bold tracking-[0.2em] text-lime-600 sm:text-[11px]">
                            PERÚ
                        </span>
                    </span>
                </a>

                <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="block rounded-full px-3.5 py-2 text-sm font-medium text-neutral-600 duration-150 hover:bg-black/5 hover:text-neutral-950">
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={handleCta}
                    className={cn(buttonVariants({ size: 'sm' }), 'hidden shrink-0 lg:inline-flex')}>
                    Solicitar Consulta
                </button>

                <button
                    onClick={() => setMenuState((open) => !open)}
                    aria-label={menuState ? 'Cerrar menú' : 'Abrir menú'}
                    aria-expanded={menuState}
                    aria-controls="mobile-menu"
                    className="ml-auto shrink-0 rounded-full p-2 text-neutral-950 lg:hidden">
                    {menuState ? <X size={22} /> : <Equal size={22} />}
                </button>
            </div>

            {menuState && (
                <>
                    <div
                        className="mobile-menu-scrim lg:hidden"
                        onClick={() => setMenuState(false)}
                        aria-hidden="true"
                    />

                    {/* Pegado a la barra y a sangre completa: como tarjeta suelta
                        con margen quedaban dos superficies blancas apiladas con
                        una costura entre medias. Así el panel lee como una
                        extensión del header. */}
                    <nav id="mobile-menu" className="mobile-menu lg:hidden" aria-label="Navegación principal">
                        {menuItems.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="mobile-menu-item"
                                style={{ animationDelay: `${index * 45}ms` }}>
                                <span>{item.name}</span>
                                <ChevronRight size={16} strokeWidth={2.25} aria-hidden="true" />
                            </a>
                        ))}

                        <button
                            onClick={handleCta}
                            className="btn-primary-pill mobile-menu-cta"
                            style={{ animationDelay: `${menuItems.length * 45}ms` }}>
                            Solicitar Consulta
                        </button>
                    </nav>
                </>
            )}
        </header>
    )
}
