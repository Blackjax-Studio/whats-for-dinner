import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setSharedOptions, setMealOptions, setCycleTargetRoute, clearRecipes, clearRestaurants, setSharedLandedRestaurant } from './state';
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
      clearRecipes();
      clearRestaurants();
      setSharedLandedRestaurant(null);
      navigate('/cycler');
    } else {
      console.log('Waiting for toolOutput options');
    }
  }, [toolOutput, navigate]);

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
          marginBottom: '16px'
        }}>
          Loading up the options
        </div>
        <div style={{
          width: '100%',
          maxWidth: '300px',
          height: '6px',
          backgroundColor: 'var(--bg-muted, #F0F0F0)',
          borderRadius: '3px',
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto'
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
    </div>
  );
}
