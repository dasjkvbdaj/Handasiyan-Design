
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

const About = ({ isPreview = false }) => {
    return (
        <section className={`py-24 ${isPreview ? 'bg-[#064e3b] border-t border-white/5' : 'bg-black border-t border-white/5'}`}>
            <div className="max-w-4xl mx-auto px-6 text-center">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-[#d4af37] font-medium tracking-wide uppercase text-sm"
                >
                    Our Philosophy
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-white mt-4 mb-8 leading-tight"
                >
                    We create spaces that reflect your soul.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/80 text-lg leading-relaxed font-light"
                >
                    Founded on the belief that every drawing is a promise, Handasiyan specializes in high-end design built on trust, discipline, and lasting results. We blend strong engineering principles with human values to create meaningful environments.
                </motion.p>

                {isPreview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="mt-12"
                    >
                        <Link
                            to="/about"
                            className="inline-block px-8 py-3 bg-[#d4af37] text-black font-semibold rounded-full hover:bg-[#c49f27] transition-all transform hover:scale-105"
                        >
                            Read Our Story
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default About;
