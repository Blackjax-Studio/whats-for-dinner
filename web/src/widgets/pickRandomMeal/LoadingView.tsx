import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSharedOptions, setMealOptions, setCycleTargetRoute } from './state';
import { useToolOutput } from '../../hooks/useOpenAiGlobal';

export function LoadingView() {
  const navigate = useNavigate();
  const toolOutput = useToolOutput();

  useEffect(() => {
    const options = toolOutput?.structuredContent?.options || toolOutput?.options;
    if (options && options.length > 0) {
      console.log('Found toolOutput options');
      setSharedOptions(options);
      setMealOptions(options);
      setCycleTargetRoute('/chosen');
      navigate('/start-spin');
    } else {
      console.log('Waiting for toolOutput options');
    }
  }, [toolOutput, navigate]);

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
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
        {/* Skeleton for the Spin button */}
        <div style={{
          height: '63px', // Matches padding (16*2) + font height approximately
          width: '100%',
          backgroundColor: 'var(--bg-muted, #F0F0F0)',
          borderRadius: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          animation: 'pulsate 2s infinite ease-in-out'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '120px', // Just enough for some visual feedback
            height: '6px',
            backgroundColor: 'var(--border, #E0E0E0)',
            borderRadius: '3px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              backgroundColor: 'var(--accent, #0062FF)',
              borderRadius: '3px',
              animation: 'indeterminate 1.5s infinite linear',
              opacity: 0.5
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}
