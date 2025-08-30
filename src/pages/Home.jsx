// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import api from '../lib/api';
import HotelCard from '../components/HotelCard';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/hotels', { limit: 6 })
      .then(setHotels)
      .catch((err) => console.error('Home hotels error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center mt-10 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Find your perfect stay</h1>
        <p className="text-gray-600 mt-2">Search by city, explore rooms, and book instantly.</p>
      </div>

      {/* Tip Section */}
      <p className="text-center text-sm text-gray-500">Tip: try “Goa” or “Manali”.</p>

      {/* Featured Hotels Section */}
      <section className="max-w-5xl mx-auto px-4 mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Hotels</h2>
          <a href="/search" className="text-sm text-blue-600">Explore all</a>
        </div>
        {loading ? (
          <p className="text-gray-500 mt-4">Loading…</p>
        ) : hotels.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {hotels.map(h => <HotelCard key={h._id} h={h} />)}
          </div>
        ) : (
          <p className="text-gray-500 mt-4">No hotels yet. Try searching above.</p>
        )}
      </section>
    </div>
  );
}
