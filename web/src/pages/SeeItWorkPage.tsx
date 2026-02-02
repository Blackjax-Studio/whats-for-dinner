import { useState } from 'react';
import Layout from '../components/Layout';

type Platform = 'web' | 'ios' | 'android';

export default function SeeItWorkPage() {
  const [platform, setPlatform] = useState<Platform>('web');

  const platforms: Record<Platform, string> = {
    'web': 'Web Browser',
    'ios': 'iOS App',
    'android': 'Android App'
  };
  console.log('Available platforms:', platforms);

  return (
    <Layout>
      <div className="card" style={{ textAlign: 'center' }}>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--display)', fontSize: '2.2rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
          See It Work
        </h1>
        <p style={{ margin: '0 0 30px', color: 'var(--muted)', fontSize: '1.1rem' }}>
          Watch how What's for Dinner simplifies your dinner decisions across all your devices.
        </p>

        <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          <label style={{ fontWeight: 600, color: 'var(--text)' }}>Choose Platform:</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as Platform)}
            style={{
              padding: '12px 40px 12px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              background: '#ffffff',
              fontFamily: 'inherit',
              fontSize: '1rem',
              color: 'var(--text)',
              cursor: 'pointer',
              minWidth: '180px'
            }}
          >
            <option value="web">Web Browser</option>
            <option value="ios">iOS App</option>
            <option value="android">Android App</option>
          </select>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: platform === 'ios' || platform === 'android' ? '320px' : '800px',
            margin: '0 auto',
            aspectRatio: platform === 'ios' || platform === 'android' ? '9 / 16' : '16 / 9',
            background: '#000',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '1.2rem',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {platform === 'web' ? (
            <video
              style={{ width: '100%', height: '100%', display: 'block' }}
              controls
              autoPlay
              muted
              loop
            >
              <source src="/videos/test_web_recording.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <video
              style={{ width: '100%', height: '100%', display: 'block' }}
              controls
              autoPlay
              muted
              loop
            >
              <source src="/videos/ios_test_recording.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </Layout>
  );
}
