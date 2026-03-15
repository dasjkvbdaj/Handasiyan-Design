import React from 'react';
import { CheckCircle2, Home, RefreshCcw, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Step5Success = ({ onReset }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Main Success Card */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/20 via-emerald-500/20 to-[#d4af37]/20 rounded-[3rem] blur-2xl opacity-50 transition duration-1000" />

                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden p-12 md:p-20 flex flex-col items-center text-center space-y-10">

                    {/* Animated Checkmark Icon */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-20 animate-pulse" />
                        <div className="relative bg-[#d4af37]/10 p-8 rounded-full border border-[#d4af37]/20">
                            <CheckCircle2 size={72} className="text-[#d4af37] animate-bounce-slow" />
                        </div>
                        <Sparkles size={24} className="absolute -top-2 -right-2 text-[#d4af37] animate-pulse" />
                    </div>

                    {/* Content */}
                    <div className="space-y-4 max-w-xl">
                        <h2 className="text-5xl font-bold text-white tracking-tight">Thank You!</h2>
                        <h3 className="text-xl font-medium text-[#d4af37]/80">Your design journey with Handasiyan starts here.</h3>
                        <p className="text-white/40 leading-relaxed pt-4">
                            We've successfully recorded your design preferences. Our team and AI systems are now ready to bring your vision to life. You'll hear from us soon with the next steps for your professional design.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md pt-8">
                        <Link
                            to="/"
                            className="flex-1 flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 h-16 rounded-full text-white font-semibold transition-all group"
                        >
                            <Home size={20} className="group-hover:scale-110 transition-transform" />
                            Return Home
                        </Link>

                        <button
                            onClick={onReset}
                            className="flex-1 flex items-center justify-center gap-3 bg-[#d4af37] text-black h-16 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
                        >
                            <RefreshCcw size={20} className="animate-spin-slow" />
                            New Design
                        </button>
                    </div>
                </div>
            </div>

            {/* Subtle Footer Mention */}
            <div className="text-center">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Handasiyan Design AI System v2.0</p>
            </div>
        </div>
    );
};

export default Step5Success;
