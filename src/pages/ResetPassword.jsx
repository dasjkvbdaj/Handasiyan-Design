import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for reset instructions.");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

return (
  <div style={{ 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    padding: "20px", 
    fontFamily: "Arial, sans-serif" 
  }}>
    <h2 style={{ 
      color: "#333", 
      marginBottom: "15px" 
    }}>
      Reset Password
    </h2>

    <form 
      onSubmit={handleReset} 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "10px", 
        width: "280px" 
      }}
    >
      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ 
          padding: "10px", 
          border: "1px solid #ccc", 
          borderRadius: "5px" 
        }}
      />

      <button 
        type="submit" 
        style={{ 
          padding: "10px 20px", 
          backgroundColor: "#007BFF", 
          color: "white", 
          border: "none", 
          borderRadius: "5px", 
          cursor: "pointer" 
        }}
      >
        Send Reset Link
      </button>
    </form>

    {message && (
      <p style={{ 
        marginTop: "15px", 
        color: "green", 
        fontWeight: "bold" 
      }}>
        {message}
      </p>
    )}
  </div>
);
};

export default ResetPassword;