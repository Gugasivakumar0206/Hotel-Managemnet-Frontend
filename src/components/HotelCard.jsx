// client/src/components/HotelCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
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

export default function HotelCard({ h }) {
  const primary = (h.images?.[0]) || (HOTEL_IMAGES[h.slug]?.[0]);
  const handleErr = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_SVG;
  };

  return (
    <Link to={`/hotel/${h.slug}`} className="block rounded-xl overflow-hidden shadow hover:shadow-md transition">
      <img
        src={primary || FALLBACK_SVG}
        alt={h.name}
        className="h-40 w-full object-cover"
        loading="lazy"
        decoding="async"
        onError={handleErr}
      />
      <div className="p-3">
        <div className="font-semibold">{h.name}</div>
        <div className="text-sm text-gray-600">{h.location?.city}, {h.location?.country}</div>
        <p className="text-sm mt-1 line-clamp-2">{h.description}</p>
      </div>
    </Link>
  );
}
