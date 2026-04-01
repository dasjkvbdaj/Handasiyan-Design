import React, { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';

const Step1Upload = ({ onNext, data, updateData }) => {
    const [preview, setPreview] = useState(
        data.image ? URL.createObjectURL(data.image) : null
    );
    const [dragging, setDragging] = useState(false);

    const handleFile = (file) => {
        if (!file) return;

        // ✅ Validate type
        const validTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!validTypes.includes(file.type)) {
            alert("Only JPG, PNG, WEBP files are allowed");
            return;
        }

        // ✅ Validate size (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert("File must be less than 10MB");
            return;
        }

        // 🔥 Clean old preview (IMPORTANT)
        if (preview) {
            URL.revokeObjectURL(preview);
        }

        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);

        // ✅ Store real file (NOT base64)
        updateData({ image: file });
    };

    const onFileChange = (e) => {
        const file = e.target.files[0];
        handleFile(file);
    };

    const onDragOver = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const onDragLeave = () => {
        setDragging(false);
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    // ✅ Cleanup on unmount
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-white">Upload Room Photo</h2>
                <p className="text-white/60">
                    Upload a photo of your current interior space
                </p>
            </div>

            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative group aspect-[16/10] max-w-2xl mx-auto rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center overflow-hidden ${
                    dragging
                        ? 'border-[#d4af37] bg-[#d4af37]/10'
                        : preview
                        ? 'border-white/20 bg-black/40'
                        : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
            >
                {preview ? (
                    <>
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">

                            {/* ❌ Remove */}
                            <button
                                onClick={() => {
                                    if (preview) {
                                        URL.revokeObjectURL(preview);
                                    }
                                    setPreview(null);
                                    updateData({ image: null });
                                }}
                                className="p-3 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-transform hover:scale-110"
                            >
                                <X size={24} />
                            </button>

                            {/* 🔁 Replace */}
                            <label className="p-3 bg-[#d4af37]/80 hover:bg-[#d4af37] text-white rounded-full transition-transform hover:scale-110 cursor-pointer">
                                <Upload size={24} />
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={onFileChange}
                                    accept="image/jpeg,image/png,image/webp"
                                />
                            </label>
                        </div>

                        {/* 📄 File name */}
                        <div className="absolute bottom-2 left-2 text-xs text-white/60 bg-black/50 px-2 py-1 rounded">
                            {data.image?.name}
                        </div>
                    </>
                ) : (
                    <label className="w-full h-full cursor-pointer flex flex-col items-center justify-center p-8 space-y-4">
                        <div className="p-6 rounded-2xl bg-white/5 text-white/40 group-hover:text-[#d4af37] group-hover:bg-[#d4af37]/10 transition-all">
                            <Upload size={48} strokeWidth={1.5} />
                        </div>

                        <div className="text-center">
                            <p className="text-lg font-medium text-white">
                                Click to upload or drag and drop
                            </p>
                            <p className="text-sm text-white/40">
                                PNG, JPG or WEBP (max. 10MB)
                            </p>
                        </div>

                        <input
                            type="file"
                            className="hidden"
                            onChange={onFileChange}
                            accept="image/jpeg,image/png,image/webp"
                        />
                    </label>
                )}
            </div>

            <div className="flex justify-center">
                <button
                    disabled={!preview}
                    onClick={onNext}
                    className={`px-12 py-4 rounded-full font-semibold transition-all duration-300 ${
                        preview
                            ? 'bg-[#d4af37] text-black hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                            : 'bg-white/5 text-white/40 cursor-not-allowed'
                    }`}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default Step1Upload;