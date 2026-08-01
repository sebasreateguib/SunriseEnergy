'use client';

import { motion, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

const Whatsapp = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
        <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" />
    </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

interface FooterColumn {
    heading: string;
    links: { text: string; url: string }[];
}

interface FooterBrandProps {
    brandName?: string;
    tagline?: string;
    columns?: FooterColumn[];
    socials?: {
        whatsapp?: string;
        linkedin?: string;
    };
    copyright?: string;
    legalLinks?: { text: string; url: string }[];
    className?: string;
}

const defaultColumns: FooterColumn[] = [
    {
        heading: 'Empresa',
        links: [
            { text: 'Nosotros', url: '#nosotros' },
            { text: 'Experiencia', url: '#expertise' },
            { text: 'Clientes', url: '#clientes' },
        ],
    },
    {
        heading: 'Soluciones',
        links: [
            { text: 'Servicios', url: '#servicios' },
            { text: 'Proyectos', url: '#proyectos' },
        ],
    },
];

const defaultLegalLinks: { text: string; url: string }[] = [];

const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

export default function FooterWithFadedBrand({
    brandName = 'Sunrise Energy',
    tagline = 'Impulsando tu mundo con energía solar.',
    columns = defaultColumns,
    socials = { whatsapp: 'https://wa.me/51948650409?text=Hola,%20quisiera%20más%20información%20sobre%20Sunrise%20Energy', linkedin: 'https://www.linkedin.com/in/miguel-reategui-05201924?utm_sou' },
    copyright = '© 2026 Sunrise Energy Perú. Todos los derechos reservados.',
    legalLinks = defaultLegalLinks,
    className,
}: FooterBrandProps) {
    return (
        <footer className={cn('site-footer', className)}>
            <motion.div
                variants={containerVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='site-footer-inner'
            >
                <motion.p
                    variants={itemVariants}
                    className='site-footer-tagline'
                >
                    {tagline}
                </motion.p>

                <div className='site-footer-main'>
                    <div className='site-footer-columns'>
                        {columns.map((col, ci) => (
                            <motion.div key={ci} variants={itemVariants}>
                                <p className='site-footer-heading'>
                                    {col.heading}
                                </p>
                                <ul className='site-footer-list'>
                                    {col.links.map((link, li) => (
                                        <li key={li}>
                                            <a href={link.url} className='site-footer-link'>
                                                {link.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div variants={itemVariants} className='site-footer-social-col'>
                        <p className='site-footer-heading'>
                            Redes
                        </p>
                        <div className='site-footer-social-icons'>
                            {socials.whatsapp && (
                                <a
                                    href={socials.whatsapp}
                                    aria-label='WhatsApp'
                                    className='site-footer-social-link'
                                >
                                    <Whatsapp className='site-footer-social-svg' />
                                </a>
                            )}
                            {socials.linkedin && (
                                <a
                                    href={socials.linkedin}
                                    aria-label='LinkedIn'
                                    className='site-footer-social-link'
                                >
                                    <Linkedin className='site-footer-social-svg' />
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    variants={itemVariants}
                    className='site-footer-divider'
                />

                <motion.div
                    variants={itemVariants}
                    className='site-footer-bottom'
                >
                    <p className='site-footer-copyright'>
                        {copyright}
                    </p>
                    <div className='site-footer-legal'>
                        {legalLinks.map((l, i) => (
                            <a
                                key={i}
                                href={l.url}
                                className='site-footer-legal-link'
                            >
                                {l.text}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </motion.div>

            <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                viewport={{ once: true }}
                className='site-footer-brand'
                style={{
                    fontSize: 'clamp(3rem, 15vw, 13rem)',
                }}
            >
                {brandName}
            </motion.p>
        </footer>
    );
}

export { FooterWithFadedBrand };
