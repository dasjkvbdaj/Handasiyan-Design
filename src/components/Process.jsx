
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Hammer, Star } from 'lucide-react';

const steps = [
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Consultation",
        description: "We meet to discuss your vision, lifestyle, and budget."
    },
    {
        icon: <PenTool className="w-6 h-6" />,
        title: "Design",
        description: "We create detailed 3D renderings and mood boards."
    },
    {
        icon: <Hammer className="w-6 h-6" />,
        title: "Implementation",
        description: "Our team manages the construction and installation."
    },
    {
        icon: <Star className="w-6 h-6" />,
        title: "Reveal",
        description: "The final walkthrough of your transformed space."
    }
];

const Process = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Every Drawing is a Promise</h2>
                    <p className="text-white/50">Our structured journey to delivering lasting quality.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-[#d4af37]/20 -z-10"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-16 h-16 rounded-full bg-[#064e3b]/20 border border-[#d4af37]/20 flex items-center justify-center text-[#d4af37] mb-6 z-10 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                            <p className="text-white/50 text-sm max-w-xs">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
