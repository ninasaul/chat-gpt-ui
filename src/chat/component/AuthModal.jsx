// src/components/AuthModal.js
import React, { useState } from "react";
import { Modal, Button, Input, Icon } from "@/components";
import { auth, googleProvider } from "../context/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// You can use a Google SVG or Font Awesome
const googleIconUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/225px-Google_%22G%22_logo.svg.png";

export function AuthModal({ visible, onClose, onSignUpSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const saveUserToMongoDB = async (user) => {
    try {
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        emailVerified: user.emailVerified,
        authProvider: user.providerData[0]?.providerId || 'email'
      };

      const response = await fetch('http://localhost:3001/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      const data = await response.json();
      console.log('User saved to MongoDB:', data);
    } catch (error) {
      console.error('Error saving user to MongoDB:', error);
      // Don't throw the error as we still want to proceed with the signup flow
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (!isLogin) {
        // Save user data to MongoDB for new sign ups
        await saveUserToMongoDB(result.user);
        // If it's a sign up flow, trigger the profile creation
        onSignUpSuccess();
      }
      onClose();
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        console.warn("User closed the Google sign-in popup.");
      } else {
        console.error("Error during Google sign-in:", err.message);
      }
    }
  };

  const handleEmailAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Save user data to MongoDB for new sign ups
        await saveUserToMongoDB(result.user);
        // After successful sign up, trigger the profile creation
        onSignUpSuccess();
        onClose();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Inline Styles for Modal
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    buttonGoogle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#d6e0f2",
      color: "black",
      border: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    googleIcon: {
      width: "18px",
      height: "18px",
      marginRight: "8px",
    },
    separator: {
      display: "flex",
      alignItems: "center",
      margin: "16px 0",
      color: "#aaa",
      fontSize: "12px",
      textTransform: "uppercase",
    },
    separatorLine: {
      flex: 1,
      height: "1px",
      backgroundColor: "#ddd",
    },
    input: {
      padding: "10px",
      fontSize: "14px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      outline: "none",
    },
    error: {
      color: "red",
      fontSize: "12px",
      textAlign: "center",
      marginTop: "10px",
    },
    toggle: {
      textAlign: "center",
      fontSize: "14px",
      color: "#555",
    },
    toggleLink: {
      color: "#007BFF",
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "4px",
    },
    submitButton: {
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      padding: "10px",
      borderRadius: "5px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={isLogin ? "Login" : "Sign Up"}
    >
      <div style={styles.container}>
        {/* Google Sign-In Button */}
        <button style={styles.buttonGoogle} onClick={handleGoogleSignIn}>
          <img
            src={googleIconUrl}
            alt="Google Icon"
            style={styles.googleIcon}
          />
          Continue with Google
        </button>

        {/* Separator */}
        <div style={styles.separator}>
          <div style={styles.separatorLine}></div>
          <span>OR</span>
          <div style={styles.separatorLine}></div>
        </div>

        {/* Email Input */}
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && <div style={styles.error}>{error}</div>}

        {/* Submit Button */}
        <button style={styles.submitButton} onClick={handleEmailAuth}>
          {isLogin ? "Login" : "Sign Up"}
        </button>


        {/* Toggle Login/Signup */}
        <div style={styles.toggle}>
          {isLogin ? (
            <>
              Don't have an account?
              <span style={styles.toggleLink} onClick={() => setIsLogin(false)}>
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?
              <span style={styles.toggleLink} onClick={() => setIsLogin(true)}>
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}
