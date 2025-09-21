import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Tesseract from "tesseract.js";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { auth, db } from "./firebase";
import { MdOutlineStarPurple500 } from "react-icons/md";

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nicNumber: "",
    name: "",
    mobile: "",
    city: "",
    postalCode: "",
    nicImage: null,
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Current user:", user.uid);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData(data);
            console.log("User data from Firestore:", data);
            setFormData({
              nicNumber: data.nicNumber || "",
              name: data.name || "",
              mobile: data.mobile || "",
              city: data.city || "",
              postalCode: data.postalCode || "",
              nicImage: null,
            });
          } else {
            setError("User data not found in Firestore.");
            console.log("No such document in Firestore!");
          }
        } catch (err) {
          setError("Error fetching user data: " + err.message);
          console.error("Firestore error:", err);
        }
      } else {
        setError("No user is signed in.");
        console.log("No authenticated user.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const isValidPhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);
    return phoneNumber ? phoneNumber.isValid() : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData || !auth.currentUser) {
      alert("No authenticated user. Please log in.");
      return;
    }

    if (!formData.nicImage) {
      alert("Please upload NIC image.");
      return;
    }

    if (!isValidPhoneNumber(formData.mobile)) {
      alert("Invalid mobile number! Please include country code and enter a valid number.");
      return;
    }

    setFormLoading(true);
    alert("Processing OCR...");
    try {
      const { data: { text } } = await Tesseract.recognize(formData.nicImage, "eng");
      console.log("OCR Text:", text);

      const nicMatch = text.match(/\d{12}/);
      const ocrNicNumber = nicMatch ? nicMatch[0] : null;
      console.log("Extracted NIC Number:", ocrNicNumber);

      const ocrWords = text.split(/\s+/).filter(word => word.length > 0);
      const ocrLastName = ocrWords.length > 0 ? ocrWords[ocrWords.length - 1].toLowerCase() : "";
      console.log("OCR Last Name:", ocrLastName);

      const enteredNameParts = formData.name.split(/\s+/).filter(part => part.length > 0);
      const enteredLastName = enteredNameParts.length > 0 ? enteredNameParts[enteredNameParts.length - 1].toLowerCase() : "";

      if (!ocrNicNumber || ocrNicNumber !== formData.nicNumber) {
        alert("❌ NIC number does not match the image. Expected: " + formData.nicNumber + ", Found: " + ocrNicNumber);
        setFormLoading(false);
        return;
      }

      if (!ocrLastName || !enteredLastName || !ocrLastName.includes(enteredLastName) && !text.toLowerCase().includes(enteredLastName)) {
        alert("❌ Last part of the name does not match the image. Expected: " + enteredLastName + ", Found: " + ocrLastName);
        setFormLoading(false);
        return;
      }

      alert("NIC verified. Updating Firestore...");
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        nicNumber: formData.nicNumber,
        name: formData.name,
        mobile: formData.mobile,
        city: formData.city,
        postalCode: formData.postalCode,
        status: "Registered",
        verified: true,
      });

      setUserData({
        ...userData,
        nicNumber: formData.nicNumber,
        name: formData.name,
        mobile: formData.mobile,
        city: formData.city,
        postalCode: formData.postalCode,
        status: "Registered",
        verified: true,
      });
      setShowForm(false);
      alert("Registration successful!");

      try {
        console.log('Attempting to send welcome email to:', userData.email);
        const response = await fetch('http://localhost:5000/send-welcome-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: userData.email,
            message: "Welcome to GuardEye, You have registered to GuardEye successfully",
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          console.log('Welcome email sent successfully.');
        } else {
          console.error('Failed to send welcome email:', data.message);
          alert('Registration successful, but failed to send welcome email: ' + data.message);
        }
      } catch (emailErr) {
        console.error('Error sending welcome email:', emailErr);
        alert('Registration successful, but error sending welcome email: ' + emailErr.message);
      }
    } catch (err) {
      console.error("Error during verification:", err);
      alert("❌ Error during verification: " + err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleRegister = () => {
    setShowForm(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  return (
    <>
      <h2 className="title-center">User Profile</h2>
      <div className="profile-container">
        {userData.status === "Unregistered" && !showForm ? (
          <>
            <h2 className="messages">You have not registered yet!</h2>
            <button onClick={handleRegister} className="check-button-register">
              Register
            </button>
          </>
        ) : userData.status === "Registered" ? (
          <>
            <h1 className="welcomeMsg">Welcome {userData.name}!</h1>
            <div className="messages-1">
              <p>E-Mail : {userData.email}</p>
              <p>NIC Number : {userData.nicNumber}</p>
              <p>Mobile Number : {userData.mobile}</p>
              <p>City : {userData.city}</p>
            </div>
          </>
        ) : (
          <div className="verification-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label">
                  Name<MdOutlineStarPurple500 />
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter full name (e.g., John Wick)"
                />
              </div>

              <div className="form-group">
                <label className="label">
                  NIC Number<MdOutlineStarPurple500 />
                </label>
                <input
                  type="text"
                  name="nicNumber"
                  value={formData.nicNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">
                  Mobile Number<MdOutlineStarPurple500 />
                </label>
                <PhoneInput
                  country={"lk"}
                  value={formData.mobile}
                  onChange={(phone) =>
                    setFormData((prev) => ({ ...prev, mobile: phone }))
                  }
                  inputStyle={{ width: "100%" }}
                  enableAreaCodes={true}
                  countryCodeEditable={true}
                  placeholder="Enter mobile number"
                />
              </div>

              <div className="form-group">
                <label className="label">
                  Home City<MdOutlineStarPurple500 />
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="label">
                  Postal Code<MdOutlineStarPurple500 />
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="label">
                  NIC Image<MdOutlineStarPurple500 />
                </label>
                <input
                  type="file"
                  name="nicImage"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              <button type="submit" disabled={formLoading}>
                {formLoading ? "Processing..." : "Verify & Save"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                disabled={formLoading}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;