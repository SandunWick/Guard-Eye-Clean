import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert("If an account exists with this email, a password reset link has been sent.");
      setEmail("");
    } catch (error) {
      console.error("Reset error:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <h2>Reset Password</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;