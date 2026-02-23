import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className="px-8 py-7 w-full">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">All Appointments</h1>
        <p className="text-gray-500 text-sm mt-1">Complete list of patient bookings</p>
      </div>

      {/* Appointments Container */}
      <div className="rounded-2xl shadow-xl bg-white overflow-hidden">

        {/* Top title bar */}
        <div className="px-7 py-5 border-b bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img className="w-6" src={assets.list_icon} alt="" />
            <p className="text-xl font-semibold tracking-wide">Bookings List</p>
          </div>
          <div className="bg-primary h-1 w-28 rounded"></div>
        </div>

        {/* Appointments Section */}
        <div className="divide-y">

          {appointments.map((item, index) => (
            <div
              key={index}
              className="px-7 py-6 grid grid-cols-1 md:grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-6 hover:bg-gray-50 transition cursor-pointer"
            >
              {/* Patient details */}
              <div className="flex items-center gap-4">
                <img
                  src={item.userData.image}
                  className="w-12 h-12 rounded-full object-cover border"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-gray-900 text-base">{item.userData.name}</p>
                  <p className="text-gray-400 text-xs">Age {calculateAge(item.userData.dob)}</p>
                </div>
              </div>

              {/* Appointment date + time */}
              <div className="flex flex-col">
                <p className="font-medium text-gray-800 text-sm">
                  {slotDateFormat(item.slotDate)}
                </p>
                <p className="text-gray-500 text-xs">{item.slotTime}</p>
              </div>

              {/* Doctor info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.docData.image}
                  className="w-12 h-12 rounded-full object-cover bg-gray-200"
                  alt=""
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{item.docData.name}</p>
                  <p className="text-gray-400 text-xs">Doctor</p>
                </div>
              </div>

              {/* Fees */}
              <p className="text-gray-800 font-bold text-sm flex items-center">
                {currency}
                {item.amount}
              </p>

              {/* Status / cancel */}
              <div className="flex md:justify-end items-center">
                {item.cancelled ? (
                  <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-3 py-1 rounded-full">
                    Completed
                  </span>
                ) : (
                  <img
                    src={assets.cancel_icon}
                    className="w-8 hover:scale-110 transition cursor-pointer"
                    onClick={() => cancelAppointment(item._id)}
                    alt=""
                  />
                )}
              </div>
            </div>
          ))}

          {appointments.length === 0 && (
            <p className="text-center py-14 text-gray-500 text-lg font-medium">No Appointments Found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;
