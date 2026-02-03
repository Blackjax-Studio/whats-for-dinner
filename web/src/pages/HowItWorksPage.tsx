import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function HowItWorksPage() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState<'web' | 'ios' | 'android'>('web');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [platform]);

  const videoSrc = platform === 'web' 
    ? "/videos/test_web_recording.mp4" 
    : "/videos/ios_test_recording.mp4";

  return (
    <Layout>
      <div className="card" style={{ padding: '40px 28px' }}>
        <h1 style={{ margin: '0 0 32px', fontFamily: 'var(--display)', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.02em', textAlign: 'center' }}>
          How it works
        </h1>
        
        <div className="how-it-works-grid">
          <div className="how-it-works-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
            </p>
            <p>
              What's for Dinner is an open-source MCP server designed exclusively for the ChatGPT environment, providing a conversational and interactive way to decide what to eat.
            </p>
            
            <h3 style={{ marginTop: '24px', color: 'var(--text-title)' }}>Key Features</h3>
            <ul style={{ paddingLeft: '20px' }}>
              <li><strong>Internal Database Mode:</strong> Randomly selects from built-in meal options.</li>
              <li><strong>Model Provided List:</strong> Randomly selects from meals and/or restaurants suggested by the AI model.</li>
              <li><strong>ChatGPT-Specific Implementation:</strong> Uses <code>window.openai</code> for seamless UI integration.</li>
            </ul>
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
                <label htmlFor="platform-select">Platform:</label>
                <select 
                  id="platform-select" 
                  value={platform} 
                  onChange={(e) => setPlatform(e.target.value as any)}
                  className="platform-dropdown"
                >
                  <option value="web">Web</option>
                  <option value="ios">iOS</option>
                  <option value="android">Android</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
