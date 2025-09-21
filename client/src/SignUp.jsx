import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase"; // db = Firestore
import { setDoc, doc, serverTimestamp } from "firebase/firestore"; // Firestore functions
import "./Signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    console.log("Form data submitted:", formData);

    try {
      // 1️⃣ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      console.log("Auth user created:", user);

      // 2️⃣ Update display name in Auth
      await updateProfile(user, { displayName: formData.displayName });
      console.log("Display name updated:", formData.displayName);

      // 3️⃣ Save user details in Firestore
      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.displayName,
          email: formData.email,
          role: "Client",
          status: "Unregistered",
          subscriptionEndDate: null,
          createdAt: serverTimestamp(),
        });
        console.log("User saved in Firestore:", user.uid);
      } catch (firestoreError) {
        console.error("Error saving user in Firestore:", firestoreError);
      }

      // 4️⃣ Notify success and redirect
      alert("Signup successful! You can now log in.");
      window.location.href = "/login";
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="Signup">
      <div className="container">
        <h2>Sign Up</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;