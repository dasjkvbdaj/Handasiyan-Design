
import { motion } from 'framer-motion';
import { Palette, Home, Layout, Ruler } from 'lucide-react';

const services = [
    {
        icon: <Home className="w-8 h-8 text-white" />,
        title: "Full Interior Design",
        description: "From concept to completion, we handle every detail of your renovation or new build."
    },
    {
        icon: <Palette className="w-8 h-8 text-white" />,
        title: "Color Consulting",
        description: "Expert guidance on palettes, finishes, and textures to bring your vision to life."
    },
    {
        icon: <Layout className="w-8 h-8 text-white" />,
        title: "Space Planning",
        description: "Optimizing flow and functionality to make the most of your available square footage."
    },
    {
        icon: <Ruler className="w-8 h-8 text-white" />,
        title: "Custom Furniture",
        description: "Bespoke furniture design and sourcing for truly unique statement pieces."
    }
];

import { Link } from 'react-router-dom';

const Services = ({ isPreview = false }) => {
    const displayServices = isPreview ? services.slice(0, 3) : services;

    return (
        <section className={`py-24 ${isPreview ? 'bg-neutral-900/50' : 'bg-black'}`}>
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {isPreview ? 'Our Services' : 'All Services'}
                    </h2>
                    <p className="text-white/50">Comprehensive design solutions for every need.</p>
                </div>

                <div className={`grid grid-cols-1 md:grid-cols-2 ${isPreview ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-8`}>
                    {displayServices.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-[#d4af37]/20 transition-all group"
                        >
                            <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:bg-[#d4af37]/10 transition-colors">
                                <div className="text-[#d4af37]">{service.icon}</div>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                            <p className="text-white/50 text-sm leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </div>

                {isPreview && (
                    <div className="mt-16 text-center">
                        <Link
                            to="/services"
                            className="inline-block px-8 py-3 bg-[#d4af37] text-black font-semibold rounded-full hover:bg-[#c49f27] transition-all transform hover:scale-105"
                        >
                            View All Services
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Services;
