import { useEffect, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from './types';
import { setSharedOptions, setCycleTargetRoute, setSharedLandedRecipe, recipesLoaded, setRecipesLoaded, isFetchingRecipes, setIsFetchingRecipes, recipes, setRecipes, subscribe } from './state';
import { useToolOutput } from '../../hooks/useOpenAiGlobal';

export function RecipesView() {
  const navigate = useNavigate();
  const toolOutput = useToolOutput();

  const recipesLoadedValue = useSyncExternalStore(subscribe, () => recipesLoaded);
  const isFetchingRecipesValue = useSyncExternalStore(subscribe, () => isFetchingRecipes);
  const recipesValue = useSyncExternalStore(subscribe, () => recipes);

  const isLoading = isFetchingRecipesValue || !recipesLoadedValue;

  useEffect(() => {
    // If we are currently fetching, we should not be processing toolOutput
    if (isFetchingRecipesValue) {
        return;
    }

    // Check if recipes are already loaded in state
    if (recipesLoadedValue && recipesValue.length > 0) {
        return;
    }

    const options = toolOutput?.structuredContent?.options || toolOutput?.options;

    if (options && options.length > 0) {
      console.log("RecipesView: processing toolOutput options", options);
      // Map tool output to Recipe type
      const receivedRecipes: Recipe[] = options.map((opt: any, index: number) => ({
        id: String(index + 1),
        title: opt.title || opt.name || 'Untitled Recipe',
        description: opt.description || ''
      }));

      setRecipes(receivedRecipes);
      setRecipesLoaded(true);
      setIsFetchingRecipes(false);
    } else if (toolOutput) {
       // We have tool output but no options, maybe it's still loading?
       setIsFetchingRecipes(true);
       setRecipesLoaded(false);
    }
  }, [toolOutput, recipesLoadedValue, recipesValue.length, isFetchingRecipesValue]);

  const mealName = toolOutput?.dishName || 'Your Choice';

  const handleSpin = () => {
    setSharedOptions(recipesValue);
    setCycleTargetRoute('/recipe-detail');
    navigate('/cycler');
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSharedLandedRecipe(recipe);
    navigate('/recipe-detail');
  };

  useEffect(() => {
    if (recipesLoaded && recipes.length === 0) {
       // if we are already loaded but no recipes in state (e.g. initial mount after loading)
       // we should check window.openai or state if we persisted it.
       // For now, the useEffect above handles it on mount.
    }
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
            Getting Recipes...
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
              onClick={() => {}}
              style={{
                color: 'var(--text-neutral, #666666)',
                background: 'none',
                border: 'none',
                cursor: 'default',
                padding: '4px',
                fontSize: '1.5rem',
                lineHeight: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
                opacity: 0.3
              }}
              title="Back"
            >
              ←
            </button>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              flex: 1,
              minWidth: 0,
              lineHeight: 1
            }}>
              <div style={{
                fontFamily: "'Vend Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                fontSize: '0.85rem',
                color: 'var(--text-neutral, #666666)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                marginBottom: '2px'
              }}>
                Recipes for
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
            {recipesValue.map(recipe => (
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
