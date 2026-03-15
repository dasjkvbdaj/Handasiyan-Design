import { motion } from 'framer-motion';
import Portfolio from '../components/Portfolio';
import CTA from '../components/CTA';

const PortfolioPage = () => {
    return (
        <div className="pt-20">
            {/* Page Hero */}
            <section className="py-24 bg-black relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Portfolio
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-xl max-w-2xl mx-auto"
                    >
                        A visual journey through our most inspiring interior transformations.
                    </motion.p>
                </div>
            </section>

            {/* Main Portfolio List */}
            <Portfolio isPreview={false} />

        </div>
    );
};

export default PortfolioPage;
