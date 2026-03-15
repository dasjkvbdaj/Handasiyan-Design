import React from 'react';
import { Download, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

// Mock AI Results Mapping - fallback mapping if real AI fails or no key
const MOCK_RESULTS = {
    'living-modern': 'https://images.unsplash.com/photo-1567016432779-094069958ad5?q=80&w=1200&auto=format&fit=crop',
    'living-minimalist': 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
    'bedroom-bohemian': 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop',
    'kitchen-industrial': 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=1200&auto=format&fit=crop',
    'office-modern': 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=1200&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1618211419807-1c33ebec6a04?q=80&w=1200&auto=format&fit=crop'
};

const AIResult = ({ data, onReset }) => {
    console.log("AIResult received data:", {
        hasNarrative: !!data.designNarrative,
        narrativeType: typeof data.designNarrative,
        isDataUrl: data.designNarrative?.startsWith('data:'),
        hasGeneratedImage: !!data.generatedImage
    });
    // Priority: Real Generated Image (data.designNarrative if it's a data URL or blob URL) -> Mock Preference
    const resultImage = (data.designNarrative && (data.designNarrative.startsWith('data:') || data.designNarrative.startsWith('blob:')))
        ? data.designNarrative
        : data.generatedImage;

    const mappingKey = `${data.roomType}-${data.style}`;
    const fallbackImage = MOCK_RESULTS[mappingKey] || MOCK_RESULTS[data.style] || MOCK_RESULTS.default;
    const finalImage = resultImage || fallbackImage;

    return (
        <div className="w-full max-w-6xl mx-auto py-4 px-4">
            {/* Header Card */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 mb-8 shadow-2xl">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <CheckCircle2 size={16} />
                        {data.generatedImage ? 'AI Design Ready' : 'Conceptual Design Ready'}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your AI Transformation</h2>
                    <p className="text-white/40 text-sm md:text-base max-w-lg mx-auto">
                        Based on your space in <span className="text-white/60 font-semibold">{data.roomType}</span>, we've applied the <span className="text-[#d4af37] font-semibold uppercase">{data.style}</span> style.
                    </p>
                </div>
            </div>

            {/* Images Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Before */}
                <div className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-xl">
                    {data.image ? (
                        <img src={data.image} alt="Original" className="w-full h-full object-cover opacity-50 grayscale-[0.2]" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/20 font-mono italic">No image data</div>
                    )}
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/80 backdrop-blur-md rounded-xl text-[10px] uppercase font-black tracking-widest border border-white/10 text-white/60">
                        Original Room
                    </div>
                </div>

                {/* AI Result */}
                <div className="group relative aspect-[4/3] rounded-[2rem] overflow-hidden border-2 border-[#d4af37] bg-black shadow-[0_0_60px_rgba(212,175,55,0.15)] transition-all transform hover:scale-[1.01]">
                    <img src={finalImage} alt="AI Result" className="w-full h-full object-cover" />

                    {/* Overlay Badges */}
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-[#d4af37] text-black rounded-xl text-[10px] uppercase font-black tracking-widest shadow-xl">
                        {data.generatedImage ? 'AI Design Render' : 'AI Design Vision'}
                    </div>

                    {/* Info Bar */}
                    <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <p className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest">{data.style} aesthetic</p>
                                <p className="text-white text-xl font-bold capitalize">{data.palette} Palette</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-[8px] text-white/40 uppercase">Room Type</p>
                                    <p className="text-[10px] text-white font-bold capitalize">{data.roomType}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Design Narrative Card */}
            {data.designNarrative && !data.designNarrative.startsWith('data:') && (
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 mb-12 shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-[#d4af37]/10 p-3 rounded-2xl border border-[#d4af37]/20">
                            <Sparkles className="text-[#d4af37]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Architectural Vision</h3>
                            <p className="text-xs text-white/40 uppercase tracking-widest">Nano Banana AI Analysis</p>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <p className="text-white/70 leading-relaxed text-lg italic bg-black/20 p-6 rounded-2xl border border-white/5 whitespace-pre-wrap">
                            {data.designNarrative}
                        </p>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                    onClick={onReset}
                    className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all text-sm font-bold flex items-center justify-center gap-3"
                >
                    <RefreshCw size={20} className="hover:rotate-180 transition-all duration-500" />
                    Start New Transformation
                </button>
                <button
                    className="w-full sm:w-auto px-14 py-5 rounded-full bg-[#d4af37] text-black font-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(212,175,55,0.4)] text-sm flex items-center justify-center gap-3"
                >
                    <Download size={20} />
                    Download Concept PDF
                </button>
            </div>
        </div>
    );
};

export default AIResult;
