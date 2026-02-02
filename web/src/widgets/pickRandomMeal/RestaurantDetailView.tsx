import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedRestaurant, setCycleTargetRoute, setSharedOptions } from './state';

export function RestaurantDetailView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedLandedRestaurant) {
      navigate('/restaurants');
    }
  }, [navigate]);

  if (!sharedLandedRestaurant) return null;

  const handleBack = () => {
    navigate('/restaurants');
  };

  const handleGetRecipes = () => {
    console.log('Give me some recipes for a place like this clicked for:', sharedLandedRestaurant.name);
    // Stubbed action
    navigate('/recipes');
  };

  const handleLetsGo = () => {
    console.log("Let's go here clicked for:", sharedLandedRestaurant.name);
    // Stubbed action
    alert(`Great choice! Heading to ${sharedLandedRestaurant.name} at ${sharedLandedRestaurant.location}.`);
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
            padding: '4px',
            fontSize: '1.5rem',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent'
          }}
          title="Back to Restaurants"
        >
          ←
        </button>
        <div style={{
          fontFamily: "'Alfa Slab One', serif",
          fontSize: '1.1rem',
          color: 'var(--text-neutral, #666666)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          Restaurant Details
        </div>
      </div>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '4px',
        boxSizing: 'border-box',
        minHeight: 0,
        overflowY: 'auto'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minWidth: 0
        }}>
          <div style={{
            color: 'var(--text-title, #000000)',
            fontSize: '1.4rem',
            fontFamily: "'Alfa Slab One', serif",
            fontWeight: 400,
            wordBreak: 'break-word',
            maxWidth: '100%',
            textAlign: 'left',
            lineHeight: '1.1'
          }}>
            {sharedLandedRestaurant.name}
          </div>
          <div style={{
            fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            fontSize: '0.85rem',
            color: 'var(--text-muted, #6E6E6E)',
            marginTop: '4px',
            maxWidth: '100%',
            textAlign: 'left',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {sharedLandedRestaurant.location}
          </div>
          {sharedLandedRestaurant.rating && (
             <div style={{
                fontSize: '0.85rem',
                color: 'var(--rating-color, #FFD700)',
                fontWeight: 'bold',
                marginTop: '4px'
              }}>
                Rating: {sharedLandedRestaurant.rating} ★
              </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          alignItems: 'center',
          flexShrink: 0,
          width: '100%'
        }}>
          <button
            onClick={handleGetRecipes}
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
              whiteSpace: 'nowrap',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Recipes like this
          </button>
          <button
            onClick={handleLetsGo}
            style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: '0.8rem',
              color: 'var(--accent2, #008639)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'opacity 0.2s',
              whiteSpace: 'nowrap',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            Let's go here
          </button>
        </div>
      </div>
    </div>
  );
}
