import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Sparkles, RefreshCcw } from 'lucide-react';
import { getInteriorPrompt } from '../../services/aiService';

const Step5Prompt = ({ data, onReset }) => {
    const [copied, setCopied] = useState(false);
    const promptText = getInteriorPrompt(data);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37]">
                    <Sparkles size={16} />
                    <span className="text-xs font-mono uppercase tracking-[0.2em]">Prompt Ready</span>
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tight">Your Design DNA</h2>
                <p className="text-white/40 max-w-lg mx-auto">
                    We've distilled your preferences into a professional AI design prompt. Use it to generate your final render.
                </p>
            </div>

            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/20 via-emerald-500/20 to-[#d4af37]/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />

                <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] overflow-hidden">
                    <div className="p-8 md:p-12 space-y-8">
                        {/* Prompt Display */}
                        <div className="relative bg-black/40 border border-white/5 rounded-3xl p-8 font-mono text-base leading-relaxed text-white/90 group/box">
                            <div className="absolute top-6 right-6 opacity-30 group-hover/box:opacity-100 transition-opacity">
                                <MessageSquare size={20} className="text-[#d4af37]" />
                            </div>
                            {promptText}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <button
                                onClick={handleCopy}
                                className="flex-1 flex items-center justify-center gap-3 bg-[#d4af37] text-black h-16 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                            >
                                {copied ? <Check size={20} /> : <Copy size={20} />}
                                {copied ? 'Prompt Copied' : 'Copy AI Prompt'}
                            </button>

                            <button
                                onClick={onReset}
                                className="flex items-center justify-center gap-3 px-8 h-16 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all group/btn"
                            >
                                <RefreshCcw size={18} className="group-hover/btn:rotate-180 transition-transform duration-500" />
                                Start New Design
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-8 text-[10px] text-white/20 uppercase tracking-[0.3em]">
                <span>Room: {data.roomType}</span>
                <span>Style: {data.style}</span>
                <span>Palette: {data.palette}</span>
            </div>
        </div>
    );
};

export default Step5Prompt;
