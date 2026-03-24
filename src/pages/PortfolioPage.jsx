import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Portfolio, CTA } from './Homepage';

// ─── Floating SVG path background ───────────────────────────────────────────
function FloatingPaths({ position }) {
    const paths = Array.from({ length: 45 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
            } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full"
                viewBox="0 0 696 316"
                fill="none"
                aria-hidden="true"
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={`rgba(184,134,11,${0.08 + path.id * 0.018})`}
                        strokeWidth={path.width}
                        initial={{ pathLength: 0.3, opacity: 0.5 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

const TypewriterLoopText = ({ texts, className = '' }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [phase, setPhase] = useState('typing');

    useEffect(() => {
        const current = texts[textIndex];

        if (phase === 'typing') {
            if (displayed.length < current.length) {
                const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
                return () => clearTimeout(t);
            } else {
                const t = setTimeout(() => setPhase('pause'), 1400);
                return () => clearTimeout(t);
            }
        }

        if (phase === 'pause') {
            const t = setTimeout(() => setPhase('erasing'), 600);
            return () => clearTimeout(t);
        }

        if (phase === 'erasing') {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32);
                return () => clearTimeout(t);
            } else {
                setTextIndex((prev) => (prev + 1) % texts.length);
                setPhase('typing');
            }
        }
    }, [displayed, phase, textIndex, texts]);

    return (
        <span className={`font-mono ${className}`}>
            {displayed}
            <motion.span
                className="inline-block w-0.5 h-[1em] bg-[#d4af37] ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'steps(1)' }}
            />
        </span>
    );
};

function PortfolioHero() {
    const title = 'Portfolio';

    return (
        <section className="relative py-36 bg-black overflow-hidden text-center min-h-[90vh] flex items-center justify-center">
            <div className="absolute inset-0">
                <FloatingPaths position={-2} />
                <FloatingPaths position={-4} />
            </div>

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.65) 100%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter flex flex-wrap justify-center">
                        {title.split(' ').map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                                {word.split('').map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ opacity: 0, y: 60, rotateX: -90 }}
                                        animate={{
                                            opacity: 1,
                                            y: [0, -6, 0],
                                            rotateX: 0,
                                        }}
                                        transition={{
                                            opacity: { delay: wordIndex * 0.1 + letterIndex * 0.05, duration: 0.5 },
                                            rotateX: { delay: wordIndex * 0.1 + letterIndex * 0.05, duration: 0.5 },
                                            y: {
                                                delay: wordIndex * 0.1 + letterIndex * 0.07,
                                                duration: 2.2,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            },
                                        }}
                                        className="inline-block text-transparent bg-clip-text"
                                        style={{
                                            display: 'inline-block',
                                            transformOrigin: 'bottom',
                                            backgroundImage:
                                                'linear-gradient(135deg, #E8C96D 0%, #B8860B 50%, #ffffff 100%)',
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.9 }}
                        className="text-xl max-w-2xl font-light tracking-wide"
                    >
                        <TypewriterLoopText
                            className="text-white/70"
                            texts={[
                                'Crafting spaces with precision.',
                                'Every design tells a unique story.',
                                'Elevating living experiences.',
                            ]}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

const PortfolioPage = () => {
    return (
        <div className="pt-20 bg-black">
            <PortfolioHero />
            <Portfolio isPreview={false} />
            <CTA />
        </div>
    );
};

export default PortfolioPage;
