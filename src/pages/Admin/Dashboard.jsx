import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDashboard(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <Link to="/admin/rooms" className="card hover:shadow-lg transition">Manage Rooms</Link>
        <Link to="/admin/bookings" className="card hover:shadow-lg transition">Manage Bookings</Link>
      </div>
      <div className="text-sm text-gray-500">Note: This starter has minimal admin UI; use API or extend these pages.</div>
    </div>
  )
}
