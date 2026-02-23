import React, { useContext, useState, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const DeleteDoctor = () => {
  const { doctors, getAllDoctors, deleteDoctor } = useContext(AdminContext);

  const [loading, setLoading] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleDelete = async () => {
    if (!confirmId) return toast.warning("Select a doctor to delete");
    setLoading(true);
    try {
      const success = await deleteDoctor(confirmId); // calling context function
      if (success) {
        setConfirmId(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-5 py-6 w-full">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-red-700">
        Delete Doctor
      </h2>

      {/* DOCTOR LIST SECTION */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white 
        border rounded-xl p-6 shadow-sm"
      >
        {doctors.map((item, index) => (
          <div
            key={index}
            className={`border rounded-xl p-5 cursor-pointer transition-all
              ${
                confirmId === item._id
                  ? "bg-red-50 border-red-400 shadow-md"
                  : "hover:bg-gray-50"
              }`}
            onClick={() => setConfirmId(item._id)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-full mx-auto border"
            />
            <p className="text-lg font-semibold mt-3 text-center">{item.name}</p>
            <p className="text-sm text-gray-600 text-center">
              {item.speciality}
            </p>
            <p className="text-xs text-gray-500 text-center mt-1">
              {item.degree}
            </p>

            {confirmId === item._id && (
              <p className="text-center text-red-600 text-xs font-medium mt-3">
                Selected for deletion
              </p>
            )}
          </div>
        ))}
      </div>

      {/* CONFIRM DELETE BUTTON */}
      <div className="mt-8 bg-white border rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <img src={assets.warning_icon} className="w-6" alt="" />
          <p className="text-gray-700 text-sm">
            Select a doctor card above → then press delete.
          </p>
        </div>

        <button
          disabled={loading}
          onClick={handleDelete}
          className={`px-10 py-3 rounded-full font-medium shadow ${
            loading
              ? "bg-red-300 cursor-not-allowed text-white"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {loading ? "Deleting..." : "Delete Doctor"}
        </button>
      </div>
    </div>
  );
};

export default DeleteDoctor;
