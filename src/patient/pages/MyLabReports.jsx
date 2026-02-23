import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";

const MyLabReports = ({ appointmentId }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { slotDateFormat } = useContext(AppContext) || {};

  const params = useParams();
  const finalId = appointmentId || params.appointmentId;

  // ⭐ Default 5 Sample Reports (displayed if no real reports available)
  const sampleReports = [
    {
      _id: "S1",
      type: "Blood Test",
      doctorName: "Dr. Kavya Sharma",
      date: new Date("2025-01-12T10:05:00"),
      appointmentId: "APT93451",
      url: "#",
    },
    {
      _id: "S2",
      type: "X-Ray Report",
      doctorName: "Dr. Rohan Mehra",
      date: new Date("2025-01-05T15:45:00"),
      appointmentId: "APT91223",
      url: "#",
    },
    {
      _id: "S3",
      type: "MRI Scan",
      doctorName: "Dr. Virat Shetty",
      date: new Date("2024-12-28T09:30:00"),
      appointmentId: "APT89844",
      url: "#",
    },
    {
      _id: "S4",
      type: "ECG Report",
      doctorName: "Dr. Ananya Rao",
      date: new Date("2024-11-17T12:20:00"),
      appointmentId: "APT86522",
      url: "#",
    },
    {
      _id: "S5",
      type: "COVID RTPCR",
      doctorName: "Dr. Adarsh Verma",
      date: new Date("2024-10-03T17:10:00"),
      appointmentId: "APT83210",
      url: "#",
    },
  ];

  // ⭐ Fetch backend reports if appointmentId exists OR show sample reports
  useEffect(() => {
    if (finalId) {
      fetchReports(finalId);
    } else {
      setReports(sampleReports);
    }
  }, [finalId]);

  const fetchReports = async (id) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/appointment/${id}/files`,
        { headers: { token } }
      );

      if (data.success && data.files.length > 0) {
        const sorted = data.files.sort((a, b) => new Date(b.date) - new Date(a.date));
        setReports(sorted);
      } else {
        setReports(sampleReports); // If backend gives empty results → show samples
      }
    } catch (err) {
      setReports(sampleReports); // If request fails → show samples
      setError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full px-6 py-8 bg-gradient-to-br from-[#FFF3E8] to-[#FFFFFF]"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <h2 className="text-3xl font-semibold mb-8 text-orange-700 flex items-center gap-2">
        <img src={assets.report_icon} alt="" className="w-8" />
        My Lab Reports
      </h2>

      {loading && (
        <p className="text-center text-orange-600 font-medium text-lg">Loading reports...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium text-lg">{error}</p>
      )}

      {/* REPORT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
        {reports.map((r) => (
          <div
            key={r._id}
            className="bg-white border border-orange-200 shadow-md rounded-2xl p-5 hover:shadow-xl transition duration-300"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={assets.report_icon || assets.file_icon}
                className="w-10 h-10"
                alt="report"
              />
              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {r.type || "Medical Report"}
                </h3>
                <p className="text-xs text-gray-500">
                  {slotDateFormat ? slotDateFormat(r.date) : new Date(r.date).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-medium">Doctor:</span>{" "}
                {r.doctorName || "Dr. Unknown"}
              </p>
              <p>
                <span className="font-medium">Time:</span>{" "}
                {new Date(r.date).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-medium">Appointment ID:</span> {r.appointmentId}
              </p>
            </div>

            {/* Button */}
            <div className="mt-5 flex justify-end">
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 text-sm bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-md transition"
              >
                🔍 View Report
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLabReports;
