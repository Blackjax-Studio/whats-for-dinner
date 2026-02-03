import { useEffect, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import { Restaurant } from './types';
import { restaurantsLoaded, setRestaurantsLoaded, setSharedOptions, setCycleTargetRoute, sharedLandedRestaurant, setSharedLandedRestaurant, isFetchingRestaurants, setIsFetchingRestaurants, restaurants, setRestaurants, subscribe } from './state';
import { useToolOutput } from '../../hooks/useOpenAiGlobal';

export function RestaurantsView() {
  const navigate = useNavigate();

  const toolOutput = useToolOutput();

  const restaurantsLoadedValue = useSyncExternalStore(subscribe, () => restaurantsLoaded);
  const isFetchingRestaurantsValue = useSyncExternalStore(subscribe, () => isFetchingRestaurants);
  const restaurantsValue = useSyncExternalStore(subscribe, () => restaurants);

  const isLoading = isFetchingRestaurantsValue || !restaurantsLoadedValue;

  const mealName = toolOutput?.dishName || 'Your Choice';

  const handleSpin = () => {
    setSharedOptions(restaurantsValue);
    setCycleTargetRoute('/restaurant-detail');
    navigate('/cycler');
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSharedLandedRestaurant(restaurant);
    navigate('/restaurant-detail');
  };

  useEffect(() => {
    // If we are currently fetching, we should not be checking for loaded state
    if (isFetchingRestaurantsValue) {
        return;
    }

    // Check if restaurants are already loaded in state
    if (restaurantsLoadedValue && restaurantsValue.length > 0) {
        return;
    }

    const options = toolOutput?.structuredContent?.options || toolOutput?.options;

    if (options && options.length > 0) {
      console.log("RestaurantsView: processing toolOutput options", options);
      const receivedRestaurants: Restaurant[] = options.map((opt: any, index: number) => ({
        id: String(index + 1),
        name: opt.title || opt.name || 'Untitled Restaurant',
        location: opt.location || opt.address || '',
        address: opt.address || '',
        phone: opt.phone || '',
        description: opt.description || '',
        rating: opt.rating || ''
      }));
      setRestaurants(receivedRestaurants);
      setRestaurantsLoaded(true);
      setIsFetchingRestaurants(false);
    } else if (toolOutput) {
       // We have tool output but no options, maybe it's still loading?
       setIsFetchingRestaurants(true);
       setRestaurantsLoaded(false);
    }
  }, [toolOutput, restaurantsLoadedValue, restaurantsValue.length, isFetchingRestaurantsValue]);

  return (
    <div style={{
      fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
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
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              minWidth: 0,
              lineHeight: 1
            }}>
              <div style={{
                fontFamily: "'Red Hat Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                fontSize: '0.85rem',
                color: 'var(--text-neutral, #666666)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '2px'
              }}>
                Restaurants for
              </div>
              <div style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '1.1rem',
                color: 'var(--accent2, #008639)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {mealName}
              </div>
            </div>
            <button
              onClick={handleSpin}
              style={{
                fontFamily: "'Alfa Slab One', serif",
                fontSize: '0.8rem',
                color: '#FFFFFF',
                background: 'var(--warn, #E25600)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                borderRadius: '999px',
                cursor: 'pointer',
                padding: '8px 14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                transition: 'transform 0.2s, box-shadow 0.2s, filter 0.2s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                boxShadow: '0 6px 14px rgba(226, 86, 0, 0.25)',
                WebkitTapHighlightColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 18px rgba(226, 86, 0, 0.35)';
                e.currentTarget.style.filter = 'brightness(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 14px rgba(226, 86, 0, 0.25)';
                e.currentTarget.style.filter = 'none';
              }}
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
            {restaurantsValue.map(restaurant => {
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
                      color: 'var(--rating-color, #FFD700)',
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
