import { Palette, ArrowRight, Ruler, X, Mail, Phone, ChevronLeft, ChevronRight, ChevronDown, Building2, HardHat, Briefcase, Layers, Hammer } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useInView } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { projects } from '../data/projects';


/**
 * GoldShimmer — continuous gold shimmer sweep, loops forever.
 */
const GoldShimmer = ({ children, className = '' }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
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
                    transition={{
                        duration: isMobile ? 3.5 : 2.6,
                        repeat: Infinity,
                        repeatDelay: isMobile ? 3 : 2,
                        ease: 'easeInOut'
                    }}
                />
            </motion.span>
        </span>
    );
};

/**
 * BreathingLabel — section labels that pulse letter-spacing & opacity forever.
 */
const BreathingLabel = ({ children, className = '' }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <motion.span
            className={`text-[#d4af37] font-semibold uppercase text-xs tracking-[0.22em] ${className}`}
            animate={isMobile ? {
                opacity: [0.7, 1, 0.7],
            } : {
                letterSpacing: ['0.22em', '0.33em', '0.22em'],
                opacity: [0.65, 1, 0.65],
            }}
            transition={{ duration: isMobile ? 4.5 : 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
            {children}
        </motion.span>
    );
};

/**
 * PulsingLine — a horizontal rule that breathes its width.
 */
const PulsingLine = ({ delay = 0 }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <motion.span
            className="block h-px bg-[#d4af37]/50"
            animate={isMobile ? {
                opacity: [0.4, 0.8, 0.4]
            } : {
                width: ['24px', '52px', '24px'],
                opacity: [0.35, 0.85, 0.35]
            }}
            transition={{ duration: isMobile ? 4 : 3.2, repeat: Infinity, ease: 'easeInOut', delay }}
            style={{ display: 'inline-block', width: isMobile ? '32px' : 'auto' }}
        />
    );
};

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
    const isMobile = useMediaQuery('(max-width: 1024px)');

    useEffect(() => {
        if (isPaused) return;
        const current = texts[textIdx];
        const speed = isDeleting ? (isMobile ? 50 : 36) : (isMobile ? 100 : 65);

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                const next = current.slice(0, display.length + 1);
                setDisplay(next);
                if (next === current) {
                    setIsPaused(true);
                    setTimeout(() => { setIsPaused(false); setIsDeleting(true); }, isMobile ? 2200 : 1600);
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
    }, [display, isDeleting, isPaused, textIdx, texts, isMobile]);

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
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
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
    const y = useTransform(scrollYProgress, [0, 1], ['-4%', '2%']); // Reduced parallax range and shifted up initially to avoid overlap
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.15]); // Slightly increased scale to cover the y-shift

    // Fade out scroll indicator almost immediately on scroll
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Parallax Video BG */}
            <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
                {/* Blurred background fill — shows behind letterbox areas on mobile/tablet */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-90 lg:hidden"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                {/* Main video — object-contain on mobile/tablet, object-cover on desktop */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/src/assets/hero-bg.avif"
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-contain lg:object-cover"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80 z-10" />
                <div className="absolute inset-0 bg-black/15 z-[5]" />
            </motion.div>

            {/* Grain */}
            <div className="absolute inset-0 z-[6] opacity-[0.035] pointer-events-none overflow-hidden"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px',
                }}
            />


            {/* Content Overlay */}
            <div className="relative z-20 flex flex-col items-center gap-0 px-6 mt-[-5vh] sm:mt-0">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-center justify-center pointer-events-none"
                >
                </motion.div>
            </div>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                className="absolute bottom-20 sm:bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-20 scale-90 md:scale-100"
            >
                <motion.div
                    style={{ opacity: indicatorOpacity }}
                    className="flex flex-col items-center gap-1 md:gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex flex-col items-center gap-1"
                    >
                        <span className="text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] font-medium uppercase">Scroll to Explore</span>
                        <div className="w-px h-8 md:h-10 bg-gradient-to-b from-[#d4af37] to-transparent" />
                        <ChevronDown className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#d4af37]/60" />
                    </motion.div>
                </motion.div>
            </motion.div>


        </section>
    );
};

/* ─── ABOUT ───────────────────────────────────────────────────────────────── */
export const About = ({ isPreview = false }) => {
    return (
        <section className="py-28 bg-[#061e15] relative overflow-hidden">
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
    { icon: <Building2 className="w-6 h-6" />, title: 'Architectural Design', description: 'Innovative architectural solutions tailored to your vision and functional needs.', number: '01', category: 'Architectural Design' },
    { icon: <Palette className="w-6 h-6" />, title: 'Interior Design', description: 'Creating harmonious and aesthetically pleasing interiors that reflect your personality.', number: '02', category: 'Interior Design' },
    { icon: <HardHat className="w-6 h-6" />, title: 'Construction & Build Management', description: 'Overseeing every aspect of construction to ensure quality and timely delivery.', number: '03', category: 'Full Design' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Project Management & Supervision', description: 'Expert coordination and oversight of your project from conception to completion.', number: '04', category: 'Full Design' },
    { icon: <Layers className="w-6 h-6" />, title: '3D Visualization & Concept Design', description: 'Stunning 3D renderings and conceptual designs to help you visualize your space.', number: '05', category: 'Full Design' },
    { icon: <Ruler className="w-6 h-6" />, title: 'Custom Furniture & Joinery', description: 'Bespoke furniture and joinery solutions crafted to perfection for your unique space.', number: '06', category: 'Full Design' },
    { icon: <Hammer className="w-6 h-6" />, title: 'Renovation & Remodeling', description: 'Transforming existing spaces into modern masterpieces through expert renovation.', number: '07', category: 'Full Design' },
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
                            whileTap={{ scale: 0.98 }}
                            className={`group relative bg-neutral-950 hover:bg-[#0a1f16] active:bg-[#0a1f16] transition-colors duration-500 cursor-pointer ${!isPreview && i === 6 ? 'md:col-span-2' : ''}`}
                        >
                            <Link to={`/portfolio?category=${encodeURIComponent(service.category)}#projects-section`} className="block w-full h-full p-8 focus:outline-none">
                                <span className="absolute top-6 right-6 text-6xl font-bold text-white/[0.03] select-none pointer-events-none"
                                    style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                                    {service.number}
                                </span>
                                <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:bg-[#d4af37]/15 transition-colors duration-300 pointer-events-none">
                                    <div className="text-[#d4af37]">{service.icon}</div>
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#d4af37] transition-colors duration-300">
                                    {service.title}
                                </h3>
                                <p className="text-white/40 text-sm leading-relaxed">{service.description}</p>
                            </Link>
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#d4af37] group-hover:w-full transition-all duration-500 rounded-full pointer-events-none" />
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
        <section className="py-28 bg-[#061e15] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#064e3b]/30 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#d4af37]/8 rounded-full blur-[100px]" />
                {/* Wavy Pattern Consistency */}
                <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
                    {[...Array(6)].map((_, i) => (
                        <div key={i}
                            className="absolute h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent w-full"
                            style={{ top: `${15 + i * 15}%`, transform: `rotate(3deg) scaleX(1.5)` }}
                        />
                    ))}
                </div>
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

export function ProjectCard({ project, index, onOpen, layout = 'grid' }) {
    const [hovered, setHovered] = useState(false);
    const [[page, direction], setPage] = useState([0, 0]);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { margin: "-10%", once: false });

    // Parallax scroll effect on the inner image
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

    const images = useMemo(
        () =>
            Array.from(
                { length: project.imageCount },
                (_, i) => `${project.folder}/image-${i + 1}.webp`
            ),
        [project]
    );

    const imageIndex = Math.abs(page % images.length);

    const paginate = useCallback(
        (newDirection) => setPage([page + newDirection, newDirection]),
        [page]
    );

    // Auto-swipe every 3 s, only if hovered (desktop only)
    useEffect(() => {
        if (images.length <= 1) return;

        // On mobile/tablet, we disable auto-swipe to prevent multiple cards swiping at once.
        // We only enable it on desktop when the user hovers over a card.
        const shouldAutoSwipe = !isMobile && !isTablet && hovered;

        if (!shouldAutoSwipe) return;

        const id = setInterval(() => paginate(1), 3000);
        return () => clearInterval(id);
    }, [hovered, isMobile, isTablet, images.length, paginate]);

    // Keyboard navigation when hovered
    useEffect(() => {
        if (!hovered || images.length <= 1) return;
        const handleKeys = (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); paginate(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); paginate(-1); }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [hovered, images.length, paginate]);

    // Slide variants
    const swipeVariants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (dir) => ({ zIndex: 0, x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
    };

    const swipePower = (offset, velocity) => Math.abs(offset) * velocity;
    const swipeConfidenceThreshold = 10000;

    const paddedIndex = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            ref={cardRef}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={index % 4}
            className="group relative w-full overflow-hidden rounded-2xl"
            style={{
                aspectRatio: isMobile ? '1 / 1.15' : (isTablet ? '16 / 9' : '16 / 6.5'),
                boxShadow: isMobile ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onOpen(project)}
        >
            {/* ── Full-bleed image with subtle parallax ── */}
            <div className="absolute inset-0 w-full h-full overflow-hidden touch-pan-y">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={swipeVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);
                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                        }}
                        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                    >
                        <motion.img
                            src={images[imageIndex]}
                            alt={project.style}
                            loading="lazy"
                            style={{ y: imageY }}
                            className="w-full h-[115%] object-cover object-center -translate-y-[7.5%]"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ── Scale overlay on hover ── */}
            <motion.div
                //className="absolute inset-0 bg-black/20 z-[2]"
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />

            {/* ── Permanent bottom gradient scrim ── */}
            <div className="absolute inset-0 z-[3] pointer-events-none"
                style={{
                    background:
                        'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.35) 45%, transparent 100%)',
                }}
            />

            {/* ── Top-left: project index badge ── */}
            <div className="absolute top-6 left-7 z-10 flex items-center gap-2.5">
                <span
                    className="text-[11px] font-bold tracking-[0.25em] uppercase"
                    style={{ color: '#d4af37' }}
                >
                    {paddedIndex}
                </span>

            </div>

            {/* ── Top-right: image counter dots ── */}
            {images.length > 1 && (
                <div className="absolute top-6 right-7 z-10 flex items-center gap-1.5">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setPage([i, i > imageIndex ? 1 : -1]); }}
                            className="rounded-full transition-all duration-300 focus:outline-none"
                            style={{
                                width: i === imageIndex ? '20px' : '6px',
                                height: '6px',
                                background: i === imageIndex ? '#d4af37' : 'rgba(255,255,255,0.35)',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* ── Bottom content ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-6 sm:px-8 pb-6 sm:pb-8 pt-14 flex items-end justify-between">
                {/* Title + subtitle */}
                <div className="flex flex-col gap-0.5">
                    <motion.h3
                        className="text-white font-bold leading-tight"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: isMobile ? '1.85rem' : 'clamp(1.5rem, 3vw, 2.25rem)',
                        }}
                        animate={{ y: hovered ? -4 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {project.style}
                    </motion.h3>

                </div>
            </div>
        </motion.div>
    );
}


export const Portfolio = ({ isPreview = false }) => {
    const [lightbox, setLightbox] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');

    const [activeCategory, setActiveCategory] = useState(categoryFilter || 'Full Design');
    const [hoveredCategory, setHoveredCategory] = useState(null);

    const scrollContainerRef = useRef(null);

    const CATEGORIES_DATA = [
        { id: 'Full Design' },
        { id: 'Architectural Design' },
        { id: 'Interior Design' },
    ];

    useEffect(() => {
        if (categoryFilter) setActiveCategory(categoryFilter);
    }, [categoryFilter]);

    useEffect(() => {
        scrollContainerRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, [activeCategory]);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [lightbox]);

    const allProjects = [...projects].reverse();
    const filteredProjects = allProjects.filter(p => p.category === activeCategory);
    const displayProjects = isPreview ? filteredProjects.slice(0, 3) : filteredProjects;

    return (
        <>
            <section
                id="projects-section"
                className={`py-28 ${isPreview ? 'bg-neutral-950' : 'bg-black'} relative overflow-hidden`}
            >
                {/* Ambient glow */}
                <div className="absolute right-0 bottom-0 w-[600px] h-[400px] bg-[#064e3b]/10 blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* ── Header ── */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                        <div>
                            <motion.div
                                variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="inline-flex items-center gap-3 mb-4"
                            >
                                <span className="h-px w-12 bg-[#d4af37]/50" />
                                <span className="text-[#d4af37] font-semibold tracking-widest uppercase text-xs">
                                    Our Work
                                </span>
                            </motion.div>
                            <motion.h2
                                variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-bold text-white"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Featured <span className="text-[#d4af37] italic">Projects</span>
                            </motion.h2>
                        </div>

                        {isPreview && (
                            <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <Link
                                    to="/portfolio"
                                    className="hidden md:flex items-center gap-2 text-[#d4af37] text-sm font-medium hover:gap-4 transition-all duration-300"
                                >
                                    View all projects <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* ── Category Filter (full page only) ── */}
                    {!isPreview && (
                        <motion.div
                            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="w-full mb-14"
                        >
                            <div className="w-full h-px bg-white/10 mb-6" />
                            <div className="flex flex-wrap items-start gap-x-10 md:gap-x-14 gap-y-4">
                                {CATEGORIES_DATA.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="relative transition-all duration-500"
                                        onMouseEnter={() => setHoveredCategory(cat.id)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                    >
                                        <button
                                            onClick={() => {
                                                setActiveCategory(cat.id);
                                                setSearchParams({ category: cat.id });
                                            }}
                                            className={`text-lg md:text-xl font-semibold transition-all duration-700 text-left block mb-2 tracking-tight ${activeCategory === cat.id
                                                ? 'text-white blur-0 opacity-100'
                                                : hoveredCategory === cat.id
                                                    ? 'text-white blur-0 opacity-90 cursor-pointer'
                                                    : 'text-white blur-[1px] opacity-40 cursor-pointer'
                                                }`}
                                        >
                                            {cat.id}
                                        </button>

                                        <AnimatePresence mode="wait">
                                            {activeCategory === cat.id && cat.desc && (
                                                <motion.p
                                                    key={cat.id}
                                                    initial={{ opacity: 0, y: 5, filter: 'blur(5px)' }}
                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, y: -5, filter: 'blur(5px)' }}
                                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                                    className="text-white/40 text-sm leading-relaxed max-w-xs font-light absolute top-full left-0 pt-2"
                                                >
                                                    {cat.desc}
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ── Project List — always stacked vertically ── */}
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-col gap-12 w-full pt-2"
                    >
                        {displayProjects.map((project, index) => (
                            <ProjectCard
                                key={project.name}
                                project={project}
                                index={index}
                                onOpen={setLightbox}
                                layout="list"
                            />
                        ))}
                    </div>

                </div>
            </section>

            {/* ── Lightbox Modal - Rendered outside section for better stacking ── */}
            <AnimatePresence>
                {lightbox && (
                    <LightboxModal
                        project={lightbox}
                        onClose={() => setLightbox(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

/**
 * LightboxModal Component
 * Extracted for cleaner state management of the image index
 */
const LightboxModal = ({ project, onClose }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const images = Array.from(
        { length: project.imageCount },
        (_, i) => `${project.folder}/image-${i + 1}.webp`
    );

    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');

    const handlePrev = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center p-4 md:p-12 overflow-hidden"
            style={{
                background: 'rgba(0,0,0,0.98)',
                backdropFilter: 'blur(20px)'
            }}
            onClick={onClose}
        >

            {/* Desktop Navigation Arrows (Side) */}
            {images.length > 1 && !isMobile && !isTablet && (
                <>
                    <button
                        onClick={handlePrev}
                        className="fixed left-6 md:left-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#d4af37] bg-black/40 hover:bg-black/60 rounded-full p-4 transition-all duration-300 z-[10000] focus:outline-none"
                    >
                        <ChevronLeft className="w-8 h-8 cursor-pointer md:w-10 md:h-10" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#d4af37] bg-black/40 hover:bg-black/60 rounded-full p-4 transition-all duration-300 z-[10000] focus:outline-none"
                    >
                        <ChevronRight className="w-8 h-8 cursor-pointer md:w-10 md:h-10" />
                    </button>
                </>
            )}

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.05, opacity: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 35 }}
                className="relative w-full h-full flex flex-col items-center justify-center gap-6"
                onClick={e => e.stopPropagation()}
            >
                {/* Main Image Container */}
                <div className="flex-1 w-full flex items-center justify-center p-4 pointer-events-none min-h-0">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            src={images[activeIndex]}
                            alt={project.style}
                            className="mt-20 max-w-full max-h-full object-contain rounded-lg shadow-[0_30px_90px_rgba(0,0,0,0.8)] pointer-events-auto"
                        />
                    </AnimatePresence>
                </div>

                {/* Mobile/Tablet Navigation Arrows (Under Image) */}
                {images.length > 1 && (isMobile || isTablet) && (
                    <div className="flex items-center gap-12 pb-6">
                        <button
                            onClick={handlePrev}
                            className="text-white/40 hover:text-[#d4af37] bg-white/5 hover:bg-white/10 rounded-full p-5 transition-all duration-300 border border-white/5 focus:outline-none"
                        >
                            <ChevronLeft className="w-7 h-7" />
                        </button>

                        {/* Image Counter */}
                        <span className="text-white/40 text-sm font-medium tracking-widest uppercase">
                            {activeIndex + 1} / {images.length}
                        </span>

                        <button
                            onClick={handleNext}
                            className="text-white/40 hover:text-[#d4af37] bg-white/5 hover:bg-white/10 rounded-full p-5 transition-all duration-300 border border-white/5 focus:outline-none"
                        >
                            <ChevronRight className="w-7 h-7" />
                        </button>
                    </div>
                )}
            </motion.div>

            {/* Close Button - Positioned absolutely within the fixed inset-0 modal */}
            <button
                onClick={onClose}
                className="cursor-pointer absolute top-5 right-5 md:top-8 md:right-8 text-white/70 hover:text-[#d4af37] bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-2.5 transition-all duration-300 z-[100010] border border-white/10 focus:outline-none"
                aria-label="Close modal"
            >
                <X className="w-6 h-6" />
            </button>
        </motion.div>
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
            <Portfolio isPreview={true} />
            <ContactSection />
            <CTA />
        </>
    );
};

export default HomePage;