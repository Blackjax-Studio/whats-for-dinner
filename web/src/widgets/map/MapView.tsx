import React, { useEffect, useState } from 'react';

export function MapView() {
  const [address, setAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');

  useEffect(() => {
    if (window.openai?.getPayload) {
      const payload = window.openai.getPayload();
      if (payload) {
        setAddress(payload.address || '');
        setZipCode(payload.zipCode || '');
      }
    }
  }, []);

  if (!address && !zipCode) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontFamily: 'sans-serif',
        color: '#666'
      }}>
        Loading map...
      </div>
    );
  }

  const query = encodeURIComponent(`${address} ${zipCode}`);
  const mapUrl = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <div style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
      ></iframe>
    </div>
  );
}
