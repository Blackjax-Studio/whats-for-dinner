import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedRecipe } from './state';

export function RecipeDetailView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedLandedRecipe) {
      navigate('/recipes');
    }
  }, [navigate]);

  if (!sharedLandedRecipe) return null;

  const handleBack = () => {
    navigate('/recipes');
  };

  const handleGiveRecipe = () => {
    console.log('Give me the recipe clicked for:', sharedLandedRecipe.title);
    // Stubbed action
    alert(`Here's the recipe for ${sharedLandedRecipe.title}! (Stubbed)`);
  };

  const handleRestaurants = () => {
    navigate('/restaurants');
  };

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)',
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: '12px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
        gap: '0.5rem',
        flexShrink: 0
      }}>
        <button
          onClick={handleBack}
          style={{
            color: 'var(--accent, #0062FF)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontSize: '1.2rem',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Back to Recipes"
        >
          ←
        </button>
        <div style={{
          fontFamily: "'Alfa Slab One', serif",
          fontSize: '1.1rem',
          color: 'var(--accent2, #008639)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Recipe Details
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
        padding: '4px',
        boxSizing: 'border-box',
        minHeight: 0
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minWidth: 0
        }}>
          <div style={{
            color: 'var(--accent, #0062FF)',
            fontSize: '1.4rem',
            fontFamily: "'Alfa Slab One', serif",
            fontWeight: 400,
            wordBreak: 'break-word',
            maxWidth: '100%',
            textAlign: 'left',
            lineHeight: '1.1'
          }}>
            {sharedLandedRecipe.title}
          </div>
          <div style={{
            fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            fontSize: '0.85rem',
            color: 'var(--text-muted, #6E6E6E)',
            marginTop: '4px',
            maxWidth: '100%',
            textAlign: 'left',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {sharedLandedRecipe.description}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'flex-end',
          flexShrink: 0
        }}>
          <button
            onClick={handleGiveRecipe}
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
            Give me the recipe
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
        </div>
      </div>
    </div>
  );
}
