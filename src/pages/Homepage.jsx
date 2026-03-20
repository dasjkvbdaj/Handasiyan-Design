import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Home, Layout, Ruler, X, Mail, Phone, ArrowRight, ChevronDown } from 'lucide-react';

/* ─── LOOPING TEXT COMPONENTS ────────────────────────────────────────────── */

/**
 * GoldShimmer — continuous gold shimmer sweep, loops forever.
 */
const GoldShimmer = ({ children, className = '' }) => (
    <span className={`relative inline-block ${className}`}>
        {/* Base text rendered twice: once for layout, once clipped by shimmer */}
        <span className="relative">{children}</span>
        <motion.span
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ mixBlendMode: 'screen' }}
        >
            <motion.span
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(105deg, transparent 25%, rgba(255,220,80,0.7) 50%, transparent 75%)',
                    backgroundSize: '250% 100%',
                }}
                animate={{ backgroundPosition: ['-250% 0%', '250% 0%'] }}
                transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 2, ease: 'easeInOut' }}
            />
        </motion.span>
    </span>
);

/**
 * BreathingLabel — section labels that pulse letter-spacing & opacity forever.
 */
const BreathingLabel = ({ children, className = '' }) => (
    <motion.span
        className={`text-[#d4af37] font-semibold uppercase text-xs tracking-[0.22em] ${className}`}
        animate={{
            letterSpacing: ['0.22em', '0.33em', '0.22em'],
            opacity: [0.65, 1, 0.65],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
        {children}
    </motion.span>
);

/**
 * PulsingLine — a horizontal rule that breathes its width.
 */
const PulsingLine = ({ delay = 0 }) => (
    <motion.span
        className="block h-px bg-[#d4af37]/50"
        animate={{ width: ['24px', '52px', '24px'], opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
        style={{ display: 'inline-block' }}
    />
);

/**
 * RotatingWords — cycles through words with a vertical slide, forever.
 */
const RotatingWords = ({ words, className = '' }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIndex(i => (i + 1) % words.length), 2800);
        return () => clearInterval(id);
    }, [words.length]);

    return (
        <span
            className={`relative inline-flex overflow-hidden align-bottom ${className}`}
            style={{ verticalAlign: 'bottom' }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-110%', opacity: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[#d4af37] italic inline-block"
                >
                    {words[index]}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

/**
 * TypewriterLoop — types, pauses, erases, repeats forever.
 */
const TypewriterLoop = ({ texts, className = '' }) => {
    const [display, setDisplay] = useState('');
    const [textIdx, setTextIdx] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;
        const current = texts[textIdx];
        const speed = isDeleting ? 36 : 65;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const next = current.slice(0, display.length + 1);
                setDisplay(next);
                if (next === current) {
                    setIsPaused(true);
                    setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, 1600);
                }
            } else {
                const next = display.slice(0, -1);
                setDisplay(next);
                if (next === '') {
                    setIsDeleting(false);
                    setTextIdx(i => (i + 1) % texts.length);
                }
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [display, isDeleting, isPaused, textIdx, texts]);

    return (
        <span className={className}>
            {display}
            {/* blinking cursor */}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block w-[2px] h-[0.85em] bg-[#d4af37] ml-0.5 align-middle"
            />
        </span>
    );
};

/**
 * MarqueeStrip — infinite horizontal scroll of brand words.
 */
const MarqueeStrip = ({ items }) => {
    const doubled = [...items, ...items];
    return (
        <div className="overflow-hidden w-full py-3 mb-10">
            <motion.div
                className="flex gap-12 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                {doubled.map((item, i) => (
                    <span key={i} className="inline-flex items-center gap-4 text-white/20 text-xs uppercase tracking-[0.25em] font-medium">
                        <motion.span
                            className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/50 flex-shrink-0"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.25 }}
                        />
                        {item}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/* ─── ONE-TIME ANIMATION VARIANTS ────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }
    })
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
        opacity: 1,
        transition: { duration: 0.9, delay: i * 0.1, ease: 'easeOut' }
    })
};

const slideLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: (i = 0) => ({
        opacity: 1, scale: 1,
        transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
    })
};

/* ─── HERO ────────────────────────────────────────────────────────────────── */
export const Hero = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Parallax Video BG */}
            <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
                <video autoPlay muted loop playsInline className="absolute min-w-full min-h-full object-cover">
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/95 z-10" />
                <div className="absolute inset-0 bg-black/25 z-[5]" />
            </motion.div>

            {/* Grain */}
            <div className="absolute inset-0 z-[6] opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px',
                }}
            />

        </section>
    );
};

/* ─── ABOUT ───────────────────────────────────────────────────────────────── */
export const About = ({ isPreview = false }) => {
    return (
        <section className={`py-28 ${isPreview ? 'bg-[#061e15]' : 'bg-black'} relative overflow-hidden`}>
            <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#064e3b]/20 blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">

                {/* ── LOOP: pulsing lines + breathing label ── */}
                <motion.div
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 mb-8"
                >
                    <PulsingLine delay={0} />
                    <BreathingLabel>Our Philosophy</BreathingLabel>
                    <PulsingLine delay={0.6} />
                </motion.div>

                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white mt-2 mb-8 leading-[1.1]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    We create spaces that<br />
                    {/* ── LOOP: gold shimmer ── */}
                    <GoldShimmer className="text-[#d4af37]">reflect your soul.</GoldShimmer>
                </motion.h2>

                {/* ── LOOP: paragraph gently breathes opacity ── */}
                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={1}
                    animate={{ opacity: [0.5, 0.72, 0.5] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                    className="text-lg leading-relaxed font-light max-w-2xl mx-auto text-white/60"
                >
                    Founded on the belief that every drawing is a promise, Handasiyan specializes in high-end design built on trust, discipline, and lasting results. We blend strong engineering principles with human values to create meaningful environments.
                </motion.p>

                {isPreview && (
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        className="mt-12"
                    >
                        <Link to="/about"
                            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#d4af37]/50 text-[#d4af37] font-semibold rounded-full hover:bg-[#d4af37] hover:text-black transition-all duration-300">
                            Read Our Story
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

/* ─── SERVICES ────────────────────────────────────────────────────────────── */
const services = [
    { icon: <Home className="w-6 h-6" />, title: 'Full Interior Design', description: 'From concept to completion, we handle every detail of your renovation or new build.', number: '01' },
    { icon: <Palette className="w-6 h-6" />, title: 'Color Consulting', description: 'Expert guidance on palettes, finishes, and textures to bring your vision to life.', number: '02' },
    { icon: <Layout className="w-6 h-6" />, title: 'Space Planning', description: 'Optimizing flow and functionality to make the most of your available square footage.', number: '03' },
    { icon: <Ruler className="w-6 h-6" />, title: 'Custom Furniture', description: 'Bespoke furniture design and sourcing for truly unique statement pieces.', number: '04' },
];

export const Services = ({ isPreview = false }) => {
    const displayServices = isPreview ? services.slice(0, 3) : services;

    return (
        <section className={`py-28 ${isPreview ? 'bg-black' : 'bg-neutral-950'} relative overflow-hidden`}>
            <div className="absolute left-0 top-0 w-[400px] h-[400px] rounded-full bg-[#d4af37]/5 blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        {/* ── LOOP: pulsing line + breathing label ── */}
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="inline-flex items-center gap-3 mb-4">
                            <PulsingLine />
                            <BreathingLabel>What We Do</BreathingLabel>
                        </motion.div>

                        {/* ── LOOP: rotating headline words ── */}
                        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            <RotatingWords
                                words={['Our Services', 'Our Expertise', 'Our Craft', 'Our Vision']}
                                className="text-4xl md:text-5xl font-bold"
                            />
                        </motion.h2>
                    </div>
                    <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                        className="text-white/40 max-w-xs text-sm leading-relaxed">
                        Comprehensive design solutions for every need, crafted with precision.
                    </motion.p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 ${isPreview ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-px bg-white/5 rounded-2xl overflow-hidden`}>
                    {displayServices.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            className="group relative bg-neutral-950 p-8 hover:bg-[#0a1f16] transition-colors duration-500 cursor-default"
                        >
                            <span className="absolute top-6 right-6 text-6xl font-bold text-white/[0.03] select-none"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                {service.number}
                            </span>
                            <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-[#d4af37]/15 transition-colors duration-300">
                                <div className="text-[#d4af37]">{service.icon}</div>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500 rounded-full" />
                        </motion.div>
                    ))}
                </div>

                {isPreview && (
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="mt-12 text-center">
                        <Link to="/services"
                            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#c49f27] transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                            View All Services
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

/* ─── CONTACT SECTION ─────────────────────────────────────────────────────── */
export const ContactSection = () => {
    return (
        <section className="py-28 bg-[#040f0a] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#064e3b]/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/8 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        {/* ── LOOP: breathing label ── */}
                        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="inline-flex items-center gap-3 mb-6">
                            <PulsingLine />
                            <BreathingLabel>Get In Touch</BreathingLabel>
                        </motion.div>

                        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1]"
                            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                            Bringing vision<br />
                            {/* ── LOOP: shimmer ── */}
                            <GoldShimmer className="text-[#d4af37]">to reality.</GoldShimmer>
                        </motion.h2>

                        {/* ── LOOP: typewriter rotating phrases ── */}
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                            className="text-white/50 text-lg mb-10 min-h-[3rem] leading-relaxed">
                            <TypewriterLoop texts={[
                                'Every dream deserves a promise.',
                                'Let\'s discuss your vision today.',
                                'Your masterpiece starts here.',
                                'Let\'s build something extraordinary.',
                            ]} />
                        </motion.div>

                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                            className="flex flex-col gap-4">
                            {[
                                { icon: <Mail className="w-5 h-5" />, value: 'Handasiyan.2020@gmail.com' },
                                { icon: <Phone className="w-5 h-5" />, value: '+233 596 399 006' },
                            ].map((item, i) => (
                                <motion.div key={i}
                                    whileHover={{ x: 6 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-4 group cursor-default">
                                    <div className="p-3 bg-[#d4af37]/10 rounded-xl text-[#d4af37] group-hover:bg-[#d4af37]/20 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-white/70 group-hover:text-white transition-colors font-medium">
                                        {item.value}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 backdrop-blur-sm relative overflow-hidden">
                            {/* ── LOOP: sweeping top shimmer line ── */}
                            <motion.div
                                className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent"
                                style={{ width: '55%' }}
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.2 }}
                            />
                            <h3 className="text-2xl font-bold text-white mb-2"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Ready to start?
                            </h3>
                            <p className="text-white/40 text-sm mb-8">Let's create something extraordinary together.</p>
                            <Link to="/contact"
                                className="group flex items-center justify-center gap-2 w-full px-8 py-4 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#c49f27] transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(212,175,55,0.3)] text-lg">
                                Contact Us Now
                                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ─── CTA ─────────────────────────────────────────────────────────────────── */
export const CTA = () => {
    const ctaMarquee = [
        'Trust & Discipline', 'Lasting Results', 'Human Values', 'Bold Vision',
        'Precision Craft', 'Dream Spaces', 'Every Drawing', 'Is a Promise',
    ];

    return (
        <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
            <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/15 to-transparent pointer-events-none" />

            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
                {[...Array(8)].map((_, i) => (
                    <div key={i}
                        className="absolute h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-full"
                        style={{ top: `${10 + i * 12}%`, transform: `rotate(-5deg) scaleX(1.5)` }}
                    />
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                {/* ── LOOP: pulsing lines + breathing label ── */}
                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="inline-flex items-center gap-3 mb-8">
                    <PulsingLine delay={0} />
                    <BreathingLabel>Let's Begin</BreathingLabel>
                    <PulsingLine delay={0.6} />
                </motion.div>

                <motion.h2
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.05]"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                    Ready to build your<br />
                    {/* ── LOOP: shimmer on "dream" ── */}
                    <GoldShimmer className="text-[#d4af37] italic">dream</GoldShimmer>
                    {' '}with excellence?
                </motion.h2>

                {/* ── LOOP: infinite marquee strip ── */}
                <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    <MarqueeStrip items={ctaMarquee} />
                </motion.div>

                <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
                    className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link to="/contact"
                        className="group w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#c49f27] transition-all hover:scale-105 shadow-[0_0_50px_rgba(212,175,55,0.25)] text-lg">
                        Start Your Project
                        <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <a href="tel:+233596399006"
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-10 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all text-lg">
                        <Phone className="w-5 h-5 text-[#d4af37]" />
                        Call Us Today
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

const portfolioImages = [
    '/portfolio_images/Contemporary Style (1).jpeg',
    '/portfolio_images/Contemporary Style (3).jpeg',
    '/portfolio_images/Contemporary west African Style (1).jpeg',
    '/portfolio_images/Contemporary west African Style (3).jpeg',
    '/portfolio_images/Image 16-01-2026 at 12.24.png',
    '/portfolio_images/Modern Style (1).jpeg',
    '/portfolio_images/Modern Style (2).jpeg',
    '/portfolio_images/Modern Style .jpeg',
    '/portfolio_images/Scandinavian (1).jpeg',
    '/portfolio_images/Scandinavian (2).jpeg',
    '/portfolio_images/Scandinavian .jpeg',
    '/portfolio_images/Tropical Modern Luxury Style .jpeg',
    '/portfolio_images/Tropical Modern Luxury Style left side .jpeg',
    '/portfolio_images/Tropical Modern Luxury Style zoom out view.jpeg',
];

export const Portfolio = ({ isPreview = false }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    useEffect(() => {
        document.body.style.overflow = selectedImage ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    const displayImages = isPreview ? portfolioImages.slice(0, 6) : portfolioImages;

    return (
        <>
            <section className={`py-28 ${isPreview ? 'bg-neutral-950' : 'bg-black'} relative overflow-hidden`}>
                <div className="absolute right-0 bottom-0 w-[600px] h-[400px] bg-[#064e3b]/10 blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
                        <div>
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="inline-flex items-center gap-3 mb-4">
                                <span className="h-px w-12 bg-[#d4af37]/50" />
                                <span className="text-[#d4af37] font-semibold tracking-widest uppercase text-xs">Our Work</span>
                            </motion.div>
                            <motion.h2 variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold text-white"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                Featured <span className="text-[#d4af37] italic">Projects</span>
                            </motion.h2>
                        </div>

                        {isPreview && (
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <Link to="/portfolio"
                                    className="hidden md:flex items-center gap-2 text-[#d4af37] text-sm font-medium hover:gap-4 transition-all duration-300">
                                    View all projects <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* Masonry-style grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {displayImages.map((image, index) => (
                            <motion.div
                                key={index}
                                variants={scaleIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                custom={index % 6}
                                className={`group relative rounded-xl overflow-hidden cursor-pointer border border-white/5
                  ${index === 0 ? 'md:col-span-2 lg:col-span-1 aspect-[4/3]' : 'aspect-square'}
                `}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setSelectedImage(image)}
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.4 }}
                            >
                                <img
                                    src={image}
                                    alt={`Portfolio ${index + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Reveal overlay */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6"
                                >
                                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                                        <span>View Project</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </motion.div>

                                {/* Gold corner accent */}
                                <div className="absolute top-3 right-3 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute top-0 right-0 w-full h-0.5 bg-[#d4af37]" />
                                    <div className="absolute top-0 right-0 w-0.5 h-full bg-[#d4af37]" />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {isPreview && (
                        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="mt-12 text-center md:hidden">
                            <Link to="/portfolio"
                                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#c49f27] transition-all">
                                View all projects
                            </Link>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-md"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
                            className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50 hover:rotate-90 duration-300"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                            src={selectedImage}
                            alt="Enlarged view"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl relative z-40"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

/* ─── HOME PAGE ───────────────────────────────────────────────────────────── */
const HomePage = () => {
    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>
            <Hero />
            <About isPreview={true} />
            <Services isPreview={true} />
            <ContactSection />
            <CTA />
        </>
    );
};

export default HomePage;