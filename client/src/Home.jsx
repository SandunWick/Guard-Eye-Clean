import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Effects */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.08) 0%, transparent 50%)
        `,
        zIndex: 1
      }}></div>
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

      {/* Main Wrapper */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "100px 40px",
        position: "relative",
        zIndex: 5
      }}>
        {/* Hero Section */}
        <section style={{ textAlign: "center", marginBottom: "80px" }}>
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
            GuardEye Security
          </div>

          <h1 style={{
            fontSize: "clamp(3rem, 6vw, 4.5rem)",
            lineHeight: 1.1,
            fontWeight: 700,
            margin: "0 0 25px 0",
            background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em"
          }}>
            Next-Gen Security for the Modern World
          </h1>

          <p style={{
            fontSize: "1.3rem",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 40px"
          }}>
            Smart, reliable, and AI-powered monitoring solutions. 
            Stay protected with real-time tracking and seamless management.
          </p>

          {/* Call to Action Buttons */}
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "40px"
          }}>
            <Link to="/signup" style={{
              padding: "16px 32px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #00d4ff, #00bfffcc)",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "1.1rem",
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
              transition: "all 0.3s ease"
            }}>
              Get Started
            </Link>
            <Link to="/login" style={{
              padding: "16px 32px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "1.1rem",
              transition: "all 0.3s ease"
            }}>
              Sign In
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          marginTop: "80px"
        }}>
          {[
            { icon: "🔒", title: "Secure", desc: "Military-grade encryption and AI-driven monitoring" },
            { icon: "⚡", title: "Fast", desc: "Instant alerts and real-time guard tracking" },
            { icon: "🎯", title: "Reliable", desc: "99.9% uptime with enterprise-grade infrastructure" }
          ].map((f, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: "20px",
              padding: "40px",
              textAlign: "center",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ color: "#fff", fontSize: "1.5rem", marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>{f.desc}</p>
            </div>
          ))}
        </section>
      </div>

      <style jsx>{`
        a:hover {
          transform: translateY(-2px);
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

export default Home;
