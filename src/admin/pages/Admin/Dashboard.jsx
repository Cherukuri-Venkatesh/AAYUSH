import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return (
    dashData && (
      <div className="px-8 py-6 w-full">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Welcome Back 👋</h1>
          <p className="text-gray-500 text-sm mt-1">Here is the latest overview of your platform</p>
        </div>

        {/* Key Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">

          <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 flex flex-col justify-between shadow-lg">
            <p className="text-5xl font-bold leading-none">{dashData.doctors}</p>
            <p className="mt-4 font-medium tracking-wide text-lg">Total Doctors</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 flex flex-col justify-between shadow-lg">
            <p className="text-5xl font-bold leading-none">{dashData.appointments}</p>
            <p className="mt-4 font-medium tracking-wide text-lg">Total Appointments</p>
          </div>

          <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white p-6 flex flex-col justify-between shadow-lg">
            <p className="text-5xl font-bold leading-none">{dashData.patients}</p>
            <p className="mt-4 font-medium tracking-wide text-lg">Total Patients</p>
          </div>

        </div>

        {/* Booking Container with Side Navigation Style */}
        <div className="rounded-2xl border shadow-xl bg-white overflow-hidden">

          <div className="px-7 py-5 border-b bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} className="w-6" alt="" />
              <h2 className="text-xl font-semibold tracking-wide">Recent Appointments</h2>
            </div>
            <p className="text-xs text-gray-500">Latest 5 bookings displayed</p>
          </div>

          <div className="divide-y">

            {dashData.latestAppointments.slice(0, 5).map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[0.7fr_2fr_1fr_1fr] items-center gap-4 px-7 py-5 hover:bg-gray-50 transition cursor-pointer"
              >
                {/* Doctor Avatar + Name */}
                <div className="flex items-center gap-4">
                  <img src={item.docData.image} alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-gray-800">{item.docData.name}</p>
                    <p className="text-gray-400 text-xs">Doctor</p>
                  </div>
                </div>

                {/* Booking */}
                <div>
                  <p className="font-medium text-gray-700 text-sm">
                    Appointment on {slotDateFormat(item.slotDate)}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">{item.slotTime}</p>
                </div>

                {/* Status */}
                <div>
                  {item.cancelled ? (
                    <span className="bg-red-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-600 text-xs font-semibold px-3 py-1 rounded-full">
                      Upcoming
                    </span>
                  )}
                </div>

                {/* Cancel Icon */}
                {!item.cancelled && !item.isCompleted && (
                  <div className="flex md:justify-end">
                    <img
                      src={assets.cancel_icon}
                      className="w-9 hover:scale-110 transition"
                      onClick={() => cancelAppointment(item._id)}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
