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
  // prefer DB image -> fallback config -> inline svg
  const primary = h?.images?.[0] || (HOTEL_IMAGES[h?.slug]?.[0]) || FALLBACK_SVG;
  const src = primary.startsWith('http') ? primary : `/images/hotels/${primary}`;

  const onErr = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_SVG;
  };

  return (
    <Link
      to={`/hotel/${h.slug}`}
      className="block rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden bg-white"
    >
      <div className="aspect-[16/10] w-full overflow-hidden">
        <img src={src} alt={h.name} className="w-full h-full object-cover" loading="lazy" onError={onErr} />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-1">{h.name}</h3>
          {typeof h.rating === 'number' && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-emerald-50 text-emerald-600">
              ★ {h.rating.toFixed(1)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
          {h.location?.city}{h.location?.country ? ` • ${h.location.country}` : ''}
        </p>
        {h.priceFrom && (
          <p className="mt-2">
            <span className="text-lg font-bold">₹{h.priceFrom}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </p>
        )}
        <button
          className="mt-3 w-full rounded-xl bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 active:scale-[.99]"
          onClick={(e) => { e.preventDefault(); window.location.href = `/hotel/${h.slug}#rooms`; }}
        >
          Book Now
        </button>
      </div>
    </Link>
  );
}
