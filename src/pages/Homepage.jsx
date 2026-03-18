import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Palette, Home, Layout, Ruler, X, Mail, Phone } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center">
            {/* Background Video */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute min-w-full min-h-full object-cover scale-105"
                >
                    <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95 z-10"></div>
                <div className="absolute inset-0 bg-black/30 z-[5]"></div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </section>
    );
};

export const About = ({ isPreview = false }) => {
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

export const Services = ({ isPreview = false }) => {
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

const portfolioImages = [
    '/portfolio_images/Contemporary Style (1).jpeg',
    '/portfolio_images/Contemporary Style (3).jpeg',
    '/portfolio_images/Contemporary west African Style (1).jpeg',
    '/portfolio_images/Contemporary west African Style (3).jpeg',
    '/portfolio_images/Gemini_Generated_Image_19pbme19pbme19pb.jpeg',
    '/portfolio_images/Gemini_Generated_Image_5qa7ne5qa7ne5qa7.jpeg',
    '/portfolio_images/Gemini_Generated_Image_baogukbaogukbaog.jpeg',
    '/portfolio_images/Gemini_Generated_Image_dckrbwdckrbwdckr.jpeg',
    '/portfolio_images/Gemini_Generated_Image_hya010hya010hya0.jpeg',
    '/portfolio_images/Gemini_Generated_Image_irg9zhirg9zhirg9.jpeg',
    '/portfolio_images/Gemini_Generated_Image_ityobrityobrityo.jpeg',
    '/portfolio_images/Gemini_Generated_Image_kev0ckev0ckev0ck.jpeg',
    '/portfolio_images/Gemini_Generated_Image_kmrx5jkmrx5jkmrx.jpeg',
    '/portfolio_images/Gemini_Generated_Image_kw7xuhkw7xuhkw7x.jpeg',
    '/portfolio_images/Gemini_Generated_Image_n2c8l0n2c8l0n2c8.jpeg',
    '/portfolio_images/Gemini_Generated_Image_nyj1p7nyj1p7nyj1.jpeg',
    '/portfolio_images/Gemini_Generated_Image_qbyoteqbyoteqbyo.jpeg',
    '/portfolio_images/Gemini_Generated_Image_uwwlb5uwwlb5uwwl.jpeg',
    '/portfolio_images/Image 16-01-2026 at 12.24.png',
    '/portfolio_images/Modern Style (1).jpeg',
    '/portfolio_images/Modern Style (2).jpeg',
    '/portfolio_images/Modern Style .jpeg',
    '/portfolio_images/Scandinavian (1).jpeg',
    '/portfolio_images/Scandinavian (2).jpeg',
    '/portfolio_images/Scandinavian .jpeg',
    '/portfolio_images/Tropical Modern Luxury Style .jpeg',
    '/portfolio_images/Tropical Modern Luxury Style left side .jpeg',
    '/portfolio_images/Tropical Modern Luxury Style zoom out view.jpeg'
];

export const Portfolio = ({ isPreview = false }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to ensure scroll is re-enabled if component unmounts
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    // Show only the first 4 images if it's a preview on the home page, otherwise show all.
    const displayImages = isPreview ? portfolioImages.slice(0, 4) : portfolioImages;

    return (
        <>
            <section className={`py-24 ${isPreview ? 'bg-black' : 'bg-neutral-900/50'}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        {isPreview && (
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-bold text-white mb-6 md:mb-0"
                            >
                                Featured <span className="text-[#d4af37]">Projects</span>
                            </motion.h2>
                        )}
                        {isPreview && (
                            <Link to="/portfolio" className="hidden md:block text-[#d4af37] border-b border-[#d4af37] pb-1 hover:opacity-70 transition-opacity mb-4 md:mb-2">
                                View all projects
                            </Link>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayImages.map((image, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index % 6) * 0.1 }}
                                className="group relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-neutral-900 aspect-square cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Portfolio Design ${index + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Subtle premium overlay on hover */}
                                <div className="absolute inset-0 pointer-events-none group-hover:bg-black/10 transition-colors duration-500 rounded-2xl" />
                            </motion.div>
                        ))}
                    </div>

                    {isPreview && (
                        <div className="mt-12 text-center md:hidden">
                            <Link to="/portfolio" className="inline-block px-8 py-3 bg-[#d4af37] text-black font-semibold rounded-full hover:bg-[#c49f27] transition-all transform hover:scale-105">
                                View all projects
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    >
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="absolute top-6 right-6 sm:top-8 sm:right-8 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-50"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            src={selectedImage}
                            alt="Enlarged Portfolio View"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl relative z-40"
                            onClick={(e) => e.stopPropagation()} // Prevent click on image from closing
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export const ContactSection = () => {
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

export const CTA = () => {
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

const HomePage = () => {
    return (
        <>
            <Hero />
            <About isPreview={true} />
            <Services isPreview={true} />
            <ContactSection />
            <CTA />
        </>
    );
};

export default HomePage;
