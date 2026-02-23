import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(false);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const doc = doctors.find((d) => d._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSolts = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let slots = [];
      while (currentDate < endTime) {
        let formatted = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        let d = currentDate.getDate();
        let m = currentDate.getMonth() + 1;
        let y = currentDate.getFullYear();
        const slotDate = `${d}_${m}_${y}`;

        const isAvailable =
          docInfo?.slots_booked?.[slotDate] &&
          docInfo?.slots_booked?.[slotDate].includes(formatted)
            ? false
            : true;

        if (isAvailable) slots.push({ datetime: new Date(currentDate), time: formatted });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, slots]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warning("Login to book appointment");
      return navigate("/login");
    }

    const date = docSlots[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctosData();
        navigate("/my-appointments");
      } else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (doctors.length) fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSolts();
  }, [docInfo]);

  return docInfo ? (
    <div className="px-6 lg:px-16 py-10 space-y-16">

      {/* DOCTOR HEADER */}
      <div className="rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 relative p-[2px]">
        <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-8">
          
          <img src={docInfo.image} className="w-full md:w-60 rounded-2xl object-cover shadow-lg" />

          <div className="flex-1 space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} className="w-7" />
            </h1>

            <p className="text-gray-600 text-lg">
              {docInfo.degree} • {docInfo.speciality}
            </p>

            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-medium inline-block">
              {docInfo.experience}
            </span>

            <p className="text-gray-800 font-semibold text-lg mt-5">About</p>
            <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>

            <p className="text-gray-800 font-semibold pt-1">
              Appointment Fee:
              <span className="ml-2 font-bold text-blue-700 text-xl">
                {currencySymbol}{docInfo.fees}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* SLOT BOOKING */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide">
          Book Your Appointment
        </h2>

        {/* DAYS */}
        <div className="flex gap-4 overflow-x-auto pb-3">
          {docSlots.map((slots, index) => {
            let dateObj = new Date();
            dateObj.setDate(dateObj.getDate() + index);

            return (
              <div
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-24 px-4 py-4 rounded-xl text-center cursor-pointer transition-all transform hover:scale-[1.05] shadow ${
                  slotIndex === index
                    ? "bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-300"
                }`}
              >
                <p className="font-bold">{daysOfWeek[dateObj.getDay()]}</p>
                <p className="text-sm">{dateObj.getDate()}</p>
                {!slots.length && <p className="text-[11px] opacity-75">No Slots</p>}
              </div>
            );
          })}
        </div>

        {/* TIMES */}
        <div className="flex gap-4 overflow-x-auto mt-6 pb-1">
          {docSlots[slotIndex]?.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-6 py-2 rounded-full text-sm cursor-pointer transition transform hover:scale-[1.05] shadow ${
                slotTime === item.time
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white"
                  : "bg-white border border-gray-400 text-gray-700"
              }`}
            >
              {item.time.toLowerCase()}
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <button
          onClick={bookAppointment}
          className="mt-10 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-lg hover:opacity-95 transition tracking-wide"
        >
          Confirm Booking
        </button>
      </div>

      {/* RELATED DOCTORS */}
      <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
    </div>
  ) : null;
};

export default Appointment;
