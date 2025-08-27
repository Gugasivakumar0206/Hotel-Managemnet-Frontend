import React from 'react'
import { Link } from 'react-router-dom'

export default function RoomCard({ r }) {
  const img = r.images?.[0] || '/images/hotels/placeholder.jpg'
  return (
    <div className="card flex gap-4">
      <img src={img} className="w-40 h-28 object-cover rounded-xl" />
      <div className="grow">
        <div className="text-lg font-semibold">{r.name}</div>
        <div className="text-sm text-gray-500">{r.bedType} • {r.view} • up to {r.maxGuests} guests</div>
        <div className="mt-2 text-gray-700 line-clamp-2">{r.description}</div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold">₹{r.basePrice}</div>
        <Link to={`/room/${r._id}`} className="btn mt-2">View</Link>
      </div>
    </div>
  )
}
