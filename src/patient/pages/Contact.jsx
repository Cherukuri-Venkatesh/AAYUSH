import React from 'react';

const Contact = () => {
  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: '#f5f5f5',
        minHeight: '100vh',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Page Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2
          style={{
            fontSize: '36px',
            color: '#1976d2',
            fontWeight: '700',
            marginBottom: '10px',
          }}
        >
          Contact Us
        </h2>
        <p style={{ color: '#555', fontSize: '17px', maxWidth: '600px', margin: 'auto' }}>
          We’re here to assist you. Reach out for support, queries, or collaborations —
          and we’ll get back to you shortly.
        </p>
      </div>

      {/* Contact Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          maxWidth: '1100px',
          width: '100%',
        }}
      >
        {/* Left Info Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px 30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
          }}
        >
          <h3
            style={{
              color: '#1976d2',
              fontSize: '24px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Contact Information
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <p style={{ color: '#333', fontWeight: 600, marginBottom: '4px' }}>📧 Email</p>
              <p style={{ color: '#555' }}>support@ayushihealthcare.com</p>
            </div>
            <div>
              <p style={{ color: '#333', fontWeight: 600, marginBottom: '4px' }}>📞 Phone</p>
              <p style={{ color: '#555' }}>+91 98765 43210</p>
            </div>
            <div>
              <p style={{ color: '#333', fontWeight: 600, marginBottom: '4px' }}>📍 Location</p>
              <p style={{ color: '#555' }}>Vijayawada, Andhra Pradesh, India</p>
            </div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '40px 30px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
          }}
        >
          <h3
            style={{
              color: '#1976d2',
              fontSize: '24px',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Give Us a Feedback
          </h3>

          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontWeight: 600, color: '#333' }}>Name</label>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: '15px',
                fontSize: '16px',
              }}
            />

            <label style={{ fontWeight: 600, color: '#333' }}>Email</label>
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: '15px',
                fontSize: '16px',
              }}
            />

            <label style={{ fontWeight: 600, color: '#333' }}>Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              style={{
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: '15px',
                fontSize: '16px',
              }}
            ></textarea>

            <button
              type="submit"
              style={{
                background: '#1976d2',
                color: '#fff',
                padding: '14px 20px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.3s ease',
              }}
              onMouseOver={(e) => (e.target.style.background = '#1565c0')}
              onMouseOut={(e) => (e.target.style.background = '#1976d2')}
            >
              Send Feedback
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div
        style={{
          marginTop: '60px',
          width: '100%',
          maxWidth: '1100px',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >

        
        <iframe
          title="Ayushi Healthcare Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7653.391500122492!2d80.62254329999998!3d16.440271400000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sKL%20University!5e0!3m2!1sen!2sin!4v1764440342021!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          style={{
            width: '100%',
            height: '350px',
            border: 'none',
          }}
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
