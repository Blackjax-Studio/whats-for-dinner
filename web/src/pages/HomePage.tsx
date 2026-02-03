import Layout from '../components/Layout';

export default function HomePage() {
  return (
    <Layout>
      <div className="hero full-width-hero">
        <div className="hero-video-bg">
          <video
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/test_web_recording.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="hero-overlay"></div>
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          Stop spinning about what to eat.
        </h1>
        <p className="hero-subtitle">
          We'll spin for you!
        </p>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '40px 28px', marginTop: '40px' }}>
        <h2 style={{ margin: '0 0 24px', fontSize: '1.4rem', color: 'var(--text-title)' }}>
          Built with ❤️ as an open-source ChatGPT MCP tool.
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
