import React from 'react';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.avif';

// SVGs for WhatsApp and TikTok which might not be in standard lucide set
const WhatsappIcon = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

const TiktokIcon = ({ size = 24, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
);

const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Hussein Tarhini
TEL;TYPE=CELL:+233596399006
EMAIL:handasiyan.2020@gmail.com
END:VCARD`;

const DigitalCard = () => {
    return (
        <div className="min-h-screen bg-[#002D04] text-white flex justify-center selection:bg-[#d4af37] selection:text-[#002D04]">
            <div className="w-full max-w-md px-6 py-12 flex flex-col items-center">

                {/* Profile Section */}
                <div className="mt-15 mb-5 w-32 h-32 rounded-full overflow-hidden border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)] animate-fade-in relative block bg-black">
                    <img src={logo} alt="Handasiyan Logo" className="w-full h-full object-contain p-2" />
                </div>

                <h1 className="text-3xl font-bold mb-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>Hussein Tarhini</h1>
                <p className="text-[#d4af37] font-semibold text-sm mb-1 uppercase tracking-wider animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
                    Architectural and Interior designer
                </p>
                <p className="text-gray-300 text-sm mb-8 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    Reach Out On All Socials
                </p>

                {/* Social Icons Range */}
                <div className="flex gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <a href="tel:+233596399006" className="p-3 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#002D04] transition-all duration-300">
                        <Phone size={20} />
                    </a>
                    <a href="https://wa.me/+233596399006" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#002D04] transition-all duration-300">
                        <WhatsappIcon size={20} />
                    </a>
                    <a href="https://instagram.com/handasiyan" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#002D04] transition-all duration-300">
                        <Instagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/share/1CAPaHcGzd/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#002D04] transition-all duration-300">
                        <Facebook size={20} />
                    </a>
                    <a href="https://tiktok.com/@handasiyan" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#002D04] transition-all duration-300">
                        <TiktokIcon size={20} />
                    </a>
                    <a href="mailto:handasiyan.2020@gmail.com" className="p-3 bg-white/10 rounded-full hover:bg-[#d4af37] hover:text-[#002D04] transition-all duration-300">
                        <Mail size={20} />
                    </a>
                </div>

                {/* Buttons Layout */}
                <div className="w-full flex flex-col gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <h2 className="text-center text-sm text-gray-400 mt-2 mb-1">Get In Touch</h2>

                    <a
                        href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vCardData)}`}
                        download="Hussein_Tarhini.vcf"
                        className="w-full bg-[#d4af37] hover:bg-[#c09d31] text-[#002D04] font-semibold py-4 px-6 rounded-lg text-center transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_4px_0_#9E7F28]"
                    >
                        Save My Contact
                    </a>

                    <a
                        href="mailto:handasiyan.2020@gmail.com"
                        className="w-full bg-[#d4af37] hover:bg-[#c09d31] text-[#002D04] font-semibold py-4 px-6 rounded-lg text-center transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_4px_0_#9E7F28]"
                    >
                        Contact By Email
                    </a>

                    <h2 className="text-center text-sm text-gray-400 mt-6 mb-1">For Business Inquiries</h2>

                    <a
                        href="http://wa.me/233596399006"
                        target="_blank" rel="noopener noreferrer"
                        className="w-full bg-[#d4af37] hover:bg-[#c09d31] text-[#002D04] font-semibold py-4 px-6 rounded-lg text-center transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_4px_0_#9E7F28]"
                    >
                        Send a message on Whatsapp
                    </a>

                    {/* <a
                        href="https://www.handasiyan.com"
                        target="_blank" rel="noopener noreferrer"
                        className="w-full bg-[#d4af37] hover:bg-[#c09d31] text-[#002D04] font-semibold py-4 px-6 rounded-lg text-center transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_4px_0_#9E7F28]"
                    >
                        Visit our website
                    </a> */}
                </div>

                {/* Footer Section */}
                <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <p className="text-[#d4af37] font-medium tracking-wide">Construction building company</p>
                    <p className="text-sm text-gray-400 mt-2">© {new Date().getFullYear()} Handasiyan. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default DigitalCard;
