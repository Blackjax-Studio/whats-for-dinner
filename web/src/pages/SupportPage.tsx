import Layout from '../components/Layout';

export default function SupportPage() {
  return (
    <Layout>
      <div className="card" style={{ padding: '40px 28px' }}>
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--display)', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.02em', textAlign: 'center' }}>
          Support
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px' }}>
          Need help with What's for Dinner? We're here to assist you!
        </p>

        <div className="how-it-works-grid">
          <div className="how-it-works-content">
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-title)', marginBottom: '16px' }}>
                📧 Contact Us
              </h2>
              <p>
                For general questions, feedback, or support, feel free to reach out to us directly:
              </p>
              <p style={{ marginTop: '12px' }}>
                <strong>Email:</strong> <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a>
              </p>
            </section>

            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-title)', marginBottom: '16px' }}>
                🐛 Report a Bug
              </h2>
              <p>
                Found something that isn't working right? We'd love to fix it! Please report it on our GitHub issues page:
              </p>
              <div style={{ marginTop: '20px' }}>
                <a
                  href="https://github.com/Blackjax-Studio/whats-for-dinner/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary"
                >
                  Report Issue on GitHub
                </a>
              </div>
            </section>

            <section>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-title)', marginBottom: '16px' }}>
                📖 Documentation
              </h2>
              <p>
                Check out the README and technical documentation for more details on how to set up and use the MCP server:
              </p>
              <div style={{ marginTop: '20px' }}>
                <a
                  href="https://github.com/Blackjax-Studio/whats-for-dinner#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View Documentation
                </a>
              </div>
            </section>
          </div>

          <div className="how-it-works-content">
            <h2 style={{ fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 400, color: 'var(--text-title)', marginBottom: '24px' }}>
              💬 Common Questions
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', margin: '0 0 12px' }}>How do I install What's for Dinner in ChatGPT?</h3>
                <div className="alert">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>What's for Dinner is currently pending approval in the ChatGPT App Store.</span>
                </div>
                <p style={{ fontSize: '0.95rem' }}>
                  Once approved, you can install it by following these steps:
                </p>
                <ol style={{ fontSize: '0.95rem', paddingLeft: '20px', margin: '8px 0', color: 'var(--muted)' }}>
                  <li>Open ChatGPT and go to the <strong>Explore GPTs</strong> section.</li>
                  <li>Search for <strong>"What's for Dinner"</strong>.</li>
                  <li>Select the official app by Blackjax Studio.</li>
                  <li>Click <strong>Start Chat</strong> to begin using the MCP tools.</li>
                </ol>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', margin: '0 0 8px' }}>Is this app free?</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  Yes, What's for Dinner is free to use. Our goal is to make deciding what to eat easier for everyone.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-title)', margin: '0 0 8px' }}>Do you collect my data?</h3>
                <p style={{ fontSize: '0.95rem' }}>
                  No. We do not collect, store, or retain any personal data. See our <a href="/privacy">Privacy Policy</a> for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
