import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedRestaurant } from './state';

export function RestaurantDetailView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedLandedRestaurant) {
      navigate('/');
    }
  }, [navigate]);

  if (!sharedLandedRestaurant) return null;

  const restaurant = sharedLandedRestaurant;

  const handleBack = () => {
    navigate('/');
  };

  const handleRecipesLikeThis = async () => {
    const message = `Do not respond to the user with text. Instead, first look up information about the restaurant "${restaurant.name}" at "${restaurant.location}" if possible. Then, generate a list of recipe titles and descriptions for dishes that could typically be found at this restaurant. Finally, call the show_recipes_widget tool with that data to show the recipes in the widget. Please be cognizant of the user's known preferences and dietary restrictions.`;

    if (window.openai?.sendFollowUpMessage) {
      await window.openai.sendFollowUpMessage({ prompt: message });
    } else {
      console.error("window.openai.sendFollowUpMessage is not available");
      alert(`Instruction sent to model: ${message}`);
    }
  };

  const handleLetsGo = async () => {
    const message = `Do not respond to the user with text. Instead, first look up information about the restaurant "${restaurant.name}" at "${restaurant.location}" using web search tools if available to get the most accurate and up-to-date address. Then, call the show_google_maps_link tool to provide a Google Maps link.

For the tool input:
1. Use as fine-grained a starting address for the user as possible (using their known location details), but at least providing the closest zip code.
2. Provide "${restaurant.name}" as the poiName.
3. Provide the full address and zip code for "${restaurant.name}" obtained from your search.

The goal is to show a link to the restaurant on Google Maps for the user.`;

    if (window.openai?.sendFollowUpMessage) {
      await window.openai.sendFollowUpMessage({ prompt: message });
    } else {
      console.error("window.openai.sendFollowUpMessage is not available");
      alert(`Instruction sent to model: ${message}`);
    }
  };

  return (
    <div style={{
      fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
            {restaurant.name}
          </div>
          <div style={{
            fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
            {restaurant.location}
          </div>
          {restaurant.phone && (
            <div style={{
              fontSize: '0.85rem',
              color: 'var(--text-muted, #6E6E6E)',
              marginTop: '2px'
            }}>
              📞 {restaurant.phone}
            </div>
          )}
          {restaurant.rating && (
             <div style={{
                fontSize: '0.85rem',
                color: 'var(--rating-color, #FFD700)',
                fontWeight: 'bold',
                marginTop: '4px'
              }}>
                Rating: {restaurant.rating} ★
              </div>
          )}
          {restaurant.description && (
            <div style={{
              fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              fontSize: '0.85rem',
              color: 'var(--text-main, #0D0D0D)',
              marginTop: '8px',
              maxWidth: '100%',
              textAlign: 'left',
              lineHeight: '1.4'
            }}>
              {restaurant.description}
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          alignItems: 'center',
          flexShrink: 0,
          width: '100%',
          marginTop: 'auto',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleRecipesLikeThis}
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
            get recipes
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
            let's go
          </button>
          <button
            onClick={handleBack}
            style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: '0.8rem',
              color: 'var(--warn, #FF9E60)',
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
            back
          </button>
        </div>
      </div>
    </div>
  );
}
