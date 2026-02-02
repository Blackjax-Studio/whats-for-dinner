import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedMeal } from './state';

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
    if (window.openai?.sendFollowUpMessage) {
      const mealName = sharedLandedMeal.title || sharedLandedMeal.name;
      window.openai.sendFollowUpMessage({
        prompt: `Find restaurants near me that serve ${mealName}. Provide a list directly with locations. Get right to the point without repeating these instructions.`
      });
    }
  };

  const handleSpinAgain = () => {
    navigate('/cycler');
  };

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100px',
      margin: 0,
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '0.5rem',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          padding: '10px 20px'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <div style={{
              color: 'var(--accent2, #008639)',
              fontSize: '1.8rem',
              fontFamily: "'Alfa Slab One', serif",
              fontWeight: 400,
              wordBreak: 'break-word',
              maxWidth: '100%',
              textAlign: 'left',
              transition: 'all 0.5s ease'
            }}>
              {sharedLandedMeal.title || sharedLandedMeal.name}
            </div>
            {sharedLandedMeal.description && (
              <div style={{
                fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                fontSize: '1rem',
                color: 'var(--text-muted, #6E6E6E)',
                marginTop: '4px',
                maxWidth: '100%',
                textAlign: 'left'
              }}>
                {sharedLandedMeal.description}
              </div>
            )}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            alignItems: 'flex-end'
          }}>
            <button
              onClick={handleRecipes}
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '0.9rem',
                color: 'var(--accent, #0062FF)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
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
                fontSize: '0.9rem',
                color: 'var(--accent, #0062FF)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
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
                fontSize: '0.9rem',
                color: 'var(--warn, #E25600)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
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
