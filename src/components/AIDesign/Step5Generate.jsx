import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Step5Generate = ({ data, onReset }) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [cooldown, setCooldown] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  // ✅ Persistent user ID
  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", crypto.randomUUID());
    }
  }, []);

  // ✅ DOWNLOAD
  const handleDownload = async () => {
    try {
      const response = await fetch(result);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `design-${Date.now()}.png`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("Download failed", e);
    }
  };

  // ✅ GENERATE
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
          },
        }
      );

      const imageUrl = res?.data?.imageUrl;

      if (!imageUrl) {
        throw new Error("NO_IMAGE_RETURNED");
      }

      setResult(imageUrl);

      // ✅ ALWAYS OPEN MODAL (reliable)
      setStep(1);
      setShowModal(true);
      setTimeout(() => {
  setShowModal(true);
}, 5000);

      // ✅ OPTIONAL: only once per session
      sessionStorage.setItem("reviewShown", "true");

      // cooldown
      setCooldown(true);
      setTimeout(() => setCooldown(false), 10000);

    } catch (err) {
      const msg = err?.response?.data?.error || err.message || "";

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
        <h2 className="text-4xl font-bold text-white">
          Generate Your Design
        </h2>
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
            draggable={false}
          />

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-[#d4af37] text-black rounded-full font-semibold hover:scale-105 transition"
            >
              <Download size={18} />
              Download
            </button>
          </div>
        </div>
      )}

      {/* BUTTON */}
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
          {cooldown ? "Please wait..." : "Generate Design"}
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

      {/* 🔥 MODAL */}
     {showModal && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
    <div className="relative bg-[#111] text-white rounded-2xl p-8 max-w-md w-full text-center space-y-6">

      {/* CLOSE */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-white/50 hover:text-white"
      >
        ✕
      </button>

      {/* STEP 1 → REVIEW */}
      {step === 1 && (
        <>
          <h3 className="text-2xl font-bold">
            Love your design?
          </h3>
          <p className="text-white/60">
            Help us grow by leaving a quick review ⭐
          </p>

          <div className="text-3xl text-yellow-400">
            ⭐⭐⭐⭐⭐
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                window.open(
                  "https://g.page/r/CQUdM8dEBuD8EAE/review",
                  "_blank"
                );
                setStep(2);
              }}
              className="bg-[#d4af37] text-black px-5 py-2 rounded-full"
            >
              Leave Review
            </button>

            <button onClick={() => setStep(2)}>
              Skip
            </button>
          </div>
        </>
      )}

      {/* STEP 2 → DOWNLOAD */}
      {step === 2 && (
        <>
          <h3 className="text-2xl font-bold">
            Your design is ready 🎉
          </h3>
          <p className="text-white/60">
            Download your design and use it anytime.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                handleDownload();
                setStep(3);
              }}
              className="bg-[#d4af37] text-black px-5 py-2 rounded-full"
            >
              Download Image
            </button>

            <button
              onClick={() => setStep(3)}
              className="text-white/50 hover:text-white"
            >
              Skip
            </button>
          </div>
        </>
      )}

      {/* STEP 3 → CONTACT */}
      {step === 3 && (
        <>
          <h3 className="text-2xl font-bold">
            Want this in real life?
          </h3>
          <p className="text-white/60">
            Our team can turn this design into a real space for you.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/contact")}
              className="bg-[#d4af37] text-black px-5 py-2 rounded-full"
            >
              Contact Us
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="text-white/50 hover:text-white"
            >
              Close
            </button>
          </div>
        </>
      )}

    </div>
  </div>
      )}
    </div>
  );
};

export default Step5Generate;