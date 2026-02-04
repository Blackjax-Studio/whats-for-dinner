import { useState, useRef, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import { howItWorksVideos, platformOptions, type ActionKey, type Platform } from '../config/howItWorksVideos';

export default function HowItWorksPage() {
  const [platform, setPlatform] = useState<Platform>('web');
  const [action, setAction] = useState<ActionKey>('pick-restaurant');
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentAction = howItWorksVideos[action];
  const availablePlatformsForAction = useMemo(
    () => Object.keys(currentAction.platforms) as Platform[],
    [currentAction]
  );

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [platform, action]);

  const videoSrc = currentAction.platforms[platform];
  const isVideoAvailable = availablePlatformsForAction.includes(platform);

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
              {isVideoAvailable ? (
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
              ) : (
                <div
                  style={{
                    width: '100%',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                    padding: '48px 24px',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    background: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  No video available for this action and platform yet.
                </div>
              )}

              <div className="platform-selector">
                <label htmlFor="action-select">
                  Action:
                  <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Actions available for all platforms.
                  </span>
                </label>
                <select
                  id="action-select"
                  value={action}
                  onChange={(e) => setAction(e.target.value as ActionKey)}
                  className="platform-dropdown"
                >
                  {Object.entries(howItWorksVideos).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="platform-selector">
                <label htmlFor="platform-select">Watch action on:</label>
                <select
                  id="platform-select"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                  className="platform-dropdown"
                >
                  {platformOptions.map((availablePlatform) => {
                    const isEnabled = availablePlatformsForAction.includes(availablePlatform);
                    return (
                      <option key={availablePlatform} value={availablePlatform} disabled={!isEnabled}>
                        {availablePlatform === 'ios' ? 'iOS' : availablePlatform.charAt(0).toUpperCase() + availablePlatform.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
