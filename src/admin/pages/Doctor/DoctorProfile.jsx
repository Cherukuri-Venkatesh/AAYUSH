import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  if (!profileData) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff9e6, #ffffff)",
        fontFamily: "Poppins, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "32px",
          fontWeight: "700",
          color: "#b45309",
          marginBottom: "40px",
        }}
      >
        👨‍⚕️ Doctor Profile
      </h1>

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          padding: "40px",
          width: "90%",
          maxWidth: "850px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginBottom: "30px",
          }}
        >
          <img
            src={profileData.image}
            alt={profileData.name}
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid #fbbf24",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              marginBottom: "14px",
            }}
          />

          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#222",
              marginBottom: "5px",
            }}
          >
            {profileData.name}
          </h2>
          <p style={{ fontSize: "15px", color: "#555" }}>
            {profileData.degree} — {profileData.speciality}
          </p>
          <p
            style={{
              marginTop: "6px",
              background: "#fef3c7",
              color: "#b45309",
              padding: "4px 14px",
              fontSize: "12px",
              fontWeight: "600",
              borderRadius: "20px",
            }}
          >
            {profileData.experience}
          </p>
        </div>

        {/* Info rows */}
        <div style={{ fontSize: "15px", color: "#333" }}>
          {/* About */}
          <Row label="About:">
            {isEdit ? (
              <textarea
                rows="5"
                value={profileData.about}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, about: e.target.value }))
                }
                style={inputBox}
              />
            ) : (
              <span style={{ whiteSpace: "pre-line" }}>{profileData.about}</span>
            )}
          </Row>

          {/* Fee */}
          <Row label="Appointment Fee:">
            {isEdit ? (
              <input
                type="number"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                }
                style={inputBox}
              />
            ) : (
              <span style={{ fontWeight: "600" }}>
                {currency}
                {profileData.fees}
              </span>
            )}
          </Row>

          {/* Address */}
          <Row label="Address:">
            {isEdit ? (
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  style={{ ...inputBox, marginBottom: "8px" }}
                />
                <input
                  type="text"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  style={inputBox}
                />
              </div>
            ) : (
              <>
                <span>{profileData.address.line1}</span>
                <br />
                <span>{profileData.address.line2}</span>
              </>
            )}
          </Row>

          {/* Availability */}
          <Row label="Available:">
            {isEdit ? (
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  setProfileData((prev) => ({ ...prev, available: !prev.available }))
                }
              />
            ) : (
              <span>{profileData.available ? "Yes" : "No"}</span>
            )}
          </Row>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            marginTop: "35px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          {isEdit ? (
            <>
              <button
                onClick={updateProfile}
                style={blueBtn}
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                style={outlineBtn}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              style={blueBtn}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <p style={{ marginTop: "30px", fontSize: "14px", color: "#666" }}>
        Profile information stays private and secure 🔐
      </p>
    </div>
  );
};

/* Inline Reusable Row Component */
const Row = ({ label, children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: "1px solid #eee",
      gap: "12px",
    }}
  >
    <strong style={{ fontWeight: "600", color: "#444", minWidth: "160px" }}>
      {label}
    </strong>
    <div style={{ flex: 1, textAlign: "right" }}>{children}</div>
  </div>
);

/* Input Style */
const inputBox = {
  width: "100%",
  border: "1px solid #ccc",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "14px",
  outline: "none",
};

/* Buttons */
const blueBtn = {
  backgroundColor: "#2563eb",
  color: "#fff",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};

const outlineBtn = {
  backgroundColor: "#fff",
  color: "#444",
  padding: "10px 20px",
  borderRadius: "8px",
  border: "1px solid #aaa",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};

export default DoctorProfile;
