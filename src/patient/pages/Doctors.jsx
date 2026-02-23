import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [search, setSearch] = useState(""); // 🔥 search state added

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    let result = speciality
      ? doctors.filter((doc) => doc.speciality === speciality)
      : doctors;

    // 🔥 Search Filtering (name + address line 1 + line 2)
    if (search.trim().length > 0) {
      result = result.filter((doc) => {
        const term = search.toLowerCase();
        return (
          doc.name.toLowerCase().includes(term) ||
          doc.address?.line1?.toLowerCase().includes(term) ||
          doc.address?.line2?.toLowerCase().includes(term)
        );
      });
    }

    setFilterDoc(result);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, search]); // 🔥 search included

  const categories = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="text-gray-700">
      <p className="text-gray-600 text-sm">Browse through the doctors specialist.</p>

      {/* 🔥 SEARCH BAR */}
      <div className="mt-4 flex justify-center">
        <input
          type="text"
          placeholder="Search doctor by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full sm:w-96 
            border border-orange-300 rounded-full 
            px-5 py-2 shadow-sm
            focus:outline-none focus:ring-2 focus:ring-orange-400
          "
        />
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col-reverse sm:flex-row justify-between gap-6 mt-6">
        
        {/* DOCTOR LIST */}
        <div
          className="
            w-full 
            grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
            gap-6
            bg-[#FFF7F1]
            border border-orange-200
            rounded-xl
            p-6
          "
        >
          {filterDoc.length === 0 && (
            <p className="text-center text-gray-500 col-span-3 py-10 text-lg">
              No doctors found
            </p>
          )}

          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              className="
                bg-white
                border border-gray-200 
                rounded-xl 
                shadow-sm 
                hover:shadow-lg 
                transition-all 
                cursor-pointer
                hover:-translate-y-1
                overflow-hidden
              "
            >
              <img
                className="w-full h-40 object-cover bg-orange-100"
                src={item.image}
                alt=""
              />

              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-600" : "bg-gray-500"
                    }`}
                  ></span>
                  {item.available ? "Available" : "Not Available"}
                </div>

                <p className="text-lg font-semibold mt-1">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        {/* SPECIALITIES SECTION */}
        <div className="w-full sm:w-56">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`py-2 px-4 border rounded-lg text-sm sm:hidden transition-all ${
              showFilter ? "bg-orange-500 text-white" : "bg-white"
            }`}
          >
            Filters
          </button>

          <div
            className={`${
              showFilter ? "flex" : "hidden sm:flex"
            } flex-col gap-3 bg-[#FFF0DA] 
            border border-orange-300 rounded-xl p-4 shadow-sm`}
          >
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Specialities
            </h3>

            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() =>
                  speciality === cat ? navigate("/doctors") : navigate(`/doctors/${cat}`)
                }
                className={`cursor-pointer text-sm p-2 rounded-lg border transition-all ${
                  speciality === cat
                    ? "bg-orange-300 text-white border-orange-500"
                    : "bg-orange-100 border-orange-300 hover:bg-orange-200"
                }`}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Doctors;
