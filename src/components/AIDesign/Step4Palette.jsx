import React from 'react';
import { Sparkles } from 'lucide-react';

const palettes = [
    { 
        id: 'abyss', 
        name: 'Abyss', 
        prompt: 'deep sea mystery palette, teal to dark navy', 
        colors: ['#3bada3', '#2d6fa1', '#264a7c', '#202c58', '#141416'],
        image: ''
    },
    { 
        id: 'purple-shades', 
        name: 'Purple Shades', 
        prompt: 'shades of purple and lavender with neutral accents', 
        colors: ['#9111c4', '#bd62f1', '#ffffff', '#6c6c6c', '#404040'],
        image: ''
    },
    { 
        id: 'caramel', 
        name: 'Rich Caramel', 
        prompt: 'warm caramel and cocoa tones', 
        colors: ['#efdec4', '#d28b26', '#b66911', '#7f4a0c', '#432706'],
        image: ''
    },
    { 
        id: 'auburns', 
        name: 'Rich Auburns', 
        prompt: 'autumn auburn and earthy red tones', 
        colors: ['#e8c4ac', '#dd5b2d', '#a42f1a', '#7b0e0d', '#4b0606'],
        image: ''
    },
    { 
        id: 'greens', 
        name: 'Rich Greens', 
        prompt: 'lush forest and vibrant green tones', 
        colors: ['#d0ebd2', '#00a827', '#00811e', '#005714', '#002f0b'],
        image: ''
    },
    { 
        id: 'rich-purples', 
        name: 'Rich Purples', 
        prompt: 'royal and deep purple luxury tones', 
        colors: ['#f0e6f0', '#a400a4', '#7b007b', '#520052', '#290029'],
        image: ''
    },
    { 
        id: 'fantasy', 
        name: 'Fantasy', 
        prompt: 'dreamy fantasy blue and grey palette', 
        colors: ['#f5f5f5', '#e0e4eb', '#cad2de', '#b4bed0', '#9ea8ba'],
        image: ''
    },
    { 
        id: 'kokrapaziada', 
        name: 'Kokrapaziada', 
        prompt: 'vibrant berry and deep magenta palette', 
        colors: ['#e41b7a', '#b81663', '#8c114b', '#600c34', '#34081d'],
        image: ''
    },
    { 
        id: 'demin-straw', 
        name: 'Demin Straw', 
        prompt: 'playful mix of blue, purple, pink and straw yellow', 
        colors: ['#1c66f7', '#b137d5', '#f55d7f', '#ee964d', '#d9b867'],
        image: ''
    },
    { 
        id: 'neptune', 
        name: 'Neptune', 
        prompt: 'oceanic neptune mix of teal, lime and orange', 
        colors: ['#6ea9a4', '#a3c990', '#c9d12d', '#9db10a', '#fb5607'],
        image: ''
    },
    { 
        id: 'turquoise', 
        name: 'Turquoise', 
        prompt: 'fresh turquoise and lavender palette', 
        colors: ['#d99cc4', '#c9b1f2', '#9cb9f7', '#4bb8f2', '#00d9f7'],
        image: ''
    },
    { 
        id: 'napalo', 
        name: 'Napalo', 
        prompt: 'coastal napalo palette with sky blue and earth tones', 
        colors: ['#08c7fb', '#074ba9', '#ebb266', '#58463c', '#c78440'],
        image: ''
    },
    { 
        id: 'napoleo', 
        name: 'Napoleo', 
        prompt: 'fiery napoleo palette with red, teal and peach', 
        colors: ['#ef3425', '#7e8a7c', '#2f656a', '#f8a463', '#fcd987'],
        image: ''
    },
    { 
        id: 'jin-xiaolong', 
        name: 'Jin Xiaolong', 
        prompt: 'majestic jin xiaolong palette with red, gold and black', 
        colors: ['#b8151c', '#d9cab1', '#000000', '#d9a400', '#f5dec5'],
        image: ''
    },
    { 
        id: 'taeyuzu', 
        name: 'Taeyuzu', 
        prompt: 'sophisticated taeyuzu palette with wood and gold tones', 
        colors: ['#8c6b5b', '#4b3d34', '#b1843d', '#6b635b', '#a4a4a4'],
        image: ''
    },
    { 
        id: 'whisper', 
        name: 'Whisper', 
        prompt: 'muted whisper palette with soft brown and gold', 
        colors: ['#84736b', '#3d342d', '#b88443', '#736b63', '#a9a9a9'],
        image: ''
    },
    { 
        id: 'hardcore', 
        name: 'Hardcore', 
        prompt: 'minimalist hardcore palette with pale mint tones', 
        colors: ['#f0f7ed', '#e0efe5', '#d1e6db', '#c1ddd2', '#b1d4c9'],
        image: ''
    },
    { 
        id: 'greener-pastures', 
        name: 'Greener Pastures', 
        prompt: 'verdant greener pastures palette', 
        colors: ['#7cb366', '#66994d', '#4d8033', '#33661a', '#1a4d0d'],
        image: ''
    },
    { 
        id: 'pale', 
        name: 'Pale', 
        prompt: 'monochromatic pale grey to black palette', 
        colors: ['#808080', '#666666', '#4d4d4d', '#333333', '#1a1a1a'],
        image: ''
    },
];

const Step4Palette = ({ onNext, data, updateData }) => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Select Palette</h2>
                <p className="text-white/60">Choose a color palette to bring your vision to life</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto px-4">
                {palettes.map((palette) => {
                    const isSelected = data.palette === palette.id;
                    const isSurprise = palette.id === 'surprise';

                    return (
                        <button
                            type="button" 
                            key={palette.id}
                            onClick={() => updateData({ palette: palette.id })}
                            className={`group flex flex-col items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-3xl border transition-all duration-300 ${
                                isSelected
                                    ? 'bg-[#d4af37]/10 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)] scale-105'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                            }`}
                        >
                            <div className="relative flex w-full h-16 sm:h-24 rounded-2xl overflow-hidden shadow-inner transform transition-transform group-hover:scale-105">
                                {palette.image ? (
                                    <img 
                                        src={palette.image} 
                                        alt={palette.name} 
                                        className="w-full h-full object-cover"
                                    />
                                ) : isSurprise ? (
                                    <div 
                                        className="w-full h-full flex items-center justify-center relative"
                                        style={{ 
                                            background: 'conic-gradient(from 180deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff, #ff0000)' 
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                                        <div className="relative bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/30 shadow-lg">
                                            <Sparkles className="text-white w-5 h-5 sm:w-8 sm:h-8" />
                                        </div>
                                    </div>
                                ) : (
                                    palette.colors.map((color, index) => (
                                        <div
                                            key={index}
                                            style={{ backgroundColor: color }}
                                            className="flex-1 h-full"
                                        />
                                    ))
                                )}
                            </div>

                            <span
                                className={`font-medium text-sm sm:text-base transition-colors text-center ${
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