// src/pages/Signup.jsx
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { db } from "../firebase/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import StatusModal from "../components/StatusModal";
import { sanitizeEmail } from "../lib/sanitize";
import { createRateLimiter } from "../lib/rateLimit";

const signupLimiter = createRateLimiter('signup', 5, 15 * 60 * 1000);

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


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const { signup, signInWithGoogle, currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const canvasRef = useRef(null);

  useEffect(() => {
    // Optimization: Skip heavy particle logic on mobile
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const particles = [];
    const particleCount = 80;

    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.angle = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.angle += 0.02;
        this.size = this.baseSize + Math.sin(this.angle) * 0.5;

        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            this.x -= dx / 15;
            this.y -= dy / 15;
          }
        }

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!signupLimiter.check()) {
      const waitTime = signupLimiter.getRemainingTimeSeconds();
      return setError(`Too many attempts. Please try again in ${Math.ceil(waitTime / 60)} minutes.`);
    }

    const cleanEmail = sanitizeEmail(email);
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return setError("Please enter a valid email address.");
    }

    // Client-side validation
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    if (!passwordRegex.test(password)) {
      return setError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.");
    }

    setLoading(true);

    try {
      const userCredential = await signup(cleanEmail, password);
      const user = userCredential.user;

      signupLimiter.reset();

      // Check if user document exists (it shouldn't for new signup, but safety first)
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          role: "user",
          createdAt: serverTimestamp(),
        });
        navigate("/");
      } else {
        // If somehow they already existed in Firestore, check role
        const userData = userSnap.data();
        if (userData.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists. Please sign in.");
      } else {
        setError(getFirebaseError(err.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setError("");
  };

  const getFirebaseError = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "An account with this email already exists.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      default:
        return "Failed to create account. Please try again.";
    }
  };

  return (
    <div className="min-h-screen bg-[#030f0a] flex items-center justify-center relative overflow-hidden px-6 py-20">
      {/* Background Layer (Canvas skip on mobile) */}
      {!isMobile && (
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-auto" />
      )}

      {/* Background Orbs */}
      {isMobile ? (
        <>
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#064e4b]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <motion.div
            className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#064e4b]/20 blur-3xl"
            style={{ willChange: "transform, opacity" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl"
            style={{ willChange: "transform, opacity" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        </>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={0}
        className="w-[70%] md:w-full max-w-sm md:max-w-md relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-5 md:mb-10">
            <motion.h2
              variants={fadeInUp}
              custom={0.1}
              className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Create Account
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              custom={0.2}
              className="text-white/50 text-xs md:text-sm tracking-wide"
            >
              Join the elite circle of architectural excellence
            </motion.p>
          </div>

          <StatusModal 
            isOpen={!!error} 
            type="error" 
            message={error} 
            onClose={closeModal} 
          />

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
            <motion.div variants={fadeInUp} custom={0.3}>
              <label className="block text-[#d4af37] text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-1 md:mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-white/5 border border-white/10 text-white text-sm md:text-base rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
              />
            </motion.div>

            <motion.div variants={fadeInUp} custom={0.4}>
              <label className="block text-[#d4af37] text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-1 md:mb-2 ml-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                required
                className="w-full bg-white/5 border border-white/10 text-white text-sm md:text-base rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
              />
            </motion.div>

            <motion.div variants={fadeInUp} custom={0.5}>
              <label className="block text-[#d4af37] text-[10px] md:text-xs uppercase tracking-[0.2em] font-medium mb-1 md:mb-2 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                className="w-full bg-white/5 border border-white/10 text-white text-sm md:text-base rounded-xl md:rounded-2xl px-4 md:px-5 py-3 md:py-4 focus:outline-none focus:border-[#d4af37]/50 focus:bg-white/10 transition-all duration-300 placeholder:text-white/20"
              />
            </motion.div>

            <motion.button
              variants={fadeInUp}
              custom={0.6}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 md:py-4 rounded-xl md:rounded-2xl font-bold tracking-widest uppercase text-[10px] md:text-xs transition-all duration-300 shadow-xl shadow-[#d4af37]/10 mt-1 md:mt-2 ${loading
                ? "bg-white/10 text-white/30 cursor-not-allowed"
                : "bg-[#d4af37] text-black hover:bg-[#b8962d]"
                }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </motion.button>
          </form>

          <motion.div variants={fadeInUp} custom={0.7} className="mt-5 md:mt-8">
            <div className="relative flex items-center justify-center mb-5 md:mb-8">
              <div className="border-t border-white/10 w-full" />
              <span className="bg-[#0b1612] px-4 text-white/20 text-[10px] uppercase tracking-[0.3em] absolute">Or join with</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading || googleLoading}
              onClick={async () => {
                try {
                  setGoogleLoading(true);
                  const result = await signInWithGoogle();
                  const user = result.user;

                  // The user document is handled by AuthProvider, but we verify here for navigation
                  const userRef = doc(db, "users", user.uid);
                  const userSnap = await getDoc(userRef);
                  
                  let targetPath = "/";
                  if (userSnap.exists() && userSnap.data().role === "admin") {
                    targetPath = "/admin";
                  }
                  
                  navigate(targetPath);
                } catch (err) {
                  console.error(err);
                  setGoogleLoading(false);
                  setError("Google authentication failed.");
                }
              }}
              className={`w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 ${
                googleLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {googleLoading ? (
                <span className="text-xs uppercase tracking-widest font-semibold animate-pulse">
                  Verifying Google Account...
                </span>
              ) : (
                <>
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
                  <span className="text-xs uppercase tracking-widest font-semibold">
                    Google Account
                  </span>
                </>
              )}
            </motion.button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={0.8}
            className="text-center mt-5 md:mt-10 text-white/30 text-[10px] md:text-xs tracking-wider"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-[#d4af37] hover:text-[#b8962d] font-bold transition-colors ml-1">
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;