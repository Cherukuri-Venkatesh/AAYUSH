import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-6 my-16 text-[#262626] md:mx-10">

      {/* Title */}
      <h1 className="text-3xl font-semibold">Top Doctors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Scroll Wrapper (NEW COLORS) */}
      <div
        className="
          w-full max-h-[550px]
          overflow-y-auto
          bg-[#FFF5EC]                 /* Light peach background */
          border border-[#FFB88C]       /* Soft orange border */
          rounded-xl
          shadow-md
          p-5
        "
      >

        {/* Doctor Card List */}
        <div className="flex flex-col gap-5">
          {doctors.slice(0, 10).map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="
                flex items-center gap-4
                bg-white
                rounded-xl
                p-4
                shadow
                cursor-pointer
                transition-all duration-300
                border border-gray-200
                hover:shadow-xl hover:-translate-y-1
              "
            >
              {/* Image */}
              <img
                src={item.image}
                alt=""
                className="w-24 h-24 object-cover rounded-xl bg-[#FFE4D1]"
              />

              {/* Details */}
              <div className="flex flex-col">
                {/* Availability */}
                <div
                  className={`
                    flex items-center gap-2 text-sm
                    ${item.available ? "text-green-600" : "text-gray-500"}
                  `}
                >
                  <span
                    className={`
                      w-2 h-2 rounded-full
                      ${item.available ? "bg-green-600" : "bg-gray-500"}
                    `}
                  ></span>
                  {item.available ? "Available" : "Not Available"}
                </div>

                {/* Name + Speciality */}
                <p className="text-lg font-semibold mt-1">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* More Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="
          bg-[#FFE7D6]
          text-gray-700
          px-12 py-3
          rounded-full
          mt-6
          border border-[#FFB88C]
        "
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;