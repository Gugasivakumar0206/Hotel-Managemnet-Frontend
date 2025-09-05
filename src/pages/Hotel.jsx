// client/src/pages/Hotel.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../lib/api.js';
import HOTEL_IMAGES from '../images.config.js';

const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
  <rect width="100%" height="100%" fill="#eef2f7"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-size="20" fill="#607089">
    No Image
  </text>
</svg>`);

export default function Hotel() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    let alive = true;
    setErr(''); setMsg(''); setData(null);
    api.get(`/hotels/${slug}`)
      .then(r => { if (alive) setData(r); })
      .catch(e => { if (alive) setErr(e.message || 'Failed to load'); });
    return () => { alive = false; };
  }, [slug]);

  if (err) return <div className="max-w-5xl mx-auto p-4 text-red-600">{err}</div>;
  if (!data) return <div className="max-w-5xl mx-auto p-4">Loading…</div>;

  const { hotel, roomTypes } = data;

  // build gallery (DB first; fallback config)
  const raw = (hotel.images?.length ? hotel.images : (HOTEL_IMAGES[hotel.slug] || []));
  const gallery = raw.map(x => x.startsWith('http') ? x : `/images/hotels/${x}`);

  const onErrImg = (e) => { e.currentTarget.onerror = null; e.currentTarget.src = FALLBACK_SVG; };

  const bookQuick = async (roomTypeId) => {
    setBusy(true); setMsg('');
    try {
      // Quick default: tomorrow -> +1 night, 2 guests
      const checkIn = new Date(); checkIn.setDate(checkIn.getDate() + 1);
      const checkOut = new Date(); checkOut.setDate(checkOut.getDate() + 2);
      const payload = {
        hotelId: hotel._id,
        roomTypeId,
        guests: 2,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
      };
      await api.post('/bookings', payload);
      setMsg('✅ Booking created! Check your bookings page.');
    } catch (e) {
      if (String(e.message).toLowerCase().includes('unauthorized')) {
        alert('Please log in to book. Redirecting to login…');
        nav('/login');
      } else {
        alert(e.message || 'Booking failed');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{hotel.name}</h1>
        <p className="text-gray-600">{hotel.location?.city}{hotel.location?.country ? `, ${hotel.location.country}` : ''}</p>

        {gallery.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mt-3">
            {gallery.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Photo ${i + 1}`}
                className="h-36 rounded-xl object-cover"
                loading="lazy"
                decoding="async"
                onError={onErrImg}
              />
            ))}
          </div>
        )}

        <p className="mt-3">{hotel.description}</p>
      </div>

      <div id="rooms" className="space-y-3">
        <h2 className="text-xl font-semibold">Rooms</h2>
        {roomTypes?.length ? roomTypes.map(rt => (
          <div key={rt._id} className="rounded-xl border border-gray-100 p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{rt.name}</div>
              {rt.price && <div className="text-sm text-gray-600">₹{rt.price} / night</div>}
              <div className="text-sm text-gray-500">{rt.amenities?.join(' • ')}</div>
            </div>
            <button
              disabled={busy}
              onClick={() => bookQuick(rt._id)}
              className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-60"
            >
              {busy ? 'Booking…' : 'Book Now'}
            </button>
          </div>
        )) : <div className="text-gray-500">No rooms available.</div>}
        {msg && <div className="text-green-600">{msg}</div>}
      </div>
    </div>
  );
}
