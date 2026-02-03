import { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';

const actionConfig = {
  'pick-restaurant': {
    label: 'Pick a restaurant',
    video: '/videos/web/spin_restaurants.mp4',
  },
  'pick-meal': {
    label: 'Pick a meal',
    video: '/videos/web/i_cant_decide.mp4',
  },
  'pick-recipe': {
    label: 'Pick a recipe',
    video: '/videos/web/spin_recipes.mp4',
  },
  'meal-then-restaurant': {
    label: 'Pick a meal then find a restaurant',
    video: '/videos/web/pick_meal_then_restaurant.mp4',
  },
  'meal-then-recipe': {
    label: 'Pick a meal then find a recipe',
    video: '/videos/web/pick_meal_then_recipe.mp4',
  },
  'restaurant-then-recipe': {
    label: 'Pick a restaurant then find recipes',
    video: '/videos/web/pick_restaurant_then_recipe.mp4',
  },
  'recipe-then-restaurant': {
    label: 'Pick a recipe then find a restaurant',
    video: '/videos/web/pick_recipe_then_restaurant.mp4',
  },
} as const;

type ActionKey = keyof typeof actionConfig;

export default function HowItWorksPage() {
  const [action, setAction] = useState<ActionKey>('pick-restaurant');
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentAction = actionConfig[action];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [action]);

  const videoSrc = currentAction.video;

  return (
    <Layout>
      <div className="card" style={{ padding: '40px 28px' }}>
        <h1 style={{ margin: '0 0 32px', fontFamily: 'var(--display)', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.02em', textAlign: 'center' }}>
          How it works
        </h1>

        <div className="how-it-works-grid">
          <div className="how-it-works-content">
            <p>
              What's for Dinner is a specialized Model Context Protocol (MCP) server designed to solve the age-old dilemma of deciding what to eat. Built specifically for the ChatGPT environment, it integrates directly into your conversation, allowing the AI to help you navigate through meal choices, restaurant selections, and recipe discoveries.
            </p>
            <p>
              By combining an internal database of curated suggestions with the real-time reasoning capabilities of ChatGPT, the app provides a seamless bridge between a simple "I don't know" and a delicious meal. Whether you're looking for a quick bite out or a detailed recipe to cook at home, these tools are designed to make the decision process effortless and fun.
            </p>

            <p>
              Our tools allow you to quickly <strong>pick a restaurant</strong> when you're feeling like going out, or <strong>pick a meal</strong> when you need inspiration for what kind of food you're in the mood for. If you prefer to stay in, you can <strong>pick a recipe</strong> and get cooking right away.
            </p>

            <p>
              The real magic happens when you string these actions together. You can <strong>pick a meal and then find a place to eat</strong> that serves exactly what you're craving. Or, if you've decided on a meal but want to make it yourself, you can <strong>pick a meal and then find a recipe</strong> for it.
            </p>

            <p>
              For those who already have a favorite spot, you can <strong>pick a restaurant and then find recipes</strong> for food like that to recreate the experience at home. Conversely, if you've found a dish you love, you can <strong>pick a recipe and then find a restaurant</strong> that serves it for those nights you'd rather let someone else do the cooking.
            </p>

            <p>
              Stop spinning about your next meal and let our MCP tools spin for you. From solo dinners to group outings, we've got the tools to help you find exactly what you're craving.
            </p>
          </div>

          <div className="how-it-works-video">
            <div className="video-wrapper">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border)' }}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="platform-selector">
                <label htmlFor="action-select">Action:</label>
                <select
                  id="action-select"
                  value={action}
                  onChange={(e) => setAction(e.target.value as ActionKey)}
                  className="platform-dropdown"
                >
                  {Object.entries(actionConfig).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
