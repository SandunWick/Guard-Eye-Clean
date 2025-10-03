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
    <div className="Signup" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Elements */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.08) 0%, transparent 50%)
        `,
        zIndex: 1
      }}></div>
      
      {/* Grid Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        zIndex: 1
      }}></div>
      
      <div className="container" style={{
        maxWidth: "500px",
        width: "100%",
        position: "relative",
        backgroundColor:"rgba(5, 5, 5, 0.06)",
        backdropFilter: "blur(10px)",
        border: "0.25px solid rgba(0, 213, 255, 0.15)",
        zIndex: 5
      }}>
        {/* Logo/Brand section */}
        <div style={{
          textAlign: "center",
          marginBottom: "50px"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #00d4ff, #0099cc)",
            borderRadius: "20px",
            margin: "0 auto 25px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "36px",
            boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)"
          }}>
            🛡️
          </div>
          <h1 style={{
            fontSize: "2.8rem",
            fontWeight: 700,
            margin: "0 0 12px 0",
            background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em"
          }}>
            Guard<span style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}>Eye</span>
          </h1>
          <p style={{
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "1.1rem",
            margin: 0
          }}>
            Enterprise Security Platform
          </p>
        </div>
        
        <div className="form-box" style={{
          background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          backdropFilter: "blur(25px)",
          borderRadius: "24px",
          padding: "40px",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          transition: "all 0.3s ease",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "40px"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              color: "#ffffff",
              margin: "0 0 8px 0"
            }}>Create Your Account</h2>
            <p style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1rem",
              margin: 0
            }}>
              Start your enterprise security journey
            </p>
          </div>
          
          <form onSubmit={handleSubmit} style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            <div>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "8px",
                fontSize: "0.95rem"
              }}>Full Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                placeholder="John Smith"
                required
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "8px",
                fontSize: "0.95rem"
              }}>Business Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                required
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}
              />
            </div>
            
            <div>
              <label style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "8px",
                fontSize: "0.95rem"
              }}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a secure password"
                required
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "#ffffff",
                  fontSize: "1rem",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}
              />
              <div style={{
                fontSize: "0.85rem",
                color: "rgba(255, 255, 255, 0.5)",
                marginTop: "8px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}>
                <span>🔒</span>
                <span>Minimum 6 characters with strong encryption</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{
                padding: "18px 32px",
                borderRadius: "12px",
                background: loading 
                  ? "rgba(255, 255, 255, 0.05)" 
                  : "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
                color: "#ffffff",
                fontWeight: 600,
                fontSize: "1.1rem",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: loading 
                  ? "none" 
                  : "0 20px 40px rgba(0, 212, 255, 0.3)",
                opacity: loading ? 0.7 : 1,
                marginTop: "10px"
              }}
            >
              {loading ? "Creating Account..." : "Create Enterprise Account"}
            </button>
          </form>
          
          <div style={{
            textAlign: "center",
            marginTop: "30px",
            paddingTop: "25px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>
              Already have an account?{" "}
            </span>
            <a 
              href="/login"
              style={{
                color: "#00d4ff",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.95rem",
                transition: "color 0.3s ease"
              }}
            >
              Sign In
            </a>
          </div>
          
          <div style={{
            fontSize: "0.85rem",
            color: "rgba(255, 255, 255, 0.5)",
            textAlign: "center",
            marginTop: "25px",
            lineHeight: 1.5,
            padding: "25px 20px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            transition: "all 0.3s ease"
          }}>
            By creating an account, you agree to our{" "}
            <span style={{ color: "#00d4ff", cursor: "pointer" }}>Terms of Service</span> and{" "}
            <span style={{ color: "#00d4ff", cursor: "pointer" }}>Privacy Policy</span>
            <br />
            <span style={{ marginTop: "8px", display: "inline-block" }}>
              🔒 SOC 2 Type II Compliant • Enterprise-grade Security
            </span>
          </div>
        </div>
        
        {/* Features preview */}
        <div style={{
          marginTop: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          textAlign: "center"
        }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(25px)",
            borderRadius: "20px",
            padding: "30px 20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              background: "linear-gradient(135deg, #00d4ff20, #00d4ff10)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 15px",
              border: "1px solid rgba(0, 212, 255, 0.3)"
            }}>
              🔒
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1rem", fontWeight: 600 }}>
              Enterprise Security
            </div>
          </div>
          <div style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(25px)",
            borderRadius: "20px",
            padding: "30px 20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              background: "linear-gradient(135deg, #22c55e20, #22c55e10)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 15px",
              border: "1px solid rgba(34, 197, 94, 0.3)"
            }}>
              ⚡
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1rem", fontWeight: 600 }}>
              Instant Setup
            </div>
          </div>
          <div style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(25px)",
            borderRadius: "20px",
            padding: "30px 20px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              background: "linear-gradient(135deg, #8b5cf620, #8b5cf610)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              margin: "0 auto 15px",
              border: "1px solid rgba(139, 92, 246, 0.3)"
            }}>
              🎯
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.9)", fontSize: "1rem", fontWeight: 600 }}>
              24/7 Support
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        input:focus {
          outline: none;
          border-color: rgba(0, 212, 255, 0.4) !important;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1) !important;
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        button[type="submit"]:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.4) !important;
        }
        
        a:hover {
          color: #4facfe !important;
        }
        
        .form-box:hover, .features-preview > div:hover {
          transform: translateY(-8px);
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

export default SignUp;