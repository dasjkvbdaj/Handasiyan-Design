import React from 'react';
import { ArrowRight } from 'lucide-react';

const styles = [
    { id: 'modern', name: 'Modern', prompt: 'modern interior design', image: 'https://images.unsplash.com/photo-1724582586495-d050726cf354?q=80&w=800&auto=format&fit=crop' },
    { id: 'tropical', name: 'Tropical', prompt: 'tropical interior design', image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=800&auto=format&fit=crop' },
    { id: 'minimalist', name: 'Minimalistic', prompt: 'minimalist interior design', image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop' },
    { id: 'bohemian', name: 'Bohemian', prompt: 'bohemian interior design', image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop' },
    { id: 'rustic', name: 'Rustic', prompt: 'rustic interior design', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop' },
    { id: 'vintage', name: 'Vintage', prompt: 'vintage interior design', image: 'https://images.unsplash.com/photo-1601617956235-c97e358d054f?q=80&w=800&auto=format&fit=crop' },
    {
        id: 'baroque',
        name: 'Baroque',
        prompt: 'baroque luxury interior design',
        image: 'https://i.pinimg.com/736x/65/e8/2e/65e82e4f97d00ab2f90d43334e17ef83.jpg'

    }
    ,
    { id: 'mediterranean', name: 'Mediterranean', prompt: 'mediterranean interior design', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop' },
    { id: 'cyberpunk', name: 'Cyberpunk', prompt: 'cyberpunk futuristic interior neon lighting', image: 'https://i.pinimg.com/736x/89/cd/97/89cd9759af23c0b3506f9282a863c197.jpg' },
    { id: 'biophilic', name: 'Biophilic', prompt: 'biophilic interior design with plants and natural light', image: 'https://plus.unsplash.com/premium_photo-1722048810826-751afbcc98c0?q=80&w=800&auto=format&fit=crop' },
    { id: 'ancient-egyptian', name: 'Ancient Egyptian', prompt: 'ancient egyptian style interior design', image: 'https://i.pinimg.com/736x/31/38/97/313897041499791e544eca4e9438f671.jpg' },
    { id: 'airbnb', name: 'Airbnb', prompt: 'modern airbnb style interior design', image: 'https://plus.unsplash.com/premium_photo-1686167994594-0613a50c9e92?q=80&w=800&auto=format&fit=crop' },
    { id: 'discotheque', name: 'Discotheque', prompt: 'discotheque style interior design with disco ball and lights', image: 'https://i.pinimg.com/webp/736x/f9/36/05/f9360520a632b65e46c8adc9108a17e7.webp' },
    { id: 'soho-style', name: 'Soho Style', prompt: 'soho style industrial loft interior design', image: 'https://i.pinimg.com/736x/6f/fa/57/6ffa578498413fcef8b1c4aefcdec47e.jpg' },
    { id: 'luxury', name: 'Luxury', prompt: 'luxury high-end interior design', image: 'https://i.pinimg.com/webp/1200x/c1/84/14/c18414dc5836cbcafd6a578fdec26089.webp' },
    { id: 'technoland', name: 'Technoland', prompt: 'technoland futuristic high-tech interior design', image: 'https://i.pinimg.com/1200x/d4/c8/b0/d4c8b0ba3c2cdd091db386e2998cfb31.jpg' },
    { id: 'gamer', name: 'Gamer', prompt: 'gamer room interior design with rgb lighting', image: 'https://i.pinimg.com/736x/87/1c/72/871c72475984d506b1a23326618b5036.jpg' },
    { id: 'cozy', name: 'Cozy', prompt: 'cozy warm interior design', image: 'https://i.pinimg.com/736x/01/6b/9e/016b9ee9e6ad08f76af67ecb8341440e.jpg' },
    { id: 'coastal', name: 'Coastal', prompt: 'coastal beach style interior design', image: 'https://i.pinimg.com/webp/736x/77/d1/e1/77d1e1c91e0148a736fe2b6b31e11151.webp' },
    { id: 'japandi', name: 'Japandi', prompt: 'japandi interior design mixture of japanese and scandinavian', image: 'https://i.pinimg.com/736x/18/db/a1/18dba13ba1a7b2589476b3a9ad564e82.jpg' },
    { id: 'cottagecore', name: 'Cottagecore', prompt: 'cottagecore aesthetic interior design', image: 'https://i.pinimg.com/736x/a1/55/c4/a155c456d88cda8d4940c6231769d424.jpg' },
    { id: 'ski-chalet', name: 'Ski Chalet', prompt: 'ski chalet wooden cabin interior design', image: 'https://i.pinimg.com/webp/1200x/e6/61/21/e6612119e57f236f9f82c1d0ff382730.webp' },
    { id: 'gothic', name: 'Gothic', prompt: 'gothic interior design with dark colors and ornate details', image: 'https://i.pinimg.com/webp/1200x/07/5b/3b/075b3be133593cbd3e5792ba7050ca27.webp' },
    { id: 'creepy', name: 'Creepy', prompt: 'creepy eerie interior design', image: 'https://i.pinimg.com/webp/1200x/4d/70/e4/4d70e452c19b3bc5b0fd2c0f0a975574.webp' },
    { id: 'medieval', name: 'Medieval', prompt: 'medieval castle style interior design', image: 'https://i.pinimg.com/236x/36/34/1c/36341c82af8294fbc3eb8948de3105cc.jpg' },
    { id: '80s-style', name: '80s Style', prompt: '1980s style retro interior design', image: 'https://i.pinimg.com/736x/4a/1d/ab/4a1dabfcbc8ef5fae07b599e5e3c5e0e.jpg' },
    { id: 'wood', name: 'Wood', prompt: 'wooden interior design', image: 'https://i.pinimg.com/1200x/d6/cf/b0/d6cfb0e4b3a29635c8dfec6e4b917158.jpg' },
    { id: 'chocolate', name: 'Chocolate', prompt: 'chocolate brown themed interior design', image: 'https://i.pinimg.com/736x/fc/d4/4f/fcd44f43f3280ab4acd1d66a02def8d1.jpg' },
    {
        id: 'scandinavian',
        name: 'Scandinavian',
        prompt: 'scandinavian interior design clean minimal',
        image: 'https://images.unsplash.com/photo-1610307540583-7472788642d6?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 'industrial',
        name: 'Industrial',
        prompt: 'industrial loft interior exposed brick metal',
        image: 'https://images.unsplash.com/photo-1583719445062-62d0d98c4d8b?q=80&w=800&auto=format&fit=crop'
    },
    { id: 'midcentury', name: 'Midcentury', prompt: 'mid-century modern interior design', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=800&auto=format&fit=crop' },
];

const Step3Style = ({ onNext, data, updateData }) => {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Select Style</h2>
                <p className="text-white/60">Select your desired design style to start creating your ideal interior</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
                {styles.map((style) => {
                    const isSelected = data.style === style.id;

                    return (
                        <button
                            type="button"
                            key={style.id}
                            onClick={() => updateData({ style: style.id })}
                            className={`group flex flex-col items-center gap-2 sm:gap-3 transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:scale-102'
                                }`}
                        >
                            <div
                                className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden border-2 transition-all duration-500 ${isSelected
                                    ? 'border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                                    : 'border-white/10 group-hover:border-white/30'
                                    }`}
                            >
                                <img
                                    src={style.image}
                                    alt={style.name}
                                    loading="lazy"
                                    draggable={false}
                                    onContextMenu={(e) => e.preventDefault()}
                                    style={{
                                        WebkitTouchCallout: 'none',
                                        WebkitUserSelect: 'none',
                                        userSelect: 'none'
                                    }}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {isSelected && (
                                    <div className="absolute inset-0 bg-[#d4af37]/10 flex items-center justify-center">
                                        <div className="bg-[#d4af37] text-black px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                                            Selected
                                        </div>
                                    </div>
                                )}
                            </div>

                            <span
                                className={`font-medium text-base sm:text-lg transition-colors ${isSelected
                                    ? 'text-[#d4af37]'
                                    : 'text-white/70 group-hover:text-white'
                                    }`}
                            >
                                {style.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Step3Style;