import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sharedLandedMeal, setCycleTargetRoute, mealOptions, setSharedOptions, setIsFetchingRecipes, setRecipesLoaded, setRecipes, setIsFetchingRestaurants, setRestaurantsLoaded, setRestaurants } from './state';

export function ChosenView() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sharedLandedMeal) {
      navigate('/');
    }
  }, [navigate]);

  if (!sharedLandedMeal) return null;

  const handleRecipes = async () => {
    if (!sharedLandedMeal) return;
    const dishName = sharedLandedMeal.title || sharedLandedMeal.name;
    setRecipes([]); // Clear current recipes immediately
    setIsFetchingRecipes(true);
    setRecipesLoaded(false);
    navigate('/recipes');

    if (window.openai?.callTool) {
      try {
          console.log("CALL!!! ____ Calling format_recipes with dish_details:", dishName);
        const result = await window.openai.callTool("format_recipes", {
          type: "dish",
          dish_details: dishName,
          options: [] // The model will fill this based on dish_details
        });

        console.log("RESULT = " + JSON.stringify(result, null, 2));
        console.log(
          "structuredContent = " + JSON.stringify(result?.structuredContent)
        )

        const options = result?.structuredContent?.options || result?.options;

        console.log("Extracted options:", options);

        if (options && options.length > 0) {
          const receivedRecipes = options.map((opt: any, index: number) => ({
            id: String(index + 1),
            title: opt.title || opt.name || 'Untitled Recipe',
            description: opt.description || ''
          }));
          console.log("Setting recipes:", receivedRecipes);
          setRecipes(receivedRecipes);
          setRecipesLoaded(true);
          setIsFetchingRecipes(false);
        } else {
            console.log("No options found in result");
            setIsFetchingRecipes(false);
        }
      } catch (error) {
        console.error("Failed to call format_recipes:", error);
        setIsFetchingRecipes(false);
      }
    } else {
      console.error("window.openai.callTool is not available");
      // Fallback to stub behavior if needed, or just let it stay in loading state
      // For now, let's keep it as is.
    }
  };

  const handleRestaurants = async () => {
    if (!sharedLandedMeal) return;
    const dishName = sharedLandedMeal.title || sharedLandedMeal.name;
    setRestaurants([]); // Clear current restaurants immediately
    setIsFetchingRestaurants(true);
    setRestaurantsLoaded(false);
    navigate('/restaurants');

    if (window.openai?.callTool) {
      try {
        console.log("CALLING format_recipes for restaurants with dish_details:", dishName);
        const result = await window.openai.callTool("format_recipes", {
          type: "restaurant",
          dish_details: dishName,
          options: [] 
        });

        const options = result?.structuredContent?.options || result?.options;

        if (options && options.length > 0) {
          const receivedRestaurants = options.map((opt: any, index: number) => ({
            id: String(index + 1),
            name: opt.title || opt.name || 'Untitled Restaurant',
            location: opt.address || opt.location || '',
            rating: opt.rating || ''
          }));
          setRestaurants(receivedRestaurants);
          setRestaurantsLoaded(true);
          setIsFetchingRestaurants(false);
        } else {
          setIsFetchingRestaurants(false);
        }
      } catch (error) {
        console.error("Failed to call format_recipes for restaurants:", error);
        setIsFetchingRestaurants(false);
      }
    }
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
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
          padding: '4px 12px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 0
          }}>
            <div style={{
              color: 'var(--accent2, #008639)',
              fontSize: '1.4rem',
              fontFamily: "'Alfa Slab One', serif",
              fontWeight: 400,
              wordBreak: 'break-word',
              maxWidth: '100%',
              textAlign: 'center',
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
                textAlign: 'center',
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
            flexDirection: 'row',
            gap: '12px',
            alignItems: 'center',
            justifyContent: 'center',
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
                whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent'
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
                whiteSpace: 'nowrap',
                WebkitTapHighlightColor: 'transparent'
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
