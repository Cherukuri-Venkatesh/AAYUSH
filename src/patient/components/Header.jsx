import React from 'react'

const Header = () => {
  return (
    <section 
      className="hero" 
      id="home-section"
      style={{
        background: "url('background1.png') no-repeat center center/cover",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        padding: "40px"
      }}
    >

      {/* Overlay for better text visibility */}
      <div 
        style={{
          background: "rgba(0, 0, 0, 0.35)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      ></div>

      {/* Content on top of image */}
      <div 
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "800px",
          padding: "20px"
        }}
      >
        <h1 
          style={{
            fontSize: "48px",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#1976d2"
          }}
        >
          Empowering <span style={{ color: "#2e7d32" }}>Health</span>,  
          <br />
          Enriching <span style={{ color: "#2e7d32" }}>Lives</span>
        </h1>

        <p 
          style={{
            fontSize: "20px",
            marginBottom: "35px",
            lineHeight: 1.8,
            color: "#e3f2fd"
          }}
        >
          At <strong style={{ color: "#43a047" }}>Aayush Healthcare</strong>, we blend advanced technology with expert care 
          to provide seamless consultations, smart health tracking, and personalized medical support — 
          anytime, anywhere.
        </p>

        <a href="#speciality" 
          style={{
            padding: "14px 32px",
            fontSize: "20px",
            borderRadius: "8px",
            fontWeight: "bold",
            background: "linear-gradient(135deg, #1976d2, #2e7d32)",
            border: "none",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Book Appointment
        </a>
      </div>
    </section>
  )
}

export default Header
