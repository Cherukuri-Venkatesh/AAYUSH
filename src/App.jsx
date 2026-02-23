import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './admin/App.jsx';
import Dashboard from './admin/pages/Admin/Dashboard.jsx';
import AllAppointments from './admin/pages/Admin/AllAppointments.jsx';
import AddDoctor from './admin/pages/Admin/AddDoctor.jsx';
import DeleteDoctor from './admin/pages/Admin/DeleteDoctor.jsx';
import DoctorsList from './admin/pages/Admin/DoctorsList.jsx';
import DoctorAppointments from './admin/pages/Doctor/DoctorAppointments.jsx';
import DoctorDashboard from './admin/pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './admin/pages/Doctor/DoctorProfile.jsx';
import PharmacistPrescriptions from './admin/pages/Pharmacist/PharmacistPrescriptions.jsx';
import PatientLayout from './patient/App.jsx';
import About from './patient/pages/About.jsx';
import Appointment from './patient/pages/Appointment.jsx';
import Contact from './patient/pages/Contact.jsx';
import Doctors from './patient/pages/Doctors.jsx';
import Home from './patient/pages/Home.jsx';
import Login from './patient/pages/Login.jsx';
import MyAppointments from './patient/pages/MyAppointments.jsx';
import MyLabReports from './patient/pages/MyLabReports.jsx';
import MyPrescriptions from './patient/pages/MyPrescriptions.jsx';
import MyProfile from './patient/pages/MyProfile.jsx';
import Verify from './patient/pages/Verify.jsx';
import AdminProviders from './providers/AdminProviders.jsx';
import PatientProviders from './providers/PatientProviders.jsx';

const App = () => {
  return (
    <Routes>
      <Route
        element={(
          <PatientProviders>
            <PatientLayout />
          </PatientProviders>
        )}
      >
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/my-prescriptions" element={<MyPrescriptions />} />
        <Route path="/my-labreports" element={<MyLabReports />} />
        <Route path="/pharmacist-prescriptions" element={<PharmacistPrescriptions />} />
      </Route>

      <Route
        element={(
          <AdminProviders>
            <AdminLayout />
          </AdminProviders>
        )}
      >
        <Route path="/admin-dashboard" element={<Dashboard />} />
        <Route path="/all-appointments" element={<AllAppointments />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/delete-doctor" element={<DeleteDoctor />} />
        <Route path="/doctor-list" element={<DoctorsList />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
