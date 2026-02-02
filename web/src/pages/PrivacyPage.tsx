import React from 'react';
import Layout from '../components/Layout';

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="card">
        <h1>Privacy Policy</h1>
        <p className="meta" style={{ margin: '0 0 22px', color: 'var(--muted)', fontSize: '0.95rem' }}>
          <strong>Effective Date:</strong> February 2, 2026<br />
          <strong>Operated by:</strong> Blackjax, LLC<br />
          <strong>Contact:</strong> <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a><br />
          <strong>GitHub:</strong> <a href="https://github.com/Blackjax-Studio/whats-for-dinner" target="_blank" rel="noopener noreferrer">https://github.com/Blackjax-Studio/whats-for-dinner</a>
        </p>

        <h2>Overview</h2>
        <p>
          What's for Dinner is committed to protecting your privacy. This Privacy Policy explains our data practices for the hosted version of What's for Dinner operating within ChatGPT.
        </p>
        <div className="notice">
          <strong>Key Point:</strong> We do not collect, store, or retain any personal data.
        </div>

        <h2>1. Information We Do NOT Collect</h2>
        <p>We do NOT collect, store, or process:</p>
        <ul>
          <li>Personal identification information (name, email, phone, address)</li>
          <li>User accounts or login credentials</li>
          <li>Conversation history or chat logs</li>
          <li>Meal preferences or dietary restrictions</li>
          <li>Search queries or app usage history</li>
          <li>Location data</li>
          <li>Device information or IP addresses</li>
          <li>Cookies or tracking identifiers</li>
          <li>Analytics or behavioral data</li>
          <li>Payment information (the App is free)</li>
        </ul>

        <h2>2. How the App Works</h2>
        <p><strong>Data Flow:</strong></p>
        <ul>
          <li>You interact with the App through ChatGPT</li>
          <li>ChatGPT sends your meal selection requests to our server</li>
          <li>Our server processes the request in memory only (transiently)</li>
          <li>The server returns a random meal selection and widget display</li>
          <li>Nothing is logged, stored, or retained</li>
        </ul>
        <p><strong>Technical Details:</strong></p>
        <ul>
          <li>Requests are processed in real-time</li>
          <li>No database stores user data</li>
          <li>No server logs capture personal information</li>
          <li>Session data is discarded immediately after processing</li>
        </ul>

        <h2>3. ChatGPT and OpenAI Data Practices</h2>
        <p><strong>Important:</strong></p>
        <ul>
          <li>What's for Dinner operates as an integration within ChatGPT</li>
          <li>OpenAI (ChatGPT's operator) has its own data collection practices</li>
          <li>OpenAI may collect and store your conversations with ChatGPT</li>
          <li>OpenAI's privacy policy governs what they collect, not ours</li>
        </ul>
        <p><strong>What OpenAI May Collect:</strong></p>
        <ul>
          <li>Your prompts and conversations with ChatGPT</li>
          <li>Information about how you use ChatGPT</li>
          <li>Your ChatGPT account information</li>
        </ul>
        <p>
          We recommend reviewing:<br />
          <strong>OpenAI Privacy Policy:</strong> <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">https://openai.com/policies/privacy-policy</a><br />
          <strong>ChatGPT Terms:</strong> <a href="https://openai.com/policies" target="_blank" rel="noopener noreferrer">https://openai.com/policies</a>
        </p>
        <p>We have no control over OpenAI's data practices.</p>

        <h2>4. Data Transmitted to Our Server</h2>
        <p><strong>What ChatGPT Sends to Us:</strong></p>
        <ul>
          <li>Your meal selection request (e.g., "pick a chicken dish")</li>
          <li>Any custom meal/restaurant lists you provide</li>
          <li>Technical information necessary to process the request</li>
        </ul>
        <p><strong>What We Do With It:</strong></p>
        <ul>
          <li>Process it immediately to generate a random selection</li>
          <li>Return the result to ChatGPT</li>
          <li>Discard all data from memory</li>
          <li>We do NOT store, log, or retain any of this information</li>
        </ul>
        <p><strong>We do NOT receive from ChatGPT (unless they include it):</strong></p>
        <ul>
          <li>Your name or ChatGPT account information</li>
          <li>Your email address</li>
          <li>Your conversation history</li>
          <li>Personal identifiers</li>
        </ul>

        <h2>5. Third-Party Services</h2>
        <p>The App May Link To:</p>
        <ul>
          <li>Recipe websites</li>
          <li>Restaurant directories</li>
          <li>Mapping services (Google Maps, etc.)</li>
          <li>Food delivery platforms</li>
        </ul>
        <p><strong>Privacy Implications:</strong></p>
        <ul>
          <li>These are independent third parties</li>
          <li>Each has their own privacy policies</li>
          <li>We do NOT control their data practices</li>
          <li>We do NOT receive data from them about your usage</li>
          <li>Clicking links to these services is subject to their terms</li>
        </ul>
        <p>You should review the privacy policies of any recipe site you visit, any restaurant or delivery service you use, and any mapping service you access.</p>

        <h2>6. No Tracking or Analytics</h2>
        <p>We do NOT use:</p>
        <ul>
          <li>Google Analytics or similar services</li>
          <li>Cookies (our server doesn't set any)</li>
          <li>Tracking pixels or beacons</li>
          <li>Fingerprinting techniques</li>
          <li>Session replay tools</li>
          <li>Advertising networks</li>
          <li>A/B testing platforms</li>
        </ul>
        <p>Our server does NOT track how often you use the App, what meals you select, your preferences or patterns, or return visits.</p>

        <h2>7. Data Security</h2>
        <p>While we don't store data, we maintain security practices:</p>
        <ul>
          <li>HTTPS/TLS encryption for data in transit</li>
          <li>Secure server configuration</li>
          <li>Regular security updates</li>
          <li>Limited server access controls</li>
        </ul>
        <p>
          However, no method of transmission is 100% secure. We cannot guarantee absolute security. Since we don't store data, there's no stored data to breach.
        </p>

        <h2>8. Children's Privacy</h2>
        <ul>
          <li>We do NOT knowingly collect data from anyone (including children)</li>
          <li>The App does not require age verification</li>
          <li>Parents should review OpenAI's policies regarding children's use of ChatGPT</li>
          <li>We do NOT have any data to delete related to children</li>
        </ul>

        <h2>9. Open Source and Self-Hosting</h2>
        <p>This Privacy Policy applies ONLY to the hosted version operated by Blackjax, LLC and the server at the official deployment.</p>
        <p>
          If you self-host the App, you are responsible for your own data practices and must create your own privacy policy. This policy does NOT cover your deployment. You are the data controller for your instance.
        </p>
        <p>
          <strong>Source Code:</strong> Available at <a href="https://github.com/Blackjax-Studio/whats-for-dinner" target="_blank" rel="noopener noreferrer">https://github.com/Blackjax-Studio/whats-for-dinner</a>. Review the code to verify our data practices.
        </p>

        <h2>10. International Users</h2>
        <p><strong>Data Location:</strong> Our server is hosted in the United States and data is processed transiently in the US. Since we don't store data, there's no permanent data residency.</p>
        <p><strong>GDPR (European Users):</strong> We don't collect personal data, so GDPR data rights don't apply. No data to access, correct, delete, or port. No need for consent mechanisms. OpenAI (ChatGPT) may be your data controller.</p>
        <p><strong>Other Jurisdictions:</strong> Local data protection laws may apply to OpenAI's practices. Review OpenAI's compliance with your local laws.</p>

        <h2>11. Your Privacy Rights</h2>
        <p>Since we collect NO data:</p>
        <ul>
          <li>There is no data to access</li>
          <li>There is no data to correct</li>
          <li>There is no data to delete</li>
          <li>There is no data to port</li>
          <li>There is no data to restrict processing of</li>
          <li>There are no automated decisions based on your data</li>
        </ul>
        <p>For ChatGPT-related data rights, contact OpenAI directly and review their privacy policy for your rights. We cannot help with OpenAI data requests.</p>

        <h2>12. Data Retention</h2>
        <p><strong>Retention Period: None</strong></p>
        <ul>
          <li>Data is processed in memory and immediately discarded</li>
          <li>No logs, databases, or backups contain user data</li>
          <li>Server logs (if any) do not contain personal information</li>
        </ul>

        <h2>13. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy to reflect changes in the App, legal requirements, or our practices (if we ever start collecting data).</p>
        <ul>
          <li>The "Effective Date" at the top will be revised</li>
          <li>Material changes will be communicated through the App or our website</li>
          <li>Continued use after changes = acceptance</li>
        </ul>
        <p>If we start collecting data, we will provide prominent notice, update this policy significantly, and provide opt-in mechanisms as required by law.</p>

        <h2>14. California Privacy Rights (CCPA)</h2>
        <p><strong>California Residents:</strong></p>
        <ul>
          <li>We do NOT sell personal information</li>
          <li>We do NOT share personal information for cross-context behavioral advertising</li>
          <li>We do NOT collect personal information</li>
          <li>CCPA data rights do not apply (no data to exercise rights on)</li>
        </ul>
        <p><strong>"Do Not Sell My Personal Information":</strong> Not applicable - we have no personal information to sell.</p>

        <h2>15. Contact Us About Privacy</h2>
        <p>Questions or concerns about this Privacy Policy:</p>
        <p>
          <strong>Blackjax, LLC</strong><br />
          <strong>Email:</strong> <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a><br />
          <strong>GitHub:</strong> <a href="https://github.com/Blackjax-Studio/whats-for-dinner" target="_blank" rel="noopener noreferrer">https://github.com/Blackjax-Studio/whats-for-dinner</a>
        </p>
        <p>We will respond to privacy inquiries promptly.</p>
        <p>For OpenAI/ChatGPT privacy questions, contact OpenAI directly or visit <a href="https://openai.com/policies" target="_blank" rel="noopener noreferrer">https://openai.com/policies</a>.</p>

        <h2>16. Compliance and Transparency</h2>
        <p><strong>Our Commitment:</strong></p>
        <ul>
          <li>We believe in radical transparency about data practices</li>
          <li>Our open-source code can be audited</li>
          <li>We will never secretly collect data</li>
          <li>If practices change, we will update this policy immediately</li>
        </ul>
        <p><strong>Regulatory Compliance:</strong> We comply with applicable US privacy laws and Missouri state privacy regulations. We commit to GDPR principles (though no data is collected).</p>

        <h2>17. No Data Broker Activities</h2>
        <p>We do NOT act as a data broker, sell or rent user information, share data with advertisers, provide data to third parties for marketing, build user profiles, or engage in data trading. <strong>Reason:</strong> We don't have any data to broker.</p>

        <div style={{ height: '1px', background: 'var(--border)', margin: '30px 0' }}></div>

        <h2>Summary</h2>
        <p><strong>In Plain English:</strong></p>
        <ul>
          <li>✅ We collect <strong>ZERO</strong> personal data</li>
          <li>✅ We store <strong>NOTHING</strong> about you</li>
          <li>✅ We don't track your usage</li>
          <li>✅ We don't use cookies</li>
          <li>✅ We don't sell anything</li>
          <li>✅ Your requests are processed in real-time and forgotten immediately</li>
          <li>⚠️ ChatGPT (OpenAI) has their own data practices - review their privacy policy</li>
          <li>⚠️ Third-party links (recipes, restaurants) have their own policies</li>
        </ul>
        <p>Questions? <a href="mailto:contact@blackjaxstudio.com">contact@blackjaxstudio.com</a></p>
      </div>
    </Layout>
  );
}
