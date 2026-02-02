import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedOptions, setSharedLandedMeal, setSharedLandedRecipe, setSharedLandedRestaurant, cycleTargetRoute, setRecipesLoaded, setRestaurantsLoaded } from './state';
import { MealOption, Recipe, Restaurant } from './types';

export function CyclerView() {
  const [cyclingText, setCyclingText] = useState('');
  const [cycleScale, setCycleScale] = useState(false);
  const navigate = useNavigate();
  const isStartedRef = useRef(false);

  useEffect(() => {
    if (!sharedOptions || sharedOptions.length === 0) {
      navigate('/');
      return;
    }

    if (isStartedRef.current) return;
    isStartedRef.current = true;

    // Reset loaded flags if we are cycling for a new meal
    if (cycleTargetRoute === '/chosen') {
      setRecipesLoaded(false);
      setRestaurantsLoaded(false);
      setSharedLandedRestaurant(null); // Reset restaurant landing when spinning for a new meal
    }

    let currentIndex = 0;
    const cycleInterval = 150;
    const cycleDuration = 2000;
    const iterations = cycleDuration / cycleInterval;
    let currentIteration = 0;

    const runCycle = () => {
      const currentOption = sharedOptions[currentIndex];
      const title = (currentOption as any).title || (currentOption as any).name || '';
      setCyclingText(title);

      // Scale effect
      setCycleScale(true);
      setTimeout(() => setCycleScale(false), 50);

      if (currentIteration < iterations) {
        currentIndex = (currentIndex + 1) % sharedOptions.length;
        currentIteration++;
        setTimeout(runCycle, cycleInterval);
      } else {
        // Land on the current option
        if (cycleTargetRoute === '/recipe-detail') {
          setSharedLandedRecipe(currentOption as Recipe);
        } else if (cycleTargetRoute === '/restaurant-detail') {
           setSharedLandedRestaurant(currentOption as Restaurant);
        } else if (cycleTargetRoute === '/restaurants') {
           setSharedLandedRestaurant(currentOption as Restaurant);
        } else {
          setSharedLandedMeal(currentOption as MealOption);
        }
        navigate(cycleTargetRoute);
      }
    };

    runCycle();
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
