import { useNavigate } from 'react-router-dom';

export function StartSpinView() {
  const navigate = useNavigate();

  const handleStartSpin = () => {
    navigate('/cycler');
  };

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
      boxSizing: 'border-box'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '12px',
        boxSizing: 'border-box',
        width: '100%'
      }}>
        <button
          onClick={handleStartSpin}
          style={{
            fontFamily: "'Alfa Slab One', serif",
            fontSize: '1.2rem',
            color: 'white',
            backgroundColor: 'var(--accent, #0062FF)',
            border: 'none',
            borderRadius: '12px',
            padding: '16px 32px',
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 4px 12px rgba(0, 98, 255, 0.2)',
            transition: 'transform 0.1s active',
            WebkitTapHighlightColor: 'transparent'
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          SPIN FOR RESTAURANT!
        </button>
      </div>
    </div>
  );
}
