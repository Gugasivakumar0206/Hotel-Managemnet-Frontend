// client/src/pages/Hotel.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios.js';
import RoomCard from '../components/RoomCard.jsx';
import HOTEL_IMAGES from '../images.config.js'; // <-- fallback images map

export default function Hotel() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    let alive = true;
    setErr('');
    setData(null);

    api
      .get(`/hotels/${slug}`)
      .then((r) => {
        if (!alive) return;
        setData(r.data);
      })
      .catch((e) => {
        if (!alive) return;
        setErr(e?.response?.data?.message || 'Failed to load hotel');
      });

    return () => {
      alive = false;
    };
  }, [slug]);

  if (err) return <div className="card text-red-600">{err}</div>;
  if (!data) return <div className="card">Loading...</div>;

  const { hotel, roomTypes } = data;

  // Fallback gallery logic: prefer DB images; if none, use HOTEL_IMAGES[slug]; else empty array
  const gallery =
    (hotel.images?.length ? hotel.images : (HOTEL_IMAGES[hotel.slug] || []));

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <div className="text-gray-600">
          {hotel.location?.city}, {hotel.location?.country}
        </div>

        {/* --- GALLERY (fallback-ready) --- */}
        {gallery.length > 0 && (
          <div className="flex gap-2 overflow-x-auto">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Photo ${i + 1} of ${hotel.name}`}
                className="h-36 rounded-xl object-cover"
              />
            ))}
          </div>
        )}

        <p>{hotel.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Rooms</h2>
        {roomTypes?.length ? (
          roomTypes.map((rt) => <RoomCard key={rt._id} r={rt} />)
        ) : (
          <div className="text-gray-600">No rooms found.</div>
        )}
      </div>
    </div>
  );
}
