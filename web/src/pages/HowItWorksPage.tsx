import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function HowItWorksPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="card">
        <h1 style={{ margin: '0 0 16px', fontFamily: 'var(--display)', fontSize: '2.2rem', fontWeight: 400, letterSpacing: '-0.02em' }}>
          How it works
        </h1>
        <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '1.1rem' }}>
          What's for Dinner is an open-source MCP server designed exclusively for the ChatGPT environment, providing a conversational and interactive way to decide what to eat.
        </p>

        <h2 style={{ margin: '32px 0 12px', fontSize: '1.4rem' }}>Key Features</h2>
        <div style={{ listStyle: 'none', padding: 0, margin: '24px 0' }}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>✓</div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>Two Operating Modes</h3>
              <p style={{ margin: 0, fontSize: '1rem' }}><strong>Internal Database Mode:</strong> Randomly selects from built-in meal options.</p>
              <p style={{ margin: 0, fontSize: '1rem' }}><strong>Model Provided List:</strong> Randomly selects from meals and/or restaurants suggested by the AI model during the conversation.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>🤖</div>
            <div>
              <h3 style={{ margin: '0 0 4px', fontSize: '1.1rem' }}>ChatGPT-Specific Implementation</h3>
              <p style={{ margin: 0, fontSize: '1rem' }}>Uses <code>window.openai</code> for seamless UI integration within ChatGPT.</p>
              <p style={{ margin: 0, fontSize: '1rem' }}>Displays an interactive spinning widget that cycles through options, making the decision process fun and visual.</p>
            </div>
          </div>
        </div>

        <h2 style={{ margin: '32px 0 12px', fontSize: '1.4rem' }}>User Flow Examples</h2>

        <div style={{ background: 'var(--card2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Example 1: Open-Ended Decision</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}><strong>User:</strong> "Me and the girlfriend don't know what to eat tonight"</p>
          <ul style={{ fontSize: '0.95rem', marginBottom: 0 }}>
            <li>Widget cycles through options and lands on a meal.</li>
            <li>Shows buttons: <strong>Get Recipes | Get Restaurants | Spin Again</strong></li>
            <li>User clicks "Get Restaurants" → ChatGPT lists nearby options.</li>
            <li>User: "Pick one of those restaurants" → Widget spins again using the restaurant list.</li>
            <li>New buttons: <strong>Get Recipes | Get Directions | Spin Again</strong></li>
          </ul>
        </div>

        <div style={{ background: 'var(--card2)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '24px' }}>
          <h3 style={{ marginTop: 0 }}>Example 2: Constrained Decision</h3>
          <p style={{ fontSize: '0.95rem', marginBottom: '8px' }}><strong>User:</strong> "Pick a chicken dish to eat tonight"</p>
          <ul style={{ fontSize: '0.95rem', marginBottom: 0 }}>
            <li>Widget spins through generated chicken dishes.</li>
            <li>Displays result with relevant action buttons.</li>
          </ul>
        </div>

        <h2 style={{ margin: '32px 0 12px', fontSize: '1.4rem' }}>Button Context Logic</h2>
        <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '1.1rem' }}>The interface intelligently adapts its buttons based on what was selected:</p>
        <ul style={{ fontSize: '1rem' }}>
          <li><strong>Meal selected:</strong> Get Recipes | Get Restaurants | Spin Again</li>
          <li><strong>Restaurant selected:</strong> Get Recipes | Get Directions | Spin Again</li>
        </ul>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/see-it-work')}
            className="btn primary"
            style={{ padding: '12px 24px', fontSize: '1.1rem', borderRadius: '14px' }}
          >
            See it in action →
          </button>
        </div>
      </div>
    </Layout>
  );
}
