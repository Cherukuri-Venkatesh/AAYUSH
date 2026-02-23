import React from 'react';

const About = () => {
  return (
    <section
      id="aboutSection"
      style={{
        background: 'linear-gradient(135deg, #f9fcfa 0%, #eef5ff 100%)',
        padding: '90px 20px',
        fontFamily: 'Poppins, Segoe UI, Tahoma, sans-serif',
        color: '#333',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1050px',
          width: '100%',
          background: '#fff',
          borderRadius: '24px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
          padding: '70px 60px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        {/* Gradient Heading */}
        <h1
          style={{
            fontSize: '44px',
            background: 'linear-gradient(90deg, #1b5e20, #1976d2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            letterSpacing: '1px',
            marginBottom: '30px',
          }}
        >
          About Aayush Healthcare
        </h1>

        <p
          style={{
            fontSize: '18px',
            lineHeight: 1.8,
            color: '#555',
            maxWidth: '850px',
            margin: '0 auto 35px',
          }}
        >
          <strong>Aayush</strong> is your trusted digital healthcare ecosystem — connecting
          <strong> patients, doctors, pharmacists,</strong> and <strong>administrators</strong> on one
          secure platform. Our goal is to make healthcare{' '}
          <strong>accessible, transparent, and effortless</strong> for everyone.
        </p>

        {/* Stylish Quote */}
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(120deg, #e8f5e9 0%, #f3fff6 100%)',
            padding: '25px 30px',
            borderRadius: '14px',
            margin: '40px auto',
            maxWidth: '750px',
            boxShadow: '0 6px 14px rgba(0,0,0,0.06)',
            fontStyle: 'italic',
            color: '#1b5e20',
          }}
        >
          <span
            style={{
              fontSize: '60px',
              position: 'absolute',
              top: '-15px',
              left: '15px',
              color: '#a5d6a7',
              fontFamily: 'serif',
            }}
          >
            “
          </span>
          <p style={{ fontSize: '19px', margin: 0, zIndex: 2 }}>
            💙 Health made simple. Care made smarter.
          </p>
          <span
            style={{
              fontSize: '60px',
              position: 'absolute',
              bottom: '-25px',
              right: '15px',
              color: '#a5d6a7',
              fontFamily: 'serif',
            }}
          >
            ”
          </span>
        </div>

        {/* Mission Section */}
        <div style={{ marginTop: '60px' }}>
          <h3
            style={{
              fontSize: '28px',
              color: '#1565c0',
              marginBottom: '20px',
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            🌟 Our Mission
            <span
              style={{
                display: 'block',
                height: '3px',
                width: '60%',
                margin: '8px auto 0',
                background: 'linear-gradient(90deg, #64b5f6, #1565c0)',
                borderRadius: '3px',
              }}
            />
          </h3>

          <p
            style={{
              lineHeight: 1.7,
              fontSize: '17px',
              color: '#444',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            We empower individuals and healthcare providers with{' '}
            <strong>technology-driven solutions</strong> for better outcomes. From online
            consultations to e-prescriptions, Ayushi brings every service under one roof — making
            healthcare <strong>seamless, affordable, and reliable.</strong>
          </p>
        </div>

        {/* Quote */}
        <div
          style={{
            background: 'linear-gradient(120deg, #e3f2fd 0%, #f1f8ff 100%)',
            padding: '25px 30px',
            borderRadius: '14px',
            margin: '40px auto',
            maxWidth: '750px',
            boxShadow: '0 6px 14px rgba(0,0,0,0.05)',
            fontStyle: 'italic',
            color: '#1565c0',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: '60px',
              position: 'absolute',
              top: '-15px',
              left: '15px',
              color: '#bbdefb',
              fontFamily: 'serif',
            }}
          >
            “
          </span>
          <p style={{ fontSize: '19px', margin: 0 }}>
            🎯 One platform. Complete healthcare. Anytime, anywhere.
          </p>
        </div>

        {/* Vision Section */}
        <div style={{ marginTop: '60px' }}>
          <h3
            style={{
              fontSize: '28px',
              color: '#2e7d32',
              marginBottom: '20px',
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            🚀 Our Vision
            <span
              style={{
                display: 'block',
                height: '3px',
                width: '60%',
                margin: '8px auto 0',
                background: 'linear-gradient(90deg, #81c784, #2e7d32)',
                borderRadius: '3px',
              }}
            />
          </h3>

          <p
            style={{
              lineHeight: 1.7,
              fontSize: '17px',
              color: '#444',
              maxWidth: '800px',
              margin: '0 auto 25px',
            }}
          >
            We envision a world where <strong>quality healthcare is just a click away</strong> — where
            patients receive timely care, doctors manage efficiently, and pharmacies deliver
            seamlessly.  
            <br />
            With <strong>Aayush</strong>, healthcare becomes:
          </p>

          <ul
            style={{
              listStyle: 'none',
              textAlign: 'left',
              margin: '25px auto',
              maxWidth: '600px',
              padding: 0,
              fontSize: '17px',
              lineHeight: 1.8,
              color: '#333',
            }}
          >
            <li>✅ Hassle-free with <strong>instant access</strong> to services.</li>
            <li>✅ Secure with <strong>encrypted records</strong> and trusted prescriptions.</li>
            <li>✅ Smart through <strong>digital integration</strong> across healthcare.</li>
          </ul>
        </div>

        {/* Vision Quote */}
        <div
          style={{
            background: 'linear-gradient(120deg, #f1fff2 0%, #f9fff9 100%)',
            padding: '25px 30px',
            borderRadius: '14px',
            margin: '40px auto',
            maxWidth: '750px',
            boxShadow: '0 6px 14px rgba(0,0,0,0.05)',
            fontStyle: 'italic',
            color: '#2e7d32',
            position: 'relative',
          }}
        >
          <span
            style={{
              fontSize: '60px',
              position: 'absolute',
              top: '-15px',
              left: '15px',
              color: '#c8e6c9',
              fontFamily: 'serif',
            }}
          >
            “
          </span>
          <p style={{ fontSize: '19px', margin: 0 }}>
            🚀 A future where healthcare is not a privilege but a seamless experience for all.
          </p>
        </div>

        {/* Why Choose Section */}
        <div style={{ marginTop: '60px' }}>
          <h3
            style={{
              fontSize: '28px',
              color: '#1976d2',
              marginBottom: '25px',
              fontWeight: 700,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            💡 Why Choose Ayushi?
            <span
              style={{
                display: 'block',
                height: '3px',
                width: '60%',
                margin: '8px auto 0',
                background: 'linear-gradient(90deg, #90caf9, #1976d2)',
                borderRadius: '3px',
              }}
            />
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '25px',
              textAlign: 'left',
            }}
          >
            {[
              'All-in-One Platform – Patients, doctors, pharmacists, and admins connected together.',
              'Online Consultations – Secure video and chat consultations.',
              'E-Prescriptions & Lab Reports – Access results instantly anytime.',
              'Pharmacy Integration – Order medicines digitally with ease.',
              'Secure Health Records – Store and share your medical history safely.',
              'Real-Time Insights – Analytics to improve healthcare delivery.',
            ].map((text, index) => (
              <div
                key={index}
                style={{
                  background: '#f9fafb',
                  borderRadius: '14px',
                  padding: '20px',
                  border: '1px solid #e0e0e0',
                  boxShadow: '0 3px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 3px 8px rgba(0,0,0,0.04)';
                }}
              >
                <p style={{ margin: 0, fontSize: '16.5px', lineHeight: 1.6, color: '#333' }}>
                  ✅ {text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Quote */}
        <div
          style={{
            marginTop: '70px',
            fontSize: '19px',
            fontWeight: '600',
            color: '#1b5e20',
            background: 'linear-gradient(120deg, #f1f8e9, #e8f5e9)',
            padding: '30px',
            borderRadius: '18px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            lineHeight: 1.6,
          }}
        >
          💙 Aayush – Your Health, Our Priority.
          <br />
          🌍 Where care meets technology for a healthier tomorrow.
        </div>
      </div>
    </section>
  );
};

export default About;
