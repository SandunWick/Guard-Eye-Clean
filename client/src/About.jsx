import "./About.css";

function About() {
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
            About GuardEye
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
            Enterprise Security
            <br />
            <span style={{
              background: "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent"
            }}>Excellence</span>
          </h1>
          
          <p style={{
            fontSize: "1.3rem",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.6,
            maxWidth: "800px",
            margin: "0 auto"
          }}>
            GuardEye delivers enterprise-grade security management solutions trusted by Fortune 500 companies worldwide. 
            Our mission: revolutionize security operations through intelligent automation and data-driven insights.
          </p>
        </section>

        {/* Values Grid */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "40px",
          marginBottom: "120px"
        }}>
          {[
            {
              icon: "🎯",
              title: "Customer-Centric Innovation",
              description: "We co-design enterprise solutions with Fortune 500 security teams, ensuring every feature addresses real-world operational challenges and drives measurable ROI.",
              color: "#00d4ff"
            },
            {
              icon: "🔧",
              title: "Enterprise-Grade Reliability",
              description: "Built on cloud-native architecture with 99.9% uptime SLA, real-time data synchronization, and enterprise security compliance including SOC 2 Type II certification.",
              color: "#22c55e"
            },
            {
              icon: "📊",
              title: "Actionable Business Intelligence",
              description: "Advanced analytics and machine learning algorithms transform security data into strategic insights, optimizing resource allocation and operational efficiency.",
              color: "#8b5cf6"
            }
          ].map((value, idx) => (
            <article key={value.title} style={{
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
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                background: `linear-gradient(90deg, ${value.color}, ${value.color}80)`,
                borderRadius: "24px 24px 0 0"
              }}></div>
              
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
                marginBottom: "20px"
              }}>
                <div style={{
                  width: "60px",
                  height: "60px",
                  background: `linear-gradient(135deg, ${value.color}20, ${value.color}10)`,
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "28px",
                  border: `1px solid ${value.color}30`,
                  flexShrink: 0
                }}>
                  {value.icon}
                </div>
                
                <div>
                  <h3 style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    marginBottom: "16px",
                    lineHeight: 1.2
                  }}>
                    {value.title}
                  </h3>
                  
                  <p style={{
                    color: "rgba(255, 255, 255, 0.7)",
                    lineHeight: 1.6,
                    fontSize: "1rem"
                  }}>
                    {value.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Stats Section */}
        <section style={{
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px",
          padding: "80px 40px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          marginBottom: "80px"
        }}>
          <h2 style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#ffffff",
            marginBottom: "20px"
          }}>
            Trusted by Industry Leaders
          </h2>
          
          <p style={{
            fontSize: "1.2rem",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "60px",
            maxWidth: "600px",
            margin: "0 auto 60px"
          }}>
            Our enterprise platform powers security operations for companies across industries.
          </p>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px"
          }}>
            {[
              { number: "99.9%", label: "Uptime SLA", color: "#00d4ff" },
              { number: "500+", label: "Enterprise Clients", color: "#22c55e" },
              { number: "24/7", label: "Expert Support", color: "#f59e0b" },
              { number: "50M+", label: "Security Events Processed", color: "#8b5cf6" }
            ].map((stat, i) => (
              <div key={i} style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                padding: "30px 20px",
                border: "1px solid rgba(255, 255, 255, 0.1)"
              }}>
                <div style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: 700, 
                  color: stat.color,
                  marginBottom: "8px",
                  lineHeight: 1
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "1rem",
                  fontWeight: 500
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          textAlign: "center"
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
            Join industry leaders who trust GuardEye for their enterprise security management.
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

export default About;