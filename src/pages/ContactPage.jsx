import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, Linkedin, Send } from 'lucide-react';

const ContactPage = () => {
    const socialLinks = [
        { icon: <Instagram className="w-6 h-6" />, href: "#", name: "Instagram" },
        { icon: <Linkedin className="w-6 h-6" />, href: "#", name: "LinkedIn" }
    ];

    return (
        <div className="pt-20">
            {/* Page Hero */}
            <section className="py-24 bg-[#064e3b] relative overflow-hidden text-center border-b border-white/5">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        #Let's Talk
                    </motion.h1>
                    <p className="text-white/60 text-xl max-w-2xl mx-auto font-light">
                        Every great project starts with a conversation. We're here to bring your vision to life.
                    </p>
                </div>
            </section>

            <section className="py-24 bg-black">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>
                        <div className="space-y-12">
                            <div className="flex items-start space-x-6 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                                    <p className="text-white/50">+233 596 399 006</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                                    <p className="text-white/50">Handasiyan.2020@gmail.com</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/5">
                                <h3 className="text-white font-semibold mb-6 uppercase text-sm tracking-widest">Follow Us</h3>
                                <div className="flex space-x-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all group"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 p-10 rounded-3xl border border-white/10"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white/50 text-sm font-medium mb-2">First Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-white/50 text-sm font-medium mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-white/50 text-sm font-medium mb-2">Email Address</label>
                                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="email@example.com" />
                            </div>
                            <div>
                                <label className="block text-white/50 text-sm font-medium mb-2">Service Interest</label>
                                <select className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none">
                                    <option>Full Interior Design</option>
                                    <option>Architecture</option>
                                    <option>Consultation</option>
                                    <option>Project Management</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white/50 text-sm font-medium mb-2">Message</label>
                                <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors" placeholder="Tell us about your project..."></textarea>
                            </div>
                            <button type="button" className="w-full py-4 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#c49f27] transition-all flex items-center justify-center space-x-2">
                                <span>Send Message</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;
