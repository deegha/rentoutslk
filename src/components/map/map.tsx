import React, { useEffect, useRef } from 'react';

// Глобальная декларация объекта window.google
declare global {
  interface Window {
    google: typeof google;
  }
}

interface MapProps {
  address: string;
  place?: string;
}

const Map: React.FC<MapProps> = ({ address, place }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const loadMap = async () => {
      if (!window.google || !mapRef.current) return;

      const geocoder = new window.google.maps.Geocoder();
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat: 0, lng: 0 },
      });

      geocoder.geocode(
        { address: `${address}, ${place}` },
        (results: { geometry: { location: any } }[], status: string) => {
          if (status === 'OK' && results && results[0]) {
            const location = results[0].geometry.location;
            mapInstance.current?.setCenter(location);

            new window.google.maps.Marker({
              map: mapInstance.current,
              position: location,
            });
          } else {
            console.error(
              'Geocode was not successful for the following reason: ' + status,
            );
          }
        },
      );
    };

    if (typeof window.google === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = () => loadMap();
      document.head.appendChild(script);
    } else {
      loadMap();
    }
  }, [address, place]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
