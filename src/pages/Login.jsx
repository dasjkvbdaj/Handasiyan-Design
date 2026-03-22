// src/pages/Login.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────
// Canvas Reveal Effect (ported from 21st.dev)
// Color-neutral: dots color is injected via props
// ─────────────────────────────────────────────

const ShaderMaterial = ({ source, uniforms, maxFps = 60 }) => {
  const { size } = useThree();
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const material = ref.current.material;
    material.uniforms.u_time.value = clock.getElapsedTime();
  });

  const getUniforms = () => {
    const prepared = {};
    for (const name in uniforms) {
      const u = uniforms[name];
      switch (u.type) {
        case "uniform1f":
          prepared[name] = { value: u.value };
          break;
        case "uniform1i":
          prepared[name] = { value: u.value };
          break;
        case "uniform1fv":
          prepared[name] = { value: u.value };
          break;
        case "uniform3fv":
          prepared[name] = {
            value: u.value.map((v) => new THREE.Vector3().fromArray(v)),
          };
          break;
        default:
          break;
      }
    }
    prepared["u_time"] = { value: 0 };
    prepared["u_resolution"] = {
      value: new THREE.Vector2(size.width * 2, size.height * 2),
    };
    return prepared;
  };

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main(){
            gl_Position = vec4(position.xy, 0.0, 1.0);
            fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: source,
        uniforms: getUniforms(),
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
      }),
    [size.width, size.height, source]
  );

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

const DotMatrix = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 20,
  dotSize = 2,
  reverse = false,
  center = ["x", "y"],
}) => {
  const uniforms = useMemo(() => {
    let colorsArray = Array(6).fill(colors[0]);
    if (colors.length === 2)
      colorsArray = [...Array(3).fill(colors[0]), ...Array(3).fill(colors[1])];
    else if (colors.length === 3)
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];

    return {
      u_colors: {
        value: colorsArray.map((c) => [c[0] / 255, c[1] / 255, c[2] / 255]),
        type: "uniform3fv",
      },
      u_opacities: { value: opacities, type: "uniform1fv" },
      u_total_size: { value: totalSize, type: "uniform1f" },
      u_dot_size: { value: dotSize, type: "uniform1f" },
      u_reverse: { value: reverse ? 1 : 0, type: "uniform1i" },
    };
  }, [colors, opacities, totalSize, dotSize, reverse]);

  const source = `
    precision mediump float;
    in vec2 fragCoord;
    uniform float u_time;
    uniform float u_opacities[10];
    uniform vec3 u_colors[6];
    uniform float u_total_size;
    uniform float u_dot_size;
    uniform vec2 u_resolution;
    uniform int u_reverse;
    out vec4 fragColor;

    float PHI = 1.61803398874989484820459;
    float random(vec2 xy){
      return fract(tan(distance(xy*PHI,xy)*0.5)*xy.x);
    }

    void main(){
      vec2 st = fragCoord.xy;
      ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x,u_total_size)-u_dot_size)*0.5));" : ""}
      ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y,u_total_size)-u_dot_size)*0.5));" : ""}

      float opacity = step(0.0,st.x)*step(0.0,st.y);
      vec2 st2 = vec2(int(st.x/u_total_size),int(st.y/u_total_size));

      float frequency = 5.0;
      float show_offset = random(st2);
      float rand = random(st2*floor((u_time/frequency)+show_offset+frequency));
      opacity *= u_opacities[int(rand*10.0)];
      opacity *= 1.0-step(u_dot_size/u_total_size,fract(st.x/u_total_size));
      opacity *= 1.0-step(u_dot_size/u_total_size,fract(st.y/u_total_size));

      vec3 color = u_colors[int(show_offset*6.0)];

      float speed = 0.5;
      vec2 center_grid = u_resolution/2.0/u_total_size;
      float dist = distance(center_grid,st2);
      float max_dist = distance(center_grid,vec2(0.0));

      float offset_intro = dist*0.01+(random(st2)*0.15);
      float offset_outro = (max_dist-dist)*0.02+(random(st2+42.0)*0.2);

      if(u_reverse==1){
        opacity *= 1.0-step(offset_outro, u_time*speed);
        opacity *= clamp((step(offset_outro+0.1, u_time*speed))*1.25,1.0,1.25);
      } else {
        opacity *= step(offset_intro, u_time*speed);
        opacity *= clamp((1.0-step(offset_intro+0.1, u_time*speed))*1.25,1.0,1.25);
      }

      fragColor = vec4(color,opacity);
      fragColor.rgb *= fragColor.a;
    }
  `;

  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={60} />
    </Canvas>
  );
};

const CanvasRevealEffect = ({
  animationSpeed = 10,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[212, 175, 55]], // default: Handasiyan gold
  dotSize = 3,
  reverse = false,
  showGradient = true,
}) => (
  <div className="h-full relative w-full">
    <div className="h-full w-full">
      <DotMatrix
        colors={colors}
        dotSize={dotSize}
        opacities={opacities}
        reverse={reverse}
        center={["x", "y"]}
      />
    </div>
    {showGradient && (
      <div className="absolute inset-0 bg-gradient-to-t from-[#030f0a] to-transparent" />
    )}
  </div>
);

// ─────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1], delay },
  }),
};

// ─────────────────────────────────────────────
// Login Page
// ─────────────────────────────────────────────

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Canvas reveal states (mirrored from 21st.dev template)
  const [initialCanvasVisible, setInitialCanvasVisible] = useState(true);
  const [reverseCanvasVisible, setReverseCanvasVisible] = useState(false);

  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Trigger the reverse (outro) canvas animation on submit
    setReverseCanvasVisible(true);
    setTimeout(() => setInitialCanvasVisible(false), 50);

    try {
      await login(email, password);
      // Give the outro animation time before navigating
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      // If login fails, reset the canvas back to intro state
      setReverseCanvasVisible(false);
      setInitialCanvasVisible(true);
      setError(getFirebaseError(err.code));
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

      {/* ── Canvas Reveal Background ── */}
      <div className="absolute inset-0 z-0">
        {initialCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={3}
              // Handasiyan gold + deep green as dual-color dot palette
              colors={[
                [212, 175, 55],   // #d4af37 gold
                [6, 78, 75],      // #064e4b deep teal
              ]}
              dotSize={5}
              reverse={false}
              showGradient={true}
            />
          </div>
        )}

        {reverseCanvasVisible && (
          <div className="absolute inset-0">
            <CanvasRevealEffect
              animationSpeed={4}
              colors={[
                [212, 175, 55],
                [6, 78, 75],
              ]}
              dotSize={5}
              reverse={true}
              showGradient={true}
            />
          </div>
        )}

        {/* Radial vignette to keep card readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(3,15,10,0.55)_0%,_rgba(3,15,10,0.85)_70%,_rgba(3,15,10,1)_100%)]" />
      </div>

      {/* ── Ambient orbs (original design, kept) ── */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#064e4b]/20 blur-3xl z-0"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#d4af37]/5 blur-3xl z-0"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* ── Form Card ── */}
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
                <Link
                  to="/reset-password"
                  name="reset-password-link"
                  className="text-white/30 hover:text-[#d4af37] text-[10px] uppercase tracking-wider transition-colors"
                >
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
              <span className="bg-[#0b1612] px-4 text-white/20 text-[10px] uppercase tracking-[0.3em] absolute">
                Or continue with
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                try {
                  setReverseCanvasVisible(true);
                  setTimeout(() => setInitialCanvasVisible(false), 50);
                  await signInWithGoogle();
                  setTimeout(() => navigate("/"), 1800);
                } catch (err) {
                  setReverseCanvasVisible(false);
                  setInitialCanvasVisible(true);
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
              <span className="text-xs uppercase tracking-widest font-semibold">
                Google Account
              </span>
            </motion.button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            custom={0.7}
            className="text-center mt-10 text-white/30 text-xs tracking-wider"
          >
            New to Handasiyan?{" "}
            <Link
              to="/signup"
              className="text-[#d4af37] hover:text-[#b8962d] font-bold transition-colors ml-1"
            >
              Create an account
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
