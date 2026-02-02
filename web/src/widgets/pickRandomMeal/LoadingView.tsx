import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSharedOptions } from './state';

declare global {
  interface Window {
    openai?: {
      toolOutput?: {
        options?: Array<{ title?: string; name?: string; description?: string; type?: string }>;
      };
      sendFollowUpMessage?: (payload: { prompt: string }) => void;
    };
  }
}

export function LoadingView() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSetGlobals = (event: CustomEvent) => {
      console.log('openai:set_globals event received');
      const globals = event.detail?.globals;
      const toolOutput = globals?.toolOutput;
      if (toolOutput?.options && toolOutput.options.length > 0) {
        setSharedOptions(toolOutput.options);
        navigate('/cycler');
      }
    };

    window.addEventListener('openai:set_globals', handleSetGlobals as EventListener);

    // Initial check
    if (window.openai?.toolOutput?.options) {
      console.log('Found toolOutput in window.openai');
      setSharedOptions(window.openai.toolOutput.options);
      navigate('/cycler');
    } else {
      console.log('Waiting for openai:set_globals event or toolOutput');
    }

    return () => {
      window.removeEventListener('openai:set_globals', handleSetGlobals as EventListener);
    };
  }, [navigate]);

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
        padding: '4px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          fontFamily: "'Alfa Slab One', serif",
          fontSize: '1.8rem',
          color: 'var(--accent, #0062FF)',
          padding: '8px 16px',
          animation: 'pulsate 1.5s ease-in-out infinite'
        }}>
          Loading up the options
        </div>
      </div>
    </div>
  );
}
