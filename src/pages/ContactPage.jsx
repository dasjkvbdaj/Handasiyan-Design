import { useState, useRef, useEffect, useMemo } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Phone, Mail, Instagram, Linkedin, Send, ChevronDown, Facebook, Sparkles } from 'lucide-react';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { sanitizeText, sanitizePhone } from '../lib/sanitize';
import { createRateLimiter } from '../lib/rateLimit';

const contactLimiter = createRateLimiter('contact', 3, 10 * 60 * 1000);



/* ─── Floating Particle ─────────────────────────────────────────── */
const Particle = ({ delay, x, size, color }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ left: `${x}%`, bottom: '-10px', width: size, height: size, background: color, opacity: 0.18 }}
            animate={isMobile ? { y: [0, -350], opacity: [0, 0.35, 0] } : { y: [0, -700], opacity: [0, 0.35, 0] }}
            transition={{ duration: isMobile ? 8 : 6 + Math.random() * 4, delay, repeat: Infinity, ease: 'linear' }}
        />
    );
};

/* ─── Typewriter with cursor blink (loops forever) ──────────────── */
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

/* ─── Looping shimmer word ──────────────────────────────────────── */
const ShimmerText = ({ children, className }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <span className={`relative inline-block overflow-hidden ${className}`}>
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"
                style={{ mixBlendMode: 'overlay' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{
                    duration: isMobile ? 3.5 : 2.5,
                    repeat: Infinity,
                    repeatDelay: isMobile ? 3 : 2,
                    ease: 'easeInOut'
                }}
            />
        </span>
    );
};

/* ─── Looping wave letters ──────────────────────────────────────── */
const WaveText = ({ text, className }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <span className={`inline-flex ${className}`}>
            {text.split('').map((ch, i) => (
                <motion.span
                    key={i}
                    animate={isMobile ? { y: [0, -4, 0] } : { y: [0, -8, 0] }}
                    transition={{
                        duration: isMobile ? 2.4 : 1.6,
                        delay: i * (isMobile ? 0.12 : 0.08),
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    style={{ display: 'inline-block' }}
                >
                    {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
            ))}
        </span>
    );
};

/* ─── Looping color-pulse word ──────────────────────────────────── */
const PulseWord = ({ children, className }) => {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    return (
        <motion.span
            className={className}
            animate={{ color: ['#d4af37', '#f5e27a', '#c49f27', '#d4af37'] }}
            transition={{ duration: isMobile ? 4.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
        >
            {children}
        </motion.span>
    );
};

/* ─── Magnetic Button ───────────────────────────────────────────── */
const MagneticBtn = ({ children, className, onClick }) => {
    const ref = useRef(null);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setPos({ x: (e.clientX - cx) * 0.25, y: (e.clientY - cy) * 0.25 });
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={() => setPos({ x: 0, y: 0 })}
            animate={{ x: pos.x, y: pos.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className={className}
            onClick={onClick}
        >
            {children}
        </motion.button>
    );
};

/* ─── Animated Floating Input ───────────────────────────────────── */
const FloatingInput = ({ label, type = 'text', placeholder, as = 'input', options, value, onChange, name, error }) => {
    const [focused, setFocused] = useState(false);
    const Tag = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';

    const baseClass =
        'w-full bg-transparent border-b-2 pt-6 pb-2 text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none text-sm peer';
    const borderClass = error ? 'border-red-500/50' : focused ? 'border-[#d4af37]' : value ? 'border-white/30' : 'border-white/10';

    return (
        <div className="relative group">
            {as === 'select' ? (
                <Tag
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={`${baseClass} ${borderClass} appearance-none cursor-pointer`}
                    style={{ background: 'transparent' }}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                >
                    <option value="" disabled hidden></option>
                    {options?.map((o) => (
                        <option key={o} value={o} style={{ background: '#0a0a0a', color: '#fff' }}>{o}</option>
                    ))}
                </Tag>
            ) : (
                <Tag
                    name={name}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    rows={as === 'textarea' ? 4 : undefined}
                    className={`${baseClass} ${borderClass}`}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            )}

            {as === 'select' && (
                <div className="absolute right-0 bottom-3 pointer-events-none text-white/20 group-hover:text-[#d4af37] transition-colors">
                    <ChevronDown className="w-4 h-4" />
                </div>
            )}

            <label
                className={`absolute left-0 transition-all duration-300 font-medium tracking-widest uppercase pointer-events-none
                    ${focused || value ? 'top-0 text-[10px] text-[#d4af37]' : 'top-6 text-xs text-white/40'}`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
                {label}
            </label>

            <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#d4af37] to-[#f5d673]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: focused ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500/80 text-[10px] mt-1 font-medium montserrat uppercase tracking-wider"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

/* ─── Contact Info Card ─────────────────────────────────────────── */
const InfoCard = ({ icon: Icon, title, value, index, href, target, rel }) => (
    <motion.a
        href={href}
        target={target}
        rel={rel}
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: 8 }}
        className="flex items-center gap-5 group cursor-pointer no-underline"
    >
        <div className="relative">
            <motion.div
                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-[#d4af37] z-10 relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Icon className="w-5 h-5" />
            </motion.div>
            <div className="absolute inset-0 rounded-2xl bg-[#d4af37]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div>
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>{title}</p>
            <p className="text-white font-medium text-sm tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>{value}</p>
        </div>
    </motion.a>
);

/* ─── Social Link ───────────────────────────────────────────────── */
const SocialLink = ({ icon, name, href, index }) => (
    <motion.a
        href={href}
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.15, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/8 flex items-center justify-center text-[#d4af37] hover:text-black transition-colors duration-300 overflow-hidden"
        aria-label={name}
        target="_blank"
    >
        <span className="relative z-10">{icon}</span>
        <motion.div
            className="absolute inset-0 bg-[#d4af37]"
            initial={{ scale: 0, borderRadius: '100%' }}
            whileHover={{ scale: 2.5, borderRadius: '0%' }}
            transition={{ duration: 0.4 }}
        />
    </motion.a>
);

/* ══════════════════════════════════════════════════════════════════
   MAIN CONTACT PAGE
══════════════════════════════════════════════════════════════════ */
const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        service: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [formStatus, setFormStatus] = useState('');

    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const isMobile = useMediaQuery('(max-width: 1024px)');

    const particles = useMemo(() => Array.from({ length: isMobile ? 6 : 18 }, (_, i) => ({
        id: i,
        delay: i * 0.4,
        x: Math.random() * 100,
        size: 3 + Math.random() * 5,
        color: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#ffffff' : '#064e3b',
    })), [isMobile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
        setFormStatus('');
    };

    const handleSend = () => {
        // Rate matching
        if (!contactLimiter.check()) {
            const waitTime = contactLimiter.getRemainingTimeSeconds();
            setFormStatus(`Please wait ${Math.ceil(waitTime / 60)} minutes before sending another message.`);
            return;
        }

        // Sanitize existing fields
        const cleanFirstName = sanitizeText(formData.firstName, 50);
        const cleanLastName = sanitizeText(formData.lastName, 50);
        const cleanPhone = sanitizePhone(formData.phone);
        const cleanService = sanitizeText(formData.service, 50);
        const cleanMessage = sanitizeText(formData.message, 2000);

        // Check if form is completely empty
        if (!cleanFirstName && !cleanLastName && !cleanPhone && !cleanService && !cleanMessage) {
            setFormStatus('The form is empty. Please fill in your details.');
            return;
        }

        const newErrors = {};

        // Regex patterns
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        const messageRegex = /^.{2,}$/; // At least 2 characters

        if (!nameRegex.test(cleanFirstName)) {
            newErrors.firstName = 'Invalid first name';
        }
        if (!nameRegex.test(cleanLastName)) {
            newErrors.lastName = 'Invalid last name';
        }
        if (!cleanPhone) {
            newErrors.phone = 'Phone number is required';
        }
        if (!cleanService) {
            newErrors.service = 'Please select a service';
        }
        if (!messageRegex.test(cleanMessage)) {
            newErrors.message = 'Message must be at least 2 characters';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setFormStatus('Please correct the errors in the form.');
            return;
        }

        // --- CREDIT PROTECTION (BLACKHOLING) ---
        // If the sanitized version is different from the original, it means the user tried 
        // to send HTML tags or scripts. We skip EmailJS but pretend it worked.
        const originalData = formData.firstName + formData.lastName + formData.phone + formData.message;
        const sanitizedData = cleanFirstName + cleanLastName + cleanPhone + cleanMessage;

        if (originalData !== sanitizedData) {
            console.warn("Security Event: Malicious tags detected and blocked. Skipping EmailJS to save credits.");
            // Fake the success so the hacker thinks it worked and leaves
            setTimeout(() => {
                setSending(false);
                setSubmitted(true);
            }, 1000);
            return;
        }
        // ----------------------------------------

        setSending(true);
        setFormStatus('');

        // Prepare EmailJS parameters
        // We include multiple common recipient field names to resolve the 422 error
        const templateParams = {
            firstName: cleanFirstName,
            lastName: cleanLastName,
            phone: cleanPhone,
            service: cleanService,
            message: cleanMessage,
            to_email: 'Handasiyan.2020@gmail.com', // Primary
            email: 'Handasiyan.2020@gmail.com',    // Fallback 1
            user_email: 'Handasiyan.2020@gmail.com',// Fallback 2
            to_name: 'Handasiyan Admin',           // Common template field
            recipient: 'Handasiyan.2020@gmail.com' // Fallback 3
        };

        // Send via EmailJS
        emailjs.send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            templateParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSending(false);
                setSubmitted(true);
                contactLimiter.reset(); // Reset on clear success, or maybe let timeout restrict total spams regardless of success to be safer.
            })
            .catch((err) => {
                console.error('FAILED...', err);
                setSending(false);

                if (err?.status === 422) {
                    setFormStatus('There was an issue sending the email. Please try again or contact us directly.');
                } else {
                    setFormStatus('Something went wrong. Please try again later.');
                }
            });
    };


    const TiktokIcon = ({ size = 20 }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
        </svg>
    );

    const socialLinks = [
        { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/share/18kL4KzpoY/?mibextid=wwXIfr', name: 'Facebook' },
        { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/handasiyan?igsh=MXJoNjAwNWUyZWtvcw==', name: 'Instagram' },
        { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/company/handasiyan/', name: 'LinkedIn' },
        { icon: <TiktokIcon className="w-5 h-5" />, href: 'https://www.tiktok.com/@handasiyan.africa?_r=1&_t=ZS-95cFJi49Tei', name: 'Tiktok' },

    ];

    /* Title — letter stagger on mount, then looping float */
    const title = "#Let's Talk";
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

            {/* ── HERO ─────────────────────────────────────────────── */}
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
                        {/* ★ Looping shimmer on eyebrow text */}
                        <ShimmerText className="cormorant text-[#d4af37]/70 text-sm tracking-[0.4em] uppercase">
                            Contact Us
                        </ShimmerText>
                        <motion.div
                            className="h-px bg-[#d4af37]/50"
                            animate={{ width: ['0px', '48px', '0px'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                        />
                    </motion.div>

                    {/* ★ Title: entrance stagger → then each letter continuously floats at random phase */}
                    <h1 className="cormorant text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] mb-8 flex flex-wrap justify-center">
                        {letters.map((letter, i) => (
                            <motion.span
                                key={i}
                                /* entrance */
                                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                                animate={{
                                    opacity: 1,
                                    y: [0, -6, 0],            // ← loops forever after entrance
                                    rotateX: 0,
                                }}
                                transition={{
                                    /* entrance part */
                                    opacity: { delay: 0.05 * i, duration: 0.5 },
                                    rotateX: { delay: 0.05 * i, duration: 0.5 },
                                    /* continuous float */
                                    y: {
                                        delay: i * 0.07,
                                        duration: 2.2,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    },
                                }}
                                className={letter === '#' ? 'text-[#d4af37]' : ''}
                                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </motion.span>
                        ))}
                    </h1>

                    {/* ★ Typewriter cycling tagline — loops forever */}
                    <div className="montserrat text-white/50 text-base md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed min-h-[2rem]">
                        <Typewriter
                            phrases={[
                                "Every great project starts with a conversation.",
                                "We're here to bring your vision to life.",
                                "Let's build something extraordinary together.",
                                "Your dream space is one message away.",
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
            </section>

            {/* ── CONTENT ─────────────────────────────────────────── */}
            <section className="py-32 bg-black relative">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="max-w-7xl mx-auto px-6 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 lg:gap-16 items-start">

                        {/* ── LEFT ── */}
                        <div className="lg:col-span-2 space-y-16">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7 }}
                            >
                                <div className="montserrat flex items-center gap-3 mb-4">
                                    {/* ★ Looping width-pulse line */}
                                    <motion.div
                                        className="h-px bg-[#d4af37]"
                                        animate={{ width: ['8px', '32px', '8px'] }}
                                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    {/* ★ Shimmer on section label */}
                                    <ShimmerText className="text-[#d4af37] text-[10px] tracking-[0.4em] uppercase cormorant">
                                        Get in Touch
                                    </ShimmerText>
                                </div>

                                <h2 className="cormorant text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Let's create something<br />
                                    {/* ★ Color-pulsing "extraordinary" */}
                                    <PulseWord className="cormorant italic font-bold text-4xl md:text-5xl">
                                        extraordinary
                                    </PulseWord>
                                </h2>
                            </motion.div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <InfoCard
                                            icon={Phone}
                                            title="Phone"
                                            value="+233 596 399 006"
                                            index={0}
                                            href="tel:+233596399006"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        />
                                    </div>
                                    <a href="https://wa.me/233596399006" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 flex flex-shrink-0 items-center justify-center text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.15)] hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] hover:scale-105" aria-label="WhatsApp">
                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 3.825.001 6.938 3.113 6.939 6.938-.001 3.825-3.114 6.938-6.939 6.938z" /></svg>
                                    </a>
                                </div>
                                <InfoCard icon={Mail} title="Email" value="Handasiyan.2020@gmail.com" index={1} href="mailto:Handasiyan.2020@gmail.com" />
                            </div>

                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="h-px bg-gradient-to-r from-[#d4af37]/40 to-transparent"
                                style={{ originX: 0 }}
                            />

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                <p className="montserrat text-white/30 text-[10px] uppercase tracking-[0.3em] mb-5">Follow Us</p>
                                <div className="flex gap-3">
                                    {socialLinks.map((s, i) => <SocialLink key={s.name} {...s} index={i} />)}
                                </div>
                            </motion.div>

                            {/* ★ Looping wave text quote */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="border-l-2 border-[#d4af37]/30 pl-4"
                            >
                                <WaveText
                                    text="Building dreams with excellence."
                                    className="cormorant text-base text-white/25 italic"
                                />
                            </motion.div>
                        </div>

                        {/* ── RIGHT FORM ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-3 relative"
                        >
                            <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#d4af37]/40 pointer-events-none" />
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#d4af37]/40 pointer-events-none" />

                            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.07] rounded-3xl p-10 md:p-14 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />

                                <AnimatePresence mode="wait">
                                    {!submitted ? (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            className="space-y-10"
                                        >
                                            <div>
                                                {/* ★ Shimmer on form heading label */}
                                                <ShimmerText className="montserrat text-[#d4af37] text-[10px] tracking-[0.4em] uppercase block mb-2">
                                                    Start a project
                                                </ShimmerText>
                                                <h3 className="cormorant text-2xl text-white font-semibold">
                                                    Tell us about your vision
                                                </h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <FloatingInput
                                                    label="First Name"
                                                    name="firstName"
                                                    placeholder="John"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    error={errors.firstName}
                                                />
                                                <FloatingInput
                                                    label="Last Name"
                                                    name="lastName"
                                                    placeholder="Doe"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    error={errors.lastName}
                                                />
                                            </div>

                                            <FloatingInput
                                                label="Phone Number"
                                                name="phone"
                                                type="tel"
                                                placeholder="+233 XXX XXX XXX"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                error={errors.phone}
                                            />

                                            <FloatingInput
                                                label="Service Interest"
                                                name="service"
                                                as="select"
                                                value={formData.service}
                                                onChange={handleChange}
                                                error={errors.service}
                                                options={[
                                                    'Full Design',
                                                    'Civil Engineering',
                                                    'Architectural Design',
                                                    'Interior Design',
                                                    'Electrical & Mechanical Engineering (MEP)',
                                                    '3D Visualization & Concept Design',
                                                    'Construction & Build Management',
                                                    'Custom Furniture & Joinery',
                                                    'Project Management & Supervision',
                                                    'Renovation & Remodeling'
                                                ]}
                                            />

                                            <FloatingInput
                                                label="Your Message"
                                                name="message"
                                                as="textarea"
                                                placeholder="Tell us about your project..."
                                                value={formData.message}
                                                onChange={handleChange}
                                                error={errors.message}
                                            />

                                            {formStatus && (
                                                <motion.p
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className={`text-sm ${formStatus.includes('empty') || formStatus.includes('correct') ? 'text-red-500' : 'text-[#d4af37]'} font-medium montserrat`}
                                                >
                                                    {formStatus}
                                                </motion.p>
                                            )}

                                            <div className="flex items-center gap-6 pt-2">
                                                <MagneticBtn
                                                    onClick={handleSend}
                                                    className="montserrat group relative overflow-hidden bg-[#d4af37] text-black font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-xl flex items-center gap-3 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-shadow duration-500 cursor-pointer"
                                                >
                                                    {/* ★ Looping shimmer sweep on button */}
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                                        animate={{ x: ['-100%', '200%'] }}
                                                        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                                                    />
                                                    <AnimatePresence mode="wait">
                                                        {sending ? (
                                                            <motion.div
                                                                key="loading"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="flex items-center gap-2 relative z-10"
                                                            >
                                                                <motion.div
                                                                    className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full"
                                                                    animate={{ rotate: 360 }}
                                                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                                                />
                                                                <span>Sending...</span>
                                                            </motion.div>
                                                        ) : (
                                                            <motion.div
                                                                key="idle"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                exit={{ opacity: 0 }}
                                                                className="flex items-center gap-2 relative z-10"
                                                            >
                                                                <span>Send Message</span>
                                                                {/* ★ Looping bounce on send icon */}
                                                                <motion.span
                                                                    animate={{ x: [0, 3, 0] }}
                                                                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                                                                >
                                                                    <Send className="w-3.5 h-3.5" />
                                                                </motion.span>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </MagneticBtn>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                            className="py-20 flex flex-col items-center justify-center text-center gap-6"
                                        >
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                                className="w-20 h-20 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center"
                                            >
                                                {/* ★ Looping spin on sparkle icon */}
                                                <motion.div
                                                    animate={{ rotate: [0, 360] }}
                                                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                                                >
                                                    <Sparkles className="w-8 h-8 text-[#d4af37]" />
                                                </motion.div>
                                            </motion.div>
                                            <div>
                                                {/* ★ Wave text on success message */}
                                                <WaveText
                                                    text="Message Sent!"
                                                    className="cormorant text-3xl text-white font-bold"
                                                />
                                                <p className="montserrat text-white/40 text-sm mt-2">
                                                    We'll be in touch within 24 hours.
                                                </p>
                                            </div>
                                            <motion.div
                                                className="absolute inset-0 rounded-3xl border-2 border-[#d4af37]/30 pointer-events-none"
                                                animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.02, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default ContactPage;
