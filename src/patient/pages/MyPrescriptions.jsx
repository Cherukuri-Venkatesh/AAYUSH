import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const MyPrescriptions = ({ appointmentId }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { slotDateFormat } = useContext(AppContext) || {};

  const params = useParams();
  const finalId = appointmentId || params.appointmentId;

  // ⭐ Default 5 Sample Prescriptions (displayed when backend data empty / fails)
  const samplePrescriptions = [
    {
      _id: "P1",
      doctorName: "Dr. Rahul Varma",
      appointmentId: "APT1456",
      date: new Date("2025-01-10T10:30:00"),
      notes: "Continue prescribed medication for 7 days.",
      type: "E-Prescription",
      url: "#",
    },
    {
      _id: "P2",
      doctorName: "Dr. Laya Sharma",
      appointmentId: "APT2033",
      date: new Date("2025-01-15T15:10:00"),
      notes: "Complete antibiotics course. Drink plenty of water.",
      type: "E-Prescription",
      url: "#",
    },
    {
      _id: "P3",
      doctorName: "Dr. Mahesh Chandra",
      appointmentId: "APT1209",
      date: new Date("2025-01-20T12:45:00"),
      notes: "Take BP medication daily after breakfast.",
      type: "E-Prescription",
      url: "#",
    },
    {
      _id: "P4",
      doctorName: "Dr. Anitha Reddy",
      appointmentId: "APT1823",
      date: new Date("2025-01-26T09:15:00"),
      notes: "Cough syrup twice daily. Avoid cold items.",
      type: "E-Prescription",
      url: "#",
    },
    {
      _id: "P5",
      doctorName: "Dr. Nikhil Desai",
      appointmentId: "APT1999",
      date: new Date("2025-02-02T11:00:00"),
      notes: "Pain medication only if pain persists.",
      type: "E-Prescription",
      url: "#",
    },
  ];

  useEffect(() => {
    if (finalId) fetchPrescriptions(finalId);
    else setPrescriptions(samplePrescriptions);
  }, [finalId]);

  const fetchPrescriptions = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointment/${id}/files`,
        { headers: { token } }
      );
      if (data.success) {
        const ep = data.files.filter((f) => f.type === "eprescription");
        const sorted = ep.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPrescriptions(sorted.length ? sorted : samplePrescriptions);
      } else {
        setPrescriptions(samplePrescriptions);
      }
    } catch (err) {
      setPrescriptions(samplePrescriptions);
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full px-6 py-8 bg-gradient-to-br from-[#E7F0FF] to-[#FFFFFF]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h2 className="text-3xl font-semibold mb-8 text-blue-700 flex items-center gap-2">
        <img src={assets.prescription_icon} alt="" className="w-8" />
        My E-Prescriptions
      </h2>

      {loading && (
        <p className="text-center text-blue-600 font-medium text-lg">
          Loading prescriptions...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium text-lg">{error}</p>
      )}

      {/* PRESCRIPTION LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {prescriptions.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-blue-200 shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={assets.prescription_icon}
                className="w-10 h-10"
                alt="prescription"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.type || "E-Prescription"}
                </h3>
                <p className="text-xs text-gray-500">
                  {slotDateFormat
                    ? slotDateFormat(p.date)
                    : new Date(p.date).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Doctor:</span> {p.doctorName}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date(p.date).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-medium">Appointment ID:</span>{" "}
                {p.appointmentId}
              </p>
              {p.notes && (
                <p>
                  <span className="font-medium">Notes:</span> {p.notes}
                </p>
              )}
            </div>

            {/* Button */}
            <div className="mt-5 flex justify-end">
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition"
              >
                🔍 View Prescription
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPrescriptions;
