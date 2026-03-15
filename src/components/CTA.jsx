import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <section className="py-24 bg-black relative border-t border-white/5 overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/20 to-transparent pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold text-white mb-8"
                >
                    Ready to build your dream with excellence?
                </motion.h2>
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                    <Link
                        to="/contact"
                        className="w-full md:w-auto px-10 py-4 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#c49f27] transition-all transform hover:scale-105 shadow-xl"
                    >
                        Start Your Project
                    </Link>
                    <a
                        href="tel:+233596399006"
                        className="w-full md:w-auto px-10 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all"
                    >
                        Call Us Today
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CTA;
