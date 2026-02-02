import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedMeal, setCycleTargetRoute, mealOptions, setSharedOptions } from './state';

export function ChosenView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedLandedMeal) {
      navigate('/');
    }
  }, [navigate]);

  if (!sharedLandedMeal) return null;

  const handleRecipes = () => {
    navigate('/recipes');
  };

  const handleRestaurants = () => {
    navigate('/restaurants');
  };

  const handleSpinAgain = () => {
    setSharedOptions(mealOptions);
    setCycleTargetRoute('/chosen');
    navigate('/cycler');
  };

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
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          padding: '4px 12px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            minWidth: 0
          }}>
            <div style={{
              color: 'var(--accent2, #008639)',
              fontSize: '1.4rem',
              fontFamily: "'Alfa Slab One', serif",
              fontWeight: 400,
              wordBreak: 'break-word',
              maxWidth: '100%',
              textAlign: 'left',
              transition: 'all 0.5s ease',
              lineHeight: '1.1'
            }}>
              {sharedLandedMeal.title || sharedLandedMeal.name}
            </div>
            {sharedLandedMeal.description && (
              <div style={{
                fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                fontSize: '0.85rem',
                color: 'var(--text-muted, #6E6E6E)',
                marginTop: '2px',
                maxWidth: '100%',
                textAlign: 'left',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {sharedLandedMeal.description}
              </div>
            )}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'flex-end',
            flexShrink: 0
          }}>
            <button
              onClick={handleRecipes}
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '0.8rem',
                color: 'var(--accent, #0062FF)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Get Recipes
            </button>
            <button
              onClick={handleRestaurants}
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '0.8rem',
                color: 'var(--accent, #0062FF)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Find Restaurants
            </button>
            <button
              onClick={handleSpinAgain}
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '0.8rem',
                color: 'var(--warn, #E25600)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '2px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Spin Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
