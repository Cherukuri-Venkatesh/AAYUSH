import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AdminContext } from "../context/AdminContext";

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext);
  const { aToken } = useContext(AdminContext);

  const menuStyle = {
    base: `
      flex items-center gap-4 py-3 px-6 rounded-xl cursor-pointer 
      transition-all duration-300 
      hover:bg-orange-100 hover:shadow-sm
    `,
    active: `
      bg-orange-200 text-orange-900 shadow-md
    `,
    iconWrapper: `
      w-9 h-9 flex items-center justify-center rounded-lg
      bg-orange-50 border border-orange-200
    `,
  };

  return (
    <div
      className="min-h-screen w-60 bg-gradient-to-b from-[#FFF4E6] to-[#FFFFFF] border-r shadow-sm flex flex-col"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {/* LOGO / HEADER */}
      <div className="py-6 text-center border-b border-orange-200 bg-gradient-to-r from-orange-100 to-orange-50 shadow-sm">
        <h2 className="text-xl font-semibold text-orange-700 tracking-wide">
          ⚕️ Clinic Panel
        </h2>
      </div>

      {/* ADMIN MENU */}
      {aToken && (
        <ul className="p-4 flex flex-col gap-2 text-gray-700">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.home_icon} alt="" className="w-5" />
            </span>
            Dashboard
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.appointment_icon} alt="" className="w-5" />
            </span>
            Appointments
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.add_icon} alt="" className="w-5" />
            </span>
            Add Doctor
          </NavLink>
          <NavLink
            to="/delete-doctor"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.add_icon} alt="" className="w-5" />
            </span>
            Delete Doctor
          </NavLink>


          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.people_icon} alt="" className="w-5" />
            </span>
            Doctors List
          </NavLink>

        </ul>
      )}

      {/* DOCTOR MENU */}
      {dToken && (
        <ul className="p-4 flex flex-col gap-2 text-gray-700">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.home_icon} alt="" className="w-5" />
            </span>
            Dashboard
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.appointment_icon} alt="" className="w-5" />
            </span>
            Appointments
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `${menuStyle.base} ${isActive ? menuStyle.active : ""}`
            }
          >
            <span className={menuStyle.iconWrapper}>
              <img src={assets.people_icon} alt="" className="w-5" />
            </span>
            Profile
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
