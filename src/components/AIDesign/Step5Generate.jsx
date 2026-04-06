import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, RefreshCcw, Download } from "lucide-react";

const Step5Generate = ({ data, onReset }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(false);

  // ✅ Persistent user ID
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", crypto.randomUUID());
    }
  }, []);

  // ✅ SAFE DOWNLOAD
  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = result;
      link.download = `design-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download failed", e);
    }
  };

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
      "http://localhost:8081/api/design/generate",
      formData,
      {
        headers: {
          "X-User-Id": localStorage.getItem("userId"),
        }
      }
    );

    console.log("IMAGE:", res.data.imageUrl.substring(0, 100));

    setResult(res.data.imageUrl);

    setCooldown(true);
    setTimeout(() => setCooldown(false), 10000);

  } catch (err) {

    console.error("FULL ERROR:", err);
    console.error("DATA:", err.response?.data);

    const msg = err.response?.data?.error || "";

    if (msg.includes("GEMINI_ERROR")) {
      setError("AI failed. Try smaller image or different style.");
    } else if (msg.includes("NO_IMAGE_RETURNED")) {
      setError("No image generated. Try again.");
    } else {
      setError("Something went wrong.");
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
            loading="lazy"
          />

          <div className="flex justify-center gap-4 flex-wrap">

            {/* DOWNLOAD */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black rounded-full font-semibold hover:scale-105 transition"
            >
              <Download size={18} />
              Download
            </button>

            {/* REGENERATE */}
            <button
              type="button"
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