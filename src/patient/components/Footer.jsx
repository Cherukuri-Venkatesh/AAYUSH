import React from "react";

const Footer = () => {
  const footerStyle = {
    background: "#1976d2",
    color: "#fff",
    padding: "60px 20px 20px",
  };

  const containerStyle = { maxWidth: "1200px", margin: "0 auto" };

  const footerGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    marginBottom: "40px",
  };

  const sectionStyle = { marginBottom: "20px" };
  const h3Style = { fontSize: "1.2rem", marginBottom: "15px", color: "#fff" };
  const pStyle = { fontSize: "0.95rem", color: "#ddd" };
  const ulStyle = { listStyle: "none", padding: 0 };
  const liStyle = { marginBottom: "10px" };
  const aStyle = { color: "#fff", textDecoration: "none", fontSize: "0.95rem" };
  const copyStyle = { textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "20px" };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={footerGrid}>
          {/* Company Info */}
          <div style={sectionStyle}>
            <h3 style={h3Style}>Aayush Healthcare</h3>
            <p style={pStyle}>Your trusted partner for healthcare services.</p>
          </div>

          {/* Quick Links */}
          <div style={sectionStyle}>
            <h3 style={h3Style}>Quick Links</h3>
            <ul style={ulStyle}>
              <li style={liStyle}><a style={aStyle} href="/">Home</a></li>
              <li style={liStyle}><a style={aStyle} href="/about">About</a></li>
              <li style={liStyle}><a style={aStyle} href="/contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div style={sectionStyle}>
            <h3 style={h3Style}>Contact Us</h3>
            <ul style={ulStyle}>
              <li style={liStyle}>Email: info@ayushi.com</li>
              <li style={liStyle}>Phone: +1 (555) 123-4567</li>
              <li style={liStyle}>Address: 123 Healthcare St, Medical City</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div style={copyStyle}>
          <p>&copy; 2026 Aayush Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
