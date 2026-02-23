import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PharmacistPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const fetchPrescriptions = async () => {
    const res = await axios.get(`${backendUrl}/api/files/pharmacist/all`);
    setPrescriptions(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${backendUrl}/api/files/update-status/${id}`, { status });
    fetchPrescriptions();
  };

  useEffect(() => { fetchPrescriptions(); }, []);

  return (
    <div className="p-4">
      <h2 className="font-bold mb-3 text-xl">Prescription Orders</h2>
      {prescriptions.map((p, i) => (
        <div key={i} className="border p-3 rounded mb-2 flex justify-between items-center">
          <div>
            <p><b>Patient:</b> {p.patientId}</p>
            <p><b>Status:</b> {p.status}</p>
            <a href={`/${p.fileUrl}`} target="_blank" rel="noreferrer" className="text-blue-500 underline">View</a>
          </div>
          <select value={p.status} onChange={e => updateStatus(p._id, e.target.value)} className="border p-1 rounded">
            <option>Pending</option>
            <option>Packing</option>
            <option>Ready</option>
            <option>Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default PharmacistPrescriptions;
