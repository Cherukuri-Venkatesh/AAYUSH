import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } =
    useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getDashData();
  }, [dToken]);

  if (!dashData) return null;

  return (
    <div className="px-8 py-7 w-full">

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-wide">Doctor Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of earnings & appointments</p>
      </div>

      {/* Statistics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">

        <StatBox
          icon={assets.earning_icon}
          label="Total Earnings"
          value={`${currency} ${dashData.earnings}`}
          color="from-emerald-500 to-emerald-700"
        />

        <StatBox
          icon={assets.appointments_icon}
          label="Appointments"
          value={dashData.appointments}
          color="from-blue-500 to-blue-700"
        />

        <StatBox
          icon={assets.patients_icon}
          label="Patients"
          value={dashData.patients}
          color="from-purple-500 to-purple-700"
        />
      </div>

      {/* Latest Bookings */}
      <div className="rounded-2xl shadow-xl bg-white overflow-hidden">
        <div className="px-7 py-5 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={assets.list_icon} className="w-6" alt="" />
            <h2 className="text-xl font-semibold tracking-wide">Recent Appointments</h2>
          </div>
          <span className="text-xs text-gray-500">
            Showing last 5 bookings
          </span>
        </div>

        <div className="divide-y">
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <AppointmentRow
              key={index}
              item={item}
              slotDateFormat={slotDateFormat}
              cancelAppointment={cancelAppointment}
              completeAppointment={completeAppointment}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/* ---------------------- INTERNAL PRESENTATION UI ---------------------- */
/* ---------------------------------------------------------------------- */

const StatBox = ({ icon, value, label, color }) => (
  <div className={`rounded-2xl shadow-md p-7 text-white bg-gradient-to-r ${color} flex justify-between items-center`}>
    <div>
      <p className="text-4xl font-bold">{value}</p>
      <p className="text-sm font-medium opacity-90 mt-1">{label}</p>
    </div>
    <img src={icon} className="w-16 opacity-90" alt="" />
  </div>
);

const AppointmentRow = ({
  item,
  slotDateFormat,
  cancelAppointment,
  completeAppointment,
}) => {
  return (
    <div className="px-7 py-6 grid grid-cols-1 lg:grid-cols-[2fr_2fr_1fr_1fr] gap-6 hover:bg-gray-50 transition">

      {/* Patient */}
      <div className="flex items-center gap-4">
        <img
          src={item.userData.image}
          alt=""
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold text-gray-900">{item.userData.name}</p>
          <p className="text-gray-500 text-xs">
            {slotDateFormat(item.slotDate)}
          </p>
        </div>
      </div>

      {/* Time */}
      <div className="flex items-center text-sm text-gray-700">
        {item.slotTime}
      </div>

      {/* Status */}
      <div className="flex items-center">
        {item.cancelled ? (
          <span className="bg-red-100 text-red-600 font-semibold text-xs px-3 py-1 rounded-full">
            Cancelled
          </span>
        ) : item.isCompleted ? (
          <span className="bg-green-100 text-green-600 font-semibold text-xs px-3 py-1 rounded-full">
            Completed
          </span>
        ) : (
          <span className="bg-yellow-100 text-yellow-600 font-semibold text-xs px-3 py-1 rounded-full">
            Upcoming
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center lg:justify-end gap-3">
        {!item.cancelled && !item.isCompleted && (
          <>
            <button
              onClick={() => cancelAppointment(item._id)}
              className="w-9 h-9 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center"
            >
              <img src={assets.cancel_icon} className="w-5" alt="" />
            </button>
            <button
              onClick={() => completeAppointment(item._id)}
              className="w-9 h-9 rounded-full bg-green-50 hover:bg-green-100 flex items-center justify-center"
            >
              <img src={assets.tick_icon} className="w-5" alt="" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
