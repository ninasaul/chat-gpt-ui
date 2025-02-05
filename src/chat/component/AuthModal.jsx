// // src/components/AuthModal.js
// import React, { useState } from "react";
// import { Modal, Button, Input, Icon } from "@/components";
// import { auth, googleProvider } from "../context/firebase";
// import {
//   signInWithPopup,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import styles from "./AuthModal.module.less";

// export function AuthModal({ visible, onClose }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

// //   const handleGoogleSignIn = async () => {
// //     try {
// //       await signInWithPopup(auth, googleProvider);
// //       onClose();
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };


// const handleGoogleSignIn = async () => {
//   try {
//     await signInWithPopup(auth, googleProvider);
//     onClose(); // Close the modal if login is successful
//   } catch (err) {
//     if (err.code === "auth/popup-closed-by-user") {
//       console.warn("User closed the Google sign-in popup.");
//       // Do nothing to suppress the error
//     } else {
//       console.error("Error during Google sign-in:", err.message);
//     //   setError("Failed to sign in. Please try again."); // Show message for other errors
//     }
//   }
// };


//   const handleEmailAuth = async () => {
//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//       } else {
//         await createUserWithEmailAndPassword(auth, email, password);
//       }
//       onClose();
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <Modal
//       visible={visible}
//       onClose={onClose}
//       title={isLogin ? "Login" : "Sign Up"}
//     >
//       <div className={styles.authContainer}>
//         <Button
//           type="outline"
//           onClick={handleGoogleSignIn}
//           icon={<Icon type="google" />}
//         >
//           Continue with Google
//         </Button>
//         <div className={styles.separator}>OR</div>
//         <Input
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//         />
//         <Input
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           type="password"
//         />
//         {error && <div className={styles.error}>{error}</div>}
//         <Button onClick={handleEmailAuth}>
//           {isLogin ? "Login" : "Sign Up"}
//         </Button>
//         <div className={styles.toggle}>
//           {isLogin ? (
//             <>
//               Don't have an account?{" "}
//               <span onClick={() => setIsLogin(false)}>Sign Up</span>
//             </>
//           ) : (
//             <>
//               Already have an account?{" "}
//               <span onClick={() => setIsLogin(true)}>Login</span>
//             </>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// }





















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

export function AuthModal({ visible, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
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
