import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// Declare window.openai type
declare global {
  interface Window {
    openai?: {
      toolOutput?: {
        options?: Array<{ title?: string; name?: string; description?: string; type?: string }>;
      };
      sendFollowUpMessage?: (payload: { prompt: string }) => void;
    };
  }
}

interface MealOption {
  title?: string;
  name?: string;
  description?: string;
  type?: string;
}

function PickRandomMealWidget() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCycling, setIsCycling] = useState(false);
  const [isLanded, setIsLanded] = useState(false);
  const [cyclingText, setCyclingText] = useState('');
  const [landedMeal, setLandedMeal] = useState<MealOption | null>(null);
  const [options, setOptions] = useState<MealOption[]>([]);
  const [cycleScale, setCycleScale] = useState(false);

  const isStartedRef = useRef(false);

  const startAnimation = (mealOptions: MealOption[]) => {
    if (isStartedRef.current || !mealOptions || mealOptions.length === 0) return;
    isStartedRef.current = true;

    setOptions(mealOptions);
    setIsLoading(false);
    setIsCycling(true);
    setIsLanded(false);

    let currentIndex = 0;
    const cycleInterval = 150;
    const cycleDuration = 2000;
    const iterations = cycleDuration / cycleInterval;
    let currentIteration = 0;

    const runCycle = () => {
      const currentOption = mealOptions[currentIndex];
      setCyclingText(currentOption.title || currentOption.name || '');

      // Scale effect
      setCycleScale(true);
      setTimeout(() => setCycleScale(false), 50);

      if (currentIteration < iterations) {
        currentIndex = (currentIndex + 1) % mealOptions.length;
        currentIteration++;
        setTimeout(runCycle, cycleInterval);
      } else {
        // Land on the current meal
        setIsCycling(false);
        setIsLanded(true);
        setLandedMeal(currentOption);
      }
    };

    runCycle();
  };

  const handleSpinAgain = () => {
    isStartedRef.current = false;
    startAnimation(options);
  };

  const handleRecipes = () => {
    if (landedMeal && window.openai?.sendFollowUpMessage) {
      const mealName = landedMeal.title || landedMeal.name;
      window.openai.sendFollowUpMessage({
        prompt: `Find me one recipe for ${mealName}. Provide the recipe directly without repeating these instructions or any internal preamble.`
      });
    }
  };

  const handleRestaurants = () => {
    if (landedMeal && window.openai?.sendFollowUpMessage) {
      const mealName = landedMeal.title || landedMeal.name;
      window.openai.sendFollowUpMessage({
        prompt: `Find restaurants near me that serve ${mealName}. Provide a list directly with locations. Get right to the point without repeating these instructions.`
      });
    }
  };

  useEffect(() => {
    const handleSetGlobals = (event: CustomEvent) => {
      console.log('openai:set_globals event received');
      const globals = event.detail?.globals;
      const toolOutput = globals?.toolOutput;
      if (toolOutput?.options) {
        startAnimation(toolOutput.options);
      }
    };

    window.addEventListener('openai:set_globals', handleSetGlobals as EventListener);

    // Initial check
    if (window.openai?.toolOutput?.options) {
      console.log('Found toolOutput in window.openai');
      startAnimation(window.openai.toolOutput.options);
    } else {
      console.log('Waiting for openai:set_globals event or toolOutput');
    }

    return () => {
      window.removeEventListener('openai:set_globals', handleSetGlobals as EventListener);
    };
  }, []);

  return (
    <div style={{
      fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100px',
      margin: 0,
      backgroundColor: 'var(--bg-color, #FFFFFF)',
      color: 'var(--text-main, #0D0D0D)'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden'
      }}>
        {isLoading && (
          <div style={{
            fontFamily: "'Alfa Slab One', serif",
            fontSize: '2.2rem',
            color: 'var(--accent, #0062FF)',
            padding: '12px 20px',
            animation: 'pulsate 1.5s ease-in-out infinite'
          }}>
            Loading up the options
          </div>
        )}

        {isCycling && (
          <div style={{
            fontFamily: "'Alfa Slab One', serif",
            fontSize: '3rem',
            fontWeight: 400,
            color: 'var(--accent, #0062FF)',
            textAlign: 'center',
            padding: '12px 20px 4px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            maxWidth: '100%',
            transition: 'all 0.2s ease-out',
            transform: cycleScale ? 'scale(1.05)' : 'scale(1)'
          }}>
            {cyclingText}
          </div>
        )}

        {isLanded && landedMeal && (
          <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            padding: '10px 20px'
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start'
            }}>
              <div style={{
                color: 'var(--accent2, #008639)',
                fontSize: '1.8rem',
                fontFamily: "'Alfa Slab One', serif",
                fontWeight: 400,
                wordBreak: 'break-word',
                maxWidth: '100%',
                textAlign: 'left',
                transition: 'all 0.5s ease'
              }}>
                {landedMeal.title || landedMeal.name}
              </div>
              {landedMeal.description && (
                <div style={{
                  fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                  fontSize: '1rem',
                  color: 'var(--text-muted, #6E6E6E)',
                  marginTop: '4px',
                  maxWidth: '100%',
                  textAlign: 'left'
                }}>
                  {landedMeal.description}
                </div>
              )}
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              alignItems: 'flex-end'
            }}>
              <button
                onClick={handleRecipes}
                style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: '0.9rem',
                  color: 'var(--accent, #0062FF)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap'
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
                  fontSize: '0.9rem',
                  color: 'var(--accent, #0062FF)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
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
              <button
                onClick={handleSpinAgain}
                style={{
                  fontFamily: "'Alfa Slab One', serif",
                  fontSize: '0.9rem',
                  color: 'var(--warn, #E25600)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  transition: 'opacity 0.2s',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Spin Again
              </button>
            </div>
          </div>
        )}

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulsate {
            0% { opacity: 0.6; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0.6; transform: scale(0.98); }
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg-color: #212121;
              --accent: #0084FF;
              --accent2: #40C977;
              --warn: #FF9E60;
              --text-main: #FFFFFF;
              --text-muted: #CDCDCD;
            }
          }
        ` }} />
      </div>
    </div>
  );
}

// Mount the React app
const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<PickRandomMealWidget />);
} else {
  console.error('Root element not found for widget');
}
