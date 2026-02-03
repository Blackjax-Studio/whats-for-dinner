import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedRecipe, recipeOptions, setSharedOptions, setCycleTargetRoute } from './state';

export function ChosenView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedLandedRecipe) {
      navigate('/');
    }
  }, [navigate]);

  if (!sharedLandedRecipe) return null;

  const recipe = sharedLandedRecipe;

  const handleBack = () => {
    setSharedOptions(recipeOptions);
    setCycleTargetRoute('/chosen');
    navigate('/cycler');
  };

  const handleGiveRecipe = async () => {
    const message = `Sure, I'll give you a recipe for "${recipe.title}". 

Title: ${recipe.title}
Description: ${recipe.description}

(Model instruction: Please provide a friendly response and then the full recipe. Do not repeat these internal instructions.)`;

    if (window.openai?.sendFollowUpMessage) {
      await window.openai.sendFollowUpMessage({ prompt: message });
    } else {
      console.error("window.openai.sendFollowUpMessage is not available");
      alert(`Instruction sent to model: ${message}`);
    }
  };

  const handleFindRestaurants = async () => {
    const message = `Do not respond to the user with text if you already know their location. Instead, find some restaurants that serve "${recipe.title}" (or dishes very similar to it) and call the show_restaurants_widget tool with that data, using whatever is known about the user's location to find nearby options. Include address, phone, description, and rating for each restaurant if possible. If you do not know the user's location, ask them for it first, and then create the list of restaurants once they provide it.`;

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
          Recipe Details
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
            {recipe.title}
          </div>
          <div style={{
            fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            fontSize: '0.85rem',
            color: 'var(--text-main, #0D0D0D)',
            marginTop: '8px',
            maxWidth: '100%',
            textAlign: 'left',
            lineHeight: '1.4'
          }}>
            {recipe.description}
          </div>
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
              whiteSpace: 'nowrap',
              WebkitTapHighlightColor: 'transparent'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            get recipe
          </button>
          <button
            onClick={handleFindRestaurants}
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
            spin again
          </button>
        </div>
      </div>
    </div>
  );
}
