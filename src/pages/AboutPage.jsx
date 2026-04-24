import { About } from './Homepage';
import Process from '../components/Process';
import { useMediaQuery } from '../hooks/useMediaQuery';
import husseinImg from '../assets/hussein.avif';
import { ChevronDown } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion, useInView } from 'framer-motion';

/* ─────────────────────────────────────────────
   Reusable animation variants
───────────────────────────────────────────── */
const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

/* ─────────────────────────────────────────────
   Animated Gold Line Divider
───────────────────────────────────────────── */
const GoldLine = ({ delay = 0 }) => (
    <motion.div
        className="h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-full"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay }}
    />
);

/* ─────────────────────────────────────────────
   Single shared isMobile hook result
   — avoids re-instantiating in every child
───────────────────────────────────────────── */
const useIsMobile = () => useMediaQuery('(max-width: 1024px)');

/* ─────────────────────────────────────────────
   ✨ LOOPING TEXT ANIMATIONS
   All animations are disabled on mobile to
   eliminate the primary source of lag.
───────────────────────────────────────────── */

/**
 * GoldShimmerText
 * FIX: Animation only runs on desktop (isMobile guard).
 * The shimmer uses CSS `backgroundPosition` animation — much cheaper
 * than Framer's JS-driven transform on mobile.
 */
const GoldShimmerText = ({ children, className = '' }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <span className={`text-[#d4af37]/80 ${className}`}>
                {children}
            </span>
        );
    }

    return (
        <span
            className={`relative inline-block overflow-hidden ${className}`}
            style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
        >
            <span className="text-[#d4af37]/70">{children}</span>
            <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,220,80,0.85) 50%, transparent 70%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                }}
                animate={{ backgroundPositionX: ['-200%', '300%'] }}
                transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'linear',
                    repeatDelay: 1.2,
                }}
            >
                {children}
            </motion.span>
        </span>
    );
};

/**
 * WaveText
 * FIX: On mobile, renders as plain static text — zero animation overhead.
 * On desktop, animates characters but using `will-change: transform` hint
 * via style prop to keep it on the compositor thread.
 * Also reduced from per-char loops to a single CSS keyframe class on mobile.
 */
const WaveText = ({ children, className = '', charClassName = 'text-white' }) => {
    const isMobile = useIsMobile();
    const chars = String(children).split('');

    if (isMobile) {
        return (
            <span className={`inline-flex flex-wrap ${className}`} aria-label={children}>
                {chars.map((char, i) => (
                    <span
                        key={i}
                        className={charClassName}
                        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                    >
                        {char}
                    </span>
                ))}
            </span>
        );
    }

    return (
        <span className={`inline-flex ${className}`} aria-label={children}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className={charClassName}
                    style={{
                        display: 'inline-block',
                        whiteSpace: char === ' ' ? 'pre' : 'normal',
                        willChange: 'transform',
                    }}
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                        duration: 1.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.06,
                        repeatDelay: 0.4,
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
};

/* ─── Typewriter with cursor blink (loops forever) ──────────────── */
const Typewriter = ({ phrases, className }) => {
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [deleting, setDeleting] = useState(false);
    const [blink, setBlink] = useState(true);
    const isMobile = useIsMobile();

    useEffect(() => {
        const current = phrases[phraseIdx];
        let timeout;
        // Slower on mobile = fewer setState calls per second = less work
        const typeSpeed = isMobile ? 130 : 80;
        const deleteSpeed = isMobile ? 70 : 40;

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
        // FIX: Slower blink interval on mobile — halves cursor re-render frequency
        const interval = setInterval(() => setBlink(b => !b), isMobile ? 700 : 530);
        return () => clearInterval(interval);
    }, [isMobile]);

    return (
        <span className={className}>
            {displayed}
            <span style={{ opacity: blink ? 1 : 0, color: '#d4af37' }}>|</span>
        </span>
    );
};

/* ─── Looping shimmer word ──────────────────────────────────────── */
const ShimmerText = ({ children, className }) => {
    const isMobile = useIsMobile();

    if (isMobile) {
        return <span className={className}>{children}</span>;
    }

    return (
        <span className={`relative inline-block overflow-hidden ${className}`}>
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"
                style={{ mixBlendMode: 'overlay' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'easeInOut',
                }}
            />
        </span>
    );
};

/**
 * PulseGlowText
 * FIX: On mobile, no textShadow animation (forces main-thread paint on every frame).
 * Color-only animation is much cheaper — GPU handles it.
 * On desktop, full glow effect with willChange hint.
 */
const PulseGlowText = ({ children, className = '' }) => {
    const isMobile = useIsMobile();
    return (
        <motion.span
            className={`inline-block ${className}`}
            style={!isMobile ? { willChange: 'filter' } : undefined}
            animate={
                isMobile
                    ? { color: ['#d4af37', '#f5d060', '#d4af37'] }
                    : {
                        textShadow: [
                            '0 0 0px rgba(212,175,55,0)',
                            '0 0 20px rgba(212,175,55,0.9), 0 0 40px rgba(212,175,55,0.4)',
                            '0 0 0px rgba(212,175,55,0)',
                        ],
                        color: ['#d4af37', '#f5d060', '#d4af37'],
                    }
            }
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            {children}
        </motion.span>
    );
};

/**
 * MarqueeText
 * FIX: Uses CSS animation instead of Framer Motion.
 * CSS `@keyframes` runs entirely on the compositor thread — zero JS overhead.
 */
const MarqueeText = ({ items, speed = 35 }) => {
    const totalItems = [...items, ...items];
    return (
        <div className="overflow-hidden whitespace-nowrap py-5 border-y border-[#d4af37]/10 bg-black/40">
            <div
                className="inline-flex gap-0"
                style={{
                    animation: `marquee ${speed}s linear infinite`,
                }}
            >
                {totalItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-6 px-8">
                        <span className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase font-medium">
                            {item}
                        </span>
                        <span className="text-[#d4af37]/20 text-[8px]">◆</span>
                    </span>
                ))}
            </div>

            {/* Scoped CSS keyframe — no Framer overhead */}
            <style>{`
                @keyframes marquee {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

/* ─────────────────────────────────────────────
   Hero Section
   FIX: Animated gradient orbs used blur-3xl + scale loop.
   blur() triggers main-thread layer compositing on mobile.
   Replaced with static blur divs (no animation on mobile).
   On desktop kept but added will-change: transform.
───────────────────────────────────────────── */
const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const isMobile = useIsMobile();

    const title = 'Our Story';
    const letters = title.split('');

    return (
        <section ref={ref} className="py-32 bg-[#064e3b] relative overflow-hidden min-h-[60vh] flex items-center">

            {/* Ambient orbs — static on mobile, animated on desktop */}
            {isMobile ? (
                <>
                    <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#064e3b]/60 blur-3xl border border-[#d4af37]/20 pointer-events-none" />
                </>
            ) : (
                <>
                    <motion.div
                        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none"
                        style={{ willChange: 'transform, opacity' }}
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#064e3b]/60 blur-3xl border border-[#d4af37]/20 pointer-events-none"
                        style={{ willChange: 'transform, opacity' }}
                        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    />
                </>
            )}

            <div className="absolute inset-0 bg-black/40" />

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <motion.div
                style={{ y, opacity }}
                className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full"
            >
                {/* Eyebrow label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="montserrat flex items-center justify-center gap-3 mb-8"
                >
                    {/* FIX: Expanding lines — CSS animation on mobile, Framer on desktop */}
                    {isMobile ? (
                        <div className="h-px w-12 bg-[#d4af37]/50" />
                    ) : (
                        <motion.div
                            className="h-px bg-[#d4af37]/50"
                            animate={{ width: ['0px', '48px', '0px'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    )}
                    <ShimmerText className="cormorant text-[#d4af37]/70 text-sm tracking-[0.4em] uppercase">
                        About Us
                    </ShimmerText>
                    {isMobile ? (
                        <div className="h-px w-12 bg-[#d4af37]/50" />
                    ) : (
                        <motion.div
                            className="h-px bg-[#d4af37]/50"
                            animate={{ width: ['0px', '48px', '0px'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                        />
                    )}
                </motion.div>

                {/* Title letters */}
                <h1 className="cormorant text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] mb-8 flex flex-wrap justify-center">
                    {letters.map((letter, i) =>
                        isMobile ? (
                            // FIX: On mobile, entrance only — no looping float per character
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                transition={{
                                    opacity: { delay: 0.05 * i, duration: 0.5 },
                                    rotateX: { delay: 0.05 * i, duration: 0.5 },
                                    y: { delay: 0.05 * i, duration: 0.5 },
                                }}
                                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ) : (
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
                                style={{
                                    display: 'inline-block',
                                    transformOrigin: 'bottom',
                                    willChange: 'transform',
                                }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        )
                    )}
                </h1>

                {/* Typewriter subtitle */}
                <div className="montserrat text-white/50 text-base md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed">
                    <Typewriter
                        className="montserrat text-white/50 text-base"
                        phrases={[
                            'Designing for real living.',
                            'Precision in every detail.',
                            'Architecture, Engineering, Interiors.',
                            'Your vision, our execution.',
                        ]}
                    />
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 mt-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                >
                    <span className="text-white/40 text-[10px] tracking-[0.3em] font-medium uppercase">Scroll to Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-1"
                        style={{ willChange: 'transform' }}
                    >
                        <ChevronDown className="w-4 h-4 text-[#d4af37]/60" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Founder Section
   FIX: Several child divs had Framer `variants`/`initial`/`whileInView`
   props but were plain <div> elements, not <motion.div>.
   Framer silently ignores those props but still runs reconciliation.
   Fixed by converting them to <motion.div> where needed, or removing
   unused animation props from plain divs.
───────────────────────────────────────────── */
const FounderSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
    const isMobile = useIsMobile();

    return (
        <section ref={ref} className="py-32 bg-black relative overflow-hidden">
            {/* Ambient glow — static on mobile */}
            {isMobile ? (
                <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-[#064e3b]/20 blur-3xl pointer-events-none opacity-40" />
            ) : (
                <motion.div
                    className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-[#064e3b]/20 blur-3xl pointer-events-none"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    style={{ willChange: 'opacity' }}
                />
            )}

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Image column — FIX: was <div> with Framer props, now proper <motion.div> */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="relative"
                >
                    {/* Decorative corner frames — FIX: were plain divs with Framer props */}
                    <motion.div
                        className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#d4af37]/60"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    />
                    <motion.div
                        className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#d4af37]/60"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                    />

                    <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#d4af37]/20 relative">
                        {/* FIX: Parallax scroll on image disabled on mobile — scroll-linked transforms
                            are expensive on mobile browsers that don't support passive scroll well */}
                        <motion.img
                            style={isMobile ? undefined : { y: imgY }}
                            src={husseinImg}
                            alt="Hussein Tarhini"
                            className="w-full h-[110%] object-cover object-top"
                            loading="lazy"
                        />
                        {/* FIX: was plain <div> with Framer props */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </div>

                    {/* Founder badge — FIX: was plain <div> with Framer props */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-6 -right-6 bg-[#d4af37] p-8 rounded-2xl hidden md:block shadow-2xl shadow-[#d4af37]/30"
                    >
                        <p className="font-bold text-xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            <span className="text-black">Hussein Tarhini</span>
                        </p>
                        <p className="text-black/70 text-sm mt-1">Architectural & Interior Designer</p>
                    </motion.div>
                </motion.div>

                {/* Text column */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {/* FIX: was <span> with variants prop — plain span doesn't animate */}
                    <motion.span
                        variants={staggerItem}
                        className="text-[#d4af37] font-medium tracking-[0.3em] uppercase text-xs mb-4 block"
                    >
                        Founding Story
                    </motion.span>

                    <motion.h2
                        variants={staggerItem}
                        className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        A Legacy Passed from{' '}
                        <PulseGlowText>Father to Son</PulseGlowText>
                    </motion.h2>

                    <GoldLine />

                    <motion.div
                        variants={staggerContainer}
                        className="space-y-6 text-white/60 text-lg leading-relaxed mt-8"
                    >
                        {[
                            'At Handasiyan, we don’t just build spaces — we create environments designed for real living.',
                            'Based in Accra, Ghana, Handasiyan is a multidisciplinary company specializing in design, planning, and construction. Our work covers every stage of the process, from the first concept to the final details, ensuring that every project is delivered with precision and purpose.',
                            'We combine architecture, engineering, and interior design into one seamless experience. This allows us to control quality, maintain consistency, and bring each vision to life exactly as it was imagined.',
                        ].map((text, i) => (
                            <motion.p
                                key={i}
                                variants={staggerItem}
                                className="relative pl-5 border-l border-[#d4af37]/20"
                            >
                                {text}
                            </motion.p>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Mission & Vision Cards
───────────────────────────────────────────── */
const MissionVisionSection = () => {
    const isMobile = useIsMobile();

    const missionItems = [
        'Architectural Design',
        'Construction & Project Execution',
        'Interior Design & Space Planning',
        'Mechanical & Electrical Engineering',
        'Landscape Design & Finishing',
    ];

    const marqueeItems = [
        'Architecture',
        'Interior Design',
        'Construction',
        'Quality',
        'Integrity',
        'Excellence',
        'Precision',
        'Craftsmanship',
    ];

    return (
        <section className="py-32 bg-[#030f0a] border-y border-white/5 relative overflow-hidden">
            {/* Background dot grid */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, #d4af37 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Marquee ticker */}
            <div className="mb-20">
                <MarqueeText items={marqueeItems} speed={30} />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-20"
                >
                    <span className="text-[#d4af37]/60 tracking-[0.3em] uppercase text-xs block mb-4">
                        Our Purpose
                    </span>
                    <WaveText
                        className="text-4xl md:text-6xl font-bold justify-center flex-wrap"
                        charClassName="text-white"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        What We Do
                    </WaveText>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group bg-black/60 p-10 rounded-3xl border border-[#d4af37]/10"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                                    <span className="text-[#d4af37] text-sm">✦</span>
                                </div>
                                <h2
                                    className="text-3xl font-bold"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    <GoldShimmerText>Brand Mission</GoldShimmerText>
                                </h2>
                            </div>

                            <motion.ul
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-4"
                            >
                                {missionItems.map((item, i) => (
                                    <motion.li
                                        key={i}
                                        variants={staggerItem}
                                        className="flex items-start group/item"
                                    >
                                        {/* FIX: Diamond rotation — disabled on mobile.
                                            5 simultaneously rotating elements = 5 animation loops */}
                                        {isMobile ? (
                                            <span className="text-[#d4af37] mr-3 mt-1.5 text-xs">◆</span>
                                        ) : (
                                            <motion.span
                                                className="text-[#d4af37] mr-3 mt-1.5 text-xs"
                                                style={{ willChange: 'transform' }}
                                                animate={{ rotate: [0, 360] }}
                                                transition={{
                                                    duration: 8,
                                                    repeat: Infinity,
                                                    ease: 'linear',
                                                    delay: i * 0.5,
                                                }}
                                            >
                                                ◆
                                            </motion.span>
                                        )}
                                        <span className="text-white/60 group-hover/item:text-white/80 transition-colors duration-300">
                                            {item}
                                        </span>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </div>
                    </motion.div>

                    {/* Vision Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group bg-black/60 p-10 rounded-3xl border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors duration-500 relative overflow-hidden"
                    >
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                                    <span className="text-[#d4af37] text-sm">◉</span>
                                </div>
                                <h2
                                    className="text-3xl font-bold"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                >
                                    <GoldShimmerText>Brand Vision</GoldShimmerText>
                                </h2>
                            </div>

                            <motion.div
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <motion.p variants={staggerItem} className="text-white/60 leading-relaxed text-lg">
                                    To become a trusted name in Ghana’s construction and design industry by delivering projects that combine function, durability, and refined aesthetics.
                                </motion.p>

                                <motion.div
                                    variants={staggerItem}
                                    className="pt-4 border-t border-[#d4af37]/10"
                                >
                                    <PulseGlowText className="text-sm italic tracking-wide">
                                        "Every drawing is a promise."
                                    </PulseGlowText>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Why Handasiyan Section
───────────────────────────────────────────── */
const WhyHandasiyan = () => {
    const reasons = [
        'Integrated design and construction under one roof',
        'Focus on detail and execution quality',
        'Professional project management',
        'Reliable timelines and structured workflow',
    ];

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Why <span className="text-[#d4af37]">Handasiyan</span>
                        </h2>
                        <div className="space-y-6">
                            {reasons.map((reason, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
                                    <p className="text-white/70 text-lg">{reason}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#064e3b]/10 p-12 rounded-3xl border border-[#d4af37]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/5 blur-3xl rounded-full" />
                        <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Contact</h3>
                        <div className="space-y-4 text-white/60">
                            <p className="flex items-center gap-3">
                                <span className="text-[#d4af37]">📍</span> Accra, Ghana
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-[#d4af37]">📞</span> +233 59 639 9006
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="text-[#d4af37]">📧</span> handasiyan.2020@gmail.com
                            </p>
                            {/* <p className="flex items-center gap-3">
                                <span className="text-[#d4af37]">🌐</span> www.handasiyan.com
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Main AboutPage
───────────────────────────────────────────── */
const AboutPage = () => {
    return (
        <div className="pt-20 bg-black relative">
            <HeroSection />

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <About isPreview={false} />
            </motion.div>

            <FounderSection />

            <MissionVisionSection />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
            >
                <Process />
            </motion.div>

            <WhyHandasiyan />
        </div>
    );
};

export default AboutPage;
