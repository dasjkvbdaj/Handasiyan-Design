import React from 'react';
import { Sparkles } from 'lucide-react';

const palettes = [
    { id: 'abyss', name: 'Abyss', prompt: 'deep blue ocean color palette, navy, soft blue tones', colors: ['#003153', '#0070bb', '#66a3d2', '#bbdffd'] },
    { id: 'purple', name: 'Purple Shades', prompt: 'purple color palette, violet, lavender, soft purple tones', colors: ['#4b0082', '#8a2be2', '#9370db', '#e6e6fa'] },
    { id: 'caramel', name: 'Rich Caramel', prompt: 'warm caramel tones, beige, brown, cozy neutral palette', colors: ['#5d4037', '#8d6e63', '#d7ccc8', '#f5f5f5'] },
    { id: 'auburn', name: 'Rich Auburn', prompt: 'auburn warm tones, orange, brown, soft warm lighting', colors: ['#a52a2a', '#d2691e', '#f4a460', '#ffebcd'] },
    { id: 'green', name: 'Rich Greens', prompt: 'green natural palette, forest green, light green, fresh tones', colors: ['#006400', '#228b22', '#90ee90', '#f0fff0'] },
    { id: 'royal', name: 'Rich Purples', prompt: 'royal purple palette, luxury violet tones', colors: ['#483d8b', '#6a5acd', '#7b68ee', '#e6e6fa'] },
    { id: 'fantasy', name: 'Fantasy', prompt: 'fantasy pink palette, dreamy soft pink tones', colors: ['#ffc0cb', '#ffb6c1', '#ff69b4', '#db7093'] },
    { id: 'ocean', name: 'Turquoise', prompt: 'turquoise ocean palette, aqua blue, fresh coastal tones', colors: ['#008080', '#00ced1', '#40e0d0', '#afeeee'] },
    { id: 'sunset', name: 'Amber Glow', prompt: 'sunset palette, orange, amber, warm glowing light', colors: ['#ff4500', '#ff8c00', '#ffa500', '#ffd700'] },
    { id: 'arctic', name: 'Arctic Blue', prompt: 'cold blue palette, icy tones, deep blue atmosphere', colors: ['#191970', '#000080', '#0000cd', '#4169e1'] },
    { id: 'emerald', name: 'Emerald', prompt: 'emerald green luxury palette, dark green and gold accents', colors: ['#064e3b', '#059669', '#34d399', '#a7f3d0'] },
    { id: 'gold', name: 'Luxury Gold', prompt: 'luxury gold palette, gold accents, elegant warm tones', colors: ['#78350f', '#d97706', '#fbbf24', '#fef3c7'] },
];

const Step4Palette = ({ onNext, data, updateData }) => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Select Palette</h2>
                <p className="text-white/60">Choose a color palette to bring your vision to life</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {palettes.map((palette) => {
                    const isSelected = data.palette === palette.id;

                    return (
                        <button
                            type="button" // ✅ important
                            key={palette.id}
                            onClick={() => updateData({ palette: palette.id })}
                            className={`group flex flex-col items-center gap-4 transition-all duration-300 p-4 rounded-3xl border ${
                                isSelected
                                    ? 'bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-105'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                        >
                            <div className="flex w-full h-24 rounded-2xl overflow-hidden shadow-inner transform transition-transform group-hover:scale-105">
                                {palette.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        style={{ backgroundColor: color }}
                                        className="flex-1 h-full"
                                    />
                                ))}
                            </div>

                            <span
                                className={`font-medium transition-colors ${
                                    isSelected
                                        ? 'text-[#d4af37]'
                                        : 'text-white/70 group-hover:text-white'
                                }`}
                            >
                                {palette.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8 pb-12">
                <button
                    disabled={!data.palette}
                    onClick={onNext}
                    className={`px-12 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                        data.palette
                            ? 'bg-[#d4af37] text-black hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                            : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                >
                    Generate Design
                    <Sparkles size={20} />
                </button>
            </div>
        </div>
    );
};

export default Step4Palette;