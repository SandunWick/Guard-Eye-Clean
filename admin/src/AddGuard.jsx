import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, serverTimestamp, doc, setDoc, query, where } from "firebase/firestore";
import { db } from "./firebase"; // Firestore instance
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import Tesseract from "tesseract.js";
import { MdOutlineStarPurple500 } from "react-icons/md";

export default function AddGuard() {
  const [name, setName] = useState("");
  const [nicNumber, setNicNumber] = useState(""); // Added NIC input
  const [contactNo, setContactNo] = useState("");
  const [serviceNo, setServiceNo] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [religion, setReligion] = useState("");
  const [fitness, setFitness] = useState("");
  const [background, setBackground] = useState("");
  const [smokeAlkoholFree, setSmokeAlkoholFree] = useState("");
  const [serviceType, setServiceType] = useState([]);
  const [experience, setExperience] = useState("");
  const [jobZone, setJobZone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [gramaniladari, setGramaniladari] = useState ("");
  const [police, setpolice] = useState ("");
  const [medical, setmedical] = useState ("");
  const [nicImage, setNicImage] = useState(null);
  const [duplicateWarning, setDuplicateWarning] = useState(""); // New: for real-time NIC validation

  const GramaPoliceMedicalOptions = [
    { value: "Submited", label: "Submited" },
    { value: "Not-Submited", label: "Not-Submited" },
  ];

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Sinhala", label: "Sinhala" },
    { value: "Tamil", label: "Tamil" },
  ];

  const fitnessOptions = [
    { value: "Average", label: "Average" },
    { value: "High", label: "High" },
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const backgroundOptions = [
    { value: "RetiredMilitary", label: "Retired Military" },
    { value: "RetiredPolice", label: "Retired Police" },
    { value: "RetiredSF", label: "Retired SF" },
    { value: "Other", label: "Other" },
    { value: "None", label: "None" },
  ];

  const smokeOptions = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
  ];

  const serviceTypeOptions = [
    { value: "Event", label: "Event Guard" },
    { value: "Resident", label: "Resident Guard" },
    { value: "VIPEscort", label: "VIP Escort" },
  ];

  const jobZoneOptions = [
    { value: "Ampara", label: "Ampara" },
    { value: "Anuradhapura", label: "Anuradhapura" },
    { value: "Badulla", label: "Badulla" },
    { value: "Batticaloa", label: "Batticaloa" },
    { value: "Colombo", label: "Colombo" },
    { value: "Galle", label: "Galle" },
    { value: "Gampaha", label: "Gampaha" },
    { value: "Hambantota", label: "Hambantota" },
    { value: "Jaffna", label: "Jaffna" },
    { value: "Kalutara", label: "Kalutara" },
    { value: "Kandy", label: "Kandy" },
    { value: "Kegalle", label: "Kegalle" },
    { value: "Kilinochchi", label: "Kilinochchi" },
    { value: "Kurunegala", label: "Kurunegala" },
    { value: "Mannar", label: "Mannar" },
    { value: "Matale", label: "Matale" },
    { value: "Matara", label: "Matara" },
    { value: "Monaragala", label: "Monaragala" },
    { value: "Mullaitivu", label: "Mullaitivu" },
    { value: "Nuwara Eliya", label: "Nuwara Eliya" },
    { value: "Polonnaruwa", label: "Polonnaruwa" },
    { value: "Puttalam", label: "Puttalam" },
    { value: "Ratnapura", label: "Ratnapura" },
    { value: "Trincomalee", label: "Trincomalee" },
    { value: "Vavuniya", label: "Vavuniya" },
  ];

  // Image preprocessing function
  const preprocessImageForOCR = async (imageFile) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Scale image to minimum size for better OCR (300x300 minimum)
        const minSize = 300;
        let { width, height } = img;
        
        if (width < minSize || height < minSize) {
          const scale = Math.max(minSize / width, minSize / height);
          width *= scale;
          height *= scale;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Clear canvas and draw image
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to grayscale for better OCR
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;     // red
          data[i + 1] = avg; // green
          data[i + 2] = avg; // blue
          data[i + 3] = 255; // alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // Convert back to blob
        canvas.toBlob(resolve, 'image/png', 1.0);
      };
      
      img.onerror = () => {
        // If image fails to load, return original file
        resolve(imageFile);
      };
      
      img.src = URL.createObjectURL(imageFile);
    });
  };

  // Enhanced NIC extraction
  const extractNICNumber = (text) => {
    // Clean text more aggressively
    const cleanText = text
      .replace(/[^\w\s]/g, ' ') // Remove special characters
      .replace(/\s+/g, ' ')     // Normalize spaces
      .trim();
    
    console.log("Cleaned OCR Text:", cleanText);
    
    // Strategy 1: Exact 12-digit sequence
    let nicMatch = cleanText.match(/\b\d{12}\b/);
    if (nicMatch) return nicMatch[0];
    
    // Strategy 2: Any 12 consecutive digits
    nicMatch = cleanText.match(/\d{12}/);
    if (nicMatch) return nicMatch[0];
    
    // Strategy 3: Look for patterns like XXXX XXXXXX
    nicMatch = cleanText.match(/(\d{4}\s+\d{7})/);
    if (nicMatch) return nicMatch[1].replace(/\s/g, '');
    
    // Strategy 4: Collect all digits and take first 12
    const allDigits = cleanText.match(/\d/g);
    if (allDigits && allDigits.length >= 12) {
      return allDigits.slice(0, 12).join('');
    }
    
    return null;
  };

  // Enhanced last name extraction
  const extractLastName = (text) => {
    const cleanText = text
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
    
    // Get all potential words
    const words = cleanText
      .split(/\s+/)
      .filter(word => word.length > 2 && /^[a-z]+$/.test(word));
    
    console.log("Potential name words:", words);
    
    // Take the last valid word
    if (words.length > 0) {
      return words[words.length - 1];
    }
    
    return "";
  };

  // Enhanced NIC verification with confidence scoring
  const verifyNIC = (expectedNIC, ocrNIC, fullText) => {
    if (!ocrNIC) return 0;
    
    // Exact match
    if (ocrNIC === expectedNIC) return 1.0;
    
    // Check if expected NIC appears in full text
    const cleanText = fullText.replace(/[^\w\s]/g, ' ').toLowerCase();
    if (cleanText.includes(expectedNIC)) return 0.8;
    
    // Partial match - check if most digits match
    let matchingDigits = 0;
    for (let i = 0; i < Math.min(ocrNIC.length, expectedNIC.length); i++) {
      if (ocrNIC[i] === expectedNIC[i]) matchingDigits++;
    }
    
    const matchRatio = matchingDigits / 12;
    return Math.max(matchRatio * 0.7, 0.1); // Minimum 10% confidence
  };

  // Enhanced name verification
  const verifyName = (expectedLastName, ocrLastName, fullText, allNameParts) => {
    if (!expectedLastName) return 0.5;
    
    const cleanText = fullText.replace(/[^\w\s]/g, ' ').toLowerCase();
    
    // Exact match
    if (ocrLastName === expectedLastName) return 1.0;
    
    // Partial match in last name
    if (ocrLastName.includes(expectedLastName) || expectedLastName.includes(ocrLastName)) {
      return 0.8;
    }
    
    // Full text contains expected name
    if (cleanText.includes(expectedLastName)) return 0.7;
    
    // Any name part found
    const foundParts = allNameParts.filter(part => 
      cleanText.includes(part.toLowerCase())
    );
    
    if (foundParts.length > 0) {
      return 0.4 + (foundParts.length / allNameParts.length) * 0.3;
    }
    
    return 0.1; // Minimum confidence
  };

  // Real-time NIC duplicate check
  useEffect(() => {
    let timeoutId;
    
    const checkNICDuplicate = async () => {
      if (nicNumber.length === 12) {
        try {
          const q = query(collection(db, "guards"), where("nicNumber", "==", nicNumber));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
            // Show warning in UI
            setDuplicateWarning(
              `⚠️ NIC ${nicNumber} already exists! Service No: ${querySnapshot.docs[0].data().serviceNo}`
            );
          } else {
            setDuplicateWarning(""); // Clear warning
          }
        } catch (error) {
          console.error("Error checking NIC:", error);
        }
      } else {
        setDuplicateWarning(""); // Clear warning if not 12 digits
      }
    };

    if (nicNumber.length > 0) {
      timeoutId = setTimeout(checkNICDuplicate, 500); // Debounce 500ms
    }

    return () => clearTimeout(timeoutId);
  }, [nicNumber]);

  useEffect(() => {
    if (gender && birthday) {
      const birthYear = birthday.getFullYear();
      const genderInitial = gender.value === "Male" ? "M" : "F";
      setServiceNo(`${birthYear}-${genderInitial}-XX`);
    } else {
      setServiceNo("");
    }
  }, [gender, birthday]);

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) setFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const expNum = Number(experience);
    if (expNum > 40) {
      alert("Experience cannot exceed 40 years!");
      setIsLoading(false);
      return;
    }

    if (contactNo.length < 10) {
      alert("Invalid phone number!");
      setIsLoading(false);
      return;
    }

    if (!gender || !birthday) {
      alert("Please select gender and birthday to generate service number!");
      setIsLoading(false);
      return;
    }

    if (!nicNumber || nicNumber.length !== 12) {
      alert("Please enter a valid 12-digit NIC number!");
      setIsLoading(false);
      return;
    }

    if (!nicImage) {
      alert("Please upload NIC image!");
      setIsLoading(false);
      return;
    }

    if (!gramaniladari) {
      alert("Please update the gramaniladhari certificate field!");
      setIsLoading(false);
      return;
    }

    if (!police) {
      alert("Please update the police report field!");
      setIsLoading(false);
      return;
    }

    if (!medical) {
      alert("Please update the medical report field!");
      setIsLoading(false);
      return;
    }

    try {
      // 🚨 Check for duplicate NIC number first
      const nicQuery = await getDocs(
        query(collection(db, "guards"), where("nicNumber", "==", nicNumber))
      );
      
      if (!nicQuery.empty) {
        // Duplicate NIC found - show existing record details
        const existingDoc = nicQuery.docs[0];
        const existingData = existingDoc.data();
        const existingServiceNo = existingData.serviceNo || "Unknown";
        const existingName = existingData.name || "Unknown";
        
        const shouldContinue = window.confirm(
          `⚠️ Duplicate NIC Number Detected!\n\n` +
          `NIC: ${nicNumber}\n` +
          `Already registered as:\n` +
          `• Service No: ${existingServiceNo}\n` +
          `• Name: ${existingName}\n\n` +
          `Do you want to continue anyway? (This will create a duplicate record)`
        );
        
        if (!shouldContinue) {
          setIsLoading(false);
          return;
        }
        
        console.log("⚠️ User chose to continue with duplicate NIC");
      }

      // Preprocess image for better OCR results
      const processedImage = await preprocessImageForOCR(nicImage);
      
      // OCR on processed image
      alert("Processing OCR... Please ensure your NIC image is clear and well-lit.");
      
      const { data: { text } } = await Tesseract.recognize(processedImage, "eng", { 
        logger: (m) => console.log(m),
        tessedit_char_whitelist: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ",
        tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
        tessedit_ocr_engine_mode: '1',
      });
      
      console.log("OCR Text:", text);

      // More robust NIC number extraction
      let ocrNicNumber = extractNICNumber(text);
      console.log("Extracted NIC Number:", ocrNicNumber);

      // More robust name extraction
      const enteredNameParts = name.split(/\s+/).filter(part => part.length > 0);
      const enteredLastName = enteredNameParts.length > 0 ? enteredNameParts[enteredNameParts.length - 1].toLowerCase() : "";
      
      let ocrLastName = extractLastName(text);
      console.log("OCR Last Name:", ocrLastName);
      console.log("Entered Last Name:", enteredLastName);

      // Enhanced verification with confidence scoring
      const nicConfidence = verifyNIC(nicNumber, ocrNicNumber, text);
      const nameConfidence = verifyName(enteredLastName, ocrLastName, text, enteredNameParts);
      const combinedConfidence = (nicConfidence + nameConfidence) / 2;
      
      console.log("NIC Confidence:", nicConfidence);
      console.log("Name Confidence:", nameConfidence);
      console.log("Combined Confidence:", combinedConfidence);

      // Track manual override
      let manualOverride = false;
      
      if (combinedConfidence < 0.6) {
        const userConfirm = window.confirm(
          `⚠️ OCR confidence is low (${Math.round(combinedConfidence * 100)}%).\n\n` +
          `Expected NIC: ${nicNumber}\nOCR Found: ${ocrNicNumber || 'None'}\n\n` +
          `Expected Name: ${enteredLastName}\nOCR Found: ${ocrLastName || 'None'}\n\n` +
          `Would you like to continue anyway?`
        );
        
        if (!userConfirm) {
          setIsLoading(false);
          return;
        }
        
        manualOverride = true;
      }

      // Generate sequential number for Service Number
      const querySnapshot = await getDocs(collection(db, "guards"));
      const count = querySnapshot.size;
      const sequentialNum = (count + 1).toString().padStart(4, "0");
      
      const birthYear = birthday.getFullYear();
      const genderInitial = gender.value === "Male" ? "M" : "F";
      const generatedServiceNo = `${birthYear}-${genderInitial}-${sequentialNum}`;
      
      console.log("Generated Service Number:", generatedServiceNo);

      // Create document reference
      const guardDocRef = doc(db, "guards", generatedServiceNo);
      
      // Save guard data - Essential fields only
      await setDoc(guardDocRef, {
        serviceNo: generatedServiceNo,
        nicNumber: nicNumber,
        name,
        contactNo,
        gender: gender ? gender.value : null,
        birthday: birthday ? birthday.toISOString().split("T")[0] : null,
        languages: languages.map((lang) => lang.value),
        religion,
        fitness: fitness ? fitness.value : null,
        background: background ? background.value : null,
        smokeAlkoholFree: smokeAlkoholFree ? smokeAlkoholFree.value : null,
        serviceType: serviceType.map((s) => s.value),
        experience,
        jobZone: jobZone ? jobZone.value : null,
        address,
        gramaniladari: gramaniladari ? gramaniladari.value : null,
        police: police ? police.value : null,
        medical: medical ? medical.value : null,
        createdAt: serverTimestamp(),
        // Minimal OCR verification
        ocrVerified: combinedConfidence >= 0.6,
        manualOverride: manualOverride,
        // 🚨 Flag for duplicate NIC
        isDuplicateNIC: !nicQuery.empty,
        duplicateNICServiceNo: nicQuery.empty ? null : nicQuery.docs[0].data().serviceNo,
        duplicateNICName: nicQuery.empty ? null : nicQuery.docs[0].data().name,
      }, { merge: true });

      const statusMessage = `✅ Guard ${name} (Service No: ${generatedServiceNo}) was added successfully!\n` +
        `OCR Confidence: ${Math.round(combinedConfidence * 100)}%\n` +
        (!nicQuery.empty ? `⚠️ Duplicate NIC flagged` : `✅ NIC is unique`);
      
      alert(statusMessage);

      // Reset fields
      setName("");
      setNicNumber("");
      setContactNo("");
      setGender("");
      setBirthday(null);
      setLanguages([]);
      setReligion("");
      setFitness("");
      setBackground("");
      setSmokeAlkoholFree("");
      setServiceType([]);
      setExperience("");
      setJobZone("");
      setAddress("");
      setServiceNo("");
      setNicImage(null);
      setGramaniladari("");
      setpolice("");
      setmedical("");
      setDuplicateWarning("");

    } catch (error) {
      console.error("Error adding guard:", error);
      alert("❌ Error adding guard: " + (error.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h2 className="title-center">Guard Registration</h2>
      <div className="verification-form-addGuard">
        <form onSubmit={handleSubmit}>
          {/* Guard Name */}
          <div className="form-guard-name">
            <label>Guard Name:<MdOutlineStarPurple500 /> </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-guard-name"
              placeholder="Enter full name (e.g., John Wick)"
            />
          </div>

          {/* NIC Number - Added new field */}
          <div className="form-guard-name">
            <label>NIC Number:<MdOutlineStarPurple500 /></label>
            <input
              type="text"
              value={nicNumber}
              onChange={(e) => setNicNumber(e.target.value.replace(/\D/g, ''))} // Only allow digits
              maxLength={12}
              required
              className="input-guard-name"
              placeholder="Enter 12-digit NIC number (e.g., 123456789012)"
            />
            {nicNumber.length === 12 && (
              <small style={{color: 'green'}}>✓ Valid NIC format</small>
            )}
            {/* Real-time duplicate warning */}
            {duplicateWarning && (
              <small style={{color: 'orange', fontWeight: 'bold'}}>{duplicateWarning}</small>
            )}
          </div>

          {/* Service Number Display - Read only */}
          <div className="form-guard-name">
            <label>Service Number (Document ID):</label>
            <input
              type="text"
              value={serviceNo}
              readOnly
              className="input-service-number"
              placeholder="Select gender and birthday to generate"
            />
            <small style={{color: 'gray'}}>This will be used as the unique document ID</small>
          </div>

          {/* Gender */}
          <div className="form-row">
            <div className="form-gender">
              <label>Gender:<MdOutlineStarPurple500 /></label>
              <Select
                value={gender}
                options={genderOptions}
                onChange={setGender}
                className="select-gender"
                classNamePrefix="react-select"
                required
              />
            </div>
          </div>

          {/* Birthday & Contact */}
          <div className="form-row">
            <div className="form-birthday">
              <label>Birthday:<MdOutlineStarPurple500 /></label>
              <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)}
                dateFormat="yyyy-MM-dd"
                maxDate={new Date("2007-01-31")}
                minDate={new Date("1965-01-01")}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={35}
                placeholderText="Select birthday"
                required
                className="datepicker-birthday"
              />
            </div>
            <div className="form-contact-number">
              <label>Contact Number:<MdOutlineStarPurple500 /></label>
              <PhoneInput
                country={"lk"}
                value={contactNo}
                onChange={(phone) => setContactNo(phone)}
                inputStyle={{ width: "100%" }}
                enableAreaCodes={true}
                countryCodeEditable={true}
                inputClass="input-contact-number"
              />
            </div>
          </div>

          {/* Address & Religion */}
          <div className="form-row">
            <div className="form-address">
              <label>Address:<MdOutlineStarPurple500 /></label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="input-address"
                placeholder="Enter guard's address"
              />
            </div>
            <div className="form-religion">
              <label>Religion:</label>
              <input
                type="text"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
                placeholder="Not required"
                className="input-religion"
              />
            </div>
          </div>

          {/* Fitness & Background */}
          <div className="form-row">
            <div className="form-physical-fitness">
              <label>Wellness:<MdOutlineStarPurple500 /></label>
              <Select
                value={fitness}
                options={fitnessOptions}
                onChange={setFitness}
                required
                className="select-physical-fitness"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-background">
              <label>Recent Resignation:<MdOutlineStarPurple500 /></label>
              <Select
                value={background}
                options={backgroundOptions}
                onChange={setBackground}
                required
                className="select-background"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <br></br>
          {/* Smoke & Service Type */}
          <div className="form-row">
            <div className="form-smoke-alcohol-free">
              <label>Smoke Alcohol Free:<MdOutlineStarPurple500 /></label>
              <Select
                value={smokeAlkoholFree}
                options={smokeOptions}
                onChange={setSmokeAlkoholFree}
                required
                className="select-smoke-alcohol-free"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-service-type">
              <label>Service Type:<MdOutlineStarPurple500 /></label>
              <Select
                isMulti
                options={serviceTypeOptions}
                value={serviceType}
                onChange={setServiceType}
                required
                className="select-service-type"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <br></br>
          {/* Experience & Job Zone */}
          <div className="form-row">
            <div className="form-experience">
              <label>Experience (years):<MdOutlineStarPurple500 /></label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                min="0"
                max="35"
                required
                className="input-experience"
              />
            </div>
            <div className="form-job-zone">
              <label>Job Zone:<MdOutlineStarPurple500 /></label>
              <Select
                value={jobZone}
                options={jobZoneOptions}
                onChange={setJobZone}
                required
                className="select-job-zone"
                classNamePrefix="react-select"
              />
            </div>
          </div>
      
          {/* Languages */}
          <div className="form-row">
            <div className="form-languages">
              <label>Languages:<MdOutlineStarPurple500 /></label>
              <Select
                isMulti
                options={languageOptions}
                value={languages}
                onChange={setLanguages}
                placeholder="Select languages"
                className="select-languages"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-medical">
              <label>Medical Report:<MdOutlineStarPurple500 /></label>
              <Select
                value={medical}
                options={GramaPoliceMedicalOptions}
                onChange={setmedical}
                required
                className="select-job-zone"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <br></br>
          <div className="form-row">
            <div className="form-languages">
              <label>Police Report:<MdOutlineStarPurple500 /></label>
              <Select
                options={GramaPoliceMedicalOptions}
                value={police}
                onChange={setpolice}
                placeholder="Select "
                className="select-languages"
                classNamePrefix="react-select"
              />
            </div>
            <div className="form-medical">
              <label>Gramaniladhari Certificate:<MdOutlineStarPurple500 /></label>
              <Select
                value={gramaniladari}
                options={GramaPoliceMedicalOptions}
                onChange={setGramaniladari}
                required
                className="select-job-zone"
                classNamePrefix="react-select"
              />
            </div>
          </div>
          <br></br>
          {/* NIC Image for OCR */}
          <div className="form-row">
            <div className="form-nic">
              <label>NIC Image (for verification only):<MdOutlineStarPurple500 /></label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, setNicImage)}
                className="input-file"
                required
              />
              {nicImage && (
                <small style={{color: 'green'}}>✓ NIC image uploaded</small>
              )}
            </div>
          </div>

          <button type="submit" className="check-button" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Guard"}
          </button>
        </form>
      </div>
    </>
  );
}