import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

const MEALS = [
  '🍕 Pizza Night', '🌮 Taco Tuesday', '🍝 Pasta Carbonara',
  '🍔 Juicy Burgers', '🍣 Sushi Rolls', '🥗 Fresh Salad',
  '🥩 Grilled Steak', '🍜 Hot Ramen', '🍛 Thai Curry',
  '🌯 Burritos', '🥘 Paella', '🥪 Gourmet Sandwiches'
];

export default function HomePage() {
  const [cycleText, setCycleText] = useState('Loading...');
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    let index = 0;
    let cycles = 0;
    const maxCycles = 15;
    const speed = 120;

    const spin = () => {
      if (cycles < maxCycles) {
        setCycleText(MEALS[index]);
        index = (index + 1) % MEALS.length;
        cycles++;
        setTimeout(spin, speed);
      } else {
        setCycleText("Stop spinning your wheels. We'll spin for you!");
        setIsFinal(true);
      }
    };

    setTimeout(spin, 500);
  }, []);

  return (
    <Layout>
      <div className="hero">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', padding: '10px 0' }}>
          <div className="cycleContainer" style={{ width: '100%', border: 'none', background: 'transparent', marginTop: 0, padding: 0, minHeight: 'auto' }}>
            <div className={`cycleText ${isFinal ? 'final' : ''}`}>
              {cycleText}
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '40px 28px' }}>
        <h2 style={{ margin: '0 0 24px', fontFamily: 'var(--display)', fontSize: '1.4rem', fontWeight: 400 }}>
          Built with ❤️ as an open-source MCP tool.
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            className="btn primary github-btn"
            href="https://github.com/Blackjax-Studio/whats-for-dinner"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            View on GitHub
          </a>
        </div>
      </div>
    </Layout>
  );
}
