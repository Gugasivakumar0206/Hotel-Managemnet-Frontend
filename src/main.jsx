import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Search from './pages/Search.jsx'
import Hotel from './pages/Hotel.jsx'
import Room from './pages/Room.jsx'
import Checkout from './pages/Checkout.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/Admin/Dashboard.jsx'
import AdminRooms from './pages/Admin/Rooms.jsx'
import AdminBookings from './pages/Admin/Bookings.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/hotel/:slug" element={<Hotel />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
