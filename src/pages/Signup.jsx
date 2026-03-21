// src/pages/Signup.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup,signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation
    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    setLoading(true);

    try {
      await signup(email, password);
      navigate("/dashboard"); // redirect after signup
    } catch (err) {
      setError(getFirebaseError(err.code));
    } finally {
      setLoading(false);
    }
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
// 
// --- Inline Style Objects ---
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "80vh",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f7f6",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "2.5rem",
      borderRadius: "12px",
      boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      backgroundColor: "#fff",
    },
    title: { textAlign: "center", marginBottom: "0.5rem", color: "#222" },
    subtitle: { textAlign: "center", color: "#777", marginBottom: "1.5rem", fontSize: "0.95rem" },
    error: {
      backgroundColor: "#fff1f0",
      color: "#d32f2f",
      padding: "10px",
      borderRadius: "6px",
      marginBottom: "1rem",
      fontSize: "0.85rem",
      border: "1px solid #ffa39e",
      textAlign: "center"
    },
    group: { marginBottom: "1rem" },
    label: { display: "block", marginBottom: "0.5rem", fontWeight: "600", fontSize: "0.85rem", color: "#444" },
    input: {
      width: "100%",
      padding: "0.8rem",
      borderRadius: "8px",
      border: "1px solid #ddd",
      boxSizing: "border-box",
      fontSize: "1rem",
    },
    but:{
        backgroundColor:"red"
    },
    button: {
      width: "100%",
      padding: "0.9rem",
      backgroundColor: loading ? "#a0aec0" : "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      cursor: loading ? "not-allowed" : "pointer",
      fontWeight: "600",
      fontSize: "1rem",
      marginTop: "1rem",
      transition: "background-color 0.2s",
    },
    footer: { marginTop: "1.5rem", textAlign: "center", fontSize: "0.9rem", color: "#666" },
    link: { color: "#2563eb", textDecoration: "none", fontWeight: "600" }
  };
// 
  return (
    <div style={styles.container}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join us today — it's free</p>

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
            placeholder="Min. 6 characters"
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            required
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p style={styles.footer}>
          Already have an account? <Link to="/login" style={styles.link}>Sign in</Link>
        </p>
      </form>
      <button
  type="button"
  style={styles.but}
  onClick={async () => {
    try {
      await signInWithGoogle();
      navigate("/");
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

export default Signup;
