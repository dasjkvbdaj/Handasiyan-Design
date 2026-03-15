
import { motion } from 'framer-motion';
import { Wand2, Layers, Lightbulb } from 'lucide-react';

const features = [
    {
        icon: <Wand2 className="w-8 h-8 text-purple-400" />,
        title: "AI Visualization",
        description: "Instantly visualize different styles and layouts with a single click."
    },
    {
        icon: <Layers className="w-8 h-8 text-blue-400" />,
        title: "Material Library",
        description: "Access a vast collection of premium textures and materials."
    },
    {
        icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
        title: "Smart Lighting",
        description: "Simulate natural and artificial lighting conditions accurately."
    }
];

const FeatureSection = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-900/20 blur-[120px] rounded-full point-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-900/20 blur-[120px] rounded-full point-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold text-white tracking-tight"
                    >
                        Design without <br />
                        <span className="text-white/40">limitations.</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-white/60 max-w-sm mt-6 md:mt-0"
                    >
                        Our AI-powered tools help you iterate faster and visualize your creative vision with unprecedented fidelity.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                        >
                            <div className="mb-6 p-4 rounded-full bg-white/5 w-fit group-hover:bg-white/10 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-white/50 leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
