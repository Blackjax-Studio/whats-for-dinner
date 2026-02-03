import { useNavigate } from 'react-router-dom';

export function StartSpinView() {
  const navigate = useNavigate();

  const handleSpin = () => {
    navigate('/cycler');
  };

  return (
    <div style={{
      fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      margin: 0,
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '12px',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <button
          onClick={handleSpin}
          style={{
            fontFamily: "'Alfa Slab One', serif",
            fontSize: '1.5rem',
            color: '#FFFFFF',
            backgroundColor: 'var(--warn, #E25600)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            width: '100%',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            transition: 'transform 0.2s, opacity 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            WebkitTapHighlightColor: 'transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Spin
        </button>
      </div>
    </div>
  );
}
