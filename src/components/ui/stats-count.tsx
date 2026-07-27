'use client';

import { useEffect, useRef, useState } from 'react';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useInView,
} from 'framer-motion';
import './stats-count.css';

interface StatItem {
    value: number;
    suffix?: string;
    label: string;
    duration?: number;
}

interface StatsCountProps {
    stats?: StatItem[];
    title?: string;
    showDividers?: boolean;
    className?: string;
}

const defaultStats: StatItem[] = [
    {
        value: 50,
        suffix: '+',
        label: 'Handcrafted animated components',
        duration: 5,
    },
    {
        value: 12,
        suffix: 'K+',
        label: 'Developers building with ScrollX-UI',
        duration: 6,
    },
    {
        value: 99,
        suffix: '%',
        label: 'Performance optimized for web',
        duration: 5.5,
    },
];

const defaultTitle = 'CREATE STUNNING INTERFACES';

function AnimatedCounter({
    value,
    suffix = '',
    delay = 0,
    label,
}: {
    value: number;
    suffix?: string;
    duration?: number;
    delay?: number;
    label: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: '-50px' });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 20,
        stiffness: 50,
        mass: 1,
    });

    const rounded = useTransform(springValue, (latest) =>
        Number(latest.toFixed(value % 1 === 0 ? 0 : 1)),
    );

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const unsubscribe = rounded.on('change', (latest) => {
            setDisplayValue(latest);
        });
        return () => unsubscribe();
    }, [rounded]);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isInView) {
            motionValue.set(0);
            timeout = setTimeout(() => {
                motionValue.set(value);
            }, delay * 300);
        } else {
            motionValue.set(0);
        }
        return () => clearTimeout(timeout);
    }, [isInView, value, motionValue, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
                duration: 0.8,
                delay: delay * 0.2,
                type: 'spring',
                stiffness: 80,
            }}
            className="stats-count-counter"
        >
            <motion.div
                className="stats-count-value"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : { scale: 0.8 }}
                transition={{
                    duration: 0.6,
                    delay: delay * 0.2 + 0.3,
                    type: 'spring',
                    stiffness: 100,
                }}
            >
                {displayValue}
                {suffix}
            </motion.div>
            <motion.p
                className="stats-count-label"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: delay * 0.2 + 0.6, duration: 0.6 }}
            >
                {label}
            </motion.p>
        </motion.div>
    );
}

export default function StatsCount({
    stats = defaultStats,
    title = defaultTitle,
    showDividers = true,
    className = '',
}: StatsCountProps) {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { margin: '-100px' });

    return (
        <motion.section
            ref={containerRef}
            className={`stats-count-section ${className}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {title && (
                <motion.div
                    className="stats-count-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h2 className="stats-count-title">
                        {title}
                    </h2>
                </motion.div>
            )}

            <div className="stats-count-grid-container">
                <div className="stats-count-grid">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="stats-count-item"
                        >
                            <AnimatedCounter
                                value={stat.value}
                                suffix={stat.suffix}
                                duration={stat.duration}
                                delay={index}
                                label={stat.label}
                            />
                            {index < stats.length - 1 && showDividers && (
                                <motion.div
                                    className="stats-count-divider"
                                    initial={{ opacity: 0, scaleY: 0 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, scaleY: 1 }
                                            : { opacity: 0, scaleY: 0 }
                                    }
                                    transition={{ delay: 1.5 + index * 0.2, duration: 0.6 }}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
