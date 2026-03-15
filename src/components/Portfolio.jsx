import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

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

const Portfolio = ({ isPreview = false }) => {
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

export default Portfolio;
