import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '250px',
  borderRadius: '0.75rem'
};

const center = {
  lat: 19.0760, // Mock: Mumbai
  lng: 72.8777
};

const PollingBoothMap = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const isInvalidKey = !apiKey || apiKey === 'your_google_maps_api_key';

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: isInvalidKey ? '' : apiKey
  });

  if (isInvalidKey || loadError) {
    return (
      <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-gray-200 relative" style={{ height: '250px' }}>
        <iframe
          title="Polling Booth Location"
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.01}%2C${center.lat - 0.01}%2C${center.lng + 0.01}%2C${center.lat + 0.01}&layer=mapnik&marker=${center.lat}%2C${center.lng}`}
        ></iframe>
        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-sm p-2 text-center border-t border-gray-200">
          <p className="text-gray-600 text-[10px] font-medium">Using OpenStreetMap. For Google Maps, add a valid API key to .env.</p>
        </div>
      </div>
    );
  }

  return isLoaded ? (
    <div className="mt-4 rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={{ disableDefaultUI: true }}
      >
        <Marker position={center} title="Your Assigned Polling Booth" />
      </GoogleMap>
    </div>
  ) : <div className="mt-4 h-[250px] flex items-center justify-center text-sm text-gray-500 bg-gray-50 rounded-xl border border-gray-200">Loading Map...</div>;
};

export default PollingBoothMap;
