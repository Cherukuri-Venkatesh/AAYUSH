import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Features from '../components/Features'

const Home = () => {
  return (
    <div>
      <Header />
      <div className="my-6">
        <div className="bg-white border rounded-2xl p-4 sm:p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-3">Quick access for staff portals (requires respective login).</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/doctor-dashboard" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">Doctor dashboard</Link>
            <Link to="/admin-dashboard" className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/20 transition border border-primary/30">Admin dashboard</Link>
          </div>
        </div>
      </div>
      <TopDoctors />
      <SpecialityMenu />
      <Banner />
      <Features />
    </div>
  )
}

export default Home