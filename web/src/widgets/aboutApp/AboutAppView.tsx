export function AboutAppView() {
  return (
    <div style={{
      fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'var(--card-bg, #FFFFFF)',
        border: '1px solid var(--border, #E0E0E0)',
        borderRadius: '12px',
        padding: '24px 16px',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px',
        boxSizing: 'border-box',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{
          margin: '0 0 16px',
          fontSize: '1.2rem',
          fontFamily: "'Alfa Slab One', serif",
          color: 'var(--text-title, #000000)',
          lineHeight: '1.3'
        }}>
          Built with ❤️ as an open-source ChatGPT MCP tool.
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="https://github.com/Blackjax-Studio/whats-for-dinner"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: 'var(--accent, #0062FF)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 'bold',
              fontSize: '0.9rem',
              transition: 'transform 0.2s',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
