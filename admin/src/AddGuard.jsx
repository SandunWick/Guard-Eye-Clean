import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore";
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
      // OCR on NIC image
      const { data: { text } } = await Tesseract.recognize(nicImage, "eng", { logger: (m) => console.log(m) });
      console.log("OCR Text:", text);

      const nicMatch = text.match(/\d{12}/);
      const ocrNicNumber = nicMatch ? nicMatch[0] : null;
      console.log("Extracted NIC Number:", ocrNicNumber);

      const ocrWords = text.split(/\s+/).filter((word) => word.length > 0);
      const ocrLastName = ocrWords.length > 0 ? ocrWords[ocrWords.length - 1].toLowerCase() : "";
      console.log("OCR Last Name:", ocrLastName);

      const enteredNameParts = name.split(/\s+/).filter((part) => part.length > 0);
      const enteredLastName = enteredNameParts.length > 0 ? enteredNameParts[enteredNameParts.length - 1].toLowerCase() : "";

      const extractedName = text.match(/Name\s*:\s*([a-zA-Z\s]+)/i)?.[1]?.trim();
      if ((!extractedName || extractedName.toLowerCase() !== name.toLowerCase()) &&
          (!ocrLastName || !enteredLastName || !ocrLastName.includes(enteredLastName) && !text.toLowerCase().includes(enteredLastName))) {
        alert("Name does not match the NIC image! Expected: " + name + ", Found: " + (extractedName || ocrLastName));
        setIsLoading(false);
        return;
      }

      const querySnapshot = await getDocs(collection(db, "guards"));
      const count = querySnapshot.size;
      const sequential = (count + 1).toString().padStart(2, "0");

      const birthYear = birthday.getFullYear();
      const genderInitial = gender.value === "Male" ? "M" : "F";
      const generatedServiceNo = `${birthYear}-${genderInitial}-${sequential}`;

      // Save guard data in Firestore
      await addDoc(collection(db, "guards"), {
        name,
        contactNo,
        serviceNo: generatedServiceNo,
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
        rating: 0,
        jobCount: 0,
        jobStartDate: serverTimestamp(),
        jobEndDate: serverTimestamp(),
        gramaniladari: gramaniladari ? gramaniladari.value : null,
        police: police ? police.value : null,
        medical: medical ? medical.value : null
      });

      alert(`Guard ${name} was added successfully!`);

      // Reset fields
      setName("");
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

    } catch (error) {
      console.error("Error adding guard:", error);
      alert("Error adding guard: " + (error.message || "Unknown error"));
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

          {/* Service No & Gender */}
          <div className="form-row">
            <div className="form-service-number">
              <label>Service Number:</label>
              <input
                type="text"
                value={serviceNo}
                readOnly
                className="input-service-number"
                placeholder="Select gender and birthday to generate"
              />
            </div>
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