import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { sanitizeEmail } from "../lib/sanitize";
import { createRateLimiter } from "../lib/rateLimit";

const resetLimiter = createRateLimiter('resetPassword', 3, 15 * 60 * 1000);

/**
 * Reusable animation variants
 */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1], delay },
  }),
};

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getFirebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "If this email is registered, a reset link will be sent."; // Avoid leaking user existence
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      default:
        return "Failed to send reset email. Please try again.";
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!resetLimiter.check()) {
      const waitTime = resetLimiter.getRemainingTimeSeconds();
      setMessage(`Error: Too many attempts. Please try again in ${Math.ceil(waitTime / 60)} minutes.`);
      return;
    }

    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setMessage("Error: Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setMessage("Success: Check your email for reset instructions.");
      resetLimiter.reset();
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        // Prevent user enumeration attacks
        setMessage("Success: Check your email for reset instructions.");
      } else {
        setMessage("Error: " + getFirebaseError(err.code));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030f0a] flex items-center justify-center relative overflow-hidden px-6 py-20">
      {/* Background Orbs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#064e4b]/20 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-4xl font-bold text-white mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Reset Password
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-white/50 text-sm tracking-wide"
            >
              Recover your access to premium design
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`${message.startsWith("Error")
                    ? "bg-red-500/10 border border-red-500/20 text-red-400"
                    : "bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37]"
                  } p-4 rounded-2xl mb-6 text-sm text-center font-medium`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleReset} className="space-y-6">
            <motion.div variants={fadeInUp} custom={0.3}>
              <label className="block text-[#d4af37] text-xs uppercase tracking-[0.2em] font-medium mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
              />
            </motion.div>

            <motion.button
              variants={fadeInUp}
              custom={0.4}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-xl shadow-[#d4af37]/10 ${loading
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-[#d4af37] text-black hover:bg-[#b8962d]"
                }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </motion.button>
          </form>

          <motion.p
            variants={fadeInUp}
            custom={0.5}
            className="text-center mt-10 text-white/30 text-xs tracking-wider"
          >
            Remember your password?{" "}
            <Link to="/login" className="text-[#d4af37] hover:text-[#b8962d] font-bold transition-colors ml-1">
              Back to Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;