
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Hammer, Star } from 'lucide-react';

const steps = [
    {
        icon: <MessageSquare className="w-6 h-6" />,
        title: "Vision",
        description: "Understanding your vision and requirements"
    },
    {
        icon: <PenTool className="w-6 h-6" />,
        title: "Design",
        description: "Developing detailed designs and plans"
    },
    {
        icon: <Hammer className="w-6 h-6" />,
        title: "Execution",
        description: "Executing construction with strict supervision"
    },
    {
        icon: <Star className="w-6 h-6" />,
        title: "Delivery",
        description: "Delivering refined finishes and final details"
    }
];

const Process = () => {
    return (
        <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Our Approach</h2>
                    <p className="text-white/50">We believe that great results come from clear processes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-[#d4af37]/20 -z-10"></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
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
