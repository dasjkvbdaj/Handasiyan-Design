import React, { useEffect, useRef } from 'react';
import { Mail, Phone, Instagram, Facebook, Download, MessageCircle } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import logo from '../assets/logo.avif';

const WhatsappIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
);

const TiktokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
);

const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Hussein Tarhini
TEL;TYPE=CELL:+233596399006
EMAIL:handasiyan.2020@gmail.com
END:VCARD`;

const socialLinks = [
    { icon: <Phone size={18} />, href: "tel:+233596399006", label: "Call" },
    { icon: <WhatsappIcon size={18} />, href: "https://wa.me/+233596399006", label: "WhatsApp" },
    { icon: <Instagram size={18} />, href: "https://instagram.com/handasiyan", label: "Instagram" },
    { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1CAPaHcGzd/?mibextid=wwXIfr", label: "Facebook" },
    { icon: <TiktokIcon size={18} />, href: "https://tiktok.com/@handasiyan", label: "TikTok" },
    { icon: <Mail size={18} />, href: "mailto:handasiyan.2020@gmail.com", label: "Email" },
];

/* ── Tilt Card Hook ──────────────────────────────── */
function useTilt(strength = 12) {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-1, 1], [strength, -strength]);
    const rotateY = useTransform(x, [-1, 1], [-strength, strength]);
    const springX = useSpring(rotateX, { stiffness: 200, damping: 30 });
    const springY = useSpring(rotateY, { stiffness: 200, damping: 30 });

    const onMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 1 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 1 - 1;
        x.set(nx);
        y.set(ny);
    };
    const onLeave = () => { x.set(0); y.set(0); };

    return { ref, springX, springY, onMove, onLeave };
}

/* ── Gold Shimmer Text ───────────────────────────── */
const ShimmerText = ({ children, className = '' }) => (
    <span className={`shimmer-gold ${className}`}>{children}</span>
);

/* ── Ornament Divider ────────────────────────────── */
const OrnamentDivider = () => (
    <div className="flex items-center gap-3 w-full my-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#d4af37]/30" />
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="7.5" y="0" width="3" height="3" fill="#d4af37" opacity="0.6" transform="rotate(45 9 9) translate(-4.5, -4.5)" />
            <rect x="7.5" y="0" width="3" height="3" fill="#d4af37" opacity="0.3" transform="rotate(45 9 9) translate(-8, -8) scale(0.7)" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#d4af37]/30" />
    </div>
);

/* ── Main Component ──────────────────────────────── */
const DigitalCard = () => {
    const tilt = useTilt(8);

    return (
        <div
            className="min-h-screen bg-[#061e15] text-white flex items-center justify-center relative overflow-hidden"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&display=swap');

        .cormorant { font-family: 'Cormorant Garamond', serif; }

        /* Gold shimmer animation */
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .shimmer-gold {
          background: linear-gradient(
            100deg,
            #b8962e 0%,
            #d4af37 30%,
            #f0d060 50%,
            #d4af37 70%,
            #b8962e 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        /* Grain overlay - Disabled on mobile for performance */
        @media (min-width: 768px) {
          .grain::after {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
            pointer-events: none;
            border-radius: inherit;
            z-index: 1;
          }
        }

        /* Card holographic shimmer */
        @keyframes holoMove {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .holo-border {
          background: linear-gradient(135deg,
            rgba(212,175,55,0.0) 0%,
            rgba(212,175,55,0.15) 25%,
            rgba(212,175,55,0.0) 50%,
            rgba(212,175,55,0.08) 75%,
            rgba(212,175,55,0.0) 100%
          );
          background-size: 400% 400%;
          animation: holoMove 8s ease infinite;
        }

        /* Avatar ring pulse */
        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(212,175,55,0.4), 0 0 30px rgba(212,175,55,0.15); }
          50%       { box-shadow: 0 0 0 8px rgba(212,175,55,0), 0 0 50px rgba(212,175,55,0.25); }
        }
        .avatar-ring { animation: ringPulse 3s ease-in-out infinite; }

        /* Social icon hover */
        .social-icon {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .social-icon::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(212,175,55,0.2) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .social-icon:hover::before { opacity: 1; }
        .social-icon:hover {
          transform: translateY(-4px) scale(1.08);
          background: rgba(212,175,55,0.12) !important;
          border-color: rgba(212,175,55,0.7) !important;
          color: #d4af37 !important;
          box-shadow: 0 8px 20px rgba(212,175,55,0.2), 0 0 0 1px rgba(212,175,55,0.3);
        }

        /* Button effects */
        .btn-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transition: left 0.5s ease;
        }
        .btn-primary:hover::before { left: 100%; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 35px rgba(212,175,55,0.35); }

        .btn-secondary {
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-secondary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212,175,55,0.05) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-secondary:hover::after { opacity: 1; }
        .btn-secondary:hover {
          transform: translateY(-2px);
          border-color: rgba(212,175,55,0.6) !important;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(212,175,55,0.1);
        }

        /* Tagline badge */
        .tag-badge {
          background: linear-gradient(135deg, rgba(6,78,59,0.8), rgba(6,30,21,0.9));
          border: 1px solid rgba(212,175,55,0.2);
        }

        /* Stats row */
        .stat-item::after {
          content: '';
          position: absolute;
          right: 0; top: 20%; bottom: 20%;
          width: 1px;
          background: linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent);
        }
        .stat-item:last-child::after { display: none; }

        selection { background: #d4af37; color: #061e15; }
      `}</style>

            {/* ── Ambient Glows ── */}
            <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#064e3b]/25 blur-[180px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#d4af37]/8 blur-[160px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[#064e3b]/15 blur-[100px] pointer-events-none" />

            {/* ── Card ── */}
            <motion.div
                ref={tilt.ref}
                onMouseMove={tilt.onMove}
                onMouseLeave={tilt.onLeave}
                style={{ rotateX: tilt.springX, rotateY: tilt.springY, transformPerspective: 1000 }}
                className="relative w-full max-w-sm mx-4 my-12 mt-25"
            >
                {/* Outer glow ring */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#064e3b]/30 blur-[1px]" />

                {/* Card body */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="grain relative rounded-3xl overflow-hidden"
                    style={{
                        background: 'linear-gradient(145deg, #0a2a1c 0%, #061e15 40%, #04160f 100%)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.08), inset 0 1px 0 rgba(212,175,55,0.1)',
                    }}
                >
                    {/* Holographic sheen */}
                    <div className="holo-border absolute inset-0 rounded-3xl pointer-events-none z-0" />

                    {/* Top accent bar */}
                    <div className="relative z-10 h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />

                    <div className="relative z-10 px-8 pb-10 pt-10 flex flex-col items-center">

                        {/* ── Badge ── */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="tag-badge rounded-full px-4 py-1 mb-8"
                        >
                            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[#d4af37]/70">
                                Construction & Design
                            </span>
                        </motion.div>

                        {/* ── Avatar ── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative mb-6"
                        >
                            {/* Outer decorative ring */}
                            <div className="absolute -inset-3 rounded-full border border-[#d4af37]/10" />
                            <div className="absolute -inset-5 rounded-full border border-[#d4af37]/05" />

                            {/* Avatar container */}
                            <div
                                className="avatar-ring relative w-28 h-28 rounded-full p-[2px]"
                                style={{
                                    background: 'linear-gradient(135deg, #d4af37 0%, #8a6f1a 50%, #d4af37 100%)',
                                }}
                            >
                                <div className="w-full h-full rounded-full overflow-hidden bg-[#061e15] flex items-center justify-center">
                                    <img src={logo} alt="Handasiyan Logo" className="w-[82%] h-[82%] object-contain" />
                                </div>
                            </div>

                            {/* Online indicator */}
                            <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#061e15]"
                                style={{ boxShadow: '0 0 8px rgba(52,211,153,0.6)' }} />
                        </motion.div>

                        {/* ── Name & Title ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.25 }}
                            className="text-center mb-1"
                        >
                            <h1 className="cormorant text-4xl font-bold tracking-wide text-white leading-none">
                                Hussein Tarhini
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.35 }}
                            className="text-center"
                        >
                            <ShimmerText className="text-[11px] font-semibold tracking-[0.28em] uppercase block mt-2">
                                Architect & Interior Designer
                            </ShimmerText>
                        </motion.div>

                        {/* ── Ornament ── */}
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="w-full"
                        >
                            <OrnamentDivider />
                        </motion.div>



                        {/* ── Social Icons ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.5 }}
                            className="flex justify-center gap-3 mb-8 flex-wrap"
                        >
                            {socialLinks.map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.href}
                                    target={item.href.startsWith('http') ? "_blank" : "_self"}
                                    rel={item.href.startsWith('http') ? "noopener noreferrer" : ""}
                                    aria-label={item.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.55 + idx * 0.05 }}
                                    className="social-icon w-11 h-11 flex items-center justify-center rounded-xl text-[#d4af37]/70"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(212,175,55,0.18)',
                                    }}
                                >
                                    {item.icon}
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* ── CTA Buttons ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.65 }}
                            className="w-full flex flex-col gap-3"
                            style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                            {/* Primary – Save Contact */}
                            <a
                                href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`}
                                download="Hussein_Tarhini.vcf"
                                className="btn-primary w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl text-[13px] font-bold tracking-[0.08em] text-[#061e15]"
                                style={{
                                    background: 'linear-gradient(135deg, #d4af37 0%, #e8c84a 50%, #d4af37 100%)',
                                    boxShadow: '0 6px 25px rgba(212,175,55,0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
                                }}
                            >
                                <Download size={16} strokeWidth={2.5} />
                                Save Contact
                            </a>

                            {/* Secondary row */}
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href="mailto:handasiyan.2020@gmail.com"
                                    className="btn-secondary flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-[12px] font-semibold tracking-[0.05em] text-white/80"
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                    }}
                                >
                                    <Mail size={15} className="text-[#d4af37]" />
                                    Email Us
                                </a>

                                <a
                                    href="http://wa.me/233596399006"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-secondary flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-[12px] font-semibold tracking-[0.05em] text-white/80"
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        border: '1px solid rgba(212,175,55,0.2)',
                                    }}
                                >
                                    <WhatsappIcon size={15} />
                                    WhatsApp
                                </a>
                            </div>
                        </motion.div>

                        {/* ── Footer ── */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.85 }}
                            className="w-full mt-8"
                        >
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent mb-5" />
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-medium tracking-[0.25em] uppercase text-white/25">Handasiyan</span>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
                                    <span className="text-[9px] text-white/25 font-light">© {new Date().getFullYear()} All rights reserved</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DigitalCard;
