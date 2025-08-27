import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const [city, setCity] = useState('')
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const go = (e) => {
  e.preventDefault();
  const params = new URLSearchParams();
  const c = city.trim();
  const s = q.trim();
  if (c) params.set('city', c);
  if (s) params.set('q', s);
  navigate(`/search?${params.toString()}`);
};

  return (
    <form onSubmit={go} className="card flex gap-2 items-end">
      <div className="grow">
        <label className="label">City</label>
        <input value={city} onChange={e=>setCity(e.target.value)} className="input" placeholder="Goa, Manali, ..." />
      </div>
      <div className="grow">
        <label className="label">Keywords</label>
        <input value={q} onChange={e=>setQ(e.target.value)} className="input" placeholder="Beach, pool, mountain..." />
      </div>
      <button className="btn">Search</button>
    </form>
  )
}
