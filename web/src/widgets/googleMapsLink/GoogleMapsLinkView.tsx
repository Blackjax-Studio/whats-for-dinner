import React, { useEffect, useState } from 'react';
import { useToolOutput } from '../../hooks/useOpenAiGlobal';

export function GoogleMapsLinkView() {
  const [address, setAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const toolOutput = useToolOutput();

  useEffect(() => {
    // Try to get data from window.openai.getPayload() first (legacy/other patterns)
    if (window.openai?.getPayload) {
      const payload = window.openai.getPayload();
      if (payload) {
        if (payload.address) setAddress(payload.address);
        if (payload.zipCode) setZipCode(payload.zipCode);
      }
    }

    // Also check toolOutput (new pattern using useToolOutput hook)
    if (toolOutput) {
      const structuredContent = toolOutput.structuredContent;
      if (structuredContent) {
        if (structuredContent.address) setAddress(structuredContent.address);
        if (structuredContent.zipCode) setZipCode(structuredContent.zipCode);
      } else {
        // Fallback to top-level fields if not in structuredContent
        if (toolOutput.address) setAddress(toolOutput.address);
        if (toolOutput.zipCode) setZipCode(toolOutput.zipCode);
      }
    }
  }, [toolOutput]);

  if (!address && !zipCode) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        minHeight: '400px',
        fontFamily: 'sans-serif',
        color: '#666'
      }}>
        Loading map...
      </div>
    );
  }

  const query = encodeURIComponent(`${address} ${zipCode}`);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
      boxSizing: 'border-box',
      textAlign: 'center',
      gap: '16px'
    }}>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          backgroundColor: 'var(--accent, #0062FF)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontFamily: "'Red Hat Display', sans-serif",
          fontWeight: 'bold',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          transition: 'transform 0.2s ease, background-color 0.2s ease',
          boxShadow: '0 4px 12px rgba(0, 98, 255, 0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0052D9';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent, #0062FF)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        Open in Google Maps
      </a>
    </div>
  );
}
