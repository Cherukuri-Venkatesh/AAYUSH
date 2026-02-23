import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="px-8 py-7 w-full">

      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Doctors Directory</h1>
        <p className="text-gray-500 text-sm mt-1">Manage doctor details & availability</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">

        {doctors.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-xl overflow-hidden bg-white hover:shadow-2xl transition cursor-pointer border border-gray-100"
          >
            {/* Profile Image */}
            <div className="w-full h-48 bg-gray-100 overflow-hidden">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            {/* Info Section */}
            <div className="px-6 py-5">
              <h2 className="font-semibold text-xl text-gray-800">{item.name}</h2>
              <p className="text-gray-500 text-sm mt-0.5">{item.speciality}</p>

              {/* Availability Toggle */}
              <div className="mt-5 flex items-center justify-between">
                <p className="text-gray-700 font-medium text-sm">Availability</p>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.available}
                    onChange={() => changeAvailability(item._id)}
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"/>
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:left-6" />
                </label>
              </div>
            </div>
          </div>
        ))}

      </div>

      {/* No Doctors Fallback */}
      {doctors.length === 0 && (
        <p className="text-center py-16 text-gray-500 text-lg font-medium">
          No doctors found
        </p>
      )}
    </div>
  );
};

export default DoctorsList;
