import { motion } from 'framer-motion';
import { Services, CTA } from './Homepage';
import { Check } from 'lucide-react';

const whyChooseUs = [
    {
        title: "Personalized Approach",
        description:
            "We don't believe in one-size-fits-all. Every project is uniquely tailored to the client's preferences and lifestyle.",
    },
    {
        title: "Expert Craftsmanship",
        description:
            "Our partners are the best in the business, ensuring every piece of furniture and every finish meets our high standards.",
    },
    {
        title: "End-to-End Management",
        description:
            "From initial sketches to final walkthroughs, we handle everything, giving you peace of mind throughout the process.",
    },
    {
        title: "Innovative Design",
        description:
            "We stay ahead of trends while maintaining a focus on timeless elegance, using the latest tech to visualize your space.",
    },
];

const floatVariants = (index) => ({
    animate: {
        y: [0, -10, 0],
        transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.6, // stagger so they don't all move together
        },
    },
});

// Looping glow pulse on the check icon circle
const glowVariants = (index) => ({
    animate: {
        boxShadow: [
            "0 0 0px 0px rgba(234,179,8,0)",
            "0 0 14px 4px rgba(234,179,8,0.35)",
            "0 0 0px 0px rgba(234,179,8,0)",
        ],
        transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.6,
        },
    },
});

// Looping shimmer underline on title
const underlineVariants = (index) => ({
    animate: {
        scaleX: [0, 1, 0],
        transition: {
            duration: 3.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.6,
        },
    },
});

const ServicesPage = () => {
    return (
        <div className="pt-20">
            {/* Page Hero */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/10 to-transparent opacity-50"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Our Services
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/50 text-xl max-w-2xl mx-auto"
                    >
                        Comprehensive design solutions tailored to your unique lifestyle and needs.
                    </motion.p>
                </div>
            </section>

            {/* Main Services */}
            <Services isPreview={false} />

            {/* Why Choose Us */}
            <section className="py-24 bg-black border-t border-white/5 relative overflow-hidden">
                {/* Ambient background pulse — one per card, positioned behind it */}
                {whyChooseUs.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            width: 320,
                            height: 320,
                            left: i % 2 === 0 ? "10%" : "55%",
                            top: i < 2 ? "10%" : "55%",
                            background:
                                "radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%)",
                            filter: "blur(40px)",
                        }}
                        animate={{
                            opacity: [0.4, 1, 0.4],
                            scale: [0.9, 1.1, 0.9],
                        }}
                        transition={{
                            duration: 3.5,
                            ease: "easeInOut",
                            repeat: Infinity,
                            delay: i * 0.6,
                        }}
                    />
                ))}

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Why Work With Us
                        </h2>
                        <p className="text-white/50">
                            The Handasiyan difference is in the details.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={floatVariants(index)}
                                animate="animate"
                                className="flex space-x-6"
                            >
                                {/* Icon */}
                                <div className="flex-shrink-0">
                                    <motion.div
                                        variants={glowVariants(index)}
                                        animate="animate"
                                        className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-yellow-500"
                                    >
                                        <Check className="w-6 h-6" />
                                    </motion.div>
                                </div>

                                {/* Text */}
                                <div>
                                    <div className="relative inline-block mb-3">
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        {/* Animated shimmer underline */}
                                        <motion.span
                                            variants={underlineVariants(index)}
                                            animate="animate"
                                            style={{ originX: 0 }}
                                            className="absolute bottom-0 left-0 h-px w-full bg-yellow-500/60 block"
                                        />
                                    </div>
                                    <p className="text-white/60 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            {/* <section className="py-24 bg-black border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Work With Us</h2>
                        <p className="text-white/50">The Handasiyan difference is in the details.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex space-x-6"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-yellow-500">
                                        <Check className="w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-white/60 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            <CTA />
        </div>
    );
};

export default ServicesPage;
