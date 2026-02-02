import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple React Widget for ChatGPT
function PickRandomMealWidget() {
  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      padding: '30px 20px',
      textAlign: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '16px',
      color: 'white'
    }}>
      <div style={{
        fontFamily: "'Alfa Slab One', serif",
        fontSize: '2.5rem',
        marginBottom: '15px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
      }}>
        🎉 React Widget! 🎉
      </div>

      <div style={{
        fontSize: '1.2rem',
        marginBottom: '20px',
        fontWeight: 600
      }}>
        This widget is now powered by React!
      </div>

      <div style={{
        fontSize: '0.95rem',
        opacity: 0.9,
        marginTop: '15px',
        padding: '12px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '8px'
      }}>
        You can now confirm this is coming from React instead of the old vanilla JS widget.
      </div>
    </div>
  );
}

// Mount the React app
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<PickRandomMealWidget />);
} else {
  console.error('Root element not found for widget');
}
