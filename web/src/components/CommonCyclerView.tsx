import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface CommonCyclerViewProps<T> {
  options: T[];
  onLand: (option: T) => void;
  targetRoute: string;
  fallbackRoute?: string;
}

export function CommonCyclerView<T>({
  options,
  onLand,
  targetRoute,
  fallbackRoute = '/'
}: CommonCyclerViewProps<T>) {
  const [cyclingText, setCyclingText] = useState('');
  const [cycleScale, setCycleScale] = useState(false);
  const navigate = useNavigate();
  const isStartedRef = useRef(false);

  useEffect(() => {
    if (!options || options.length === 0) {
      navigate(fallbackRoute);
      return;
    }

    if (isStartedRef.current) return;
    isStartedRef.current = true;

    // Shuffle options before starting the cycle
    const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

    const cycleInterval = 150;
    const randomDuration = Math.floor(Math.random() * (4000 - 2000 + 1)) + 2000;

    let currentIndex = 0;
    let currentOption = shuffledOptions[0];

    const runInterval = () => {
      const title = (currentOption as any).title || (currentOption as any).name || '';
      setCyclingText(title);

      // Scale effect
      setCycleScale(true);
      setTimeout(() => setCycleScale(false), 50);
    };

    // Initial run
    runInterval();

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % shuffledOptions.length;
      currentOption = shuffledOptions[currentIndex];
      runInterval();
    }, cycleInterval);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      // Land on whatever is currently selected
      onLand(currentOption);
      navigate(targetRoute);
    }, randomDuration);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [navigate, options, onLand, targetRoute, fallbackRoute]);

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
          fontSize: '2.4rem',
          fontWeight: 400,
          color: 'var(--accent, #0062FF)',
          textAlign: 'center',
          padding: '8px 16px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          transition: 'all 0.2s ease-out',
          transform: cycleScale ? 'scale(1.05)' : 'scale(1)'
        }}>
          {cyclingText}
        </div>
      </div>
    </div>
  );
}
