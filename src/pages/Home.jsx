// client/src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import api from '../api/axios.js';
import HotelCard from '../components/HotelCard.jsx';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setErr('');
    // fetch a few hotels to show on the home page (seed provides 2)
    api.get('/hotels')
      .then(r => { if (alive) setHotels(r.data || []); })
      .catch(e => { if (alive) setErr(e?.response?.data?.message || 'Failed to load hotels'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  return (
    <div className="space-y-10">
      {/* hero */}
      <section className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">Find your perfect stay</h1>
        <p className="text-gray-600">Search by city, explore rooms, and book instantly.</p>
        <div className="max-w-3xl mx-auto">
          <SearchBar />
        </div>
        <p className="text-sm text-gray-500">Tip: try “Goa” or “Manali”.</p>
      </section>

      {/* featured */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Hotels</h2>
          <Link to="/search" className="text-blue-600 hover:underline text-sm">Explore all</Link>
        </div>

        {loading && <div className="text-gray-600">Loading hotels…</div>}
        {err && <div className="text-red-600">{err}</div>}

        {!loading && !err && (
          hotels.length
            ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.slice(0, 6).map(h => <HotelCard key={h._id} h={h} />)}
              </div>
            )
            : <div className="text-gray-600">No hotels yet. Try searching above.</div>
        )}
      </section>
    </div>
  );
}
