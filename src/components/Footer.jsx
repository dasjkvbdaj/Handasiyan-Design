import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.avif';

const Footer = () => {
    return (
        <footer id="contact" className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <Link to="/" className="block w-fit">
                            <img src={logo} alt="Handasiyan" className="h-24 w-auto object-contain" />
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Building dreams with excellence. A legacy of discipline, integrity, and craftsmanship since 2020.
                        </p>
                    </div>

                    {/* Contact Details */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3 text-white/60 text-sm">
                                <Phone className="w-5 h-5 flex-shrink-0 text-[#d4af37]" />
                                <span>+233 596 399 006</span>
                            </div>
                            <div className="flex items-start space-x-3 text-white/60 text-sm">
                                <Mail className="w-5 h-5 flex-shrink-0 text-[#d4af37]" />
                                <span>Handasiyan.2020@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-sm text-white/60 hover:text-white transition-colors">Home</Link></li>
                            <li><Link to="/services" className="text-sm text-white/60 hover:text-white transition-colors">Services</Link></li>
                            <li><Link to="/portfolio" className="text-sm text-white/60 hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link to="/about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link></li>
                            <li><Link to="/ai-design" className="text-sm text-white/60 hover:text-white transition-colors">Ai Design</Link></li>
                            <li><Link to="/digitalCard" className="text-sm text-white/60 hover:text-white transition-colors">Digital Card</Link></li>
                            <li><Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors">Login</Link></li>
                            <li><Link to="/signup" className="text-sm text-white/60 hover:text-white transition-colors">Signup</Link></li>

                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center text-white/40 text-sm">
                    <p>&copy; {new Date().getFullYear()} Handasiyan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
