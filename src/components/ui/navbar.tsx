import { Equal, X } from 'lucide-react'
import React from 'react'
import logoIcon from '../../assets/logoicon-cropped.png'
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
        <header className="absolute inset-x-0 top-0 z-50 px-0 lg:fixed lg:px-2">
            <div
                className={cn(
                    'mx-auto flex w-full max-w-6xl items-center justify-between gap-4 bg-white/12 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 sm:px-5 lg:mt-3 lg:rounded-2xl lg:border lg:border-black/5 lg:bg-white/80 lg:shadow-sm lg:backdrop-blur-xl',
                    isScrolled && 'bg-white/25 lg:max-w-4xl lg:bg-white/95 lg:shadow-lg lg:shadow-black/10'
                )}>
                <a
                    href="#top"
                    aria-label="Ir al inicio"
                    className="flex shrink-0 items-center gap-2.5"
                    onClick={(e) => {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>
                    <img src={logoIcon} alt="" className="h-9 w-auto sm:h-11" />
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
