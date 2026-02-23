import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="py-16 px-4 flex flex-col items-center bg-white"
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-semibold text-gray-800 tracking-tight">
          Explore Specialities
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mt-2 text-sm">
          Browse our list of expert doctors and book an appointment instantly.
        </p>
      </div>

      {/* Card Grid */}
      <div className="
        grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6
        gap-6 w-full max-w-5xl
      ">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="
              bg-gray-50 shadow-sm hover:shadow-lg
              rounded-xl p-4 flex flex-col items-center
              cursor-pointer transition-all duration-300
              hover:-translate-y-2 border border-gray-200
            "
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-14 sm:w-20 mb-3"
            />
            <span className="text-gray-700 text-sm font-medium text-center">
              {item.speciality}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;