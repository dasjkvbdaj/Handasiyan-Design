import { Palette, ArrowRight, Ruler, X, Mail, Phone, ChevronLeft, ChevronRight, ChevronDown, Building2, HardHat, Briefcase, Layers, Hammer, Zap, Globe, Eye } from 'lucide-react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useRef, useState, useEffect, useCallback, useMemo, useTransition } from 'react';
import { useScroll, useTransform, motion, AnimatePresence, useInView } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { useSEO } from '../hooks/useSEO';


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
    const videoRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['-4%', '2%']); // Reduced parallax range and shifted up initially to avoid overlap
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.15]); // Slightly increased scale to cover the y-shift

    // Fade out scroll indicator almost immediately on scroll
    const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Explicitly set muted properties to ensure autoplay works on stricter browsers (e.g. Safari)
        video.defaultMuted = true;
        video.muted = true;

        const attemptPlay = () => {
            if (video.paused) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => console.log('Video play interrupted:', error));
                }
            }
        };

        // Try playing immediately
        attemptPlay();

        // Resume if tab becomes visible
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                attemptPlay();

            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <section ref={ref} className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Parallax Video BG */}
            <motion.div style={{ y, scale, opacity }} className="absolute inset-0 z-0">
                {/* Blurred background fill — shows behind letterbox areas on mobile/tablet */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    title="Handasiyan Architectural Design - Showcasing our vision and craft"
                    className="absolute min-w-full min-h-full object-cover"
                    onPause={(e) => {
                        if (!document.hidden) {
                            e.target.play().catch(() => { });
                        }
                    }}
                >
                    <source src="/video.mp4" type="video/mp4" />

                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/5 to-black/80 z-10" />
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
            <h1 className="sr-only">Handasiyan | Expert Architecture & Interior Design</h1>
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
    { icon: <Globe className="w-6 h-6" />, title: 'Civil Engineering', description: 'Comprehensive civil engineering services for infrastructure and development projects.', number: '01', category: 'Civil Engineering' },
    { icon: <Building2 className="w-6 h-6" />, title: 'Architectural Design', description: 'Innovative architectural solutions tailored to your vision and functional needs.', number: '02', category: 'Architectural Design' },
    { icon: <Palette className="w-6 h-6" />, title: 'Interior Design', description: 'Creating harmonious and aesthetically pleasing interiors that reflect your personality.', number: '03', category: 'Interior Design' },
    { icon: <Zap className="w-6 h-6" />, title: 'Electrical & Mechanical Engineering (MEP)', description: 'Expert MEP solutions ensuring efficient and integrated building systems.', number: '04', category: 'Mechanical and Electrical Engineering' },
    { icon: <Layers className="w-6 h-6" />, title: '3D Visualization & Concept Design', description: 'Stunning 3D renderings and conceptual designs to help you visualize your space.', number: '05', category: 'Full Design' },
    { icon: <HardHat className="w-6 h-6" />, title: 'Construction & Build Management', description: 'Overseeing every aspect of construction to ensure quality and timely delivery.', number: '06', category: 'Full Design' },
    { icon: <Ruler className="w-6 h-6" />, title: 'Custom Furniture & Joinery', description: 'Bespoke furniture and joinery solutions crafted to perfection for your unique space.', number: '07', category: 'Full Design' },
    { icon: <Briefcase className="w-6 h-6" />, title: 'Project Management & Supervision', description: 'Expert coordination and oversight of your project from conception to completion.', number: '08', category: 'Full Design' },
    { icon: <Hammer className="w-6 h-6" />, title: 'Renovation & Remodeling', description: 'Transforming existing spaces into modern masterpieces through expert renovation.', number: '09', category: 'Full Design' },
];

export const Services = ({ isPreview = false }) => {
    const displayServices = isPreview ? services.slice(0, 4) : services;

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

                <div className={`grid grid-cols-1 md:grid-cols-2 ${isPreview ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-px bg-white/5 rounded-2xl overflow-hidden`}>
                    {displayServices.map((service, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            whileTap={{ scale: 0.98 }}
                            className="group relative bg-neutral-950 hover:bg-[#0a1f16] active:bg-[#0a1f16] transition-colors duration-500 cursor-pointer"
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
                                { icon: <Mail className="w-5 h-5" />, value: 'Handasiyan.2020@gmail.com', href: 'mailto:Handasiyan.2020@gmail.com' },
                                { icon: <Phone className="w-5 h-5" />, value: '+233 596 399 006', href: 'tel:+233596399006' },
                            ].map((item, i) => (
                                <motion.a key={i}
                                    href={item.href}
                                    whileHover={{ x: 6 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex items-center gap-4 group cursor-pointer no-underline">
                                    <div className="p-3 bg-[#d4af37]/10 rounded-xl text-[#d4af37] group-hover:bg-[#d4af37]/20 transition-colors">
                                        {item.icon}
                                    </div>
                                    <span className="text-white/70 group-hover:text-white transition-colors font-medium">
                                        {item.value}
                                    </span>
                                </motion.a>
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

export function ProjectCard({ project, index, onOpen, layout = 'grid', isPreview = false }) {
    const [hovered, setHovered] = useState(false);
    const [[page, direction], setPage] = useState([0, 0]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const cardRef = useRef(null);
    const slideRef = useRef(null);
    const touchRef = useRef({ startX: 0, startY: 0, startTime: 0, currentX: 0, isDragging: false, rafId: null, isScrolling: null });

    // Reset pagination when project changes to prevent state bleeding between reused cards
    useEffect(() => {
        setPage([0, 0]);
    }, [project.id]);

    // Parallax scroll effect on the inner image — SKIP on mobile/tablet to avoid idle scroll listeners
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ['start end', 'end start'],
    });
    const imageY = useTransform(scrollYProgress, [0, 1], (isMobile || isTablet) ? ['0%', '0%'] : ['0%', '12%']);

    const images = useMemo(() => {
        // Optimized params — balance between quality and load speed
        const params = isMobile
            ? 'c_limit,w_800,f_auto,q_auto'
            : (isTablet
                ? 'c_limit,w_1200,f_auto,q_auto'
                : 'c_limit,w_1600,f_auto,q_auto');

        const baseUrl = `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${params}`;

        // New dynamic projects (Firestore Public IDs)
        if (project.images) {
            return project.images.map(id => `${baseUrl}/${id}`);
        }

        // 3. Fallback for static/legacy projects (Folder-based)
        if (project.imageUrls) {
            return project.imageUrls.map(img => img.url);
        }

        return Array.from(
            { length: project.imageCount },
            (_, i) => `${baseUrl}/${project.folder}/image-${i + 1}.png?_v=${__BUILD_TIMESTAMP__}`
        );
    }, [project, isMobile, isTablet]);

    const imageIndex = Math.abs(page % images.length);

    // When hovered, preload ALL remaining images so swiping is instant
    // We disable this on mobile to prevent main-thread jank during touch-start
    useEffect(() => {
        if (isMobile || !hovered || imagesLoaded || images.length <= 1) return;

        let loadedCount = 0;
        let isCancelled = false;

        const checkDone = () => {
            if (isCancelled) return;
            loadedCount++;
            if (loadedCount === images.length) {
                setImagesLoaded(true);
            }
        };

        images.forEach((src) => {
            const img = new Image();
            img.onload = checkDone;
            img.onerror = checkDone;
            img.src = src;
            if (img.complete) {
                img.onload = null;
                img.onerror = null;
                checkDone();
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [hovered, images, imagesLoaded, isMobile]);

    // Prefetch the NEXT image in the sequence while the current one is displayed
    // Only prefetch one at a time on mobile to stay efficient
    useEffect(() => {
        if (isMobile) {
            // On mobile, prefetch neighbors silently via idle callback
            if (images.length <= 1) return;
            const prefetch = () => {
                const nextIdx = Math.abs((page + 1) % images.length);
                const img = new Image();
                img.src = images[nextIdx];
            };
            const id = typeof requestIdleCallback !== 'undefined'
                ? requestIdleCallback(prefetch)
                : setTimeout(prefetch, 100);
            return () => {
                typeof cancelIdleCallback !== 'undefined' ? cancelIdleCallback(id) : clearTimeout(id);
            };
        }
        if (!hovered || images.length <= 1) return;
        const nextIndex = Math.abs((page + 1) % images.length);
        const img = new Image();
        img.src = images[nextIndex];
    }, [hovered, page, images, isMobile]);

    const paginate = useCallback(
        (newDirection) => setPage([page + newDirection, newDirection]),
        [page]
    );

    // Auto-swipe every 3 s, only if hovered (desktop only)
    useEffect(() => {
        if (images.length <= 1) return;

        // On mobile/tablet, we disable auto-swipe to prevent multiple cards swiping at once.
        // We only enable it on desktop when the user hovers over a card.
        const shouldAutoSwipe = !isMobile && !isTablet && hovered && imagesLoaded;

        if (!shouldAutoSwipe) return;

        const id = setInterval(() => paginate(1), 3000);
        return () => clearInterval(id);
    }, [hovered, isMobile, isTablet, images.length, paginate, imagesLoaded]);

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

    /* ── HIGH-PERFORMANCE TOUCH HANDLER (mobile only) ─────────────────────
     * Bypasses React/Framer-Motion reconciliation during the gesture.
     * Writes directly to the DOM via translate3d on rAF, giving true 60fps.
     * Falls back to Framer Motion drag on desktop.
     */
    useEffect(() => {
        if (!isMobile || images.length <= 1) return;
        const el = slideRef.current;
        if (!el) return;

        const t = touchRef.current;

        const onTouchStart = (e) => {
            // Cancel any lingering rAF
            if (t.rafId) { cancelAnimationFrame(t.rafId); t.rafId = null; }
            const touch = e.touches[0];
            t.startX = touch.clientX;
            t.startY = touch.clientY;
            t.currentX = 0;
            t.startTime = Date.now();
            t.isDragging = true;
            t.isScrolling = null; // will be decided on first move
            el.style.transition = 'none'; // kill CSS transition during drag
        };

        const applyTransform = () => {
            el.style.transform = `translate3d(${t.currentX}px, 0, 0)`;
            t.rafId = null;
        };

        const onTouchMove = (e) => {
            if (!t.isDragging) return;
            const touch = e.touches[0];
            const dx = touch.clientX - t.startX;
            const dy = touch.clientY - t.startY;

            // Determine scroll direction on first significant move
            if (t.isScrolling === null) {
                if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5) {
                    // Vertical scroll — bail out and let the browser scroll
                    t.isScrolling = true;
                    t.isDragging = false;
                    el.style.transform = 'translate3d(0,0,0)';
                    el.style.transition = '';
                    return;
                } else if (Math.abs(dx) > 5) {
                    t.isScrolling = false;
                }
            }

            if (t.isScrolling) return;

            // Horizontal swipe detected — prevent scroll
            e.preventDefault();

            // Apply elastic resistance at edges  (0.35 damping)
            const elasticDx = dx * 0.45;
            t.currentX = elasticDx;
            // Batch the DOM write into rAF
            if (!t.rafId) {
                t.rafId = requestAnimationFrame(applyTransform);
            }
        };

        const onTouchEnd = () => {
            if (!t.isDragging && t.isScrolling !== false) return;
            t.isDragging = false;
            if (t.rafId) { cancelAnimationFrame(t.rafId); t.rafId = null; }

            const dx = t.currentX;
            const elapsed = Date.now() - t.startTime;
            const velocity = Math.abs(dx) / (elapsed || 1); // px/ms

            // Snap with a CSS transition for the settle animation
            el.style.transition = 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)';

            const swipeThreshold = 30;
            const velocityThreshold = 0.35; // px/ms

            if (dx < -swipeThreshold || velocity > velocityThreshold && dx < 0) {
                // Slide out left then paginate
                el.style.transform = 'translate3d(-100%, 0, 0)';
                setTimeout(() => { paginate(1); el.style.transition = 'none'; el.style.transform = 'translate3d(0,0,0)'; }, 280);
            } else if (dx > swipeThreshold || velocity > velocityThreshold && dx > 0) {
                // Slide out right then paginate
                el.style.transform = 'translate3d(100%, 0, 0)';
                setTimeout(() => { paginate(-1); el.style.transition = 'none'; el.style.transform = 'translate3d(0,0,0)'; }, 280);
            } else {
                // Snap back
                el.style.transform = 'translate3d(0, 0, 0)';
            }
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
        el.addEventListener('touchcancel', onTouchEnd, { passive: true });

        return () => {
            if (t.rafId) cancelAnimationFrame(t.rafId);
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('touchcancel', onTouchEnd);
        };
    }, [isMobile, images.length, paginate]);

    // Slide variants (used only on desktop where drag="x" is active)
    const swipeVariants = {
        enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (dir) => ({ zIndex: 0, x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
    };

    const paddedIndex = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            ref={cardRef}
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            custom={index % 4}
            className="group relative w-full overflow-hidden bg-transparent"
            style={{
                aspectRatio: isMobile ? '16 / 9' : (isTablet ? '16 / 9' : '16 / 6.5'),
                boxShadow: 'none',
                width: '100%'
            }}

            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* ── Full-bleed image ── */}
            <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ touchAction: 'pan-y' }}>
                {isMobile ? (
                    /* MOBILE: Static image + raw touch handler for 60fps swipes */
                    <div
                        ref={slideRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
                    >
                        <img
                            src={images[imageIndex]}
                            alt={`${project.style} - ${project.category} project by Handasiyan`}
                            loading={imageIndex === 0 ? 'eager' : 'lazy'}
                            fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
                            sizes={project.images ? 'auto' : undefined}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            style={{
                                WebkitTouchCallout: 'none',
                                WebkitUserSelect: 'none',
                                userSelect: 'none'
                            }}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                ) : (
                    /* DESKTOP: Framer Motion drag with AnimatePresence */
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
                            dragElastic={0.8}
                            onDragEnd={(e, { offset, velocity }) => {
                                if (offset.x < -30 || velocity.x < -300) {
                                    paginate(1);
                                } else if (offset.x > 30 || velocity.x > 300) {
                                    paginate(-1);
                                }
                            }}
                            transition={{
                                x: { type: 'spring', stiffness: 450, damping: 35 },
                                opacity: { duration: 0.2 },
                            }}
                            className="absolute inset-0 w-full h-full"
                            style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
                        >
                            <motion.img
                                src={images[imageIndex]}
                                alt={`${project.style} - ${project.category} project view`}
                                loading={imageIndex === 0 ? 'eager' : 'lazy'}
                                fetchPriority={imageIndex === 0 ? 'high' : 'auto'}
                                sizes={project.images ? 'auto' : undefined}
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{
                                    y: imageY,
                                    WebkitTouchCallout: 'none',
                                    WebkitUserSelect: 'none',
                                    userSelect: 'none'
                                }}
                                className="w-full h-[115%] object-cover -translate-y-[7.5%] object-center"
                            />
                        </motion.div>
                    </AnimatePresence>
                )}
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
            {/* <div className="absolute top-6 left-7 z-10 flex items-center gap-2.5">
                <span
                    className="text-[11px] font-bold tracking-[0.25em] uppercase"
                    style={{ color: '#d4af37' }}
                >
                    {paddedIndex}
                </span>

            </div> */}

            {/* ── Top-right: image counter badge ── */}
            {images.length > 1 && (
                <div className="absolute top-6 right-7 z-10 flex items-center">
                    <div className="relative bg-black/40 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
                        <span className="text-[10px] font-bold text-[#d4af37] tabular-nums">
                            {imageIndex + 1}
                        </span>
                        <span className="text-[10px] text-white/30">/</span>
                        <span className="text-[10px] text-white/40 tabular-nums">
                            {images.length}
                        </span>
                    </div>
                </div>
            )}

            {/* ── Bottom content ── */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-5 sm:pb-8 pt-14 flex items-end justify-between">
                {/* Title + subtitle */}
                <div className="flex flex-col gap-1 pr-4">
                    {isPreview && (
                        <motion.span
                            className="text-[#d4af37] text-[9px] md:text-xs uppercase tracking-[0.3em] font-bold"
                            animate={{ opacity: hovered ? 1 : 0.8 }}
                        >
                            {project.category}
                        </motion.span>
                    )}
                    <motion.h3
                        className="text-white font-bold leading-tight"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: isMobile ? '1rem' : 'clamp(1rem, 2vw, 1.6rem)',
                        }}
                        animate={{ y: hovered ? -4 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {project.style}
                    </motion.h3>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    {/* Quick View (Lightbox) */}
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); onOpen(project); }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group cursor-pointer flex items-center justify-center gap-1 bg-black/40 backdrop-blur-md border border-white/20 text-white font-bold rounded-full tracking-wider uppercase transition-all hover:bg-white/20 ${isMobile ? 'px-2.5 py-1.5' : 'px-6 py-3.5 text-xs'}`}
                    >
                        <Eye className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} text-[#d4af37]`} />
                        <span className={`${isMobile ? 'text-[8px]' : 'text-[10px]'} leading-none`}>
                            {isMobile ? 'Images' : 'View Project'}
                        </span>
                    </motion.button>

                    {/* Detailed Page Link — Only on Homepage */}
                    {isPreview && (
                        <Link
                            to={`/portfolio?category=${encodeURIComponent(project.category)}#projects-section`}
                            className={`group cursor-pointer flex items-center justify-center gap-1 bg-[#d4af37] text-black font-bold rounded-full tracking-wider uppercase transition-all hover:bg-[#c49f27] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.25)] ${isMobile ? 'px-2.5 py-1.5' : 'px-8 py-3.5 text-sm'}`}
                        >
                            <span className={`${isMobile ? 'text-[8px]' : 'text-xs'} leading-none`}>
                                {isMobile ? 'Explore' : 'View More'}
                            </span>
                            <ArrowRight className={`${isMobile ? 'w-3 h-3' : 'w-5 h-5'} transition-transform duration-300 group-hover:translate-x-1`} />
                        </Link>
                    )}
                </div>
            </div>

        </motion.div>
    );
}


export const Portfolio = ({ isPreview = false }) => {
    const [lightbox, setLightbox] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');

    const [activeCategory, setActiveCategory] = useState(categoryFilter || '');
    const [dynamicProjects, setDynamicProjects] = useState([]);

    useEffect(() => {
        const fetchDynamicProjects = async () => {
            try {
                const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setDynamicProjects(projectsData);
            } catch (err) {
                console.error("Error fetching dynamic projects:", err);
            }
        };
        fetchDynamicProjects();
    }, []);

    const allProjects = dynamicProjects;
    const [hoveredCategory, setHoveredCategory] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [isChangingCategory, setIsChangingCategory] = useState(false);

    const scrollContainerRef = useRef(null);

    const CATEGORIES_DATA = useMemo(() => {
        const preferredOrder = ["Full Design", "Architectural Design", "Interior Design"];
        const uniqueCategories = Array.from(new Set(dynamicProjects.map(p => p.category)))
            .filter(Boolean)
            .sort((a, b) => {
                const idxA = preferredOrder.indexOf(a);
                const idxB = preferredOrder.indexOf(b);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a.localeCompare(b);
            });
        return uniqueCategories.map(cat => ({ id: cat }));
    }, [dynamicProjects]);

    useEffect(() => {
        if (!activeCategory && CATEGORIES_DATA.length > 0) {
            setActiveCategory(CATEGORIES_DATA[0].id);
        }
    }, [CATEGORIES_DATA, activeCategory]);

    useEffect(() => {
        if (categoryFilter) {
            setActiveCategory(categoryFilter);
        }
    }, [categoryFilter]);

    useEffect(() => {
        document.body.style.overflow = lightbox ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [lightbox]);

    const loadNextCategory = useCallback(() => {
        if (isChangingCategory) return;

        const currentIndex = CATEGORIES_DATA.findIndex(c => c.id === activeCategory);
        
        // Find the next category in sequence (looping back to index 0 if at the end)
        const nextIndex = (currentIndex + 1) % CATEGORIES_DATA.length;
        const nextCatId = CATEGORIES_DATA[nextIndex].id;

        setIsChangingCategory(true);
        setActiveCategory(nextCatId);

        startTransition(() => {
            setSearchParams({ category: nextCatId }, { replace: true });
        });

        // Forced scroll to top of projects section
        const element = document.getElementById('projects-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }

        setTimeout(() => {
            setIsChangingCategory(false);
        }, 800);
    }, [activeCategory, CATEGORIES_DATA, isChangingCategory, setSearchParams, startTransition]);



    // Calculate the next available category with projects
    const nextCategory = useMemo(() => {
        const currentIndex = CATEGORIES_DATA.findIndex(c => c.id === activeCategory);
        const nextIndex = (currentIndex + 1) % CATEGORIES_DATA.length;
        return CATEGORIES_DATA[nextIndex];
    }, [activeCategory, CATEGORIES_DATA]);

    const displayProjects = useMemo(() => {
        if (isPreview) {
            // Show only the specific featured projects for the homepage
            const featuredIds = ['nonOgyUnirP28WBdStIc', 'yxi1la7vgdXunavm7tJD', 'sYA2A9opQLaLVZQGkuz1'];
            return featuredIds.map(id => dynamicProjects.find(p => p.id === id)).filter(Boolean);
        }
        const filtered = allProjects.filter(p => p.category === activeCategory);
        return filtered;
    }, [isPreview, activeCategory, allProjects, dynamicProjects]);

    return (
        <>
            <section
                id="projects-section"
                className={`py-28 ${isPreview ? 'bg-neutral-950' : 'bg-black'} relative overflow-hidden`}
            >
                {/* Ambient glow */}
                <div className="absolute right-0 bottom-0 w-[600px] h-[400px] bg-[#064e3b]/10 blur-[120px] pointer-events-none" />

                <div className="max-w-[1600px] mx-auto px-5 md:px-12 relative z-10">
                    {/* ── Header ── */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
                        <div className='px-5'>
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

                        {/* Removed side link as per request, moving to bottom */}
                    </div>

                    {/* ── Category Filter (full page only) ── */}
                    {!isPreview && (
                        <motion.div
                            variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}
                            className="w-full mb-14"
                        >
                            <div className="w-full h-px bg-white/10 mb-6" />
                            <div className="flex flex-nowrap items-start gap-x-10 md:gap-x-7 gap-y-4 px-3 overflow-x-auto no-scrollbar scroll-smooth">
                                {CATEGORIES_DATA.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="relative transition-all duration-500 whitespace-nowrap"
                                        onMouseEnter={() => setHoveredCategory(cat.id)}
                                        onMouseLeave={() => setHoveredCategory(null)}
                                    >
                                        <button
                                            onClick={() => {
                                                setActiveCategory(cat.id);
                                                startTransition(() => {
                                                    setSearchParams({ category: cat.id }, { replace: true });
                                                });
                                                const element = document.getElementById('projects-section');
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'auto' });
                                                }
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

                    {/* ── Project List — Auto-Paginating Sequential Scroll ── */}
                    <div
                        key={activeCategory} // Force unmount/remount of project list for a clean state reset between categories
                        ref={scrollContainerRef}
                        className="flex flex-col gap-16 md:gap-24 w-full pt-2 relative"
                    >
                        {displayProjects.length > 0 ? (
                            displayProjects.map((project, index) => (
                                <ProjectCard
                                    key={project.id || project.folder || index}
                                    project={project}
                                    index={index}
                                    onOpen={setLightbox}
                                    layout="list"
                                    isPreview={isPreview}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-20 text-center"
                            >
                                <p className="text-white/40 text-lg font-light">Soon... Showcase of our latest projects in this category.</p>
                            </motion.div>
                        )}
                        {/* Featured Projects Bottom Button (Homepage only) */}
                        {isPreview && (
                            <motion.div
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                custom={1}
                                className="flex justify-center mt-12 mb-8"
                            >
                                <Link
                                    to="/portfolio"
                                    className="group relative px-10 py-5 bg-[#d4af37] text-black font-bold rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_40px_rgba(212,175,55,0.25)] flex items-center gap-3"
                                >
                                    {/* Shimmer effect on button */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                                    />
                                    <span className="relative z-10 text-base uppercase tracking-widest">
                                        View All Projects
                                    </span>
                                    <ArrowRight className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </Link>
                            </motion.div>
                        )}

                        {/* Next Category Button — manual transition instead of automatic */}
                        {!isPreview && nextCategory && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="mt-24 md:mt-32 mb-16 px-6 flex flex-col items-center gap-8"
                            >
                                {/* Vertical divider with gold shimmer */}
                                <div className="relative h-20 md:h-28 w-px overflow-hidden">
                                    <div className="absolute inset-0 bg-white/10" />
                                    <motion.div
                                        animate={{ y: ['-100%', '100%'] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37] to-transparent"
                                    />
                                </div>

                                <span className="text-white/30 text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold transition-colors duration-500 group-hover:text-[#d4af37]">
                                    Explore Next Phase
                                </span>

                                <button
                                    onClick={loadNextCategory}
                                    className="cursor-pointer group relative flex flex-col items-center gap-5 w-full max-w-2xl transition-all duration-500"
                                >

                                    <div className="relative w-full sm:w-auto flex items-center justify-center gap-4 px-6 md:px-12 py-5 md:py-7 bg-white/[0.02] border border-white/10 rounded-full hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-700 backdrop-blur-sm overflow-hidden group">
                                        {/* Subtle internal glow on hover */}
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        <span
                                            className="relative z-10 text-xl sm:text-2xl md:text-3xl font-bold tracking-tight lowercase leading-none"
                                            style={{ fontFamily: "'Cormorant Garamond', serif" }}
                                        >
                                            View <span className="italic">{nextCategory.id} Projects</span>
                                        </span>

                                        <motion.div
                                            className="relative z-10 flex-shrink-0"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 transition-transform duration-500 group-hover:scale-110" />
                                        </motion.div>
                                    </div>

                                    {/* Hover hint */}
                                    <div className="h-4 overflow-hidden">
                                        <motion.span
                                            initial={{ y: 20 }}
                                            whileHover={{ y: 0 }}
                                            className="hidden md:block text-[#d4af37]/60 text-[10px] italic tracking-widest uppercase font-medium"
                                        >
                                            Continue the journey
                                        </motion.span>
                                    </div>
                                </button>
                            </motion.div>
                        )}
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
export const LightboxModal = ({ project, onClose }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const isMobile = useMediaQuery('(max-width: 768px)');
    const isTablet = useMediaQuery('(max-width: 1024px)');
    const lbSlideRef = useRef(null);
    const lbTouchRef = useRef({ startX: 0, startY: 0, startTime: 0, currentX: 0, isDragging: false, rafId: null, isScrolling: null });

    const images = useMemo(() => {
        // Use the SAME params as ProjectCard so the browser cache is hit instantly
        const params = isMobile
            ? 'c_limit,w_800,f_auto,q_auto'
            : (isTablet
                ? 'c_limit,w_1200,f_auto,q_auto'
                : 'c_limit,w_1600,f_auto,q_auto');

        if (project.images) {
            return project.images.map(id => `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${params}/${id}`);
        }

        return Array.from(
            { length: project.imageCount },
            (_, i) => `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload/${params}/${project.folder}/image-${i + 1}.png?_v=${__BUILD_TIMESTAMP__}`
        );
    }, [project, isMobile, isTablet]);

    const activeIndex = Math.abs(page % images.length);

    // Preload only current neighbors to stay snappy on mobile
    useEffect(() => {
        if (!images.length) return;

        const indicesToPreload = [
            Math.abs((page + 1) % images.length),
            Math.abs((page - 1 + images.length) % images.length)
        ];

        indicesToPreload.forEach(idx => {
            const img = new Image();
            img.src = images[idx];
        });
    }, [images, page]);

    const paginate = useCallback((newDirection) => {
        setPage([page + newDirection, newDirection]);
    }, [page]);

    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        paginate(-1);
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        paginate(1);
    };

    /* ── HIGH-PERFORMANCE TOUCH HANDLER for Lightbox (mobile only) ── */
    useEffect(() => {
        if (!isMobile || images.length <= 1) return;
        const el = lbSlideRef.current;
        if (!el) return;

        const t = lbTouchRef.current;

        const onTouchStart = (e) => {
            if (t.rafId) { cancelAnimationFrame(t.rafId); t.rafId = null; }
            const touch = e.touches[0];
            t.startX = touch.clientX;
            t.startY = touch.clientY;
            t.currentX = 0;
            t.startTime = Date.now();
            t.isDragging = true;
            t.isScrolling = null;
            el.style.transition = 'none';
        };

        const applyTransform = () => {
            el.style.transform = `translate3d(${t.currentX}px, 0, 0)`;
            t.rafId = null;
        };

        const onTouchMove = (e) => {
            if (!t.isDragging) return;
            const touch = e.touches[0];
            const dx = touch.clientX - t.startX;
            const dy = touch.clientY - t.startY;

            if (t.isScrolling === null) {
                if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5) {
                    t.isScrolling = true;
                    t.isDragging = false;
                    el.style.transform = 'translate3d(0,0,0)';
                    el.style.transition = '';
                    return;
                } else if (Math.abs(dx) > 5) {
                    t.isScrolling = false;
                }
            }

            if (t.isScrolling) return;
            e.preventDefault();

            t.currentX = dx * 0.45;
            if (!t.rafId) {
                t.rafId = requestAnimationFrame(applyTransform);
            }
        };

        const onTouchEnd = () => {
            if (!t.isDragging && t.isScrolling !== false) return;
            t.isDragging = false;
            if (t.rafId) { cancelAnimationFrame(t.rafId); t.rafId = null; }

            const dx = t.currentX;
            const elapsed = Date.now() - t.startTime;
            const velocity = Math.abs(dx) / (elapsed || 1);

            el.style.transition = 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)';

            if (dx < -30 || velocity > 0.35 && dx < 0) {
                el.style.transform = 'translate3d(-100%, 0, 0)';
                setTimeout(() => { paginate(1); el.style.transition = 'none'; el.style.transform = 'translate3d(0,0,0)'; }, 280);
            } else if (dx > 30 || velocity > 0.35 && dx > 0) {
                el.style.transform = 'translate3d(100%, 0, 0)';
                setTimeout(() => { paginate(-1); el.style.transition = 'none'; el.style.transform = 'translate3d(0,0,0)'; }, 280);
            } else {
                el.style.transform = 'translate3d(0, 0, 0)';
            }
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
        el.addEventListener('touchcancel', onTouchEnd, { passive: true });

        return () => {
            if (t.rafId) cancelAnimationFrame(t.rafId);
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchmove', onTouchMove);
            el.removeEventListener('touchend', onTouchEnd);
            el.removeEventListener('touchcancel', onTouchEnd);
        };
    }, [isMobile, images.length, paginate]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex flex-col items-center justify-center p-2 md:p-6 overflow-hidden"
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
                className="relative w-full h-full flex flex-col items-center justify-center gap-4"
                onClick={e => e.stopPropagation()}
            >
                {/* Main Image Container */}
                <div className="flex-1 w-full h-full flex items-center justify-center p-0 md:p-2 min-h-0" style={{ touchAction: 'pan-y' }}>
                    {isMobile ? (
                        /* MOBILE: Raw touch handler for buttery-smooth swiping */
                        <div
                            ref={lbSlideRef}
                            className="w-full h-full flex items-center justify-center pointer-events-auto"
                            style={{ willChange: 'transform', transform: 'translate3d(0,0,0)' }}
                        >
                            <img
                                src={images[activeIndex]}
                                alt={`${project.style} detailed view - ${project.category}`}
                                loading="eager"
                                fetchPriority="high"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{
                                    WebkitTouchCallout: 'none',
                                    WebkitUserSelect: 'none',
                                    userSelect: 'none'
                                }}
                                className="w-full h-full object-contain rounded-lg"
                            />
                        </div>
                    ) : (
                        /* DESKTOP/TABLET: Framer Motion drag */
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.img
                                key={activeIndex}
                                initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 1.02 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: direction > 0 ? -100 : 100, scale: 0.98 }}
                                transition={{ x: { type: 'spring', stiffness: 450, damping: 35 }, opacity: { duration: 0.2 } }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.8}
                                onDragEnd={(e, { offset, velocity }) => {
                                    if (offset.x < -30 || velocity.x < -300) {
                                        handleNext(e);
                                    } else if (offset.x > 30 || velocity.x > 300) {
                                        handlePrev(e);
                                    }
                                }}
                                src={images[activeIndex]}
                                alt={project.style}
                                // Modal images must never be lazy — user is actively waiting to see them
                                loading="eager"
                                fetchPriority="high"
                                draggable={false}
                                onContextMenu={(e) => e.preventDefault()}
                                style={{
                                    willChange: 'transform',
                                    transform: 'translate3d(0,0,0)',
                                    WebkitTouchCallout: 'none',
                                    WebkitUserSelect: 'none',
                                    userSelect: 'none'
                                }}
                                className="w-full h-full object-contain rounded-lg md:shadow-[0_30px_90px_rgba(0,0,0,0.8)] pointer-events-auto cursor-grab active:cursor-grabbing"
                            />
                        </AnimatePresence>
                    )}
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
    useSEO({
        title: 'Handasiyan | Expert Architecture & Interior Design',
        description: 'Welcome to Handasiyan. We specialize in high-end architectural design, engineering, and interior design built on trust, discipline, and lasting results.'
    });

    return (
        <>
            <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');`}</style>
            <Hero />
            <Portfolio isPreview={true} />
            <About isPreview={true} />
            <Services isPreview={true} />
            <ContactSection />
            <CTA />
        </>
    );
};

export default HomePage;