import { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!formData.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Enter a valid email.";
    if (formData.phone && !/^\+?[0-9\-\s]{7,15}$/.test(formData.phone)) return "Enter a valid phone number.";
    if (formData.message.trim().length < 10) return "Message should be at least 10 characters.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setFeedback({ type: "error", text: error });
      return;
    }

    setSubmitting(true);
    setFeedback({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Request failed");
      setFeedback({ type: "success", text: result.message || "Message sent successfully." });
      setFormData({ name: "", email: "", message: "", phone: "" });
    } catch (error) {
      console.error("Error:", error);
      setFeedback({ type: "error", text: error.message || "Something went wrong." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="Contact" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
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
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "100px 40px",
        position: "relative",
        backgroundColor:"rgba(5, 5, 5, 0.06)",
        backdropFilter: "blur(10px)",
        border: "0.25px solid rgba(0, 213, 255, 0.15)",
        zIndex: 5
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "80px"
        }}>
          <div style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "rgba(0, 212, 255, 0.1)",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "50px",
            fontSize: "1rem",
            color: "#00d4ff",
            marginBottom: "30px",
            fontWeight: 600
          }}>
             Get In Touch
          </div>
          
          <h2 style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 700,
            margin: "0 0 25px 0",
            background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em"
          }}>
            Contact Our <span style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}>Experts</span>
          </h2>
          
          <p style={{
            fontSize: "1.2rem",
            color: "rgba(250, 247, 247, 0.7)",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Ready to transform your security operations? Our enterprise specialists are here to help you get started.
          </p>
        </div>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start"
        }}>
          {/* Contact Form */}
          <div className="form-box" style={{
            background: "linear-gradient(135deg, rgba(249, 249, 249, 0.29) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(25px)",
            borderRadius: "24px",
            padding: "40px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            transition: "all 0.3s ease",
            position: "relative",
            overflow: "hidden"
          }}>
            <h3 style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit} noValidate style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px"
            }}>
              <div>
                <label htmlFor="name" style={{
                  display: "block",
                  color: "#ffffff",
                  fontWeight: 600,
                  marginBottom: "8px",
                  fontSize: "0.95rem"
                }}>Full Name *</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
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
                <label htmlFor="email" style={{
                  display: "block",
                  color: "#ffffff",
                  fontWeight: 600,
                  marginBottom: "8px",
                  fontSize: "0.95rem"
                }}>Business Email *</label>
                <input
                  id="email"
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
                <label htmlFor="message" style={{
                  display: "block",
                  color: "#ffffff",
                  fontWeight: 600,
                  marginBottom: "8px",
                  fontSize: "0.95rem"
                }}>Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your security requirements and how we can help..."
                  required
                  rows={5}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#ffffff",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)",
                    resize: "vertical",
                    minHeight: "120px"
                  }}
                ></textarea>
              </div>

              {feedback.text && (
                <div className={`form-feedback ${feedback.type}`} style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  background: feedback.type === "error" 
                    ? "rgba(239, 68, 68, 0.1)" 
                    : "rgba(34, 197, 94, 0.1)",
                  color: feedback.type === "error" 
                    ? "#fca5a5" 
                    : "#86efac",
                  border: `1px solid ${feedback.type === "error" 
                    ? "rgba(239, 68, 68, 0.2)" 
                    : "rgba(34, 197, 94, 0.2)"}`
                }}>
                  {feedback.text}
                </div>
              )}

              <button 
                type="submit" 
                disabled={submitting} 
                aria-busy={submitting}
                style={{
                  padding: "18px 32px",
                  borderRadius: "12px",
                  background: submitting 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  border: "none",
                  cursor: submitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: submitting 
                    ? "none" 
                    : "0 20px 40px rgba(0, 212, 255, 0.3)",
                  opacity: submitting ? 0.7 : 1
                }}
              >
                {submitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          </div>
          
          {/* Contact Information */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px"
          }}>
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(25px)",
              borderRadius: "24px",
              padding: "40px 30px",
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
                marginBottom: "20px",
                border: "1px solid rgba(0, 212, 255, 0.3)"
              }}>
                📧
              </div>
              <h3 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 600 }}>Email Us</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0, fontSize: "1rem" }}>
                enterprise@guardeye.com<br />
                support@guardeye.com
              </p>
            </div>
            
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(25px)",
              borderRadius: "24px",
              padding: "40px 30px",
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
                marginBottom: "20px",
                border: "1px solid rgba(34, 197, 94, 0.3)"
              }}>
                📞
              </div>
              <h3 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 600 }}>Call Us</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0, fontSize: "1rem" }}>
                +1 (800) GUARD-EYE<br />
                +1 (800) 482-7339
              </p>
            </div>
            
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(25px)",
              borderRadius: "24px",
              padding: "40px 30px",
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
                marginBottom: "20px",
                border: "1px solid rgba(139, 92, 246, 0.3)"
              }}>
                🏢
              </div>
              <h3 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 600 }}>Visit Us</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0, fontSize: "1rem" }}>
                GuardEye Headquarters<br />
                123 Enterprise Blvd<br />
                San Francisco, CA 94105
              </p>
            </div>
            
            <div style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(25px)",
              borderRadius: "24px",
              padding: "40px 30px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #f59e0b20, #f59e0b10)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                marginBottom: "20px",
                border: "1px solid rgba(245, 158, 11, 0.3)"
              }}>
                ⏰
              </div>
              <h3 style={{ color: "#ffffff", marginBottom: "8px", fontSize: "1.2rem", fontWeight: 600 }}>Support Hours</h3>
              <p style={{ color: "rgba(255, 255, 255, 0.7)", margin: 0, fontSize: "1rem" }}>
                24/7 Enterprise Support<br />
                Always Available
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        input:focus, textarea:focus {
          outline: none;
          border-color: rgba(0, 212, 255, 0.4) !important;
          box-shadow: 0 0 0 3px rgba(0, 212, 255, 0.1) !important;
        }
        
        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        button:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.4) !important;
        }
        
        .form-box:hover, .contact-info-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        @media (max-width: 768px) {
          .container > div:first-child {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;