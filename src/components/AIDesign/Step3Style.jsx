import React from 'react';
import { ArrowRight } from 'lucide-react';

const styles = [
    { id: 'modern', name: 'Modern', image: 'https://images.unsplash.com/photo-1567016432779-094069958ad5?q=80&w=800&auto=format&fit=crop' },
    { id: 'tropical', name: 'Tropical', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800&auto=format&fit=crop' },
    { id: 'minimalist', name: 'Minimalistic', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop' },
    { id: 'bohemian', name: 'Bohemian', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop' },
    { id: 'rustic', name: 'Rustic', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop' },
    { id: 'vintage', name: 'Vintage', image: 'https://images.unsplash.com/photo-1513519247388-19345150d627?q=80&w=800&auto=format&fit=crop' },
    { id: 'baroque', name: 'Baroque', image: 'https://images.unsplash.com/photo-1616486341351-79b5b2446736?q=80&w=800&auto=format&fit=crop' },
    { id: 'mediterranean', name: 'Mediterranean', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop' },
    { id: 'cyberpunk', name: 'Cyberpunk', image: 'https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?q=80&w=800&auto=format&fit=crop' },
    { id: 'scandinavian', name: 'Scandinavian', image: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=800&auto=format&fit=crop' },
    { id: 'industrial', name: 'Industrial', image: 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?q=80&w=800&auto=format&fit=crop' },
    { id: 'midcentury', name: 'Midcentury', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop' },
];

const Step3Style = ({ onNext, data, updateData }) => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Select Style</h2>
                <p className="text-white/60">Select your desired design style to start creating your ideal interior</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                {styles.map((style) => {
                    const isSelected = data.style === style.id;
                    return (
                        <button
                            key={style.id}
                            onClick={() => updateData({ style: style.id })}
                            className={`group flex flex-col items-center gap-3 transition-all duration-300 transform ${isSelected ? 'scale-105' : 'hover:scale-102'
                                }`}
                        >
                            <div className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isSelected ? 'border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.4)]' : 'border-white/10 group-hover:border-white/30'
                                }`}>
                                <img
                                    src={style.image}
                                    alt={style.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {isSelected && (
                                    <div className="absolute inset-0 bg-[#d4af37]/10 flex items-center justify-center">
                                        <div className="bg-[#d4af37] text-black px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                            Selected
                                        </div>
                                    </div>
                                )}
                            </div>
                            <span className={`font-medium text-lg transition-colors ${isSelected ? 'text-[#d4af37]' : 'text-white/70 group-hover:text-white'
                                }`}>
                                {style.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex justify-center pt-8 pb-12">
                <button
                    disabled={!data.style}
                    onClick={onNext}
                    className={`px-12 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${data.style
                        ? 'bg-[#d4af37] text-black hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                        : 'bg-white/5 text-white/40 cursor-not-allowed'
                        }`}
                >
                    Continue
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Step3Style;
