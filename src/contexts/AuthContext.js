"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Sign up function
  async function signup(email, password, fullName) {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user profile with the display name
      await updateProfile(result.user, {
        displayName: fullName,
      });

      // Create user profile in localStorage (without mode storage)
      const userProfile = {
        fullName: fullName,
        email: email,
        createdAt: new Date().toISOString(),
        courses: [],
      };

      localStorage.setItem(
        `userProfile_${result.user.uid}`,
        JSON.stringify(userProfile)
      );

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Login function
  async function login(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Logout function
  async function logout() {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      throw error;
    }
  }

  // Get user profile from localStorage
  function getUserProfile(uid) {
    try {
      const profile = localStorage.getItem(`userProfile_${uid}`);
      return profile ? JSON.parse(profile) : null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  // Set current session mode (not persisted)
  function setSessionMode(mode) {
    // Just update local state for current session only
    setUserProfile((prev) => ({
      ...prev,
      currentMode: mode,
    }));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch user profile when user is authenticated
        const profile = getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    user: currentUser, // Add alias for compatibility
    userProfile,
    loading, // Export loading state
    signup,
    login,
    logout,
    setSessionMode,
    getUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
