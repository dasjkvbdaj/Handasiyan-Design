import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.avif';

const TiktokIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
    </svg>
);

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
                            <a href="tel:+233596399006" className="flex items-start space-x-3 text-white/60 text-sm hover:text-[#d4af37] transition-colors">
                                <Phone className="w-5 h-5 flex-shrink-0 text-[#d4af37]" />
                                <span>+233 59 639 9006</span>
                            </a>
                            <a href="mailto:Handasiyan.2020@gmail.com" className="flex items-start space-x-3 text-white/60 text-sm hover:text-[#d4af37] transition-colors">
                                <Mail className="w-5 h-5 flex-shrink-0 text-[#d4af37]" />
                                <span>Handasiyan.2020@gmail.com</span>
                            </a>
                            <div className="flex items-start space-x-3 text-white/60 text-sm">
                                <MapPin className="w-5 h-5 flex-shrink-0 text-[#d4af37]" />
                                <span>Spintex Road, Accra, Ghana</span>
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
                            {/* <li><Link to="/ai-design" className="text-sm text-white/60 hover:text-white transition-colors">Ai Design</Link></li> */}
                            <li><Link to="/digitalCard" className="text-sm text-white/60 hover:text-white transition-colors">Digital Card</Link></li>
                            <li><Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link to="/login" className="text-sm text-white/60 hover:text-white transition-colors">Login</Link></li>
                            <li><Link to="/signup" className="text-sm text-white/60 hover:text-white transition-colors">Signup</Link></li>
                            <li><Link to="/privacy-policy" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms-and-conditions" className="text-sm text-white/60 hover:text-white transition-colors">Terms & Conditions</Link></li>

                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white font-semibold mb-6">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.facebook.com/share/18kL4KzpoY/?mibextid=wwXIfr" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://www.instagram.com/handasiyan?igsh=MXJoNjAwNWUyZWtvcw==" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://www.linkedin.com/company/handasiyan/" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>

                            <a href="https://www.tiktok.com/@handasiyan.africa?_r=1&_t=ZS-95cFJi49Tei" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#d4af37] hover:text-black transition-all">
                                <TiktokIcon className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center items-center text-white/40 text-sm space-y-4 md:space-y-0">
                    <p>&copy; {new Date().getFullYear()} Handasiyan Construction Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
