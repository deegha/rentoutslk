import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect, useRef } from 'react';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  version: 'weekly',
});

const Map = ({ address, city }: { address: string; city?: string }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    Promise.all([
      loader.importLibrary('maps'),
      loader.importLibrary('marker'),
    ]).then(() => {
      if (mapRef.current && window.google) {
        const map = new window.google.maps.Map(mapRef.current, {
          zoom: 15,
          center: { lat: 0, lng: 0 },
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID,
        });

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode(
          { address: `${address}, ${city}` },
          (results, status) => {
            if (status === 'OK' && results && results[0]) {
              map.setCenter(results[0].geometry.location);

              new window.google.maps.marker.AdvancedMarkerElement({
                map,
                position: results[0].geometry.location,
                title: 'Property Location',
              });
            } else {
              console.error(
                'Geocode was not successful for the following reason:',
                status,
              );
            }
          },
        );
      }
    });
  }, [address, city]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
