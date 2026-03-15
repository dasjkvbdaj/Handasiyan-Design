import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

const ContactSection = () => {
    return (
        <section className="py-24 bg-[#064e3b] relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="max-w-2xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        Bringing vision to reality.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 text-lg mb-8"
                    >
                        Every dream deserves a promise. Contact us today to discuss your next masterpiece.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                        <div className="flex items-center space-x-3 text-[#d4af37]">
                            <Mail className="w-6 h-6" />
                            <span className="text-white font-medium">Handasiyan.2020@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-3 text-[#d4af37]">
                            <Phone className="w-6 h-6" />
                            <span className="text-white font-medium">+233 596 399 006</span>
                        </div>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Link
                        to="/contact"
                        className="px-10 py-5 bg-[#d4af37] text-black font-bold rounded-full hover:bg-[#c49f27] transition-all transform hover:scale-105 shadow-2xl text-lg inline-block"
                    >
                        Contact Us Now
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
