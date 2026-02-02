import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './types';
import { sharedLandedMeal, setSharedOptions, setCycleTargetRoute, setSharedLandedRecipe, recipesLoaded, setRecipesLoaded } from './state';

export function RecipesView() {
  const [isLoading, setIsLoading] = useState(!recipesLoaded);
  const navigate = useNavigate();

  const mealName = sharedLandedMeal?.title || sharedLandedMeal?.name || 'Your Choice';

  // Stub recipe data
  const recipes: Recipe[] = [
    { id: '1', title: 'Classic Pasta Carbonara', description: 'Traditional Italian pasta with eggs, cheese, and bacon' },
    { id: '2', title: 'Spicy Thai Basil Chicken', description: 'Quick stir-fry with holy basil, chilies, and fish sauce' },
    { id: '3', title: 'Mushroom Risotto', description: 'Creamy Arborio rice with porcini mushrooms and parmesan' },
    { id: '4', title: 'Grilled Salmon Teriyaki', description: 'Glazed salmon with soy-ginger sauce and sesame seeds' },
    { id: '5', title: 'Vegetable Pad Thai', description: 'Rice noodles with tofu, peanuts, and tangy tamarind sauce' },
  ];

  const handleSpin = () => {
    setSharedOptions(recipes);
    setCycleTargetRoute('/recipe-detail');
    navigate('/cycler');
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSharedLandedRecipe(recipe);
    navigate('/recipe-detail');
  };

  useEffect(() => {
    if (recipesLoaded) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setRecipesLoaded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)',
      height: '100%',
      width: '100%',
      padding: '12px',
      boxSizing: 'border-box',
      overflow: 'hidden'
    }}>
      {isLoading ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%'
        }}>
          <div style={{
            fontFamily: "'Alfa Slab One', serif",
            fontSize: '1.2rem',
            color: 'var(--accent, #0062FF)',
            marginBottom: '16px'
          }}>
            Finding Recipes...
          </div>
          <div style={{
            width: '100%',
            maxWidth: '300px',
            height: '6px',
            backgroundColor: 'var(--bg-muted, #F0F0F0)',
            borderRadius: '3px',
            overflow: 'hidden',
            position: 'relative'
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
      ) : (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '8px',
            gap: '0.5rem',
            flexShrink: 0
          }}>
            <button
              onClick={() => navigate('/chosen')}
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
              title="Back"
            >
              ←
            </button>
            <div style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: '1.1rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1
            }}>
              <span style={{ color: 'var(--text-neutral, #666666)' }}>Recipes for </span>
              <span style={{ color: 'var(--accent2, #008639)' }}>{mealName}</span>
            </div>
            <button
              onClick={handleSpin}
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '0.8rem',
                color: 'var(--warn, #E25600)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Spin
            </button>
          </div>
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '12px',
            paddingBottom: '8px',
            scrollbarWidth: 'thin',
            flex: 1
          }}>
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe)}
                style={{
                  minWidth: '240px',
                  maxWidth: '240px',
                  backgroundColor: 'var(--card-bg, #F8F8F8)',
                  borderRadius: '10px',
                  padding: '12px',
                  border: '1px solid var(--border, #E0E0E0)',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: '1rem',
                  color: 'var(--text-main, #0D0D0D)',
                  marginBottom: '4px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {recipe.title}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted, #6E6E6E)',
                  lineHeight: '1.3',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {recipe.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
