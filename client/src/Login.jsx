import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorText('');
    setSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log('Login successful:', userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.message);
      setErrorText(error.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="Login" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
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
        maxWidth: "480px",
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
          overflow: "visible",
          minHeight: "600px"
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
            }}>Welcome Back</h2>
            <p style={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "1rem",
              margin: 0
            }}>
              Sign in to your enterprise account
            </p>
          </div>
          
          <form onSubmit={handleSubmit} noValidate style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px"
          }}>
            <div>
              <label htmlFor="login-email" style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "8px",
                fontSize: "0.95rem"
              }}>Email Address</label>
              <input
                id="login-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@company.com"
                required
                onKeyPress={handleKeyPress}
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
              <label htmlFor="login-password" style={{
                display: "block",
                color: "#ffffff",
                fontWeight: 600,
                marginBottom: "8px",
                fontSize: "0.95rem"
              }}>Password</label>
              <div className="password-field" style={{
                position: "relative"
              }}>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  onKeyPress={handleKeyPress}
                  aria-describedby={errorText ? 'login-error' : undefined}
                  style={{
                    width: "100%",
                    padding: "16px 50px 16px 20px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "rgba(255, 255, 255, 0.05)",
                    color: "#ffffff",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                    backdropFilter: "blur(10px)"
                  }}
                />
                <button
                  type="button"
                  className="toggle-visibility"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "rgba(255, 255, 255, 0.6)",
                    cursor: "pointer",
                    fontSize: "1.1rem",
                    padding: "8px",
                    borderRadius: "6px",
                    transition: "all 0.3s ease"
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {errorText && (
              <div id="login-error" style={{
                padding: "16px 20px",
                borderRadius: "12px",
                fontSize: "0.95rem",
                fontWeight: 500,
                background: "rgba(239, 68, 68, 0.1)",
                color: "#fca5a5",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                textAlign: "center"
              }}>
                {errorText}
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
                opacity: submitting ? 0.7 : 1,
                marginTop: "10px"
              }}
            >
              {submitting ? 'Signing In...' : 'Sign In to Dashboard'}
            </button>
          </form>
          
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            paddingTop: "25px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <Link 
              to="/reset-password"
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "color 0.3s ease"
              }}
            >
              Forgot Password?
            </Link>
            
            <div>
              <span style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.95rem" }}>
                New to GuardEye?{" "}
              </span>
              <Link 
                to="/signup"
                style={{
                  color: "#00d4ff",
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  transition: "color 0.3s ease"
                }}
              >
                Create Account
              </Link>
            </div>
          </div>
          
          {/* Security Badge */}
          <div style={{
            textAlign: "center",
            marginTop: "30px",
            padding: "25px 20px",
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            transition: "all 0.3s ease"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.85rem"
            }}>
              <span>🔒</span>
              <span>Enterprise-grade security with SOC 2 Type II compliance</span>
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
        
        .toggle-visibility:hover {
          color: rgba(255, 255, 255, 0.9) !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }
        
        a:hover {
          color: #4facfe !important;
        }
        
        .form-box:hover {
          transform: translateY(-8px);
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

export default Login;