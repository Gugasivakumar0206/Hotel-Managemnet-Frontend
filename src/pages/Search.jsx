import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../api/axios.js'
import HotelCard from '../components/HotelCard.jsx'

export default function Search() {
  const [params] = useSearchParams()
  const [list, setList] = useState([])

 useEffect(() => {
  const city = (params.get('city') || '').trim();
  const q = (params.get('q') || '').trim();
  api.get('/hotels', { params: { city, q } }).then(r => setList(r.data));
}, [params]);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Search Results</h2>
      <div className="grid gap-4">
        {list.map(h => <HotelCard key={h._id} h={h} />)}
        {list.length === 0 && <div className="text-gray-600">No hotels found. Try another city.</div>}
      </div>
    </div>
  )
}
