import React from "react";

const Features = () => {
  const sectionStyle = {
    padding: "80px 20px",
    background: "#f9f9f9",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    marginBottom: "50px",
    color: "#333",
    fontWeight: "600",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
  };

  const cardStyle = {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const hoverEffect = (e, isEnter) => {
    e.currentTarget.style.transform = isEnter ? "translateY(-8px)" : "translateY(0)";
    e.currentTarget.style.boxShadow = isEnter
      ? "0 10px 20px rgba(0,0,0,0.2)"
      : "0 6px 12px rgba(0,0,0,0.1)";
  };

  const h3Style = { fontSize: "1.5rem", marginBottom: "15px", color: "#0077cc" };
  const pStyle = { fontSize: "1rem", color: "#666" };

  return (
    <section style={sectionStyle} id="features-section">
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={titleStyle}>Our Features</h2>
        <div style={gridStyle}>
          {[
            { title: "Online Consultations", desc: "Connect with doctors anytime through secure video or chat." },
            { title: "E-Prescriptions & Lab Reports", desc: "Get prescriptions and lab test results digitally, accessible anytime." },
            { title: "Health Records", desc: "Store and manage your complete medical history safely in one place." },
            { title: "Patient Management", desc: "Access medical history, track progress, and provide better care." },
            { title: "Scheduling System", desc: "Manage consultations and appointment timings with ease." },
            { title: "Pharmacy Orders", desc: "Receive and process prescriptions digitally from patients." },
            { title: "User Management", desc: "Oversee patient, doctor, and pharmacist accounts with full control." },
            { title: "Analytics & Reports", desc: "Generate detailed insights and reports to improve healthcare services." },
          ].map((feature, i) => (
            <div
              key={i}
              style={cardStyle}
              onMouseEnter={(e) => hoverEffect(e, true)}
              onMouseLeave={(e) => hoverEffect(e, false)}
            >
              <h3 style={h3Style}>{feature.title}</h3>
              <p style={pStyle}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
