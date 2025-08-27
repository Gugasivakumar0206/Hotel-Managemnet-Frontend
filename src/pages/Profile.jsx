import React, { useEffect, useState } from 'react'
import api from '../api/axios.js'

export default function Profile() {
  const [list, setList] = useState([])

  useEffect(() => {
    api.get('/bookings/my').then(r => setList(r.data))
  }, [])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <div className="grid gap-4">
        {list.map(b => (
          <div key={b._id} className="card">
            <div className="font-semibold">{b.hotel?.name} — {b.roomType?.name}</div>
            <div className="text-sm text-gray-600">{new Date(b.checkIn).toDateString()} → {new Date(b.checkOut).toDateString()}</div>
            <div className="mt-1">Total: ₹{b.total} — <span className="font-medium">{b.status}</span></div>
          </div>
        ))}
        {list.length === 0 && <div className="text-gray-600">No bookings yet.</div>}
      </div>
    </div>
  )
}
