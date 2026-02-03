import React, { useEffect, useState } from 'react';
import { useToolOutput } from '../../hooks/useOpenAiGlobal';

export function GoogleMapsLinkView() {
  const [poiName, setPoiName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const toolOutput = useToolOutput();

  useEffect(() => {
    // Try to get data from window.openai.getPayload() first (legacy/other patterns)
    if (window.openai?.getPayload) {
      const payload = window.openai.getPayload();
      if (payload) {
        if (payload.poiName) setPoiName(payload.poiName);
        if (payload.address) setAddress(payload.address);
        if (payload.zipCode) setZipCode(payload.zipCode);
      }
    }

    // Also check toolOutput (new pattern using useToolOutput hook)
    if (toolOutput) {
      const structuredContent = toolOutput.structuredContent;
      if (structuredContent) {
        if (structuredContent.poiName) setPoiName(structuredContent.poiName);
        if (structuredContent.address) setAddress(structuredContent.address);
        if (structuredContent.zipCode) setZipCode(structuredContent.zipCode);
      } else {
        // Fallback to top-level fields if not in structuredContent
        if (toolOutput.poiName) setPoiName(toolOutput.poiName);
        if (toolOutput.address) setAddress(toolOutput.address);
        if (toolOutput.zipCode) setZipCode(toolOutput.zipCode);
      }
    }
  }, [toolOutput]);

  if (!poiName && !address && !zipCode) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        padding: '24px',
        boxSizing: 'border-box',
        backgroundColor: 'var(--bg-color, #FFFFFF)'
      }}>
        <div style={{
          fontFamily: "'Alfa Slab One', serif",
          fontSize: '1.2rem',
          color: 'var(--accent, #0062FF)',
          marginBottom: '16px'
        }}>
          Preparing Link...
        </div>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          height: '6px',
          backgroundColor: 'var(--bg-muted, #F0F0F0)',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            height: '100%',
            backgroundColor: 'var(--accent, #0062FF)',
            borderRadius: '3px',
            animation: 'indeterminate 1.5s infinite linear'
          }} />
        </div>
      </div>
    );
  }

  const query = encodeURIComponent(`${poiName} ${address} ${zipCode}`.trim());
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
      <div style={{
        fontFamily: "'Alfa Slab One', serif",
        fontSize: '1.2rem',
        color: 'var(--accent, #0062FF)',
        marginBottom: '8px'
      }}>
        {poiName}
      </div>
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
