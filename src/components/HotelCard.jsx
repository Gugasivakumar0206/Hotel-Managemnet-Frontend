import React from 'react';
import { Link } from 'react-router-dom';
import HOTEL_IMAGES from '../images.config.js';

// Fallback image (SVG) in case there's no image available
const FALLBACK_SVG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360">
    <rect width="100%" height="100%" fill="#eef2f7"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
          font-family="Arial, sans-serif" font-size="20" fill="#607089">
      No Image Available
    </text>
  </svg>`);

export default function HotelCard({ h }) {
  // Determine the primary image from hotel data or fallback images
  const primary = (h.images?.[0]) || (HOTEL_IMAGES[h.slug]?.[0]);

  // Handle image error and set fallback image if needed
  const handleErr = (e) => {
    e.currentTarget.onerror = null;  // Prevent infinite loop if fallback image fails
    e.currentTarget.src = FALLBACK_SVG;  // Set fallback image
  };

  return (
    <Link to={`/hotel/${h.slug}`} className="block rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition">
      <img
        src={primary || FALLBACK_SVG}  // Use primary image or fallback SVG
        alt={h.name}  // Image alt text for accessibility
        className="h-40 w-full object-cover"
        loading="lazy"  // Lazy load images for better performance
        decoding="async"  // Async image decoding
        onError={handleErr}  // Handle image error (fallback)
      />
      <div className="p-3">
        <div className="font-semibold text-xl">{h.name}</div>
        <div className="text-sm text-gray-600">{h.location?.city}, {h.location?.country}</div>
        <p className="text-sm mt-1 line-clamp-2">{h.description}</p>
      </div>
    </Link>
  );
}
