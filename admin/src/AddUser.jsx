import React, { useState } from "react";
import Tesseract from "tesseract.js";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { db } from "./firebase"; // Firestore config
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { MdOutlineStarPurple500 } from "react-icons/md";
import "./layout.css"; 

function AddUser() {
  const [email, setEmail] = useState("");
  const [userDocId, setUserDocId] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [nicImage, setNicImage] = useState(null);

  const handleEmailCheck = async () => {
    alert("Checking user email...");
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("❌ No user found with this email.");
        setUserDocId("");
        return;
      }

      const docData = querySnapshot.docs[0];
      setUserDocId(docData.id);
      alert("User found. Enter details and NIC image.");
    } catch (error) {
      console.error(error);
      alert("❌ Error checking email.");
    }
  };

  const isValidPhoneNumber = (phone) => {
    const phoneNumber = parsePhoneNumberFromString(`+${phone}`);
    return phoneNumber ? phoneNumber.isValid() : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDocId) {
      alert("Please check user email first.");
      return;
    }

    if (!nicImage) {
      alert("Please upload NIC image.");
      return;
    }

    if (!isValidPhoneNumber(mobile)) {
      alert("Invalid mobile number! Please include country code and enter a valid number.");
      return;
    }

    alert("Processing OCR...");
    try {
      const { data: { text } } = await Tesseract.recognize(nicImage, "eng");
      console.log("OCR Text:", text); // Debug: Log the full OCR output

      // Extract NIC number (flexible regex to handle spaces or line breaks)
      const nicMatch = text.match(/\d{12}/);
      const ocrNicNumber = nicMatch ? nicMatch[0] : null;
      console.log("Extracted NIC Number:", ocrNicNumber);

      // Extract last word as surname from OCR text
      const ocrWords = text.split(/\s+/).filter(word => word.length > 0);
      const ocrLastName = ocrWords.length > 0 ? ocrWords[ocrWords.length - 1].toLowerCase() : "";
      console.log("OCR Last Name:", ocrLastName);

      // Get the last part of the entered name
      const enteredNameParts = name.split(/\s+/).filter(part => part.length > 0);
      const enteredLastName = enteredNameParts.length > 0 ? enteredNameParts[enteredNameParts.length - 1].toLowerCase() : "";

      // Verify NIC number
      if (!ocrNicNumber || ocrNicNumber !== nicNumber) {
        alert("❌ NIC number does not match the image. Expected: " + nicNumber + ", Found: " + ocrNicNumber);
        return;
      }

      // Verify last name with more flexibility
      if (!ocrLastName || !enteredLastName || !ocrLastName.includes(enteredLastName) && !text.toLowerCase().includes(enteredLastName)) {
        alert("❌ Last part of the name does not match the image. Expected: " + enteredLastName + ", Found: " + ocrLastName);
        return;
      }

      alert("NIC verified. Updating Firestore...");
      const userRef = doc(db, "users", userDocId);
      await updateDoc(userRef, {
        nicNumber,
        name,
        mobile,
        city,
        postalCode,
        verified: true
      });

      alert("Verification complete & Firestore updated!");
      setNicNumber("");
      setName("");
      setMobile("");
      setCity("");
      setPostalCode("");
      setNicImage(null);
      setEmail("");
      setUserDocId("");
    } catch (error) {
      console.error("❌ Error during verification:", error);
      alert("❌ Error during verification.");
    }
  };

  return (
    <>
      <h2 className="title-center">Client Registration</h2>
      <div className="verification-form">
        {!userDocId && (
          <div className="input-group">
            <label>Client Email:<MdOutlineStarPurple500 /></label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <button type="button" onClick={handleEmailCheck} className="check-button">
              Check Email
            </button>
          </div>
        )}

        {userDocId && (
          <form onSubmit={handleSubmit} >
            <label>NIC Number<MdOutlineStarPurple500 /></label>
            <input type="text" value={nicNumber} onChange={(e) => setNicNumber(e.target.value)} required />

            <label>Name<MdOutlineStarPurple500 /></label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Enter full name (e.g., John Wick)" />

            <label>Mobile Number<MdOutlineStarPurple500 /></label>
            <PhoneInput
              country={'lk'} // default country Sri Lanka
              value={mobile}
              onChange={phone => setMobile(phone)}
              inputStyle={{ width: '100%' }}
              enableAreaCodes={true}
              countryCodeEditable={true}
              placeholder="Enter mobile number"
            />
            <br></br>
            <label>Home City<MdOutlineStarPurple500 /></label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

            <label>Postal Code<MdOutlineStarPurple500 /></label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />

            <label>NIC Image<MdOutlineStarPurple500 /></label>
            <input type="file" accept="image/*" onChange={(e) => setNicImage(e.target.files[0])} />

            <button type="submit" className="check-button">Verify & Save</button>
          </form>
        )}
      </div>
    </>
  );
}

export default AddUser;