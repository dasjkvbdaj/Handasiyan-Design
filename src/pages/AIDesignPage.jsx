import React, { useState } from 'react';
import Step1Upload from '../components/AIDesign/Step1Upload';
import Step2Room from '../components/AIDesign/Step2Room';
import Step3Style from '../components/AIDesign/Step3Style';
import Step4Palette from '../components/AIDesign/Step4Palette';
import Step5Generate from '../components/AIDesign/Step5Generate';

import { ArrowLeft, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    const hasStarted = React.useRef(false);

    const nextStep = React.useCallback(() => setStep(prev => prev + 1), []);
    const prevStep = React.useCallback(() => setStep(prev => prev - 1), []);
    const updateData = React.useCallback((newData) => setDesignData(prev => ({ ...prev, ...newData })), []);
    const reset = React.useCallback(() => {
        setStep(1);
        setError(null);
        setIsGenerating(false);
        hasStarted.current = false;
        setDesignData({ image: null, roomType: '', style: '', palette: '', generatedImage: null, designNarrative: '' });
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

                    <Link to="/" className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 transition-all">
                        <X size={20} />
                    </Link>
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
