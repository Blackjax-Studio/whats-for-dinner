import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './types';
import { sharedLandedMeal } from './state';

export function RecipesView() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
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

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 200);
          return 100;
        }
        return prev + 2;
      });
    }, 60); // 3 seconds total (100 / 2 * 60ms = 3000ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)',
      minHeight: '200px',
      padding: '20px'
    }}>
      {isLoading ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: "'Alfa Slab One', serif",
            fontSize: '1.5rem',
            color: 'var(--accent, #0062FF)',
            marginBottom: '20px'
          }}>
            Finding Recipes...
          </div>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '8px',
            backgroundColor: 'var(--bg-muted, #F0F0F0)',
            borderRadius: '4px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: 'var(--accent, #0062FF)',
              transition: 'width 0.1s linear',
              borderRadius: '4px'
            }} />
          </div>
        </div>
      ) : (
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '16px',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => navigate('/chosen')}
              style={{
                color: 'var(--accent, #0062FF)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontSize: '1.5rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Back"
            >
              ←
            </button>
            <div style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: '1.2rem',
              color: 'var(--accent2, #008639)'
            }}>
              Recipes for {mealName}
            </div>
          </div>
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '16px',
            paddingBottom: '8px',
            scrollbarWidth: 'thin'
          }}>
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                style={{
                  minWidth: '280px',
                  backgroundColor: 'var(--card-bg, #F8F8F8)',
                  borderRadius: '12px',
                  padding: '16px',
                  border: '1px solid var(--border, #E0E0E0)'
                }}
              >
                <div style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: '1.1rem',
                  color: 'var(--text-main, #0D0D0D)',
                  marginBottom: '8px'
                }}>
                  {recipe.title}
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-muted, #6E6E6E)',
                  lineHeight: '1.4'
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
