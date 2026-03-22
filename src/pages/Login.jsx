// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/"); // redirect after login
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const getFirebaseError = (code) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Try again.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      default:
        return "Failed to log in. Please try again.";
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
              Welcome Back
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-white/50 text-sm tracking-wide"
            >
              Sign in to manage your architectural dreams
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-6 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <motion.div variants={fadeInUp} custom={0.4}>
              <div className="flex items-center justify-between mb-2 px-1">
                <label className="block text-[#d4af37] text-xs uppercase tracking-[0.2em] font-medium">
                  Password
                </label>
                <Link to="/reset-password" name="reset-password-link" className="text-white/30 hover:text-[#d4af37] text-[10px] uppercase tracking-wider transition-colors">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
              />
            </motion.div>

            <motion.button
              variants={fadeInUp}
              custom={0.5}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-bold tracking-widest uppercase text-xs transition-all duration-300 shadow-xl shadow-[#d4af37]/10 ${loading
                  ? "bg-white/10 text-white/30 cursor-not-allowed"
                  : "bg-[#d4af37] text-black hover:bg-[#b8962d]"
                }`}
            >
              {loading ? "Verifying..." : "Sign In"}
            </motion.button>
          </form>

          <motion.div variants={fadeInUp} custom={0.6} className="mt-8">
            <div className="relative flex items-center justify-center mb-8">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0b1612] px-4 text-white/20 text-[10px] uppercase tracking-[0.3em] absolute">Or continue with</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  navigate("/");
                } catch (err) {
                  console.error(err);
                }
              }}
              className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.14-4.53z"
                />
              </svg>
              <span className="text-xs uppercase tracking-widest font-semibold">Google Account</span>
            </motion.button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={0.7}
            className="text-center mt-10 text-white/30 text-xs tracking-wider"
          >
            New to Handasiyan?{" "}
            <Link to="/signup" className="text-[#d4af37] hover:text-[#b8962d] font-bold transition-colors ml-1">
              Create an account
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
