import React, { useState } from 'react';
import Step1Upload from '../components/AIDesign/Step1Upload';
import Step2Room from '../components/AIDesign/Step2Room';
import Step3Style from '../components/AIDesign/Step3Style';
import Step4Palette from '../components/AIDesign/Step4Palette';
import Step5Generate from '../components/AIDesign/Step5Generate';

import { ArrowLeft, ArrowRight, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { saveWizardState, loadWizardState, clearWizardState } from '../lib/storage';

const AIDesignPage = () => {
    const [step, setStep] = useState(1);
    const [designData, setDesignData] = useState({
        image: null,
        roomType: '',
        style: '',
        palette: '',
        generatedImage: null,
        designNarrative: ''
    });
    const [error, setError] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isRestoring, setIsRestoring] = useState(true);
    const hasStarted = React.useRef(false);

    // Initial load from IndexedDB
    React.useEffect(() => {
        loadWizardState().then(saved => {
            if (saved) {
                setStep(saved.step);
                setDesignData(saved.designData);
            }
        }).catch(err => {
            console.error('Failed to load wizard state:', err);
        }).finally(() => {
            setIsRestoring(false);
        });
    }, []);

    // Save to IndexedDB whenever state changes
    React.useEffect(() => {
        if (!isRestoring) {
            saveWizardState(step, designData).catch(err => {
                console.error('Failed to save wizard state:', err);
            });
        }
    }, [step, designData, isRestoring]);

    const nextStep = React.useCallback(() => setStep(prev => prev + 1), []);
    const prevStep = React.useCallback(() => setStep(prev => prev - 1), []);
    const updateData = React.useCallback((newData) => setDesignData(prev => ({ ...prev, ...newData })), []);
    const reset = React.useCallback(() => {
        setStep(1);
        setError(null);
        setIsGenerating(false);
        hasStarted.current = false;
        setDesignData({ image: null, roomType: '', style: '', palette: '', generatedImage: null, designNarrative: '' });
        clearWizardState().catch(console.error);
    }, []);

    const handleOnComplete = React.useCallback((narrative) => {
        updateData({ designNarrative: narrative });
        nextStep();
    }, [updateData, nextStep]);

    // Centralized AI Call
    // React.useEffect(() => {
    //     if (step === 5 && !hasStarted.current) {
    //         hasStarted.current = true;
    //         setIsGenerating(true);
    //         setError(null);

    //         console.log("⚡ Parent Page triggering AI Generation...");
    //         import('../services/aiService').then(({ generateInteriorDesign }) => {
    //             generateInteriorDesign(designData.image, designData)
    //                 .then(result => {
    //                     console.log("⚡ AI Result received by Parent Page");
    //                     updateData({ designNarrative: result });
    //                     // We don't call nextStep here, we let AIGeneration finish its animation
    //                 })
    //                 .catch(err => {
    //                     console.error("⚡ AI Generation failed in Parent Page:", err);
    //                     setError(err.message);
    //                 })
    //                 .finally(() => {
    //                     setIsGenerating(false);
    //                 });
    //         });
    //     }
    // }, [step, designData.image, designData, updateData]);

    const renderStep = () => {
        switch (step) {
            case 1: return <Step1Upload onNext={nextStep} data={designData} updateData={updateData} />;
            case 2: return <Step2Room onNext={nextStep} data={designData} updateData={updateData} />;
            case 3: return <Step3Style onNext={nextStep} data={designData} updateData={updateData} />;
            case 4: return <Step4Palette onNext={nextStep} data={designData} updateData={updateData} />;
            case 5:
                return (
                    <Step5Generate
                        data={designData}
                        onReset={reset}
                    />
                );
            case 6: return <AIResult data={designData} onReset={reset} />;
            default: return null;
        }
    };

    const steps = [
        { id: 1, label: 'Upload' },
        { id: 2, label: 'Room' },
        { id: 3, label: 'Style' },
        { id: 4, label: 'Palette' },
        { id: 5, label: 'Result' }

    ];

    if (isRestoring) {
        return (
            <div className="pt-24 min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="pt-24 min-h-screen bg-black relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header / Nav */}
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-6">
                        {step > 1 && step < 5 && !error && (
                            <button
                                onClick={prevStep}
                                className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <ArrowLeft size={20} />
                            </button>
                        )}
                        <div className="space-y-1">
                            {step < 6 && (
                                <p className="text-xs font-semibold text-[#d4af37] uppercase tracking-widest">
                                    Step {step} / 6
                                </p>
                            )}
                            <h1 className="text-2xl font-bold text-white tracking-tight">AI Interior Designer</h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {step < 5 && (
                            <button
                                disabled={
                                    (step === 1 && !designData.image) ||
                                    (step === 2 && !designData.roomType) ||
                                    (step === 3 && !designData.style) ||
                                    (step === 4 && !designData.palette)
                                }
                                onClick={nextStep}
                                className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                                    ((step === 1 && designData.image) ||
                                    (step === 2 && designData.roomType) ||
                                    (step === 3 && designData.style) ||
                                    (step === 4 && designData.palette))
                                        ? 'bg-[#d4af37] text-black hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer'
                                        : 'bg-white/5 text-white/40 cursor-not-allowed opacity-50'
                                }`}
                            >
                                {step === 4 ? 'Generate Design' : 'Continue'}
                                {step === 4 ? <Sparkles size={18} /> : <ArrowRight size={18} />}
                            </button>
                        )}

                        {step > 1 && (
                            <button
                                onClick={() => {
                                    setDesignData({ image: null, roomType: '', style: '', palette: '', generatedImage: null, designNarrative: '' });
                                    setStep(1);
                                    clearWizardState().catch(console.error);
                                }}
                                className="p-2 cursor-pointer rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Progress Bar */}
                {step < 6 && (
                    <div className="flex gap-3 mb-16 max-w-md mx-auto">
                        {steps.map((s) => (
                            <div
                                key={s.id}
                                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s.id <= step ? 'bg-[#d4af37]' : 'bg-white/10'
                                    }`}
                            />
                        ))}
                    </div>
                )}

                {/* Step Content */}
                <div className="pb-20">
                    {renderStep()}
                </div>
            </div>
        </div>
    );
};

export default AIDesignPage;
