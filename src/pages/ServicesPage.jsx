import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Services, CTA } from './Homepage';
import { Check, Sparkles, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

/* ─── Floating Particle ─────────────────────────────────────────── */
const Particle = ({ delay, x, size, color }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{ left: `${x}%`, bottom: '-10px', width: size, height: size, background: color, opacity: 0.18 }}
        animate={{ y: [0, -700], opacity: [0, 0.35, 0] }}
        transition={{ duration: 6 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
    />
);

/* ─── Looping shimmer word ──────────────────────────────────────── */
const ShimmerText = ({ children, className }) => (
    <span className={`relative inline-block overflow-hidden ${className}`}>
        <span className="relative z-10">{children}</span>
        <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"
            style={{ mixBlendMode: 'overlay' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
        />
    </span>
);

/* ─── Typewriter with cursor blink (loops forever) ──────────────── */
const Typewriter = ({ phrases, className }) => {
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        const current = phrases[phraseIdx];
        let timeout;

        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
        } else if (deleting && displayed.length === 0) {
            setDeleting(false);
            setPhraseIdx((phraseIdx + 1) % phrases.length);
        }

        return () => clearTimeout(timeout);
    }, [displayed, deleting, phraseIdx, phrases]);

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

const whyChooseUs = [
    {
        title: "Personalized Approach",
        description:
            "We don't believe in one-size-fits-all. Every project is uniquely tailored to the client's preferences and lifestyle.",
    },
    {
        title: "Expert Craftsmanship",
        description:
            "Our partners are the best in the business, ensuring every piece of furniture and every finish meets our high standards.",
    },
    {
        title: "End-to-End Management",
        description:
            "From initial sketches to final walkthroughs, we handle everything, giving you peace of mind throughout the process.",
    },
    {
        title: "Innovative Design",
        description:
            "We stay ahead of trends while maintaining a focus on timeless elegance, using the latest tech to visualize your space.",
    },
];

const floatVariants = (index) => ({
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.6, // stagger so they don't all move together
        },
    },
});

// Looping glow pulse on the check icon circle
const glowVariants = (index) => ({
    animate: {
        boxShadow: [
            "0 0 0px 0px rgba(234,179,8,0)",
            "0 0 14px 4px rgba(234,179,8,0.35)",
            "0 0 0px 0px rgba(234,179,8,0)",
        ],
        transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.6,
        },
    },
});

// Looping shimmer underline on title
const underlineVariants = (index) => ({
    animate: {
        scaleX: [0, 1, 0],
        transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.6,
        },
    },
});

const ServicesPage = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const particles = Array.from({ length: 18 }, (_, i) => ({
        id: i,
        delay: i * 0.4,
        x: Math.random() * 100,
        size: 3 + Math.random() * 5,
        color: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#ffffff' : '#042d22',
    }));

    const title = "Our Services";
    const letters = title.split('');

    return (
        <div className="pt-20 bg-black overflow-x-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Montserrat:wght@300;400;500;600;700;800&display=swap');
                * { box-sizing: border-box; }
                ::selection { background: #d4af37; color: #000; }
                .cormorant { font-family: 'Cormorant Garamond', serif; }
                .montserrat { font-family: 'Montserrat', sans-serif; }
            `}</style>

            {/* Page Hero */}
            <section
                ref={heroRef}
                className="relative py-36 bg-[#042d22] overflow-hidden flex items-center justify-center text-center min-h-[55vh]"
            >
                {/* Grain overlay */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundSize: '200px',
                    }}
                />

                {/* Pulsing radial glow */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 70%)' }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {particles.map((p) => <Particle key={p.id} {...p} />)}

                <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#d4af37]/30" />
                <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#d4af37]/30" />

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-5xl mx-auto px-6">
                    {/* Looping eyebrow label */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="montserrat flex items-center justify-center gap-3 mb-8"
                    >
                        <motion.div
                            className="h-px bg-[#d4af37]/50"
                            animate={{ width: ['0px', '48px', '0px'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                        <ShimmerText className="cormorant text-[#d4af37]/70 text-sm tracking-[0.4em] uppercase">
                            What We Do
                        </ShimmerText>
                        <motion.div
                            className="h-px bg-[#d4af37]/50"
                            animate={{ width: ['0px', '48px', '0px'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                        />
                    </motion.div>

                    {/* Title with staggered entrance and looping float */}
                    <h1 className="cormorant text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] mb-8 flex flex-wrap justify-center">
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -6, 0],
                                    rotateX: 0,
                                }}
                                transition={{
                                    opacity: { delay: 0.05 * i, duration: 0.5 },
                                    rotateX: { delay: 0.05 * i, duration: 0.5 },
                                    y: {
                                        delay: i * 0.07,
                                        duration: 2.2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </h1>

                    {/* Typewriter tagline */}
                    <div className="montserrat text-white/50 text-base md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed min-h-[2rem]">
                        <Typewriter
                            phrases={[
                                "Comprehensive design solutions tailored to your unique lifestyle.",
                                "Architecture that inspires and endures.",
                                "Elevating spaces through meticulous craftsmanship.",
                                "Bringing your vision to life with precision.",
                            ]}
                            className="montserrat text-white/50 text-base"
                        />
                    </div>

                    {/* Scroll line */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="mt-16 flex flex-col items-center gap-2 z-20"
                    >
                        <span className="text-white/40 text-[10px] tracking-[0.3em] font-medium uppercase">Scroll Down</span>
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
            </section>

            {/* Main Services */}
            <Services isPreview={false} />

            {/* Why Choose Us */}
            <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
                {/* Ambient background pulse — one per card, positioned behind it */}
                {whyChooseUs.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 320,
                            height: 320,
                            left: i % 2 === 0 ? "10%" : "55%",
                            top: i < 2 ? "10%" : "55%",
                            background:
                                "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 3.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: i * 0.6,
                        }}
                    />
                ))}

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Why Work With Us
                        </h2>
                        <p className="text-white/50">
                            The Handasiyan difference is in the details.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={floatVariants(index)}
                                animate="animate"
                                className="flex space-x-6"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <motion.div
                                        variants={glowVariants(index)}
                                        animate="animate"
                                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-yellow-500"
                                    >
                                        <Check className="w-6 h-6" />
                                    </motion.div>
                                </div>

                                {/* Text */}
                                <div>
                                    <div className="relative inline-block mb-3">
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        {/* Animated shimmer underline */}
                                        <motion.span
                                            variants={underlineVariants(index)}
                                            animate="animate"
                                            style={{ originX: 0 }}
                                            className="absolute bottom-0 left-0 h-px w-full bg-yellow-500/60 block"
                                        />
                                    </div>
                                    <p className="text-white/60 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <section className="py-24 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Work With Us</h2>
                        <p className="text-white/50">The Handasiyan difference is in the details.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex space-x-6"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-yellow-500">
                                        <Check className="w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            <CTA />
        </div>
    );
};

export default ServicesPage;
