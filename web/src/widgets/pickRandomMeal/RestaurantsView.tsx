import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from './types';
import { sharedLandedMeal, restaurantsLoaded, setRestaurantsLoaded, setSharedOptions, setCycleTargetRoute, sharedLandedRestaurant, setSharedLandedRestaurant } from './state';

export function RestaurantsView() {
  const [isLoading, setIsLoading] = useState(!restaurantsLoaded);
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

  const handleSpin = () => {
    setSharedOptions(restaurants);
    setCycleTargetRoute('/restaurant-detail'); 
    navigate('/cycler');
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSharedLandedRestaurant(restaurant);
    navigate('/restaurant-detail');
  };

  useEffect(() => {
    if (restaurantsLoaded) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setRestaurantsLoaded(true);
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
              textOverflow: 'ellipsis',
              flex: 1
            }}>
              Restaurants for {mealName}
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
            {restaurants.map(restaurant => {
              const isLanded = sharedLandedRestaurant?.id === restaurant.id;
              return (
                <div
                  key={restaurant.id}
                  onClick={() => handleRestaurantClick(restaurant)}
                  style={{
                    minWidth: '240px',
                    maxWidth: '240px',
                    backgroundColor: isLanded ? 'var(--bg-muted, #F0F0F0)' : 'var(--card-bg, #F8F8F8)',
                    borderRadius: '10px',
                    padding: '12px',
                    border: isLanded ? '2px solid var(--accent, #0062FF)' : '1px solid var(--border, #E0E0E0)',
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{
                    fontFamily: "'Alfa Slab One', serif",
                    fontSize: '1rem',
                    color: isLanded ? 'var(--accent, #0062FF)' : 'var(--text-main, #0D0D0D)',
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
                      color: '#FFD700', // Yellow/Gold
                      fontWeight: 'bold'
                    }}>
                      Rating: {restaurant.rating} ★
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
