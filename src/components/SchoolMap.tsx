'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with Vite
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export interface SchoolMarker {
  id: string;
  name: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  url?: string;
}

interface SchoolMapProps {
  schools: SchoolMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

export default function SchoolMap({ 
  schools, 
  center = [20, 0], 
  zoom = 2,
  className = "h-[400px] w-full rounded-lg"
}: SchoolMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Calculate center from schools if not provided
    if (schools.length > 0 && !center) {
      const avgLat = schools.reduce((sum, s) => sum + s.coordinates.lat, 0) / schools.length;
      const avgLng = schools.reduce((sum, s) => sum + s.coordinates.lng, 0) / schools.length;
      
      if (mapRef.current) {
        mapRef.current.setView([avgLat, avgLng], zoom);
      }
    }
  }, [schools, center, zoom]);

  if (schools.length === 0) {
    return (
      <div className={className + " bg-gray-100 flex items-center justify-center"}>
        <p className="text-gray-500">No schools to display on map</p>
      </div>
    );
  }

  // Calculate bounds if we have schools
  const calculatedCenter: [number, number] = schools.length > 0
    ? [
        schools.reduce((sum, s) => sum + s.coordinates.lat, 0) / schools.length,
        schools.reduce((sum, s) => sum + s.coordinates.lng, 0) / schools.length
      ]
    : center;

  return (
    <div className={className}>
      <MapContainer
        center={calculatedCenter}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full rounded-lg z-0"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {schools.map((school) => (
          <Marker
            key={school.id}
            position={[school.coordinates.lat, school.coordinates.lng]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm mb-1">{school.name}</h3>
                {school.url && (
                  <a 
                    href={school.url}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    View School →
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

