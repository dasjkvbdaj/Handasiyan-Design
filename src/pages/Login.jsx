// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

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

  // Human-friendly error messages
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
  //
  // --- Inline Style Objects ---
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      fontFamily: "sans-serif",
    },
    card: {
      width: "100%",
      maxWwidth: "400px",
      padding: "2rem",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      backgroundColor: "#fff",
    },
    title: { textAlign: "center", marginBottom: "0.5rem", color: "#333" },
    subtitle: {
      textAlign: "center",
      color: "#666",
      marginBottom: "1.5rem",
      fontSize: "0.9rem",
    },
    error: {
      backgroundColor: "#ffebee",
      color: "#c62828",
      padding: "0.8rem",
      borderRadius: "4px",
      marginBottom: "1rem",
      fontSize: "0.85rem",
      border: "1px solid #ffcdd2",
    },
    group: { marginBottom: "1.2rem" },
    label: {
      display: "block",
      marginBottom: "0.4rem",
      fontWeight: "600",
      fontSize: "0.9rem",
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "6px",
      border: "1px solid #ccc",
      boxSizing: "border-box", // Crucial for padding
    },
    button: {
      width: "100%",
      padding: "0.8rem",
      backgroundColor: loading ? "#9fa8da" : "#3f51b5",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    but:{
      backgroundColor:"red"
    },
    footer: {
      marginTop: "1.5rem",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#555",
    },
  };
  //
  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Sign in to your account</p>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.group}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
     {/* ✅ ADD THIS LINK HERE */}
          <Link to="/reset-password" style={styles.but}>
            Forgot Password?
          </Link> 
        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#3f51b5", textDecoration: "none" }}
          >
            Create one
          </Link>
        </p>
      </form>
        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
              navigate("/dashboard");
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Continue with Google
        </button>
    </div>
  );
};

export default Login;
