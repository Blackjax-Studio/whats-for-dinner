import Layout from '../components/Layout';

export default function SupportPage() {
  return (
    <Layout>
      <div className="card">
        <h1>Support</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--muted)' }}>
          Need help with What's for Dinner? We're here to assist you!
        </p>

        <h2>📧 Contact Us</h2>
        <p>
          For general questions, feedback, or support:
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a>
        </p>

        <h2>🐛 Report a Bug</h2>
        <p>
          Found a bug? Please report it on GitHub:
        </p>
        <p>
          <a
            href="https://github.com/Blackjax-Studio/whats-for-dinner/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            Report Issue on GitHub
          </a>
        </p>

        <h2>📖 Documentation</h2>
        <p>
          Check out the README and documentation:
        </p>
        <p>
          <a
            href="https://github.com/Blackjax-Studio/whats-for-dinner#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View Documentation
          </a>
        </p>

        <h2>💬 Common Questions</h2>

        <h3>How do I install What's for Dinner in ChatGPT?</h3>
        <p>
          Visit the ChatGPT App Store and search for "What's for Dinner", then click install.
        </p>

        <h3>Can I self-host this?</h3>
        <p>
          Yes! The project is open source. Clone the repository and follow the setup instructions in the README.
        </p>

        <h3>Is this app free?</h3>
        <p>
          Yes, What's for Dinner is completely free to use.
        </p>

        <h3>Do you collect my data?</h3>
        <p>
          No! We do not collect, store, or retain any personal data. See our <a href="/privacy">Privacy Policy</a> for details.
        </p>
      </div>
    </Layout>
  );
}
