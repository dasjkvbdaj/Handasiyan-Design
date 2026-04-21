import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";
import { sanitizeText } from "../lib/sanitize";

const Profile = () => {
  const { currentUser } = useAuth();

  const [name, setName] = useState(currentUser?.displayName || "");

  const handleUpdate = async () => {
    try {
      const cleanName = sanitizeText(name, 50);
      await updateProfile(currentUser, {
        displayName: cleanName,
      });

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
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
        Edit Profile
      </h2>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          marginBottom: "10px",
          width: "250px"
        }}
      />

      <button
        onClick={handleUpdate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Save
      </button>
    </div>
  );
};

export default Profile;