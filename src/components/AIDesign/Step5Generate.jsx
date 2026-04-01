import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, RefreshCcw, Download } from "lucide-react";

const Step5Generate = ({ data, onReset }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(false);

  // ✅ Ensure persistent user ID (VERY IMPORTANT)
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", crypto.randomUUID());
    }
  }, []);

  const handleGenerate = async () => {
    if (loading || cooldown) return;

    if (!data.image) {
      setError("Please upload an image first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", data.image);
      formData.append("roomType", data.roomType);
      formData.append("style", data.style);
      formData.append("palette", data.palette);

      const res = await axios.post(
        "http://localhost:8080/api/design/generate",
        formData,
        {
          headers: {
            "X-User-Id": localStorage.getItem("userId"), // ✅ MATCH BACKEND
          },
        }
      );

      setResult(res.data.imageUrl);

      // ✅ Cooldown only after SUCCESS
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000);

    } catch (err) {
      console.error(err);

      // ✅ Smart error handling (matches backend)
      if (err.response?.status === 429) {
        setError("⚠️ Please wait... generation already in progress or rate limited.");
      } else if (err.response?.status === 500) {
        setError("⚠️ AI generation failed. Please try again.");
      } else {
        setError("Network error. Check your connection.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 text-center">

      {/* HEADER */}
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-white">Generate Your Design</h2>
        <p className="text-white/40">
          Let AI transform your room into your dream space
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full" />
          <p className="text-white/60">
            Generating your design... (10–20 seconds)
          </p>
        </div>
      )}

      {/* ERROR */}
      {error && !loading && (
        <div className="text-red-400 font-medium">{error}</div>
      )}

      {/* RESULT */}
      {result && !loading && (
        <div className="space-y-6">

          <img
            src={result}
            alt="Generated Design"
            className="rounded-3xl w-full shadow-lg"
          />

          <div className="flex justify-center gap-4 flex-wrap">

            {/* Download */}
            <a
              href={result}
              download="design.png"
              className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black rounded-full font-semibold hover:scale-105 transition"
            >
              <Download size={18} />
              Download
            </a>

            {/* Regenerate */}
            <button
              onClick={handleGenerate}
              disabled={loading || cooldown}
              className="flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white/10 transition disabled:opacity-50"
            >
              <RefreshCcw size={18} />
              {cooldown ? "Please wait..." : "Regenerate"}
            </button>

          </div>
        </div>
      )}

      {/* INITIAL BUTTON */}
      {!loading && !result && (
        <button
          onClick={handleGenerate}
          disabled={loading || cooldown}
          className={`px-12 py-4 rounded-full font-semibold flex items-center gap-2 mx-auto transition ${
            loading || cooldown
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[#d4af37] text-black hover:scale-105"
          }`}
        >
          <Sparkles size={20} />
          {loading
            ? "Generating..."
            : cooldown
            ? "Please wait..."
            : "Generate Design"}
        </button>
      )}

      {/* RESET */}
      {!loading && (
        <button
          onClick={onReset}
          className="text-white/40 text-sm hover:text-white transition"
        >
          Start New Design
        </button>
      )}
    </div>
  );
};

export default Step5Generate;