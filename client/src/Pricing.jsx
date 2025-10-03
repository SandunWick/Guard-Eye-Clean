import { Link } from 'react-router-dom';
import "./Pricing.css"

function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      billing: "Forever",
      description: "Perfect for small security teams getting started",
      features: [
        "Up to 5 guards",
        "Basic live tracking",
        "Standard incident reports",
        "Email support",
        "Mobile app access",
        "Basic analytics"
      ],
      limitations: [
        "Limited to 1 site",
        "Basic reporting only",
        "Email support only"
      ],
      cta: "Start Free",
      popular: false,
      color: "#6b7280"
    },
    {
      name: "Professional",
      price: "$299",
      billing: "per month",
      description: "Advanced features for growing security operations",
      features: [
        "Unlimited guards",
        "Advanced GPS tracking",
        "AI-powered patrol routes",
        "Real-time incident management",
        "Client portal access",
        "Priority support",
        "Custom reporting",
        "API integrations",
        "Multi-site management",
        "Advanced analytics"
      ],
      limitations: [],
      cta: "Start Professional Trial",
      popular: true,
      color: "#00d4ff"
    },
    {
      name: "Enterprise",
      price: "Custom",
      billing: "Contact us",
      description: "Complete solution for large-scale security operations",
      features: [
        "Everything in Professional",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "24/7 phone support",
        "SLA guarantees",
        "Advanced compliance tools",
        "Custom training",
        "On-premise deployment",
        "Unlimited API calls"
      ],
      limitations: [],
      cta: "Contact Sales",
      popular: false,
      color: "#8b5cf6"
    }
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
            Enterprise Pricing
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
            Choose Your Security Plan
          </h1>
          
          <p style={{
            fontSize: "1.3rem",
            color: "rgba(255, 255, 255, 0.7)",
            lineHeight: 1.6,
            maxWidth: "700px",
            margin: "0 auto 40px"
          }}>
            Flexible pricing designed to scale with your security operations. 
            Start free and upgrade as you grow.
          </p>
          
          {/* Billing Toggle */}
          <div style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.05)",
            borderRadius: "50px",
            padding: "4px",
            border: "1px solid rgba(255, 255, 255, 0.1)"
          }}>
            <button style={{
              padding: "12px 24px",
              borderRadius: "50px",
              background: "#00d4ff",
              color: "white",
              border: "none",
              fontWeight: 600,
              fontSize: "0.95rem"
            }}>
              Monthly
            </button>
            <button style={{
              padding: "12px 24px",
              borderRadius: "50px",
              background: "transparent",
              color: "rgba(255, 255, 255, 0.7)",
              border: "none",
              fontWeight: 600,
              fontSize: "0.95rem"
            }}>
              Annual (Save 20%)
            </button>
          </div>
        </section>

        {/* Pricing Cards */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))",
          gap: "30px",
          marginBottom: "80px"
        }}>
          {plans.map((plan, idx) => (
            <div key={plan.name} style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
              padding: plan.popular ? "35px" : "40px",
              border: plan.popular ? `2px solid ${plan.color}` : "1px solid rgba(134, 10, 10, 0.1)",
              boxShadow: plan.popular 
                ? `0 40px 80px rgba(0, 212, 255, 0.2)` 
                : "0 40px 80px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden",
              transform: plan.popular ? "scale(1.05)" : "scale(1)"
            }}>
              {/* Popular badge */}
              {plan.popular && (
                <div style={{
                  position: "absolute",
                  top: "-1px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`,
                  color: "white",
                  padding: "8px 24px",
                  borderRadius: "0 0 12px 12px",
                  fontSize: "0.85rem",
                  fontWeight: 600
                }}>
                  Most Popular
                </div>
              )}
              
              {/* Header */}
              <div style={{
                textAlign: "center",
                marginBottom: "30px",
                paddingTop: plan.popular ? "20px" : "0"
              }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "8px"
                }}>
                  {plan.name}
                </h3>
                
                <p style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: "0.95rem",
                  marginBottom: "20px"
                }}>
                  {plan.description}
                </p>
                
                <div style={{
                  marginBottom: "20px"
                }}>
                  <span style={{
                    fontSize: "3rem",
                    fontWeight: 700,
                    color: plan.color,
                    lineHeight: 1
                  }}>
                    {plan.price}
                  </span>
                  <span style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "1rem",
                    marginLeft: "8px"
                  }}>
                    {plan.billing}
                  </span>
                </div>
              </div>
              
              {/* Features */}
              <div style={{
                marginBottom: "30px"
              }}>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0
                }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "8px 0",
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "0.95rem"
                    }}>
                      <div style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        background: `${plan.color}20`,
                        border: `1px solid ${plan.color}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <div style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          background: plan.color
                        }}></div>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {plan.limitations.length > 0 && (
                  <div style={{
                    marginTop: "20px",
                    paddingTop: "20px",
                    borderTop: "1px solid rgba(255, 255, 255, 0.1)"
                  }}>
                    <div style={{
                      fontSize: "0.85rem",
                      color: "rgba(255, 255, 255, 0.5)",
                      marginBottom: "8px"
                    }}>
                      Limitations:
                    </div>
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "4px 0",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "0.85rem"
                      }}>
                        <span>•</span>
                        {limitation}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* CTA Button */}
              <Link 
                to={plan.name === "Enterprise" ? "/contact" : "/signup"}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "16px 24px",
                  borderRadius: "12px",
                  background: plan.popular 
                    ? `linear-gradient(135deg, ${plan.color}, ${plan.color}cc)`
                    : "rgba(255, 255, 255, 0.05)",
                  color: plan.popular ? "white" : "#ffffff",
                  fontWeight: 600,
                  textDecoration: "none",
                  textAlign: "center",
                  border: plan.popular 
                    ? "none" 
                    : "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  fontSize: "1rem"
                }}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </section>

        {/* FAQ Section */}
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
            Trusted by Industry Leaders
          </h2>
          
          <p style={{
            fontSize: "1.2rem",
            color: "rgba(255, 255, 255, 0.7)",
            marginBottom: "40px",
            maxWidth: "600px",
            margin: "0 auto 40px"
          }}>
            Join Fortune 500 companies who rely on GuardEye for their security operations.
          </p>
          
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: "60px",
            flexWrap: "wrap",
            marginBottom: "40px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "2.5rem", 
                fontWeight: 700, 
                color: "#00d4ff",
                marginBottom: "8px"
              }}>99.9%</div>
              <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>Uptime SLA</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "2.5rem", 
                fontWeight: 700, 
                color: "#00d4ff",
                marginBottom: "8px"
              }}>500+</div>
              <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>Enterprise Clients</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ 
                fontSize: "2.5rem", 
                fontWeight: 700, 
                color: "#00d4ff",
                marginBottom: "8px"
              }}>24/7</div>
              <div style={{ color: "rgba(255, 255, 255, 0.6)" }}>Expert Support</div>
            </div>
          </div>
          
          <Link 
            to="/contact"
            style={{
              display: "inline-block",
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
            }}
          >
            Schedule a Demo
          </Link>
        </section>
      </div>
      
      <style jsx>{`
        .pricing-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 50px 100px rgba(0, 0, 0, 0.3);
          border-color: rgba(255, 255, 255, 0.2);
        }
        
        a:hover {
          transform: translateY(-2px);
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

export default Pricing;