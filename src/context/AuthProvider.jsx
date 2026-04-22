// src/context/AuthProvider.jsx
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { AuthContext } from "./authContext";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Only ONE component export in this file ✅
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          let userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            // Centralized user document creation (works for both Signup and Google Sign-In)
            await setDoc(userRef, {
              email: user.email,
              role: "user",
              createdAt: serverTimestamp(),
            });
            userSnap = await getDoc(userRef);
          }

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Error fetching/creating user data:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    signup,
    login,
    logout,
    signInWithGoogle,
    loading,
    isAdmin: userData?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};