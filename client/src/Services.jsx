import React, { useEffect } from "react";
import "./Services.css";

const heroTitle = "Enterprise Security Solutions";
const heroSubtitle = "Advanced AI-powered security management platform designed for Fortune 500 companies with comprehensive real-time monitoring, predictive analytics, and seamless integration capabilities.";

function Services() {
  const services = [
    {
      icon: "🎯",
      title: "AI-Powered Guard Scheduling",
      description: "Intelligent workforce optimization with predictive scheduling, automated shift management, and real-time coverage analysis across multiple sites.",
      features: ["Predictive Analytics", "Auto-Optimization", "Multi-Site Coverage", "Compliance Tracking"],
      color: "#00d4ff"
    },
    {
      icon: "📍",
      title: "Real-Time Location Intelligence",
      description: "Advanced GPS tracking with geofencing, route optimization, and behavioral pattern analysis for comprehensive security oversight.",
      features: ["Live GPS Tracking", "Geofencing Alerts", "Route Analytics", "Behavioral Insights"],
      color: "#22c55e"
    },
    {
      icon: "🛣️",
      title: "Smart Patrol Management",
      description: "Dynamic patrol route generation with AI-optimized paths, checkpoint verification, and automated compliance reporting.",
      features: ["Dynamic Routing", "Checkpoint Verification", "Time Optimization", "Compliance Reports"],
      color: "#f59e0b"
    },
    {
      icon: "📊",
      title: "Advanced Incident Management",
      description: "Comprehensive incident tracking with multimedia evidence, automated escalation protocols, and integrated communication systems.",
      features: ["Multimedia Evidence", "Auto-Escalation", "Real-time Alerts", "Case Management"],
      color: "#ef4444"
    },
    {
      icon: "📈",
      title: "Business Intelligence & Analytics",
      description: "Enterprise-grade analytics with customizable dashboards, KPI tracking, SLA monitoring, and predictive insights.",
      features: ["Custom Dashboards", "KPI Tracking", "SLA Monitoring", "Predictive Analytics"],
      color: "#8b5cf6"
    },
    {
      icon: "🌐",
      title: "Enterprise Client Portal",
      description: "White-label client portal with role-based access, custom branding, API integrations, and comprehensive reporting suite.",
      features: ["White-label Portal", "Role-based Access", "API Integration", "Custom Reports"],
      color: "#06b6d4"
    },
  ];

  return (
    <div style={{
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

      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "100px 40px",
        position: "relative",
        zIndex: 5
      }}>
        {/* Hero Section */}
        <section style={{
          textAlign: "center",
          marginBottom: "120px"
        }}>
          <div style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "rgba(0, 212, 255, 0.1)",
            border: "1px solid rgba(0, 212, 255, 0.3)",
            borderRadius: "50px",
            fontSize: "1rem",
            color: "#00d4ff",
            marginBottom: "40px",
            fontWeight: 600
          }}>
            Enterprise Security Platform
          </div>
          
          <h1 style={{
            fontSize: "clamp(3rem, 6vw, 5rem)",
            lineHeight: 1.1,
            fontWeight: 700,
            margin: "0 0 30px 0",
            background: "linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: "-0.02em"
          }}>
            {heroTitle}
          </h1>
          
          <p style={{
            fontSize: "1.3rem",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            {heroSubtitle}
          </p>
        </section>

        {/* Services Grid */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "40px",
          marginBottom: "100px"
        }}>
          {services.map((service, idx) => (
            <article key={service.title} style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: "40px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 40px 80px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}>
              {/* Gradient overlay */}
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: `linear-gradient(90deg, ${service.color}, ${service.color}80)`,
                borderRadius: "24px 24px 0 0"
              }}></div>
              
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "25px"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: `linear-gradient(135deg, ${service.color}20, ${service.color}10)`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  border: `1px solid ${service.color}30`,
                  flexShrink: 0
                }}>
                  {service.icon}
                </div>
                
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "12px",
                    lineHeight: 1.2
                  }}>
                    {service.title}
                  </h3>
                  
                  <p style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    lineHeight: 1.6,
                    fontSize: "1rem",
                    marginBottom: "25px"
                  }}>
                    {service.description}
                  </p>
                </div>
              </div>
              
              {/* Features */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px"
              }}>
                {service.features.map((feature, i) => (
                  <div key={i} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    <div style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: service.color
                    }}></div>
                    <span style={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "0.9rem",
                      fontWeight: 500
                    }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* CTA Section */}
        <section style={{
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "60px 40px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.2)"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "20px"
          }}>
            Ready to Transform Your Security Operations?
          </h2>
          
          <p style={{
            fontSize: "1.2rem",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px"
          }}>
            Join Fortune 500 companies who trust GuardEye for their enterprise security management.
          </p>
          
          <div style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <a href="/signup" style={{
              padding: "18px 36px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              color: "white",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 20px 40px rgba(0, 212, 255, 0.3)",
              transition: "all 0.3s ease",
              fontSize: "1.1rem"
            }}>
              Start Enterprise Trial
            </a>
            <a href="/contact" style={{
              padding: "18px 36px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              fontWeight: 600,
              textDecoration: "none",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transition: "all 0.3s ease",
              fontSize: "1.1rem",
              backdropFilter: "blur(10px)"
            }}>
              Schedule Demo
            </a>
          </div>
        </section>
      </div>
      
      <style jsx>{`
        article:hover {
          transform: translateY(-8px);
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        a:hover {
          transform: translateY(-3px);
        }
        
        a:first-child:hover {
          box-shadow: 0 25px 50px rgba(0, 212, 255, 0.4);
        }
        
        a:last-child:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          section[style*="grid-template-columns"] {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default Services;