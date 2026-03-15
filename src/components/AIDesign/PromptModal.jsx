import React, { useState } from 'react';
import { X, Copy, Check, MessageSquare, Sparkles } from 'lucide-react';
import { getInteriorPrompt } from '../../services/aiService';

const PromptModal = ({ isOpen, onClose, data }) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const promptText = getInteriorPrompt(data);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#d4af37]/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(212,175,55,0.15)] animate-in fade-in zoom-in duration-300">
                {/* Visual Accent */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-50" />

                <div className="p-8 md:p-12 space-y-8">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[#d4af37]">
                                <Sparkles size={18} />
                                <span className="text-xs font-mono uppercase tracking-widest">AI Ready</span>
                            </div>
                            <h3 className="text-3xl font-bold text-white tracking-tight">AI Design Prompt</h3>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Prompt Box */}
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37]/20 to-emerald-500/20 rounded-3xl blur opacity-30" />
                        <div className="relative bg-black/40 border border-white/5 rounded-3xl p-6 font-mono text-sm leading-relaxed text-white/80 min-h-[150px]">
                            <div className="absolute top-4 right-4 animate-pulse">
                                <MessageSquare size={16} className="text-[#d4af37]/30" />
                            </div>
                            {promptText}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-col md:flex-row gap-4 pt-4">
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-3 bg-[#d4af37] text-black h-14 rounded-full font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                            {copied ? 'Copied to Clipboard' : 'Copy AI Prompt'}
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 h-14 rounded-full border border-white/10 text-white font-semibold hover:bg-white/5 transition-all"
                        >
                            Back to Design
                        </button>
                    </div>

                    <p className="text-center text-[10px] text-white/30 uppercase tracking-[0.2em]">
                        Use this prompt in Google AI Studio or other AI Portals
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromptModal;
