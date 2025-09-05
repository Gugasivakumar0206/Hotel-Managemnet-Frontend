// client/src/pages/Search.jsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../lib/api.js';
import HotelCard from '../components/HotelCard.jsx';

export default function Search() {
  const [params] = useSearchParams();
  const [list, setList] = useState([]);

  useEffect(() => {
    const city = (params.get('city') || '').trim();
    const q = (params.get('q') || '').trim();
    api.get('/hotels', { city, q })
      .then(setList)
      .catch(console.error);
  }, [params]);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <h1 className="text-xl font-semibold my-6">Search Results</h1>
      {list.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map(h => <HotelCard key={h._id} h={h} />)}
        </div>
      ) : <p>No hotels found. Try another city.</p>}
    </div>
  );
}
