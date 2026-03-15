import React, { useState, useEffect } from 'react';
import { Sparkles, Loader2, Scan, Crosshair, Zap } from 'lucide-react';
// import { generateInteriorDesign } from '../../services/aiService';

const AIGeneration = ({ onComplete, data, externalResult, externalError }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Analyzing room structure...');
    const [dataPoints, setDataPoints] = useState([]);

    // Use a ref to track if we've already triggered completion
    const hasCompleted = React.useRef(false);

    useEffect(() => {
        const statuses = [
            'Initializing vision engine...',
            'Analyzing architectural bounds...',
            'Mapping spatial coordinates...',
            'Detecting surface textures...',
            'Generating 3D wireframe...',
            'Applying lighting physics...',
            'Refining material shaders...',
            'Finalizing design render...'
        ];

        const interval = setInterval(() => {
            setProgress(prev => {
                // If there's an error, stop animation
                if (externalError) {
                    clearInterval(interval);
                    return prev;
                }

                let next;
                if (prev >= 98) {
                    // Stalling phase while waiting for AI result from parent
                    if (externalResult) {
                        next = prev + 0.5;
                    } else {
                        next = prev + 0.02; // Very slow crawl
                    }
                } else {
                    next = prev + 0.5;
                }

                if (next >= 100) {
                    if (externalResult || externalError) {
                        clearInterval(interval);
                        if (!hasCompleted.current) {
                            hasCompleted.current = true;
                            console.log("✨ Animation reached 100%, moving to results...");
                            setTimeout(() => onComplete(), 500);
                        }
                        return 100;
                    }
                    return 99.9; // Stall at threshold
                }

                if (next > 99 && !externalResult) {
                    setStatus("Rendering design with specialized AI models...");
                } else if (next > 60 && !externalResult) {
                    setStatus("Writing professional design brief...");
                } else if (next > 30 && !externalResult) {
                    setStatus("Analyzing room with AI Vision...");
                } else {
                    const statusIndex = Math.floor((next / 100) * statuses.length);
                    if (statusIndex < statuses.length) {
                        setStatus(statuses[statusIndex]);
                    }
                }
                return next;
            });
        }, 30);

        return () => clearInterval(interval);
    }, [onComplete, externalResult, externalError]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-12">
            {/* Immersive Scan Display */}
            <div className="relative w-full max-w-4xl aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                {/* User's Image with Effects */}
                <div className="absolute inset-0 grayscale-[0.3] brightness-50 contrast-125">
                    <img src={data.image} alt="Scanning" className="w-full h-full object-cover" />
                </div>

                {/* Error Overlay */}
                {externalError && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-8">
                        <div className="text-center space-y-4 max-w-md">
                            <div className="text-red-500 font-bold text-xl">Generation Failed</div>
                            <div className="text-white/60 text-sm font-mono bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                {externalError}
                            </div>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                Refresh & Retry
                            </button>
                        </div>
                    </div>
                )}



                {/* Scanning Line */}
                <div
                    className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_20px_#d4af37] z-20"
                    style={{
                        top: `${progress}%`,
                        transition: 'top 0.1s linear'
                    }}
                />

                {/* Scan Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#d4af37]/5 via-transparent to-[#d4af37]/5 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

                {/* Floating Data Points */}
                {dataPoints.map((p, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_10px_#d4af37] transition-opacity duration-1000"
                        style={{
                            top: p.top,
                            left: p.left,
                            opacity: progress > (parseInt(p.top) - 10) ? 0.8 : 0,
                            transform: `scale(${progress > parseInt(p.top) ? 1.2 : 0.8})`
                        }}
                    >
                        {progress > parseInt(p.top) && (
                            <div className="absolute top-4 left-4 whitespace-nowrap">
                                <span className="text-[10px] font-mono text-[#d4af37] bg-black/60 px-2 py-0.5 rounded border border-[#d4af37]/20 uppercase">
                                    pt_{i} verified
                                </span>
                            </div>
                        )}
                    </div>
                ))}

                {/* Corner Accents */}
                <div className="absolute top-8 left-8 text-[#d4af37]/40"><Scan size={32} /></div>
                <div className="absolute top-8 right-8 text-[#d4af37]/40"><Crosshair size={32} /></div>
                <div className="absolute bottom-8 left-8 text-[#d4af37]/40 font-mono text-xs uppercase tracking-widest">System: active</div>
                <div className="absolute bottom-8 right-8 flex items-center gap-2 text-[#d4af37]/40">
                    <Zap size={16} />
                    <span className="font-mono text-xs uppercase tracking-widest">Processing...</span>
                </div>

                {/* Center Loading Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-xl">
                        <div className="relative">
                            <Loader2 size={48} className="text-[#d4af37] animate-spin" />
                            <Sparkles size={20} className="absolute -top-1 -right-1 text-[#d4af37] animate-pulse" />
                        </div>
                        <div className="text-center space-y-2">
                            <div className="text-2xl font-bold text-white tracking-tight">{progress.toFixed(0)}%</div>
                            <div className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest animate-pulse max-w-[150px] text-center">
                                {status}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Status Footer */}
            <div className="text-center space-y-4 max-w-md w-full px-6">
                <div className="h-4">
                    <p className="text-[#d4af37] font-medium tracking-wide uppercase text-sm animate-pulse">
                        {status}
                    </p>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent bg-[length:200%_100%] animate-shimmer"
                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    />
                </div>
            </div>

        </div>
    );
};

export default AIGeneration;
