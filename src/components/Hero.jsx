import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
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

            {/* Content */}
            {/* <div className="relative z-10 max-w-4xl mx-auto px-6 mt-[-50px]">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-6"
                >
                    Building Dreams with Excellence
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-2xl text-white/80 font-light mb-10 max-w-2xl mx-auto leading-relaxed"
                >
                    Disciplined, hands-on architectural and interior design.
                </motion.p>

                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="px-8 py-4 bg-[#d4af37] text-black font-semibold rounded-full hover:bg-[#c49f27] transition-colors text-lg"
                >
                    <Link to="/portfolio">View Portfolio</Link>
                </motion.button>
            </div> */}

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
        </section>
    );
};

export default Hero;
