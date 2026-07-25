import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface ShowcaseProject {
    image?: string
    gradient?: string
    tag: string
    title: string
    badge: string
    description: string
}

interface ProjectShowcaseProps {
    projects: ShowcaseProject[]
}

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const [activeTab, setActiveTab] = useState(0)
    const activeItem = projects[activeTab]

    return (
        <div className="relative mx-auto max-w-7xl px-6">
            {/* FLOATING TABS (desktop) */}
            <div className="absolute bottom-6 left-2 z-20 hidden lg:block">
                <div className="w-[280px] rounded-[28px] border border-[#e8e8e8] bg-white p-3 shadow-xl">
                    <div className="flex flex-col gap-1.5">
                        {projects.map((item, index) => (
                            <button
                                key={item.title}
                                onClick={() => setActiveTab(index)}
                                className={cn(
                                    'group flex min-w-0 items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300',
                                    activeTab === index
                                        ? 'border-[#0a0f1d] bg-[#0a0f1d]'
                                        : 'border-transparent hover:border-[#0a0f1d]/15 hover:bg-[#f8fafc]'
                                )}>
                                <span
                                    className={cn(
                                        'shrink-0 rounded-md px-2 py-1 text-[11px] font-bold whitespace-nowrap',
                                        activeTab === index ? 'bg-[#d9f99d] text-[#0a0f1d]' : 'bg-[#f1f5f9] text-[#334155]'
                                    )}>
                                    {item.badge}
                                </span>
                                <span
                                    className={cn(
                                        'min-w-0 truncate text-[13px] leading-tight font-medium',
                                        activeTab === index ? 'text-white' : 'text-[#131313] group-hover:text-[#0a0f1d]'
                                    )}>
                                    {item.title}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* IMAGE CONTAINER */}
            <div
                className="relative h-[520px] overflow-hidden sm:h-[600px] lg:h-[690px]"
                style={{
                    clipPath: 'polygon(0 0, 92% 0, 100% 12%, 100% 100%, 30% 100%, 22% 88%, 0 88%)',
                    borderRadius: '34px',
                }}>
                <AnimatePresence mode="wait">
                    {activeItem.image ? (
                        <motion.img
                            key={activeTab}
                            src={activeItem.image}
                            alt={activeItem.title}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : activeItem.gradient ? (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className={cn('absolute inset-0 h-full w-full', activeItem.gradient)}
                        />
                    ) : null}
                </AnimatePresence>

                <div className="absolute inset-0 bg-black/15" />

                {/* DETAIL CARD */}
                <div className="absolute inset-0 flex items-end justify-center p-6 lg:items-center lg:justify-end lg:p-12">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 14 }}
                            transition={{ duration: 0.35 }}
                            className="w-full max-w-[360px] rounded-[26px] border border-white/30 bg-white/85 p-6 shadow-2xl backdrop-blur-xl">
                            <span className="inline-block rounded-md bg-[#eef8f2] px-2.5 py-1 text-[11px] font-semibold text-[#266347]">
                                {activeItem.tag}
                            </span>

                            <h3 className="mt-3 text-[19px] leading-snug font-bold text-[#0a0f1d]">{activeItem.title}</h3>

                            <p className="mt-3 text-[13px] leading-[21px] text-[#475569]">{activeItem.description}</p>

                            <div className="mt-4 flex items-center justify-between border-t border-[#e7e7e7] pt-4">
                                <span className="text-[11px] tracking-wide text-[#94a3b8] uppercase">Capacidad instalada</span>
                                <span className="text-[15px] font-bold text-[#0a0f1d]">{activeItem.badge}</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* TAB LIST (mobile) */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:hidden">
                {projects.map((item, index) => (
                    <button
                        key={item.title}
                        onClick={() => setActiveTab(index)}
                        className={cn(
                            'shrink-0 rounded-full border px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200',
                            activeTab === index
                                ? 'border-[#0a0f1d] bg-[#0a0f1d] text-white'
                                : 'border-[#e2e8f0] bg-white text-[#334155]'
                        )}>
                        {item.badge}
                    </button>
                ))}
            </div>
        </div>
    )
}
