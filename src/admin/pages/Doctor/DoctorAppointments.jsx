import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment, uploadFile } =
    useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  const onFileChange = async (e, appointment) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowed = ["application/pdf", "image/png", "image/jpeg"];
    if (!allowed.includes(file.type)) {
      alert("Only PDF, PNG or JPG allowed");
      e.target.value = null;
      return;
    }
    const type = window.prompt('Enter type: "eprescription" or "labreport"', "eprescription");
    if (type !== "eprescription" && type !== "labreport") {
      alert("Invalid type");
      e.target.value = null;
      return;
    }
    if (!appointment.isCompleted) {
      alert("Cannot upload file before appointment completion");
      e.target.value = null;
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);
    formData.append("appointmentId", appointment._id);
    formData.append("notes", "");
    try {
      await uploadFile(formData);
      getAppointments();
    } catch (err) {
      alert(err?.message || "Upload failed");
    } finally {
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="px-8 py-7 w-full">

      {/* Page heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Appointments Panel</h1>
        <p className="text-gray-500 text-sm mt-1">Manage all your bookings in one place</p>
      </div>

      {/* Container */}
      <div className="rounded-2xl shadow-xl bg-white overflow-hidden">
        <div className="px-7 py-5 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={assets.list_icon} className="w-6" alt="" />
            <h2 className="text-xl font-semibold tracking-wide">Latest Appointments</h2>
          </div>
        </div>

        {appointments.length === 0 && (
          <p className="text-center py-16 text-gray-500 text-lg font-medium">No appointments yet</p>
        )}

        <div className="divide-y">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="px-7 py-6 hover:bg-gray-50 transition grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr_1.2fr_1fr] gap-6"
            >

              {/* Patient */}
              <div className="flex items-center gap-4">
                <img
                  src={item.userData.image}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.userData.name}</p>
                  <p className="text-gray-500 text-xs">Age {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              {/* Date & slot */}
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  {slotDateFormat(item.slotDate)}
                </p>
                <p className="text-gray-400 text-xs mt-1">{item.slotTime}</p>
              </div>

              {/* Payment */}
              <div className="flex items-center">
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${
                    item.payment ? "text-green-700 bg-green-100" : "text-blue-700 bg-blue-100"
                  }`}
                >
                  {item.payment ? "Online" : "Cash"}
                </span>
              </div>

              {/* Fees */}
              <div className="text-sm font-semibold text-gray-800 flex items-center">
                {currency}
                {item.amount}
              </div>

              {/* Action */}
              <div className="flex items-center lg:justify-end gap-3">

                {item.cancelled ? (
                  <span className="bg-red-100 text-red-600 px-3 py-1 text-xs rounded-full font-semibold">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <div className="flex flex-col items-end gap-2">
                    <span className="bg-green-100 text-green-600 px-3 py-1 text-xs rounded-full font-semibold">
                      Completed
                    </span>

                    <div>
                      <input
                        id={`upload-${item._id}`}
                        type="file"
                        className="hidden"
                        accept=".pdf,image/png,image/jpeg"
                        onChange={(e) => onFileChange(e, item)}
                      />
                      <label
                        htmlFor={`upload-${item._id}`}
                        className="text-xs cursor-pointer px-3 py-1 border rounded hover:bg-gray-100"
                      >
                        Upload Report
                      </label>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="w-9 h-9 rounded hover:bg-gray-100 flex items-center justify-center"
                    >
                      <img src={assets.cancel_icon} className="w-6" alt="cancel" />
                    </button>
                    <button
                      onClick={() => completeAppointment(item._id)}
                      className="w-9 h-9 rounded hover:bg-gray-100 flex items-center justify-center"
                    >
                      <img src={assets.tick_icon} className="w-6" alt="complete" />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
