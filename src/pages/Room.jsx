import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios.js'

export default function Room() {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [availability, setAvailability] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get(`/room-types/${id}`).then(r => setRoom(r.data))
  }, [id])

  const loadAvail = async () => {
    if (!checkIn || !checkOut) return
    const r = await api.get(`/room-types/${id}/availability`, { params: { checkIn, checkOut } })
    setAvailability(r.data)
  }

  const book = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user) return navigate('/login')
    const payload = {
      hotelId: room.hotel._id,
      roomTypeId: room._id,
      checkIn, checkOut, guests: 2,
      specialRequests: ''
    }
    const r = await api.post('/bookings', payload)
    navigate('/profile')
  }

  if (!room) return <div>Loading...</div>

  const img = room.images?.[0] || '/images/hotels/placeholder.jpg'
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        <img src={img} className="w-72 h-48 object-cover rounded-xl" />
        <div>
          <h1 className="text-2xl font-bold">{room.name}</h1>
          <div className="text-gray-600">{room.bedType} • {room.view} • {room.sizeSqm} m² • up to {room.maxGuests} guests</div>
          <div className="mt-2">{room.description}</div>
          <div className="mt-3 text-xl font-bold">₹{room.basePrice} / night</div>
        </div>
      </div>
      <div className="card grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
        <div>
          <label className="label">Check-in</label>
          <input type="date" className="input" value={checkIn} onChange={e=>setCheckIn(e.target.value)} />
        </div>
        <div>
          <label className="label">Check-out</label>
          <input type="date" className="input" value={checkOut} onChange={e=>setCheckOut(e.target.value)} />
        </div>
        <button className="btn" onClick={loadAvail}>Check availability</button>
        <button className="btn" onClick={book}>Book now</button>
      </div>
      {availability.length > 0 && (
        <div className="card">
          <div className="font-semibold mb-2">Availability per night</div>
          <div className="grid md:grid-cols-3 gap-2">
            {availability.map(a => (
              <div key={a.date} className="p-3 rounded-lg border flex justify-between">
                <span>{a.date}</span>
                <span className={a.remaining>0?'text-green-600':'text-red-600'}>{a.remaining>0?'Available':'Sold out'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
