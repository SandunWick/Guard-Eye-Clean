import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; // Import Firestore instance
import "./layout.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Check role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "Admin") {
          navigate("/dashboard");
        } else {
          throw new Error("Access denied: Only 'Admins' can log in.");
        }
      } else {
        throw new Error("User role not found. Contact support.");
      }
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.tagName !== "BUTTON" && !isLoading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <h2>Admin Login</h2>
        <div className="form-box">
          {isLoading ? (
            <div className="loader">Loading...</div> // Simple loading indicator
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Your Email"
                required
                autoFocus
                disabled={isLoading} // Disable inputs during loading
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                placeholder="Password"
                required
                disabled={isLoading} // Disable inputs during loading
              />
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </button>
            </form>
          )}
          {!isLoading && (
            <p className="forgot-password">
              <Link to="/reset-password">Forgot Password?</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;