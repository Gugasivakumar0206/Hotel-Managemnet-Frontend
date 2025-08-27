import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const logout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); navigate('/'); };
  return (
    <div>
      <header className="bg-white shadow">
        <div className="container py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold">Hotel Booking</Link>
          <nav className="flex gap-4 items-center">
            <Link to="/search" className="hover:underline">Search</Link>
            {user && <Link to="/profile" className="hover:underline">My Bookings</Link>}
            {user?.role === 'admin' && <Link to="/admin" className="hover:underline">Admin</Link>}
            {user ? <button onClick={logout} className="btn">Logout</button> : <Link to="/login" className="btn">Login</Link>}
          </nav>
        </div>
      </header>
      <main className="container py-8">
        <Outlet />
      </main>
      <footer className="py-8 text-center text-sm text-gray-500">© {new Date().getFullYear()} Hotel Booking</footer>
    </div>
  )
}
