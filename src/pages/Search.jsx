// client/src/pages/Search.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../lib/api';
import HotelCard from '../components/HotelCard';

export default function Search() {
  const [params] = useSearchParams(); // Get URL parameters
  const [list, setList] = useState([]); // Hotel list
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const city = (params.get('city') || '').trim();
    const q = (params.get('q') || '').trim();
    api.get('/hotels', { city, q })
      .then(setList)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params]);

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-xl font-semibold my-6">Search Results</h1>
      {loading ? (
        <p>Loading...</p>
      ) : list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((h) => <HotelCard key={h._id} h={h} />)}
        </div>
      ) : (
        <p>No hotels found. Try another search.</p>
      )}
    </div>
  );
}
