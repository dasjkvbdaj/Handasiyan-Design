import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { About } from './Homepage';
import Process from '../components/Process';
import husseinImg from '../assets/hussein.png';
import { ChevronDown } from 'lucide-react';

/* ─────────────────────────────────────────────
   Reusable animation variants
───────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 60 },
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
   Animated Counter
───────────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (!inView) return;
        let start = 0;
        const step = target / (duration * 60);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 1000 / 60);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

/* ─────────────────────────────────────────────
   Floating Particle
───────────────────────────────────────────── */
const FloatingParticle = ({ style }) => (
    <motion.div
        className="absolute w-1 h-1 rounded-full bg-[#d4af37]/30"
        style={style}
        animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
        }}
        transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 2,
        }}
    />
);

/* ─────────────────────────────────────────────
   ✨ LOOPING TEXT ANIMATIONS
───────────────────────────────────────────── */

/**
 * GoldShimmerText — a gold shimmer sweep that loops forever.
 * The light beam travels from left to right continuously.
 */
const GoldShimmerText = ({ children, className = '' }) => (
    <span
        className={`relative inline-block overflow-hidden ${className}`}
        style={{ WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
    >
        {/* Base text (muted gold) */}
        <span className="text-[#d4af37]/70">{children}</span>

        {/* Shimmer overlay — loops forever */}
        <motion.span
            className="absolute inset-0 pointer-events-none"
            style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,220,80,0.85) 50%, transparent 70%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
            }}
            animate={{ backgroundPositionX: ['-200%', '300%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', repeatDelay: 1.2 }}
        >
            {children}
        </motion.span>
    </span>
);

/**
 * WaveText — each character bobs up and down in a staggered wave, looping forever.
 */
const WaveText = ({ children, className = '', charClassName = 'text-white' }) => {
    const chars = String(children).split('');
    return (
        <span className={`inline-flex ${className}`} aria-label={children}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className={charClassName}
                    style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
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

/**
 * TypewriterLoopText — types out text, pauses, erases it, then repeats forever.
 */
const TypewriterLoopText = ({ texts, className = '' }) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [phase, setPhase] = useState('typing'); // 'typing' | 'pause' | 'erasing'

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
            {/* blinking cursor */}
            <motion.span
                className="inline-block w-0.5 h-[1em] bg-[#d4af37] ml-0.5 align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'steps(1)' }}
            />
        </span>
    );
};

/**
 * PulseGlowText — text that breathes with a golden glow pulsing forever.
 */
const PulseGlowText = ({ children, className = '' }) => (
    <motion.span
        className={`inline-block ${className}`}
        animate={{
            textShadow: [
                '0 0 0px rgba(212,175,55,0)',
                '0 0 20px rgba(212,175,55,0.9), 0 0 40px rgba(212,175,55,0.4)',
                '0 0 0px rgba(212,175,55,0)',
            ],
            color: ['#d4af37', '#f5d060', '#d4af37'],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
    >
        {children}
    </motion.span>
);

/**
 * MarqueeText — horizontal infinite scroll ticker.
 */
const MarqueeText = ({ items, speed = 35 }) => {
    const totalItems = [...items, ...items]; // duplicate for seamless loop
    return (
        <div className="overflow-hidden whitespace-nowrap py-5 border-y border-[#d4af37]/10 bg-black/40">
            <motion.div
                className="inline-flex gap-0"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
                {totalItems.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-6 px-8">
                        <span className="text-[#d4af37]/40 text-xs tracking-[0.3em] uppercase font-medium">
                            {item}
                        </span>
                        <span className="text-[#d4af37]/20 text-[8px]">◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/**
 * RotatingBadgeText — text that orbits / rotates around a central point (used decoratively).
 */
const RotatingBadgeText = ({ text, size = 120 }) => {
    const chars = text.split('');
    const radius = size / 2 - 12;
    return (
        <motion.div
            className="relative"
            style={{ width: size, height: size }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        >
            {chars.map((char, i) => {
                const angle = (i / chars.length) * 2 * Math.PI - Math.PI / 2;
                const x = radius * Math.cos(angle) + size / 2 - 6;
                const y = radius * Math.sin(angle) + size / 2 - 6;
                return (
                    <span
                        key={i}
                        className="absolute text-[#d4af37]/60 text-[9px] tracking-widest font-medium"
                        style={{
                            left: x,
                            top: y,
                            transform: `rotate(${(i / chars.length) * 360 + 90}deg)`,
                        }}
                    >
                        {char}
                    </span>
                );
            })}
        </motion.div>
    );
};

/* ─────────────────────────────────────────────
   Hero Section (enhanced with looping animations)
───────────────────────────────────────────── */
const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const particles = Array.from({ length: 18 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
    }));

    return (
        <section ref={ref} className="py-32 bg-[#064e3b] relative overflow-hidden min-h-[60vh] flex items-center">
            {/* Animated gradient orbs */}
            <motion.div
                className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
                className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#064e3b]/60 blur-3xl border border-[#d4af37]/20"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />

            <div className="absolute inset-0 bg-black/40" />

            {/* Floating particles */}
            {particles.map((p, i) => (
                <FloatingParticle key={i} style={p} />
            ))}

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `linear-gradient(#d4af37 1px, transparent 1px), linear-gradient(90deg, #d4af37 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Rotating badge — decorative top-right */}
            <div className="absolute top-10 right-10 opacity-60 hidden md:block">
                <div className="relative flex items-center justify-center">
                    <RotatingBadgeText text="HANDASIYAN · ARCHITECTURE · DESIGN · " size={130} />
                    {/* center dot */}
                    <div className="absolute w-2 h-2 rounded-full bg-[#d4af37]/50" />
                </div>
            </div>

            <motion.div
                style={{ y, opacity }}
                className="max-w-7xl mx-auto px-6 relative z-10 text-center w-full"
            >
                {/* Eyebrow label */}


                {/* Title — ✨ Wave animation loops forever */}
                <div className="overflow-hidden mb-6">
                    <motion.div
                        initial={{ y: '100%', opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
                    >
                        <WaveText
                            className="text-6xl md:text-8xl font-bold leading-none tracking-tight justify-center"
                            charClassName="text-white"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                        >
                            Our Story
                        </WaveText>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                    className="w-24 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f0d060] mx-auto mb-8"
                />

                {/* ✨ Typewriter loop on subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="text-xl max-w-2xl mx-auto font-light tracking-wide"
                >
                    <TypewriterLoopText
                        className="text-white/70"
                        texts={[
                            'A legacy built on discipline.',
                            'Honesty and respect for the craft.',
                            'Every drawing is a promise.',
                            'Building trust, one project at a time.',
                        ]}
                    />
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.2 }}
                    className="flex justify-center gap-16 mt-16"
                >
                    {[
                        { value: 5, suffix: '+', label: 'Years Experience' },
                        { value: 50, suffix: '+', label: 'Projects Delivered' },

                    ].map(({ value, suffix, label }) => (
                        <div key={label} className="text-center">
                            {/* ✨ Pulse glow on stat numbers */}
                            <div
                                className="text-3xl md:text-4xl font-bold"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                <PulseGlowText>
                                    <AnimatedCounter target={value} suffix={suffix} />
                                </PulseGlowText>
                            </div>
                            <div className="text-white/40 text-xs tracking-widest uppercase mt-1">{label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.8 }}
                >
                    <span className="text-white/40 text-[10px] tracking-[0.3em] font-medium uppercase">Scroll DOWN</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-1"
                    >
                        <div className="w-px h-12 bg-gradient-to-b from-[#d4af37]/60 to-transparent" />
                        <ChevronDown className="w-4 h-4 text-[#d4af37]/60" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
};

/* ─────────────────────────────────────────────
   Founder Section
───────────────────────────────────────────── */
const FounderSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

    return (
        <section ref={ref} className="py-32 bg-black relative overflow-hidden">
            {/* Ambient glow */}
            <motion.div
                className="absolute top-1/2 left-1/4 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-[#064e3b]/20 blur-3xl pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                {/* Image column */}
                <motion.div
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="relative"
                >
                    {/* Decorative corner frames */}
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
                        <motion.img
                            style={{ y: imgY }}
                            src={husseinImg}
                            alt="Hussein Tarhini"
                            className="w-full h-[110%] object-cover object-top"
                        />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                        />
                    </div>

                    {/* Founder badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        whileHover={{ scale: 1.03 }}
                        className="absolute -bottom-6 -right-6 bg-[#d4af37] p-8 rounded-2xl hidden md:block shadow-2xl shadow-[#d4af37]/30"
                    >
                        {/* ✨ Shimmer on the founder name */}
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
                        {/* ✨ Pulse glow on the highlighted phrase */}
                        <PulseGlowText>Father to Son</PulseGlowText>
                    </motion.h2>

                    <GoldLine />

                    <motion.div
                        variants={staggerContainer}
                        className="space-y-6 text-white/60 text-lg leading-relaxed mt-8"
                    >
                        {[
                            'Handasiyan was founded in 2020 by Hussein Tarhini, whose passion for construction was shaped from an early age while working alongside his father, a skilled landscape designer. From him, Hussein learned that every drawing is a promise and that true quality lies in careful execution and attention to detail.',
                            "After his father's passing, Hussein began his own journey in Lebanon, delivering high-end designs for international clients while managing local projects. A villa project later brought him to Ghana, where he recognized the country's potential and the need for higher construction standards.",
                            'Choosing to stay, he built Handasiyan step by step through small projects, hands-on training, and a commitment to quality—laying the foundation for a company built on trust, discipline, and lasting results.',
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
    const missionItems = [
        'Deliver high-quality construction and design services with precision and care.',
        'Maintain full transparency and honest communication with clients.',
        "Protect clients' investments by ensuring durable, well-executed results.",
        'Lead projects hands-on and ensure proper execution on site.',
        'Continue a legacy built on discipline, integrity, and excellence.',
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
            {/* Animated background grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle, #d4af37 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ✨ Marquee ticker at the top of section */}
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
                    {/* ✨ Wave animation on section title */}
                    <WaveText
                        className="text-4xl md:text-6xl font-bold justify-center flex-wrap"
                        charClassName="text-white"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                        Principles We Live By
                    </WaveText>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Mission Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        whileHover={{ y: -6 }}
                        className="group bg-black/60 p-10 rounded-3xl border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors duration-500 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                        />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                                    <span className="text-[#d4af37] text-sm">✦</span>
                                </div>
                                {/* ✨ Shimmer on card title */}
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
                                        <motion.span
                                            className="text-[#d4af37] mr-3 mt-1.5 text-xs"
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: i * 0.5 }}
                                        >
                                            ◆
                                        </motion.span>
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
                        transition={{ duration: 0.7, delay: 0.2 }}
                        whileHover={{ y: -6 }}
                        className="group bg-black/60 p-10 rounded-3xl border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors duration-500 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-[#064e3b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                        />

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                                    <span className="text-[#d4af37] text-sm">◉</span>
                                </div>
                                {/* ✨ Shimmer on card title */}
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
                                    Handasiyan envisions a construction industry where clients receive honest service,
                                    fair value, and work that lasts. We aim to raise professional standards by proving
                                    that excellence, transparency, and attention to detail should be the norm, not the exception.
                                </motion.p>
                                <motion.p variants={staggerItem} className="text-white/60 leading-relaxed text-lg">
                                    By combining strong engineering principles with respect for craftsmanship, Handasiyan
                                    seeks to contribute to sustainable development and become a trusted reference for
                                    quality construction in Ghana and beyond.
                                </motion.p>

                                {/* ✨ Pulse glow on the quote */}
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

            {/* ✨ Second marquee at the bottom — reversed direction */}
            <div className="mt-20">
                <div className="overflow-hidden whitespace-nowrap py-5 border-y border-[#d4af37]/10 bg-black/40">
                    <motion.div
                        className="inline-flex gap-0"
                        animate={{ x: ['-50%', '0%'] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    >
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-6 px-8">
                                <span className="text-[#064e3b]/80 text-xs tracking-[0.3em] uppercase font-medium">
                                    {item}
                                </span>
                                <span className="text-[#064e3b]/40 text-[8px]">◆</span>
                            </span>
                        ))}
                    </motion.div>
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
        <div className="pt-20 bg-black">
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
        </div>
    );
};

export default AboutPage;
