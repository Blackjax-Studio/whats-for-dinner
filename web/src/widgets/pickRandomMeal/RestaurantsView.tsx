import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from './types';
import { sharedLandedMeal } from './state';

export function RestaurantsView() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const mealName = sharedLandedMeal?.title || sharedLandedMeal?.name || 'Your Choice';

  // Stub restaurant data
  const restaurants: Restaurant[] = [
    { id: '1', name: 'The Golden Fork', location: '123 Main St, Downtown', rating: '4.5' },
    { id: '2', name: 'Spicy Garden', location: '456 Oak Ave, Westside', rating: '4.2' },
    { id: '3', name: 'Riverside Bistro', location: '789 River Rd, Waterfront', rating: '4.8' },
    { id: '4', name: 'Urban Eats', location: '101 Pine St, Midtown', rating: '4.0' },
    { id: '5', name: 'Green Leaf Cafe', location: '202 Maple Dr, Eastside', rating: '4.4' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
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
            Finding Restaurants...
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
                padding: 0,
                fontSize: '1.2rem',
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
              fontSize: '1.1rem',
              color: 'var(--accent2, #008639)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              Restaurants for {mealName}
            </div>
          </div>
          <div style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '12px',
            paddingBottom: '8px',
            scrollbarWidth: 'thin',
            flex: 1
          }}>
            {restaurants.map(restaurant => (
              <div
                key={restaurant.id}
                style={{
                  minWidth: '240px',
                  maxWidth: '240px',
                  backgroundColor: 'var(--card-bg, #F8F8F8)',
                  borderRadius: '10px',
                  padding: '12px',
                  border: '1px solid var(--border, #E0E0E0)',
                  display: 'flex',
                  flexDirection: 'column'
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
                  {restaurant.name}
                </div>
                <div style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted, #6E6E6E)',
                  lineHeight: '1.3',
                  marginBottom: '4px'
                }}>
                  {restaurant.location}
                </div>
                {restaurant.rating && (
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--accent2, #008639)',
                    fontWeight: 'bold'
                  }}>
                    Rating: {restaurant.rating} ★
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
