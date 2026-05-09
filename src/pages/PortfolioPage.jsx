import { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Portfolio, CTA } from './Homepage';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSEO } from '../hooks/useSEO';

// ─── Floating SVG path background ───────────────────────────────────────────
function FloatingPaths({ position, className = '' }) {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const pathCount = isMobile ? 8 : 45;

    const paths = useMemo(() => Array.from({ length: pathCount }, (_, i) => ({
        id: i,
        d: `M${-(380 - i * 5 * position)} ${-(189 + i * 6)}C${-(380 - i * 5 * position)
            } ${-(189 + i * 6)} ${-(312 - i * 5 * position)} ${216 - i * 6} ${152 - i * 5 * position
            } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
            } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        width: 0.5 + i * 0.03,
    })), [pathCount, position]);

    return (
        <div className={`absolute inset-0 pointer-events-none ${className}`}>
            <svg
                className="w-full h-full"
                viewBox="-200 -200 1100 800"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="xMidYMid slice"
            >
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke={`rgba(212,175,55,${0.06 + path.id * 0.015})`}
                        strokeWidth={path.width}
                        initial={{ pathLength: 0.3, opacity: 0.5 }}
                        animate={isMobile ? {
                            opacity: [0.15, 0.45, 0.15],
                        } : {
                            pathLength: 1,
                            opacity: [0.15, 0.45, 0.15],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 8,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

const Typewriter = ({ phrases, className }) => {
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [blink, setBlink] = useState(true);
    const isMobile = useMediaQuery('(max-width: 1024px)');

    useEffect(() => {
        const current = phrases[phraseIdx];
        let timeout;

        const typeSpeed = isMobile ? 120 : 80;
        const deleteSpeed = isMobile ? 60 : 40;

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), typeSpeed);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 2400);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), deleteSpeed);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setPhraseIdx((phraseIdx + 1) % phrases.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, phraseIdx, phrases, isMobile]);

    useEffect(() => {
        const interval = setInterval(() => setBlink(b => !b), 530);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className={className}>
            {displayed}
            <span style={{ opacity: blink ? 1 : 0, color: '#d4af37' }}>|</span>
        </span>
    );
};

function PortfolioHero() {
    const title = 'Portfolio';

    return (
        <section className="relative py-36 bg-black overflow-hidden text-center min-h-[55vh] flex items-center justify-center">
            <div className="absolute inset-0">
                <FloatingPaths position={-2} className="opacity-80" />
                <FloatingPaths position={2} className="opacity-40 rotate-180 scale-125" />
                <FloatingPaths position={-4} className="opacity-60 translate-y-20 scale-150" />
            </div>

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, rgba(0,0,0,0.8) 100%)',
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center gap-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="flex flex-col items-center gap-4"
                >
                    <h1 className="cormorant text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-[0.9] mb-8 flex flex-wrap justify-center">
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

                    <div className="montserrat text-white/50 text-base md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed min-h-[2rem]">
                        <Typewriter
                            phrases={[
                                'Crafting spaces with precision.',
                                'Every design tells a unique story.',
                                'Elevating living experiences.',
                            ]}
                            className="montserrat text-white/50 text-base md:text-lg"
                        />
                    </div>

                    {/* Scroll indicator - integrated into content flow like Contact page */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-16 flex flex-col items-center gap-2 z-20"
                    >
                        <span className="text-white/40 text-[10px] tracking-[0.3em] font-medium uppercase">Scroll to Explore</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="flex flex-col items-center gap-1"
                        >
                            <div className="w-px h-16 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
                            <ChevronDown className="w-4 h-4 text-[#d4af37]/60" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

const PortfolioPage = () => {
    useSEO({
        title: 'Portfolio',
        description: 'View Handasiyan\'s portfolio of expert architectural and interior design projects. See how we elevate living experiences and craft spaces with precision.'
    });

    return (
        <div className="pt-20 bg-black overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                ::selection { background: #d4af37; color: #000; }
                .cormorant { font-family: 'Cormorant Garamond', serif; }
                .montserrat { font-family: 'Montserrat', sans-serif; }
            `}</style>
            <PortfolioHero />
            <Portfolio isPreview={false} />
            <CTA />
        </div>
    );
};

export default PortfolioPage;