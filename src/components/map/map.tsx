import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useRef } from 'react';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: 'weekly',
});

const Map = ({ address, place }: { address: string; place?: string }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loader.load().then(() => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 15,
          center: { lat: 0, lng: 0 },
        });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: `${address}, ${place}` },
          (results, status) => {
            if (status === 'OK' && results && results[0]) {
              map.setCenter(results[0].geometry.location);
              new window.google.maps.Marker({
                map,
                position: results[0].geometry.location,
              });
            }
          },
        );
      }
    });
  }, [address, place]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
