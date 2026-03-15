import { motion } from 'framer-motion';
import About from '../components/About';
import Process from '../components/Process';
import husseinImg from '../assets/hussein.png';

const AboutPage = () => {
    return (
        <div className="pt-20">
            {/* Page Hero */}
            <section className="py-24 bg-[#064e3b] relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Our Story
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 text-xl max-w-2xl mx-auto font-light"
                    >
                        A legacy built on discipline, honesty, and respect for the craft.
                    </motion.p>
                </div>
            </section>

            {/* Core Content */}
            <About isPreview={false} />

            {/* Brand Founder Section */}
            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-[#d4af37]/20">
                            <img src={husseinImg} alt="Hussein Tarhini" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-[#d4af37] p-8 rounded-2xl hidden md:block">
                            <p className="text-black font-bold text-xl">Hussein Tarhini</p>
                            <p className="text-black/70 text-sm">Architectural & Interior Designer</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-[#d4af37] font-medium tracking-widest uppercase text-sm mb-4 block">Founding Story</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">A Legacy Passed from Father to Son</h2>
                        <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                            <p>
                                Handasiyan was founded in 2020 by Hussein Tarhini, whose passion for construction was shaped from an early age while working alongside his father, a skilled landscape designer. From him, Hussein learned that every drawing is a promise and that true quality lies in careful execution and attention to detail.
                            </p>
                            <p>
                                After his father’s passing, Hussein began his own journey in Lebanon, delivering high-end designs for international clients while managing local projects. A villa project later brought him to Ghana, where he recognized the country’s potential and the need for higher construction standards.
                            </p>
                            <p>
                                Choosing to stay, he built Handasiyan step by step through small projects, hands-on training, and a commitment to quality—laying the foundation for a company built on trust, discipline, and lasting results.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-[#064e3b]/10 border-y border-white/5">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-black/40 p-10 rounded-3xl border border-[#d4af37]/10"
                    >
                        <h2 className="text-3xl font-bold text-[#d4af37] mb-6">Brand Mission</h2>
                        <ul className="space-y-4 text-white/70">
                            <li className="flex items-start"><span className="text-[#d4af37] mr-3 mt-1.5">•</span> Deliver high-quality construction and design services with precision and care.</li>
                            <li className="flex items-start"><span className="text-[#d4af37] mr-3 mt-1.5">•</span> Maintain full transparency and honest communication with clients.</li>
                            <li className="flex items-start"><span className="text-[#d4af37] mr-3 mt-1.5">•</span> Protect clients’ investments by ensuring durable, well-executed results.</li>
                            <li className="flex items-start"><span className="text-[#d4af37] mr-3 mt-1.5">•</span> Lead projects hands-on and ensure proper execution on site.</li>
                            <li className="flex items-start"><span className="text-[#d4af37] mr-3 mt-1.5">•</span> Continue a legacy built on discipline, integrity, and excellence.</li>
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-black/40 p-10 rounded-3xl border border-[#d4af37]/10"
                    >
                        <h2 className="text-3xl font-bold text-[#d4af37] mb-6">Brand Vision</h2>
                        <p className="text-white/60 leading-relaxed text-lg mb-6">
                            Handasiyan envisions a construction industry where clients receive honest service, fair value, and work that lasts. We aim to raise professional standards by proving that excellence, transparency, and attention to detail should be the norm, not the exception.
                        </p>
                        <p className="text-white/60 leading-relaxed text-lg">
                            By combining strong engineering principles with respect for craftsmanship, Handasiyan seeks to contribute to sustainable development and become a trusted reference for quality construction in Ghana and beyond.
                        </p>
                    </motion.div>
                </div>
            </section>

            <Process />
        </div>
    );
};

export default AboutPage;
