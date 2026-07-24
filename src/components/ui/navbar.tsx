import { Equal, X } from 'lucide-react'
import React from 'react'
import logo from '../../assets/logo.png'
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

    const handleCta = () => {
        setMenuState(false)
        onOpenConsult()
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-2">
            <div
                className={cn(
                    'mx-auto mt-3 flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-xl transition-all duration-300 sm:px-5',
                    isScrolled && 'max-w-4xl bg-white/95 shadow-lg shadow-black/10'
                )}>
                <a
                    href="#top"
                    aria-label="Ir al inicio"
                    className="flex shrink-0 items-center gap-2"
                    onClick={(e) => {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>
                    <img src={logo} alt="Sunrise Energy" className="h-10 w-auto sm:h-12" />
                </a>

                <ul className="hidden flex-1 items-center justify-center gap-1 lg:flex">
                    {menuItems.map((item) => (
                        <li key={item.href}>
                            <a
                                href={item.href}
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
                    className="ml-auto shrink-0 rounded-full p-2 text-neutral-950 lg:hidden">
                    {menuState ? <X size={22} /> : <Equal size={22} />}
                </button>
            </div>

            {menuState && (
                <div className="mx-4 mt-2 flex flex-col gap-1 rounded-2xl border border-black/5 bg-white/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-xl lg:hidden">
                    {menuItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setMenuState(false)}
                            className="rounded-xl px-3.5 py-2.5 text-base font-medium text-neutral-700 duration-150 hover:bg-black/5 hover:text-neutral-950">
                            {item.name}
                        </a>
                    ))}
                    <button
                        onClick={handleCta}
                        className={cn(buttonVariants({ size: 'sm' }), 'mt-2 w-full')}>
                        Solicitar Consulta
                    </button>
                </div>
            )}
        </header>
    )
}
